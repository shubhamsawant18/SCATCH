const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsrouter");
const usersRouter = require("./routes/usersRouter");
const connectDb = require("./config/mongoose-connection"); // Adjusted path
const User = require("./models/user-model"); // Adjust the path based on your folder structure

// Connect to the database
connectDb();

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

// Use routers
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
