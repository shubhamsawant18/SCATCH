const mongoose = require('mongoose');
const config = require('./development.json'); // Assuming the URI is stored here

const connectDb = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI); // Removed deprecated options
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDb;
