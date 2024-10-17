const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },  // Ensure price is a number
  discount: { type: Number, default: 0 },
  bgcolor: { type: String, required: true },
  panelcolor: { type: String, required: true },
  textcolor: { type: String, required: true },
  image: { type: Buffer }  // Assuming you store the image as a buffer
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
