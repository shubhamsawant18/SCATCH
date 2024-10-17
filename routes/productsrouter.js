const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

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

       res.send(product);
   } catch (err) {
       res.status(500).send(err.message);
   }
});

module.exports = router;
