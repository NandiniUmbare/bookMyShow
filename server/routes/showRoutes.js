const {
	getAllShows,
	addShow,
	updateShow,
	deleteShow,
	getShowsByTheatre,
	getShowById,
    getTheatresByMovie,
} = require("../controller/showController");

const showRouter = require("express").Router();

showRouter.get("/get-all-shows", getAllShows);
showRouter.post("/add-show", addShow);
showRouter.put("/update-show", updateShow);
showRouter.delete("/delete-show/:showId", deleteShow);
showRouter.get("/get-shows-by-theatres/:theatreId", getShowsByTheatre);
// showRouter.get("/get-all-theatres-by-movie/:movie/:date", getTheatresByMovie);
showRouter.get("/get-show-by-id/:showId", getShowById);

// get all theatres by movie which has some shows
showRouter.get("/get-all-theatres-by-movie/:movie/:date", getTheatresByMovie);

module.exports = showRouter;
