const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn'); // Fix the path and typo

// Render owner login page on the root route
router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
});

router.get('/shop', isLoggedIn, async(req, res) => {
    res.redirect('shop');
});

module.exports = router;
