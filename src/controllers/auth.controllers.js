const User = require("../models/user");
const Role = require("../models/Role");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signUpHandler = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password,
      //roles
    });

    //Encriptar la contraseña sin metodo estatico
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Verificamos si los roles existen
    if (roles) {
      const rolesFound = await Role.find({ name: { $in: roles } });
      newUser.roles = rolesFound.map((role) => role._id);
    } else {
      //const defaultRole = ["user"];
      const role = await Role.find({ name: "user" });
      newUser.roles = [role._id];
    }
    // Guardo el usuario en la DB y genero una constante con el
    const savedUser = newUser.save();

    // Crar un Token   ("id del usuario(payload)", "nuestro secreto", "objeto con config")
    const token = jwt.sign(
      {id: savedUser._id},
      process.env.SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    //return res.status(200).json({ token,  });
    res.status(200).json(newUser)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscar si el mail/usuario existe
    const userFound = await User.findOne({ email: email }).populate("roles")
    if (!userFound) {res.status(400).end()}
    // Comparar contraseña
    const matchedPassword = await User.comparePassword(password, userFound.password);
    if(!matchedPassword) {res.status(400).end()}
    // Crear y Devolver token
    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn : 86400, // 24 hours
    });

    res.status(200).json({ token });
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signInHandler, signUpHandler };
