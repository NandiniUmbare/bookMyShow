const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');
const theatreRouter = require('./routes/theatreRoutes');
const showRouter = require('./routes/showRoutes');
const bookShowRouter = require('./routes/bookShowRoutes');

// to secure from DOS attack (denial of service)
const appLimiter = rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    Limit: 100, //how many attempts
    message: "Too many attempts from this IP. please try again!"
});

app.use(cors({
    origin: '*', //allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],//methods to allowed
    allowedHeaders: ["content-Type", "Authorization"] //headres to allowed

}))
const clientBuildPath = path.join(__dirname, '../client/build');
connectDB();
app.use(helmet());
app.use(express.static(clientBuildPath));
app.use(mongoSanitize());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
})
app.use('/api/', appLimiter);
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookShowRouter);

app.listen(8082, () => {
    console.log('server is up and running on port: 8082');
});