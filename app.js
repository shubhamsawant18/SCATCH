const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const connectDb = require("./config/mongoose-connection");
require("dotenv").config(); // Load environment variables

// Log the JWT_KEY to verify it's loaded
console.log("JWT_KEY:", process.env.JWT_KEY);

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

// Use routers
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
