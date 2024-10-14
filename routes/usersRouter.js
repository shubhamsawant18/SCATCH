const express = require("express");
const router = express.Router();
const User = require("../models/user-model");

// Create a new user (change the route from /register to /create)
router.post("/create", async (req, res) => {
    const { email, password, fullname } = req.body;

    // Basic validation
    if (!email || !password || !fullname) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newUser = new User({
            email,
            password,
            fullname,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: "Error creating user", details: error.message });
    }
});

module.exports = router;
