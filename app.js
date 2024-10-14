const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter"); 
const productsRouter = require("./routes/productsrouter"); 
const usersRouter = require("./routes/usersRouter");
const connectDb = require("./config/mongoose-connection"); // Adjusted path

// Connect to the database
connectDb();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Root route
app.get("/", (req, res) => {
    const error = []; 
    res.render("index", { error });
});

// Use routers
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something broke!'); // Send an error response
});

// Start the server
const PORT = 3000; // Set the port explicitly to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
