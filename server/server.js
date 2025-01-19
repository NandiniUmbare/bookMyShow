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

// Connect to MongoDB
connectDB();

app.set("trust proxy", 1);
// to secure from DOS attack (denial of service)
const appLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    keyGenerator: (req) => req.ip,
    message: "Too many attempts from this IP. Please try again later!"
});
// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://bookmyshow-b2j2.onrender.com'  // Replace with your frontend domain
        : 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Security middleware
app.use(helmet({
    contentSecurityPolicy: false  // Disable CSP for React app
}));

app.use(express.static(clientBuildPath));
app.use(mongoSanitize());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/', appLimiter);
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookShowRouter);

// Serve static files from React build
const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));

// Handle React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});