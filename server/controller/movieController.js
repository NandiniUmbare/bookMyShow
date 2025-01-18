const Movies = require('../Models/MovieModel')

const addMovie = async(req, res) => {
    try {
        const movie = new Movies(req.body)
        await movie.save()
        res.send({success: true, message: 'New Movie has been added'})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const getAllMovies = async(req, res) => {
    try {
        const allMovies = await Movies.find()
        if(allMovies){
            res.send({success: true, message: 'Movies fetched successfully', data: allMovies})
        } else {
            res.send({success: false, message: 'Movies not found'})
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const updateMovie = async (req, res) => {
    try {
      await Movies.findByIdAndUpdate(req.body.movieId, req.body);
      res.send({
        success: true,
        message: "Movie has been updated",
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: error.message,
      });
    }
  };

const deleteMovie = async(req, res) => {
    try {
        await Movies.findByIdAndDelete(req.body.movieId)
        res.send({success: true, message: 'Movies deleted'})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const getMovieById = async(req, res) => {
    try {
        const movie = await Movies.findById(req.params.movieId)
        if(movie){
            res.send({success: true, message: "Movie found", data: movie})
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

module.exports = {
    addMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
    getMovieById
}