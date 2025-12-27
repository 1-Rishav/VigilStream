const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();
// Trust proxy is required for secure cookies to work behind a load balancer (Render, Heroku, etc.)
app.set('trust proxy', 1);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174", "https://vigil-stream-three.vercel.app"], // Allow Vite dev servers
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || ["http://localhost:5173", "http://localhost:5174", "https://vigil-stream-three.vercel.app"],
    credentials: true,
}));

// Database Connection
connectDB();

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Make io accessible in routes
app.set('socketio', io);

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/videos', require('./src/routes/videoRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));

app.get('/', (req, res) => {
    res.send('VigilStream API is running...');
});

// Error Handling Middleware
// Error Handling Middleware
app.use((err, req, res, next) => {
    let error = { ...err };
    // Copy message manually as it's not enumerable
    error.message = err.message;

    // Log for debugging
    console.error(err);

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0];
        // Capitalize field name
        const fieldName = field ? field.charAt(0).toUpperCase() + field.slice(1) : 'Field';
        const message = `${fieldName} already exists. Please use a different one.`;
        error = new Error(message);
        error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new Error(message);
        error.statusCode = 400;
    }

    // Cast Error (Bad ID)
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new Error(message);
        error.statusCode = 404;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
