const mongoose = require('mongoose')
const uniquevalidator = require('mongoose-unique-validator')

const registerSchema =  new mongoose.Schema({
    name: { type: String },
    email: { type: String,unique:true },
    mobileno: { type: String,unique:true },
    password: { type: String },
    dob: { type: String }
    
})
registerSchema.plugin(uniquevalidator,{message:"Already details are registered"})
module.exports = mongoose.model('register', registerSchema)
