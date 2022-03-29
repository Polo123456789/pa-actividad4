// @ts-check
const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const {
    insertRegister,
    getLanguageListFor,
    getEntriesFor
} = require("./db-operations");

let win = null;

app.on("ready", () => {
    win = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    win.maximize();
    win.show();
    win.loadFile("index.html")
});

ipcMain.on("save-code-result", (_evt, r) => {
    insertRegister(r);
})

ipcMain.on("get-language-list", () => {
    getLanguageListFor(win);
})

ipcMain.on("get-entries", (_evt, language) => {
    getEntriesFor(win, language);
})
