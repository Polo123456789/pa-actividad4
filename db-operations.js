// @ts-check

/** @typedef {import("./db-types").registro} register*/

const mysql = require("mysql2");
const {BrowserWindow} = require("electron");

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env["MYSQL_USER"],
    password: process.env["MYSQL_PASSWORD"],
    database: "pa-actividad5"
});

/**
 * @argument {register} register
 * @returns {boolean} verdadero si el insert fue correcto
 */
exports.insertRegister = (register) => {
    connection.query(
        "INSERT INTO registro (lenguaje, codigo, stdout, stderr, "
        + "valor_retorno, fecha) VALUES "
        + "(?, ?, ?, ?, ?, ?);",
        [
            register.lenguaje,
            register.codigo,
            register.stdout,
            register.stderr,
            register.valor_retorno,
            register.fecha
        ],
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    )
    return true;
};

/**
 * @param {BrowserWindow} win
 */
exports.getLanguageListFor = (win) => {
    connection.query(
        "SELECT DISTINCT lenguaje FROM registro;",
        (err, result, _fields) => {
            if (err) {
                console.log(err);
            }
            console.log(result)
            win.webContents.send("language-list", result)
        }
    )
};

/**
 * @param {BrowserWindow} win
 */
exports.getEntriesFor = (win, language) => {
    connection.query(
        "SELECT * FROM registro WHERE lenguaje = ?;",
        [language],
        (err, result, _fields) => {
            if (err) {
                console.log(err);
            }
            win.webContents.send("entries", result)
        }
    );
}
