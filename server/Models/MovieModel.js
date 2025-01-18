const mongoose = require('mongoose')
const MovieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    releaseDate:{
        type: Date,
        required: true
    },
    poster:{
        type: String,
        required: true
    },
}, {timestamps: true})

const movieModel = mongoose.model('movies', MovieSchema)
module.exports = movieModel