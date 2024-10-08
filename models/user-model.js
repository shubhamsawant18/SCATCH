const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/scatch");

const productSchema =  mongoose.Schema({
    fullname:String,
    type:String,
    minLength:3,
    email:String,
    password:String,
    cart:{
        type:Array,
        defaults:[],
    },

    isadmin:Boolean,
    orders:{
        type:Array,
        default:[],
    },
    contact:Number,
    picture:String,
});

module.exports = mongoose.model("user",userSchema);