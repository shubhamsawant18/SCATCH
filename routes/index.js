const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn'); // Ensure path is correct
const productModel = require('../models/product-model'); // Ensure path is correct
const userModel = require('../models/user-model'); // Ensure path is correct

// Render owner login page on the root route
router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
});

// Shop route - displays products to logged-in users
router.get('/shop', isLoggedIn, async (req, res) => {
    try {
        let products = await productModel.find();
        let successMessages = req.flash("success");
        let success = successMessages.length > 0 ? successMessages[0] : ''; // Get the first success message or set to empty string
        res.render("shop", { products, success });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.get("/cart", isloggedIn ,async function(req,res){
   
    res.render("cart")
});

// Add to cart route
router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.productid); // Add product ID to user's cart
        await user.save();
        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to add product to cart");
        res.redirect("/shop");
    }
});

module.exports = router;
