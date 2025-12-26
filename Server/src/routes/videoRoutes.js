const express = require('express');
const { uploadVideo, getVideos, getVideo, deleteVideo, streamVideo } = require('../controllers/videoController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.use(protect); // All video routes are protected

router.route('/')
    .get(getVideos)
    .post(authorize('editor', 'admin'), upload.single('video'), uploadVideo);

router.route('/:id')
    .get(getVideo)
    .delete(authorize('editor', 'admin'), deleteVideo);

router.route('/:id/stream')
    .get(streamVideo);

module.exports = router;
