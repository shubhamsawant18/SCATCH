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
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            // req.flash('error', 'Email or Password incorrect');
            console.log('error', 'Email or Password incorrect');
            return res.redirect('/');
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            let token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true });
            console.log('Correct details');
            // Redirect to shop after login
        //    res.status(200).json({
        //         success: true,
        //         message : "Logged in successfully"
        //     });
            return   res.redirect('/shop');
        } else {
          console.log('error', 'Email or Password incorrect');
            return res.redirect('/');
        }
    } catch (err) {
console.log('error', `${err}`);
        return res.redirect('/');
    }
}
