const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");  // Consistent case

// Render owner login page on the root route
router.get("/", function(req, res) {
    const error = [];  // Define an empty error array or populate it as necessary
    res.render("index", { error });  // Passing 'error' to the view
});

// Protected route for shop, using isLoggedIn middleware
router.get("/shop", isLoggedIn, function(req, res) {
    res.render("shop");
});

module.exports = router;
