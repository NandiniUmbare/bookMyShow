const express = require('express')
const movieRouter = express.Router()
const {addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById} = require('../controller/movieController')

movieRouter.post('/add-movie', addMovie);
movieRouter.get('/get-all-movies', getAllMovies)
movieRouter.put('/update-movie', updateMovie)
movieRouter.put('/delete-movie', deleteMovie)
movieRouter.get('/movie/:movieId', getMovieById)

module.exports = movieRouter