CREATE DATABASE `pa-actividad5`;
USE `pa-actividad5`;

CREATE TABLE registro (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lenguaje varchar(30),
    codigo varchar(2000),
    stdout varchar(2000),
    stderr varchar(2000),
    valor_retorno int,
    fecha date
);
