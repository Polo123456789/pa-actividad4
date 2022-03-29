// @ts-check

/**
 * @typedef {import("./db-types").languageList} languageList
 * @typedef {import("./db-types").registro} register
 */


/** @type HTMLSelectElement */
const availableLangs = document.querySelector("#available-languages");

/** @type HTMLDivElement */
const codeDetails = document.querySelector("#code-details");
codeDetails.querySelector("button").addEventListener("click", () => {
    codeDetails.classList.add("invisible")
});

/** @type HTMLButtonElement */
const consultBtn = document.querySelector("#consult-btn");

/**
 * @param {any} _evt
 * @param {languageList} list
 */
const processLanguageList = (_evt, list) => {
    let l = "";
    for (const lang of list) {
        l += `<option>${lang.lenguaje}</option>`;
    }
    availableLangs.innerHTML = l;
}
window.electron.processLanguageList(processLanguageList);
window.electron.askForLanguajeList();


consultBtn.addEventListener("click", () => {
    const lang = availableLangs.value;
    window.electron.askForEntries(lang);
});


/**
 * @param {register} entrie
 */
const createViewerFor = (entrie) => {
    const viewer = () => {
        const [code, stdout, stderr] = codeDetails.querySelectorAll("pre");
        const retVal = codeDetails.querySelector("span");

        code.innerText = entrie.codigo;
        stdout.innerText = entrie.stdout;
        stderr.innerText = entrie.stderr;
        retVal.innerText = entrie.valor_retorno.toString();

        codeDetails.classList.remove("invisible");
    };
    return viewer;
}

/**
 * @param {any} _evt
 * @param {register[]} entries
 */
const processEntries = (_evt, entries) => {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    for (const e of entries) {
        const tableRow = document.createElement("tr");
        const id = document.createElement("td");
        const date = document.createElement("td");
        const runBtn = document.createElement("td");

        tableRow.appendChild(id);
        tableRow.appendChild(date);
        tableRow.appendChild(runBtn);

        id.innerText = e.id.toString();
        date.innerText = e.fecha.toString();

        const r = document.createElement("button");
        r.innerText = "Ver detalles";
        r.setAttribute("class", "btn btn-dark");
        r.addEventListener("click", createViewerFor(e))
        runBtn.appendChild(r);

        tableBody.appendChild(tableRow);
    }
};
window.electron.processEntries(processEntries);
