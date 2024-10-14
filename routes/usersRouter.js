const express = require("express");
const router = express.Router();
const{ registerUser }= require("../controllers/authController")

router.get("/",function(req,res){
    res.send("hey,its workinh")
})
// Create a new user (route: /create)
router.post("/register",registerUser);

module.exports = router;
