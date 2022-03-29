// @ts-check

/**
 * @typedef {import("./db-types").languageList} languageList
 */

/** @type HTMLSelectElement */
const availableLangs = document.querySelector("#available-languages");

/**
 * @param {any} _evt
 * @param {languageList} list
 */
const processLanguageList = (_evt, list) => {
    console.log(list);
    let l = "";
    for (const lang of list) {
        l += `<option>${lang.lenguaje}</option>`;
    }
    availableLangs.innerHTML = l;
}
window.electron.processLanguageList(processLanguageList);
window.electron.askForLanguajeList();
