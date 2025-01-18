const express = require('express')
const theatreRouter = express.Router()
const {addTheatre, updateTheatre, deleteTheatre, getAllTheatres, getTheatresByOwner} = require('../controller/theatreController');

theatreRouter.get('/get-all-theatres', getAllTheatres)
theatreRouter.post('/add-theatre', addTheatre)
theatreRouter.put('/update-theatre', updateTheatre)
theatreRouter.put('/delete-theatre', deleteTheatre)
theatreRouter.get('/get-all-theatres-by-owner/:ownerId', getTheatresByOwner)

module.exports = theatreRouter