// @ts-check
"use strict";

/** @type HTMLTextAreaElement */
const code = document.querySelector("#code");
/** @type HTMLButtonElement */
const runBtn = document.querySelector("#run");
/** @type HTMLSelectElement */
const availableLanguages = document.querySelector("#available-languages");
/** @type HTMLDivElement */
const codeResults = document.querySelector("#code-results");

// En lugar de que salga del textarea al presionar tab, la introducira al texto,
// asi se podra usar para indentar.
// Fuente:
// https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
code.addEventListener("keydown", function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        this.value = this.value.substring(0, start)
            + "\t"
            + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
});

/**
 * @typedef {{
 *    language: string
 *    version: string
 *    aliases: string[]
 * }} languageDetails
 */

/**
 * @argument {languageDetails[]} languages
 */
const loadLanguages = (languages) => {
    let list = "";
    for (const l of languages) {
        const v = `${l.language} ${l.version}`;
        list += `<option value="${v}">${v}</option>`;
    }

    availableLanguages.innerHTML = list;
}

// Cargamos los lenguajes
fetch("https://emkc.org/api/v2/piston/runtimes")
    .then(response => response.json())
    .then(loadLanguages)
    .catch(err => alert(err));

/**
 * @typedef {{
 *     name?: string,
 *     content: string,
 *     encoding?: string,
 * }} fileData
 *
 * @typedef {{
 *     language: string,
 *     version: string,
 *     files: fileData[],
 *     stdin?: string,
 *     args?: string[],
 *     compile_timeout?: number,
 *     run_timeout?: number,
 *     compile_memory_limit?: number,
 *     run_memory_limit?: number
 * }} executeInstructions
 *
 * @typedef {{
 *     stdout: string,
 *     stderr: string,
 *     output: string,
 *     code: number,
 *     signal: any
 * }} runResponse
 *
 * @typedef {{
 *     language: string,
 *     version: string,
 *     run: runResponse,
 *     message?: string
 * }} executeResponse
 */

/**
 * @param {executeResponse} response
 */
const showCodeResults = (response) => {
    if (response.message) {
        codeResults.innerHTML = "";
        alert(response.message);
        return;
    }

    /** @type HTMLTemplateElement */
    const resultTemplate = document.querySelector("#result-template");

    const stdout = resultTemplate.content.querySelector("#stdout");
    const stderr = resultTemplate.content.querySelector("#stderr");
    const retVal = resultTemplate.content.querySelector("#return-value");

    stdout.innerHTML = response.run.stdout;
    stderr.innerHTML = response.run.stderr;
    retVal.innerHTML = response.run.code.toString();

    codeResults.innerHTML = resultTemplate.innerHTML;
}

runBtn.addEventListener("click", () => {
    const textCode = code.value;
    const [language, version] = availableLanguages.value.split(" ");

    /** @type executeInstructions */
    const r = {
        language: language,
        version: version,
        files: [{
            content: textCode
        }]
    };

    /** @type HTMLTemplateElement */
    const loadingTemplate = document.querySelector("#loading-results-template");
    codeResults.innerHTML = loadingTemplate.innerHTML;

    fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(r)
    })
        .then(response => response.json())
        .then(showCodeResults)
        .catch((reason) => {
            console.error(reason);
        });

});
