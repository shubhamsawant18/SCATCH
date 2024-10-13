const express = require('express');
const router = express.Router();

// Render product creation form
router.get("/create", function(req, res) {
    res.render("createproducts");  // Make sure this renders the EJS view
});

// Handle product creation
router.post("/create", function(req, res) {
    // Handle product creation logic here
    res.send("Product created!");
});

module.exports = router;
