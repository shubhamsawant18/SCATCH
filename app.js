const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const path = require("path");
const Product = require("./models/product-model");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const connectDb = require("./config/mongoose-connection");
require("dotenv").config();

const app = express();

// Connect to the database
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Set up session middleware
app.use(session({
    secret: 'yourSecretKey', // Replace with your own secret key
    resave: false,
    saveUninitialized: true
}));

// Set up flash messages
app.use(flash());

// Middleware to add flash messages to res.locals
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.cookies.token ? true : false;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Root route
app.get("/", (req, res) => {
    const error = [];
    res.render("index", { error, isAuthenticated: res.locals.isAuthenticated });
});

// Route for shop
app.get('/shop', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products from the database
        // Send the cart length as part of the rendering data
        res.render('shop', { 
            products, 
            success: req.flash('success'), 
            cartLength: req.session.cart ? req.session.cart.length : 0 // Send cart length
        }); 
    } catch (err) {
        console.log('Error fetching products:', err);
        res.render('shop', { 
            products: [], 
            success: '', 
            cartLength: 0 // Send cart length as 0 if error occurs
        }); 
    }
});


// Use routers
app.use("/owners", ownersRouter);
app.use("/products", productsRouter); // Make sure productsRouter has the cart route
app.use("/users", usersRouter);

// Route to view the cart (if you want to access /cart directly)
app.get("/cart", (req, res) => {
    const cartItems = req.session.cart || []; // Get cart items from the session
    res.render("cart", { cartItems, success: req.flash('success'), error: req.flash('error') });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
