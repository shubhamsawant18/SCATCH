const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/keys"); // Import the JWT_KEY
const User = require("../models/user-model"); // Ensure User is imported correctly

module.exports.registerUser = async function (req, res) {
    const { email, password, fullname } = req.body;

    // Basic validation
    if (!email || !password || !fullname) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({ error: "You already have an account, please log in." });
        }

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user with hashed password
        const newUser = new User({
            email,
            password: hashedPassword, // Store the hashed password
            fullname,
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        let token = jwt.sign({ email, id: newUser._id }, JWT_KEY); // Use the imported JWT_KEY

        // Set the token in a cookie
        res.cookie("token", token, { httpOnly: true });

        // Send the response
        res.status(201).json({ message: "User created successfully", user: newUser, token });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: "Error creating user", details: error.message });
    }
}
