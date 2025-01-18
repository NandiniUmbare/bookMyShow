const mongoose = require('mongoose')
const TheatreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    isActive:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const theatreModel = mongoose.model("theatres", TheatreSchema)
module.exports = theatreModel