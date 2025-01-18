import { axiosInstance } from "./index";

export const addTheatre = async (movie) => {
	try {
		const response = await axiosInstance.post(
			"/api/theatres/add-theatre",
			movie
		);
		return response.data;
	} catch (error) {
        console.log(error.message)
    }
};

export const getAllTheatres = async () => {
	try {
		const response = await axiosInstance.get(
			"/api/theatres/get-all-theatres"
		);
		return response.data;
	} catch (error) {
        console.log(error.message)
    }
};

export const updateTheatre = async (theatre) => {
	try {
		const response = await axiosInstance.put(
			"/api/theatres/update-theatre",
            theatre
		);
		return response.data;
	} catch (error) {
        console.log(error.message)
    }
};

export const deleteTheatre = async (theatreId) => {
	try {
		const response = await axiosInstance.put(
			"/api/theatres/delete-theatre",
            theatreId
		);
		return response.data;
	} catch (error) {
        console.log(error.message)
    }
};

export const getAllTheatresByOwner = async (ownerId) => {
	try {
		const response = await axiosInstance.get(
		  `/api/theatres/get-all-theatres-by-owner/${ownerId}`
		);
		return response.data;
	  } catch (err) {
		console.log(err);
	  }
};