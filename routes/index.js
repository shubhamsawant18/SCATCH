// index.js

const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn'); // Fixed path and typo
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

// Render owner login page on the root route
router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", { error, loggedIn: false });
});

// Updated shop route
router.get('/shop', isLoggedIn, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success") || ""; // Provide an empty string as a fallback
    res.render('shop', { products, success }); // Pass success to the template
});


router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart"); // Flash success message
    res.redirect("/shop");
});

module.exports = router;
