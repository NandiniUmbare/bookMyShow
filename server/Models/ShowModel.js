const mongoose = require('mongoose');

const showSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    movie: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "movies",
        required: true
    },
    price: {type: Number, required: true},
    seats: {type: Number, required: true},
    bookedSeats: {type: Array, default: []},
    theatre: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "theatres",
        required: true
    },
}, {timestamps: true})

const ShowModel = mongoose.model("shows", showSchema)
module.exports = ShowModel