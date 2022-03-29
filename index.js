"use strict";

/** @typedef {import("./db-types").registro} register */

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
    .catch(err => console.error(err));

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

    const result = createCodeResults(
        response.run.stdout,
        response.run.stderr,
        response.run.code
    );

    //codeResults.innerHTML = resultTemplate.innerHTML;
    codeResults.innerHTML = "";
    codeResults.appendChild(result);

    /** @type register */
    const r = {
        lenguaje: availableLanguages.value,
        codigo: code.value,
        stdout: response.run.stdout,
        stderr: response.run.stderr,
        valor_retorno: response.run.code,
        fecha: new Date()
    };
    window.electron?.saveCodeResult(r);
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

    const loadingResultsElement = document.createElement("loading-results");
    codeResults.innerHTML = "";
    codeResults.appendChild(loadingResultsElement);

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

if (window.electron) {
    /** @type HTMLButtonElement */
    const queryDBBtn = document.createElement("button")
    queryDBBtn.setAttribute("class", "btn btn-dark w-auto m-2");
    queryDBBtn.innerText = "Consultar base de datos";
    queryDBBtn.addEventListener("click", () => {
        window.location.href = "consultar-db.html";
    });

    const inputSection = document.querySelector("#input-section");
    inputSection.appendChild(queryDBBtn);
}
