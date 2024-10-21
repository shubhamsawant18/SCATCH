const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const upload = require("../config/multer-config");
const Owner = require('../models/owner-model');
// Route to render the create product form
router.get("/products/create", (req, res) => {
    res.render("createproducts", { error: [], success: '' });
});

// Route to handle the product creation
router.post("/products/create", upload.single('image'), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const product = new Product({
            name,
            price,
            discount,
            image: req.file.buffer,
            bgcolor,
            panelcolor,
            textcolor
        });
        await product.save();
        res.render("createproducts", { error: [], success: "Product created successfully!" });
    } catch (err) {
        console.error(err);
        res.render("createproducts", { error: [err.message], success: '' });
    }
});

// Route to render the admin page
router.get("/admin", async (req, res) => {
    try {
        const products = await Product.find();
        res.render("admin", { products });
    } catch (err) {
        console.error(err);
        res.render("admin", { products: [] });
    }
});

router.post('/create', async(req, res)=>{
    try {
        let picture = '';
        let gstin = '';
        const {fullname, email, password}=req.body;
        await Owner.create({
            fullname,
            email,
            password,
            picture,
            gstin,
        });
        return res.status(201).json({
            message: 'owner created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Api Fetched successfully',

        });
    }

});
router. get('/', async(req, res)=>{
    try{
        const ownersData = await Owner.find();
        return res.status(200).json({
            success:true,
            message: 'api fetch successfully'
            ,data: ownersData
        });
    }catch(e){
        return res.status(500).json({
            message:e
        });
    }
})
module.exports = router;
