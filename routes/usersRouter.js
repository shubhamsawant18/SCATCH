const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.get("/", function(req, res) {
    res.send("hey, it's working");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", (req, res) => {
    res.clearCookie('token'); 
    res.redirect('/');
});

router.get("/admin",function(req,res){
    res.render("createproducts")
})

module.exports = router;
