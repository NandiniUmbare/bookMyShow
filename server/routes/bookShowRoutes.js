const bookShowRouter = require("express").Router();
const { makePayment,bookShow, getAllBookings } = require('../controller/bookShowController');
const auth = require('../middlewares/authMiddleware');

bookShowRouter.post('/make-payment', auth, makePayment);
bookShowRouter.post('/book-show', auth, bookShow);
bookShowRouter.get('/get-all-bookings/:userId', auth, getAllBookings);

module.exports = bookShowRouter