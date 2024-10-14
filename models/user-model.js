const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
}, { timestamps: true });
=======
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
>>>>>>> 22937002df3d09058871462f3b145dba3dab8512

const User = mongoose.model('User', userSchema);

module.exports = User;
