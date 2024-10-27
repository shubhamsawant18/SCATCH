//authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/keys");
const User = require("../models/user-model");

// Register a new user
module.exports.registerUser = async function (req, res) {
  const { email, password, fullname } = req.body;

  // Check if all fields are provided
  if (!email || !password || !fullname) {
    return res.status(400).json({ error: "Please fill in all the fields." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ error: "Account already exists. Please log in instead." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      email,
      password: hashedPassword, // Store hashed password
      fullname,
    });
    await newUser.save();

    // Generate a JWT token
    let token = jwt.sign({ email, id: newUser._id }, process.env.JWT_KEY);
    res.cookie("token", token, { httpOnly: true }); // Set the token in a cookie

    // Send success response
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating user", details: error.message });
  }
};

// User login function
module.exports.loginUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("error", "Incorrect email or password");
      return res.redirect("/");
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Create a token if the password matches
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true }); // Set the token in a cookie

      return res.redirect("/shop");
    } else {
      console.log("error", "Incorrect email or password");
      return res.redirect("/");
    }
  } catch (err) {
    console.log("error", err.message);
    return res.redirect("/");
  }
};
