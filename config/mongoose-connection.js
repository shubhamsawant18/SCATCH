const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const config = require("config"); // Require config only once

// Connect to MongoDB
mongoose.connect(`${config.get("MONGODB_URI")}/scatch`) 
  .then(function() {
    dbgr("Mongoose connected successfully"); // Test message
  })
  .catch(function(err) {
    console.error("Mongoose connection error:", err); 
  });

module.exports = mongoose.connection;
