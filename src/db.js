// Configuro mongo 
const { error } = require("console");
const mongoose = require("mongoose");
require("dotenv").config(); // => HABILITO USAR VARIABLES DE ENTORNO EN EL DOCUMENTO
const { URI_MONGO } = process.env;

module.exports = () => {
    mongoose.connect(
        // URI of Mongo
        URI_MONGO
    ).catch((e) => console.error("Error de conexion con el servidor de mongo", e));
};
