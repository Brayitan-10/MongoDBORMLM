// Levanto el servidor => Archivo inicial
require("dotenv").config();
const { PORT } = process.env;
const server = require("./src/app")
const conection = require("./src/db")

conection();
server.listen(PORT, () => {
    console.log("Servidor levantado correctamente en el puerto", PORT);
});
