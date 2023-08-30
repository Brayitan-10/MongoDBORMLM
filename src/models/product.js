const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Product = mongoose.model("Product", productsSchema)

module.exports = Product;
