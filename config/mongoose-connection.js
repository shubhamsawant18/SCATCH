const mongoose = require('mongoose');
<<<<<<< HEAD
const config = require('./development.json'); // Assuming the URI is stored here

const connectDb = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

=======

const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB Cluster');
        });
        
        mongoose.connection.on('error', (err) => {
            console.log('Mongoose connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        const connect = await mongoose.connect(
            "mongodb+srv://shubhsawant124:Anayra%40007@cluster0.3iljs.mongodb.net/Scatch?retryWrites=true&w=majority&appName=Cluster0",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                connectTimeoutMS: 10000,
            }
        );

        console.log("Database connected:", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
};

>>>>>>> 22937002df3d09058871462f3b145dba3dab8512
module.exports = connectDb;
