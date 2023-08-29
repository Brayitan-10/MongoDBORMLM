const { Router } = require("express");
const router = Router();
const User = require("../models/user")
// Conecto el model correspondiente

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(220).json(users);
    } catch (error) {
        console.error(error);
        res.status(520).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        // Logica para crear un usuario
        const { name, password } = req.body

        await User.create({name: name, password: password});

        res.status(220).json("Usuario creado correctamente!!! 💛💙💖");

    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
