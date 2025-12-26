const Video = require('../models/Video');
const { processVideo } = require('../services/processingService');
const { protect, authorize } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;

// @desc    Upload a new video
// @route   POST /api/videos
// @access  Private (Editor/Admin)
exports.uploadVideo = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error('Please upload a file');
            error.statusCode = 400;
            throw error;
        }

        // Create initial video record
        const video = await Video.create({
            title: req.body.title || req.file.originalname,
            description: req.body.description,
            category: req.body.category,
            filename: req.file.originalname,
            cloudinaryId: req.file.filename,
            url: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
            owner: req.user.id,
            status: 'processing',
        });

        // Trigger background processing
        const io = req.app.get('socketio');
        // Double check io exists before passing
        if (io) {
            processVideo(video._id, io);
        } else {
            console.error("Socket.io instance not found in app");
        }

        res.status(201).json({
            success: true,
            data: video,
            message: "Video uploaded successfully. Processing started."
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all videos (with filtering)
// @route   GET /api/videos
// @access  Private
exports.getVideos = async (req, res, next) => {
    try {
        let query;

        // Start with base query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Specific handling for 'safe' filter
        if (reqQuery.safeOnly === 'true') {
            delete reqQuery.safeOnly;
            reqQuery['sensitivity.status'] = 'safe';
        }

        // Multi-tenancy / RBAC Requirement Update:
        // Viewer: DOES see videos uploaded by Editors/Admins
        // Editor: View all organization videos
        // Admin: View all videos

        // Therefore, we removed the restriction that filtered by owner.
        // Everyone with access (protect middleware) can view the list of videos.

        // If specific user isolation (My Videos only) was needed for a role, we would add:
        // if (req.user.role === 'some_private_role') {
        //     reqQuery.owner = req.user.id;
        // }

        // Create query string
        let queryStr = JSON.stringify(reqQuery);
        query = Video.find(JSON.parse(queryStr)).populate('owner', 'username email');

        // Execute query
        const videos = await query;

        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Private
exports.getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            const error = new Error(`Video not found with id of ${req.params.id}`);
            error.statusCode = 404;
            throw error;
        }

        // RBAC: All authenticated users can view details (Viewer, Editor, Admin)
        // We do typically check if visibility is public/private here, but assuming org-wide access:
        // No restriction needed beyond 'protect' middleware.

        res.status(200).json({
            success: true,
            data: video
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Stream video
// @route   GET /api/videos/:id/stream
// @access  Private
exports.streamVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            const error = new Error(`Video not found with id of ${req.params.id}`);
            error.statusCode = 404;
            throw error;
        }

        // RBAC: All authenticated users can stream (Viewer, Editor, Admin)
        // No restriction needed beyond 'protect' middleware.

        // For Cloudinary, the most efficient way to stream is to redirect to the signed URL.
        // Cloudinary handles Range requests automatically.
        // This satisfies "Video playback from server" (server controls access) 
        // and "Efficient streaming" (CDN handles the heavy lifting).
        res.redirect(video.url);

        /* 
           NOTE: If valid local file streaming was required (e.g. fs.createReadStream),
           we would implement manual Range header parsing here:
           
           const path = video.localPath;
           const stat = fs.statSync(path);
           const fileSize = stat.size;
           const range = req.headers.range;
           if (range) {
               const parts = range.replace(/bytes=/, "").split("-");
               const start = parseInt(parts[0], 10);
               const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
               const chunksize = (end-start)+1;
               const file = fs.createReadStream(path, {start, end});
               const head = {
                   'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                   'Accept-Ranges': 'bytes',
                   'Content-Length': chunksize,
                   'Content-Type': 'video/mp4',
               }
               res.writeHead(206, head);
               file.pipe(res);
           }
        */

    } catch (err) {
        next(err);
    }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private (Owner/Admin)
exports.deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            const error = new Error(`Video not found with id of ${req.params.id}`);
            error.statusCode = 404;
            throw error;
        }

        // Make sure user owns video or is admin
        if (video.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            const error = new Error(`Not authorized to delete this video`);
            error.statusCode = 401;
            throw error;
        }

        // Ideally we should also remove from Cloudinary here
        if (video.cloudinaryId) {
            await cloudinary.uploader.destroy(video.cloudinaryId, { resource_type: 'video' });
        }

        await video.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};
