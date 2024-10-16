const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Existing routes
router.get("/", function(req, res) {
    res.send("hey, it's working");
});
router.post("/register", registerUser);
router.post("/login", loginUser);

// Add logout route
router.get("/logout", (req, res) => {
    res.clearCookie('token'); // Clear the JWT cookie
    res.redirect('/'); // Redirect to homepage after logout
});

module.exports = router;
