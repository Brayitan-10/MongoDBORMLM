const { Router } = require("express");
const router = Router();
const users = require("./users.routes")
const products =  require("./products.routes")

router.get("/", (req, res) => {
    res.send("La conexión salió exitosa!!!");
});

router.use("/users", users) // localhost:3000/users
router.use("/products", products)

module.exports = router;
