const {axiosInstance} = require('./index.js')

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get('/api/movies/get-all-movies')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addMovie = async (movie) => {
    try {
        const response = await axiosInstance.post('/api/movies/add-movie', movie)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateMovie = async (value) => {
    try {
      const response = await axiosInstance.put("api/movies/update-movie", value);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.put('/api/movies/delete-movie', movieId)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getMovieById = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/api/movies/movie/${movieId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}