const express = require("express"); // => Sin punto y coma
const server = express(); // => Sin punto y coma
server.name = "Brayan SJ"; // => Sin punto y coma

// Configuraciones de express
server.use(express.urlencoded({ extended: false }));
server.use(express.json()); // => Sin punto y coma

// Conecta con las rutas
const router = require("./routes/index.routes"); // => Sin punto y coma
server.use("/", router); // => Sin punto y coma

// Conecto mongo---
require("./db")

module.exports = server
