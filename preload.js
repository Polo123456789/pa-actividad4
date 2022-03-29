// @ts-check
const {contextBridge, ipcRenderer} = require("electron");

/** @typedef {import("./db-types").registro} register */

contextBridge.exposeInMainWorld("electron", {
    /**
     * @argument {register} result
     */
    saveCodeResult: (result) => ipcRenderer.send("save-code-result", result),
});
