const mongoose = require('mongoose')
const moment = require("moment-timezone")
const joi = require("joi")

const validateReport = (input) => {
    const schema = joi.object({
        user_id: joi.string(),
        password: joi.string(),
        goals: joi.string(),
        results: joi.string()
    })
    return schema.validate(input)
}

const reportSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    date:{
        type: String,
        default: moment().tz("America/New_York").format("DD-MM-YYYY"),
        required:true,
    },
    time: {
        type: String,
        default: moment().format("h:mm"),
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
})

//Export the model
module.exports.Report = mongoose.model('Reports', reportSchema)
module.exports.validateReport = validateReport