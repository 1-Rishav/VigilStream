const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
        default: 'Uncategorized',
    },
    filename: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // In seconds, optional if we can't extract immediately
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['uploading', 'processing', 'ready', 'failed'],
        default: 'processing',
    },
    sensitivity: {
        status: {
            type: String,
            enum: ['pending', 'safe', 'flagged'],
            default: 'pending',
        },
        reason: String,
        score: Number,
    },
    processingProgress: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);
