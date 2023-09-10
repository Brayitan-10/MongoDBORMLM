require("dotenv").config();
const { PORT } = process.env;
const server = require("./src/app");
const conection = require("./src/db");
const { createRoles, createAdmin } = require("./src/libs/initialSetup.js")


conection();

// crear roles
createRoles();

// crear usuarios
createAdmin();

server.listen(PORT, () => {
  console.log("Servidor levantado correctamente en el puerto", PORT);
});
