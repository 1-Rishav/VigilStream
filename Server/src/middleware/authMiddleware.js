const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        // Set token from cookie
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        console.log("Auth Failed: No token found in cookies or headers");
        const error = new Error('Not authorized to access this route');
        error.statusCode = 401;
        return next(error);
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        const error = new Error('Not authorized to access this route');
        error.statusCode = 401;
        return next(error);
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const error = new Error(`User role ${req.user.role} is not authorized to access this route`);
            error.statusCode = 403;
            return next(error);
        }
        next();
    };
};
