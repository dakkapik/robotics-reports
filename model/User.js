const mongoose = require("mongoose")
const joi = require("joi")

const validateUser = (input) => {
    const schema = joi.object({
        name: joi.string(),
        email: joi.string(),
        mobile: joi.string(),
        password: joi.string()
    })
    return schema.validate(input)
};

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        index:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.validateUser = validateUser;