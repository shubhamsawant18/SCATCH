const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/keys");
const User = require("../models/user-model"); 

module.exports.registerUser = async function (req, res) {
    const { email, password, fullname } = req.body;
    
    // Basic validation
    if (!email || !password || !fullname) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({ error: "You already have an account, please log in." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword, // Hashed password stored
            fullname,
        });
        await newUser.save();

        let token = jwt.sign({ email, id: newUser._id }, process.env.JWT_KEY);
        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({ message: "User created successfully", user: newUser, token });
    } catch (error) {
        res.status(400).json({ error: "Error creating user", details: error.message });
    }
}
module.exports.loginUser = async function(req, res) {
    let { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ error: "Email or Password incorrect" });
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (result) {
            let token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
            return res.status(200).json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ error: "Email or Password incorrect" });
         }
    });
}
