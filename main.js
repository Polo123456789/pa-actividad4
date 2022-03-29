// @ts-check
const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const {
    insertRegister
} = require("./db-operations");

let win = null;

app.on("ready", () => {
    win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    win.loadFile("index.html")
});

ipcMain.on("save-code-result", (_evt, r) => {
    insertRegister(r);
})
