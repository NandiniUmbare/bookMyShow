const Theatres = require('../Models/TheatreModal');

const addTheatre = async(req, res) => {
    try {
        const theatre = new Theatres(req.body)
        await theatre.save()
        res.send({success: true, message: 'Theatre added successfully'})
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const updateTheatre = async(req, res) =>{
    try {
        await Theatres.findByIdAndUpdate(req.body.theatreId, req.body)
        res.send({success: true, message: "Theatre updated"})
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const deleteTheatre = async(req, res) =>{
    try {
        await Theatres.findByIdAndDelete(req.body.theatreId)
        res.send({success: true, message: "Theatre deleted"})
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const getAllTheatres = async(req, res) => {
    try {
        const allTheatres = await Theatres.find().populate("owner");
        if(allTheatres){
            res.send({success: true, message: "Theatres fetched successfully", data: allTheatres})
        } else {
            res.send({success: false, message: "No theatres found"})
        }
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

const getTheatresByOwner = async(req, res) => {
    try {
        const theatres = await Theatres.find({owner: req.params.ownerId})
        if(theatres){
            res.send({success: true, message: "Theatres fetched successfully", data: theatres})
        } else {
            res.send({success: false, message: "No theatres found"})
        }
    } catch (error) {
        res.send({success: false, message: error.message})
    }
}

module.exports = {
    addTheatre,
    updateTheatre,
    deleteTheatre,
    getAllTheatres,
    getTheatresByOwner
}