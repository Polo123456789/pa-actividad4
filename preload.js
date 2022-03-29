// @ts-check
const {contextBridge, ipcRenderer} = require("electron");


contextBridge.exposeInMainWorld("electron", {
    saveCodeResult: (result) => ipcRenderer.send("save-code-result", result),
    askForLanguajeList: () => ipcRenderer.send("get-language-list"),
    processLanguageList: (callback) => ipcRenderer.on("language-list", callback),
    // TODO
    askForEntries: (language) => ipcRenderer.send("get-entries", language),
    // TODO
    processEntries: (callback) => ipcRenderer.on("entries", callback)
});
