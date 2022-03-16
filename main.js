// @ts-check
const {app, BrowserWindow} = require("electron");

let win = null;

app.on("ready", () => {
    win = new BrowserWindow();
    win.loadFile("index.html")
});
