const Role = require("../models/roles");
const User = require("../models/user");

require("dotenv").config();
const { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

const createRoles = async () => {
  try {
    // Ya hay roles creados? OK- PARO EJECUCION  : LOGICA PARA CREAR ROLES
    // CUENTO CUANTOS DOCUMENTOS HAY
    const count = await Role.estimatedDocumentCount();
    console.log("Documentos contados", count);
    if (count > 0) return "Ya existian roles creados";
    // Creamos los valores por defecto
    const values = await Promise.all([
      new Role({ name: "admin" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "user" }).save(),
    ]);

    // const values = await Role.create([{ name: "admin" }, { name: "moderator" }, { name: "user" }])

    console.log("Roles creados correctamente");
    console.log(values);

  } catch (error) {
    console.error(error);
  }
};

const createAdmin = async () => {
  //Verificar que no haya un admin existente en la db
  const userFound = await User.findOne({ email: ADMIN_EMAIL })
  console.log("userFound", userFound);
  if (userFound) return;
  //busco los roles ---------------------------------------------------------------
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } }); // me devuelve un array de roles

  //creo el usuario
  const newUser = await User.create({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: roles.map((role) => role._id) // [kdjiejkjijakjwiojqwqm, qjqw5456e5561dfw]
  });

  console.log("New admin created:", newUser.email);
};

module.exports = {createRoles, createAdmin};
