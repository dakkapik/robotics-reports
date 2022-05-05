const mongoose = require('mongoose'); // Erase if already required
const User = require("./User");
const moment = require("moment")

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    User,
    date:{
        type: String,
        default: moment().format("DD-MM-YYYY"),
        required:true,
    },
    goals:{
        type:String,
        required:true,
    },
    results:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);