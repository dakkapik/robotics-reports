const mongoose = require('mongoose');
const moment = require("moment")

// Declare the Schema of the Mongo model
const reportSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
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
module.exports = mongoose.model('Reports', reportSchema);