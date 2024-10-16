// models/product-model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Buffer, required: true }, // Assuming image is stored as a buffer
    bgcolor: { type: String, required: true },
    panelcolor: { type: String, required: true },
    textcolor: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
