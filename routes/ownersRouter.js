const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const upload = require("../config/multer-config");

// Route to render the create product form
router.get("/products/create", (req, res) => {
    res.render("createproducts", { error: [], success: '' });
});

// Route to handle the product creation
router.post("/products/create", upload.single('image'), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const product = new Product({
            name,
            price,
            discount,
            image: req.file.buffer,
            bgcolor,
            panelcolor,
            textcolor
        });
        await product.save();
        res.render("createproducts", { error: [], success: "Product created successfully!" });
    } catch (err) {
        console.error(err);
        res.render("createproducts", { error: [err.message], success: '' });
    }
});

// Route to render the admin page
router.get("/admin", async (req, res) => {
    try {
        const products = await Product.find();
        res.render("admin", { products });
    } catch (err) {
        console.error(err);
        res.render("admin", { products: [] });
    }
});

module.exports = router;
