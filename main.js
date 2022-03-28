// @ts-check
const {app, BrowserWindow} = require("electron");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env["MYSQL_USER"],
    password: process.env["MYSQL_PASSWORD"],
    database: "pa-actividad5"
});

connection.query("SELECT * FROM registro;", (err, results, fields) => {
    console.trace(err)
    console.trace(results);
    console.trace(fields);
})

let win = null;

app.on("ready", () => {
    win = new BrowserWindow();
    win.loadFile("index.html")
});
