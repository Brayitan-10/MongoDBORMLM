const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const { createUser } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authJwt");

// Conecto el model correspondiente
router.get("/", verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(220).json(users);
    } catch (error) {
        console.error(error);
        res.status(520).json({ message: error.message });
    }
});

// GET USE BY ID

// POST CREAR USUARIO

router.post("/", createUser);

module.exports = router;
