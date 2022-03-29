// @ts-check
const {contextBridge, ipcRenderer} = require("electron");


contextBridge.exposeInMainWorld("electron", {
    saveCodeResult: (result) => ipcRenderer.send("save-code-result", result),
    askForLanguajeList: () => ipcRenderer.send("get-language-list"),
    processLanguageList: (callback) => ipcRenderer.on("language-list", callback),
    // TODO
    aksForEntries: (language) => ipcRenderer.send("get-entires", language),
    // TODO
    processEntries: (callback) => ipcRenderer.on("entries", callback)
});
