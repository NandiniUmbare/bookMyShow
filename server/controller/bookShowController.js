const Booking = require('../Models/BookingShowModel');
const Show = require('../Models/ShowModel');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const EmailHelper = require('../utils/emailHelper');

const makePayment = async(req, res) => {
    try {
        const {token, amount} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            payment_method_types: ["card"],
            receipt_email: token.email,
            description: "Booking payment for movie",
            confirm: true
        });
        const transactionId = paymentIntent.id;
        res.send({
            success: true,
            message: "Payment successful",
            data: transactionId
        })
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
};

const bookShow = async(req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        const show = await Show.findById(req.body.show).populate('movie');
        const updateBookedSeats = [...show.bookedSeats, req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: updateBookedSeats
        });
        const populatedBooking = await Booking.findById(newBooking._id)
        .populate("user")
        .populate("show")
        .populate({
            path: "show",
            populate: {
            path: "movie",
            model: "movies",
            },
        })
        .populate({
            path: "show",
            populate: {
            path: "theatre",
            model: "theatres",
            },
        });
        await EmailHelper("ticket_template.html", populatedBooking.user.email, {
            name: populatedBooking.user.name,
            movie: populatedBooking.show.movie.movieName,
            theatre: populatedBooking.show.theatre.name,
            date: populatedBooking.show.date,
            time: populatedBooking.show.time,
            seats: populatedBooking.seats,
            amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
            transactionId: populatedBooking.transactionId,
          });
        res.send({
            success: true,
            message: 'Booking successful',
            data: newBooking
        })
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
};

const getAllBookings = async(req, res) => {
    try {
        const bookings = await Booking.find({user: req.params.userId})
        .populate('user')
        .populate('show')
        .populate({
            path: 'show',
            populate: {
                path: 'movie',
                model: 'movies'
            },
        })
        .populate({
            path: 'show',
            populate: {
                path:'theatre',
                model: 'theatres'
            }
        });
        res.send({
            success: true,
            message: "All bookings have been fetched",
            data: bookings,
        });
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
};

module.exports = {
    makePayment,
    bookShow,
    getAllBookings
}