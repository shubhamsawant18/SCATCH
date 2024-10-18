const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, required: true, unique: true 
    },
    password: { type: String, required: true },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference the Product model (or the related model)
        default: []
    }],
    fullname: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
