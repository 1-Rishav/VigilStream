const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        const user = await User.create({
            username,
            email,
            password,
            role, // Ideally should be restricted or default to 'viewer'
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error('Please provide an email and password');
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json({
        success: true,
        data: {},
    });
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
        ),
        httpOnly: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Needed for cross-site cookie
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
};
