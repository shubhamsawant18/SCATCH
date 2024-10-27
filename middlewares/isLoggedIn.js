//isLoggedIn.js

const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  // Check if the token exists in cookies
  const token = req.cookies.token;
  if (!token) {
    console.log("ERROR: You need to log in first");
    return res.redirect("/");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find the user in the database (excluding password)
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    // Attach user info to request object
    req.user = user;

    // Move on to the next function
    next();
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.redirect("/");
  }
};
