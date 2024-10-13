const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const config = require("config");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`) 
  .then(function() {
    dbgr("Mongoose connected successfully");
  })

  .catch(function(err) {
    console.error("Mongoose connection error:", err); 
  });

module.exports = mongoose.connection;
