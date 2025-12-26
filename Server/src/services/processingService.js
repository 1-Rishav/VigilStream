const Video = require('../models/Video');
const { cloudinary } = require('../config/cloudinary');

/**
 * Simulates video processing with real-time progress updates via Socket.io
 * @param {string} videoId - The MongoDB ID of the video to process
 * @param {object} io - The Socket.io instance
 */
const processVideo = async (videoId, io) => {
    try {
        console.log(`Starting processing for video ${videoId}`);

        let video = await Video.findById(videoId);
        if (!video) return;

        // Simulate processing steps (0% to 100%)
        let progress = 0;
        const interval = setInterval(async () => {
            progress += 5;
            let statusMessage = "Processing...";

            if (progress === 20) {
                statusMessage = "Extracting Metadata...";
                console.log(`Video ${videoId}: Extracting Metadata...`);
            } else if (progress === 30) {
                statusMessage = "Metadata Extracted";

                // Fetch real metadata from Cloudinary
                try {
                    // Check if cloudinaryId exists
                    if (video.cloudinaryId) {
                        const resource = await cloudinary.api.resource(video.cloudinaryId, {
                            resource_type: 'video',
                            image_metadata: true
                        });

                        if (resource && resource.duration) {
                            video.duration = resource.duration;
                            console.log(`Video ${videoId}: Real duration fetched: ${resource.duration}s`);
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch Cloudinary metadata:", err.message);
                    // Fallback: don't overwrite if failed, or keep 0
                }

                await video.save();
            } else if (progress === 60) {
                statusMessage = "Running Sensitivity Analysis...";
                console.log(`Video ${videoId}: Running Sensitivity Analysis...`);
            } else if (progress === 90) {
                statusMessage = "Finalizing...";
            }

            if (progress > 100) {
                clearInterval(interval);

                // Finalize processing
                // Rule-based sensitivity check for demo purposes
                // If title or description contains specific keywords, flag it.
                const lowerTitle = video.title.toLowerCase();
                const lowerDesc = (video.description || '').toLowerCase();
                const triggerWords = ['adult', 'violence', 'explicit', 'nsfw', 'sensitive'];

                const isFlagged = triggerWords.some(word => lowerTitle.includes(word) || lowerDesc.includes(word));
                const isSafe = !isFlagged;

                video.status = 'ready';
                video.processingProgress = 100;
                video.sensitivity = {
                    status: isSafe ? 'safe' : 'flagged',
                    reason: isSafe ? 'Content appears clean.' : 'Potential sensitive content detected based on metadata keywords.',
                    score: isSafe ? 0.95 : 0.1,
                };

                await video.save();

                // Emit final completion event
                io.emit(`video:progress:${videoId}`, {
                    videoId,
                    progress: 100,
                    status: 'ready',
                    sensitivity: video.sensitivity,
                    message: "Processing Complete"
                });
                io.emit('video:updated', video);

                console.log(`Processing complete for video ${videoId}`);

            } else {
                // Update progress in DB at key checkpoints
                if (progress % 50 === 0) {
                    video.processingProgress = progress;
                    await video.save();
                }

                // Emit progress
                io.emit(`video:progress:${videoId}`, {
                    videoId,
                    progress,
                    status: 'processing',
                    message: statusMessage
                });
            }
        }, 500); // 0.5 second per 5% step = 10 seconds total processing (err, 5% of 100 is 20 steps. 20 * 0.5 = 10s)

    } catch (error) {
        console.error(`Processing error for video ${videoId}:`, error);
        await Video.findByIdAndUpdate(videoId, { status: 'failed' });
    }
};

module.exports = { processVideo };
