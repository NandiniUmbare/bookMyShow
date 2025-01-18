const Shows = require('../Models/ShowModel')

const addShow = async(req, res) => {
    try {
        const show = new Shows(req.body)
        await show.save()
        res.send({success: true, message: "Show added"})
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const updateShow = async(req, res) => {
    try {
        await Shows.findByIdAndUpdate(req.body.showId, req.body)
        res.send({success: true, message: "Show Updated"})
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const deleteShow = async(req, res) => {
    try {
        await Shows.findByIdAndDelete(req.params.showId)
        res.send({success: true, message: "Show deleted"})
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const getAllShows = async(req, res) => {
    try {
        const shows = await Shows.find()
        if(shows){
            res.send({success: true, message: "Shows fetched successfully", data: shows})
        }
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const getShowsByTheatre = async(req, res) => {
    try {
        const shows = await Shows.find({theatre: req.params.theatreId}).populate("movie")
        res.send({
            success: true,
            message: "shows fetched successfully",
            data: shows
        })
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const getTheatresByMovie = async (req, res) => {
	try {
	  /**
	   * we will get movie and date from the request params
	   * we will find all the shows for that movie and date
	   * filter out unique theares and organise shows under each unique theatre
	   *
	   * uniqueTheate = [{theatreA, shows: [show1, show2, show3]}, {theatreB, shows: [show4, show5, show6]}]
	   * shows = [show1, show2, show3, show4, show5, show6, show7, show8, show9]
	   *
	   *
	   * Theatre A => [show1, show2, show3]
	   * Theatre B => [show4, show5, show6]
	   * Theatre C => [show7, show8, show9]
	   */
	  const { movie, date } = req.params;
	  const shows = await Shows.find({ movie, date }).populate("theatre");
	  // filter out the unique theatres
	  console.log(shows)
	  const uniqueTheatres = [];
	  shows.forEach((show) => {
		const isTheatre = uniqueTheatres.find(
		  (theatre) => theatre._id == show.theatre._id
		);
		if (!isTheatre) {
		  const showsOfTheatre = shows.filter(
			(showObj) => showObj.theatre._id == show.theatre._id
		  );
		  uniqueTheatres.push({
			...show.theatre._doc,
			shows: showsOfTheatre,
		  });
		}
	  });
	  res.send({
		success: true,
		data: uniqueTheatres,
		message: "All theatres fetched successfully",
	  });
	} catch (err) {
	  res.send({
		success: false,
		message: err.message,
	  });
	}
}

const getShowById = async(req, res) => {
    try {
        const shows = await Shows.findById(req.params.showId).populate("movie").populate("theatre")
        res.send({
            success: true,
            message: "shows fetched successfully",
            data: shows
        })
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

module.exports = {
    getAllShows,
    addShow,
    updateShow,
    deleteShow,
    getShowsByTheatre,
    getTheatresByMovie,
    getShowById
}