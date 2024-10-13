const express = require('express');
const router = express.Router();

// Render owner login page on the root route
router.get("/", function(req, res) {
    res.render("owner-login");  // Update this to render the appropriate view
});

module.exports = router;
