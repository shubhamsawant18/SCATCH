// productsRouter.js

const express = require('express'); 
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model"); 
const isLoggedIn = require('../middlewares/isLoggedIn'); // Ensure user is logged in for certain routes

// Route to create a product
router.post("/create", upload.single("image"), async function(req, res) { 
   try { 
       const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

       // Convert price and discount to numbers
       const priceNumber = parseFloat(price);
       const discountNumber = parseFloat(discount) || 0; // Default to 0 if no discount

       // Check if required fields are provided and price is a valid number
       if (!name || isNaN(priceNumber) || !bgcolor || !panelcolor || !textcolor) {
           return res.status(400).send("Please provide valid inputs for all required fields, including a valid price.");
       }

       // Create the product
       let product = await productModel.create({
           image: req.file.buffer,
           name,
           price: priceNumber,
           discount: discountNumber,
           bgcolor,
           panelcolor,
           textcolor
       });

       // Send success message and created product
       res.status(201).send({ message: "Product created successfully!", product });
   } catch (err) {
       res.status(500).send(err.message);
   }
});

// Route to add a product to the cart
router.post("/addtocart/:productid", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        // Add the product to the user's cart
        user.cart.push(req.params.productid);
        await user.save();

        // Show success message and redirect back to the shop
        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to add product to cart");
        res.redirect("/shop");
    }
});

// Route to view the cart
router.get("/cart", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate('cart');
        // Ensure user.cart is passed to the EJS view
        res.render("cart", { cart: user.cart, success: req.flash('success') });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error fetching cart items');
        res.redirect('/shop'); // Redirect if there's an error
    }
});

// Route to remove a product from the cart
router.delete("/removefromcart/:productid", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        user.cart = user.cart.filter(item => item.toString() !== req.params.productid);
        await user.save();
        res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error removing product from cart" });
    }
});


module.exports = router;