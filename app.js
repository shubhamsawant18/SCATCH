const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
<<<<<<< HEAD
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsrouter");
const usersRouter = require("./routes/usersRouter");
const connectDb = require("./config/mongoose-connection"); // Adjusted path
const User = require("./models/user-model"); // Adjust the path based on your folder structure

// Connect to the database
connectDb();
=======
const ownersRouter = require("./routes/ownersRouter"); 
const productsRouter = require("./routes/productsrouter"); 
const usersRouter = require("./routes/usersRouter");
const connectDb = require("./config/mongoose-connection"); // Adjusted path
>>>>>>> 22937002df3d09058871462f3b145dba3dab8512

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

<<<<<<< HEAD
// User registration route
app.post("/register", async (req, res) => {
    const { email, password, fullname } = req.body; // Adjust the order as needed
    try {
        const newUser = new User({
            email,
            password,
            fullname
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: "Error creating user", details: error.message });
    }
});

=======
>>>>>>> 22937002df3d09058871462f3b145dba3dab8512
// Use routers
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

<<<<<<< HEAD
const PORT = process.env.PORT || 3000;
=======
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something broke!'); // Send an error response
});

// Start the server
const PORT = 3000; // Set the port explicitly to 3000
>>>>>>> 22937002df3d09058871462f3b145dba3dab8512
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
