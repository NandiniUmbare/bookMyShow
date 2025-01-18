import { axiosInstance } from "./index"

export const addShow = async(show) => {
    try {
        const response = await axiosInstance.post('/api/shows/add-show', show)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateShow = async(show) => {
    try {
        const response = await axiosInstance.put('/api/shows/update-show', show)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteShow = async(showId) => {
    try {
        const response = await axiosInstance.delete(`/api/shows//delete-show/${showId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllShows = async() => {
    try {
        const response = await axiosInstance.get('/api/shows/get-all-shows')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getShowsByTheatre = async(theatreId) => {
    try {
        const response = await axiosInstance.get(`/api/shows/get-shows-by-theatres/${theatreId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllTheatresByMovie = async ({ movie, date }) => {
    try {
      const response = await axiosInstance.get(
        `/api/shows/get-all-theatres-by-movie/${movie}/${date}`
      );
      return response.data;
    } catch (err) {
      return err.message;
    }
  };

export const getShowById = async(showId) => {
    try {
        const response = await axiosInstance.get(`/api/shows/get-show-by-id/${showId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
