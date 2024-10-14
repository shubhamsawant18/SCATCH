const mongoose = require('mongoose');

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

module.exports = connectDb;
