Programación Avanzada, Actividad 4
==================================

Pablo Sanchez Galdamez, Carnet 21001135.

API utilizada
-------------

Para este proyecto elegí usar `Piston API`. `Piston` es un motor de ejecución
de código de propósito general de alto rendimiento. Sobresale en la ejecución
de código no confiable y posiblemente malicioso sin temor a efectos dañinos.

La API consta de las siguientes urls:

```
GET  https://emkc.org/api/v2/piston/runtimes
POST https://emkc.org/api/v2/piston/execute
```

[Link a `Piston`](https://github.com/engineer-man/piston)

Descripción del funcionamiento de la aplicación
-----------------------------------------------

La app esta hecha para correr en electron y en un navegador normal. La interfaz
gráfica esta hecha con HTML y Bootstrap.

La app primero hace una petición a `runtimes` para conocer los lenguajes
disponibles.

Luego da la opción de elegir el lenguaje, y permite que se escriba el código.

Una vez se presiona el botón "Correr", se hace una petición a `execute` enviado
el lenguaje, versión, y código que escribió el usuario.

Una vez se recibe la respuesta, se le muestra al usuario el `stdout`, `stderr`,
y el valor de retorno del programa que escribió.

Imágenes
--------

![](./img/captura1.png)

![](./img/captura2.png)
