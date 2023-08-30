const { Router } = require("express");
const router = Router();
const Product = require("../models/product")
// Conecto el model correspondiente

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        // console.log(products);
        res.status(220).json(products);
    } catch (error) {
        console.error(error);
        res.status(520).json({ message: error.message });
    }
});

module.exports = router;
