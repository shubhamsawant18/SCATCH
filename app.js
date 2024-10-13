const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");  // Correct file name
const productsRouter = require("./routes/productsrouter");  // Correct file name and case
const usersRouter = require("./routes/usersRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Root route
app.get("/", (req, res) => {
    const error = []; // You can set this to whatever logic you need to define errors
    res.render("index", { error }); // Pass error variable to the view
});


// Use routers
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
