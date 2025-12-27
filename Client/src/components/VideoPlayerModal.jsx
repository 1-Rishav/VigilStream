import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const VideoPlayerModal = ({ video, onClose }) => {
    if (!video) return null;

    // Construct the stream URL. 
    // We point to our backend stream endpoint to enforce RBAC/Auth before redirecting to CDN.
    // Ensure this matches your backend URL structure.
    const streamUrl = `https://vigilstream.onrender.com/api/videos/${video._id}/stream`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
            >
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#111]">
                    <h3 className="text-white font-medium truncate pr-4">{video.title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="aspect-video bg-black relative">
                    <video
                        controls
                        autoPlay
                        className="w-full h-full"
                        poster={video.thumbnailUrl || ""}
                    >
                        <source src={video.url} type={video.mimetype || "video/mp4"} />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="p-6 bg-[#111]">
                    <p className="text-gray-400 text-sm">
                        {video.description || "No description provided."}
                    </p>
                    <div className="mt-4 flex gap-2">
                        <span className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded">
                            {video.category || "Uncategorized"}
                        </span>
                        <span className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded">
                            {(video.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default VideoPlayerModal;
