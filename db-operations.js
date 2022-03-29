// @ts-check

/** @typedef {import("./db-types").registro} register*/

const mysql = require("mysql2");

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
                console.log(err); // TODO: Notify in window
            }
        }
    )
    return true;
}
