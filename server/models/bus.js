const mongoose = require('mongoose')

const busSchema =  new mongoose.Schema({
    leavingFrom: { type: String },
    goingTo: { type: String },
    busType: { type: String },
    departure: { type: String },
    arrival: { type: String },
    availableSeats: { type: Number },
    fare: { type: Number },
    totalSeats: { type: Number },
    reservedSeats:{type:Array}
    
})

module.exports = mongoose.model('Bus', busSchema)
