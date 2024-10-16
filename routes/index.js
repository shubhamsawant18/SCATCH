const express = require('express');
const router = express.Router();
const isloggedIn = require(.../middlewares/isLoggenIn)

// Render owner login page on the root route
router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index",{error});  // Update this to render the appropriate view
});

// router.get("/shop,isLoggenIn,function(req,res"){
//     res.render("shop");

// });
route.get('/shop', isloggedIn, async(req,res)=>{
    res.redirect('shop');
})
module.exports = router;
