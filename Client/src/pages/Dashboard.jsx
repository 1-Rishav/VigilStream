import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/authSlice';
import { Button } from '../components/ui/button';
import { Upload, LogOut, Video as VideoIcon, Loader2, Play, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify'; // Import toast for delete feedback
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayerModal from '../components/VideoPlayerModal';
import UploadModal from '../components/UploadModal';
import DeleteParamsModal from '../components/DeleteParamsModal';
import axios from '../utils/axios';
import io from 'socket.io-client';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [videos, setVideos] = useState([]);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchVideos();
            // Setup Socket
            const newSocket = io(/* 'http://localhost:5000' */ 'https://vigilstream.onrender.com', {
                transports: ['websocket', 'polling'],
                withCredentials: true
            });
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Socket connected successfully:', newSocket.id);
            });

            newSocket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });

            // Listen for global video updates (simplified for demo)
            // Ideally we listen for `video:progress:${videoId}` but for the list view
            // we might want a general update event or just poll/refetch on specific triggers
            newSocket.on('video:updated', (updatedVideo) => {
                setVideos((prev) =>
                    prev.map(v => v._id === updatedVideo._id ? updatedVideo : v)
                );
                // If it's a new video being processed that we don't have? 
                // Usually we add it locally on upload success, so map update is fine.
            });

            return () => newSocket.close();
        }
    }, [user, navigate]);

    const fetchVideos = async () => {
        try {
            const res = await axios.get('/videos');
            setVideos(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    const [videoToDelete, setVideoToDelete] = useState(null);

    const onUploadSuccess = (newVideo) => {
        setVideos([newVideo, ...videos]);
        setIsUploadOpen(false);
    };

    const confirmDelete = (video) => {
        setVideoToDelete(video);
    };

    const handleDeleteVideo = async () => {
        if (!videoToDelete) return;

        try {
            await axios.delete(`/videos/${videoToDelete._id}`);
            setVideos(videos.filter(v => v._id !== videoToDelete._id));
            toast.success("Video deleted successfully", { theme: "dark", progressClassName: "bg-red-500" });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to delete video", { theme: "dark" });
        } finally {
            setVideoToDelete(null);
        }
    };

    const [filter, setFilter] = useState('all');

    const filteredVideos = videos.filter(video => {
        if (filter === 'all') return true;
        if (filter === 'safe') return video.sensitivity?.status === 'safe';
        if (filter === 'flagged') return video.sensitivity?.status === 'flagged';
        return true;
    });

    return (
        <div className="min-h-screen bg-black text-foreground flex">


            {/* Main Content */}
            <main className="flex-1 p-8 pt-20 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <div className="flex gap-4">
                        <select
                            className="bg-[#111] border border-white/10 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-primary"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Videos</option>
                            <option value="safe">Safe Only</option>
                            <option value="flagged">Flagged Only</option>
                        </select>

                        {['editor', 'admin'].includes(user?.role) && (
                            <Button onClick={() => setIsUploadOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
                                <Upload className="mr-2 h-4 w-4" /> Upload Video
                            </Button>
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : videos.length === 0 ? (
                    <div className="text-center py-20 bg-[#111] rounded-2xl border border-white/10 border-dashed">
                        <p className="text-gray-400 mb-4">No videos uploaded yet</p>
                        {['editor', 'admin'].includes(user?.role) && (
                            <Button onClick={() => setIsUploadOpen(true)} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                Upload your first video
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.map((video) => (
                            <VideoCard
                                key={video._id}
                                video={video}
                                socket={socket}
                                onPlay={() => setSelectedVideo(video)}
                                user={user}
                                onDelete={(id) => confirmDelete(video)} // Pass entire video object or trigger modal
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadOpen && (
                    <UploadModal onClose={() => setIsUploadOpen(false)} onSuccess={onUploadSuccess} />
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <DeleteParamsModal
                isOpen={!!videoToDelete}
                onClose={() => setVideoToDelete(null)}
                onConfirm={handleDeleteVideo}
                title={videoToDelete?.title}
            />

            {/* Video Player Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

const VideoCard = ({ video, socket, onPlay, user, onDelete }) => {
    const [progress, setProgress] = useState(video.processingProgress || 0);
    const [status, setStatus] = useState(video.status);
    const [sensitivity, setSensitivity] = useState(video.sensitivity);
    const [statusMessage, setStatusMessage] = useState('Processing Analysis...');

    useEffect(() => {
        if (status === 'processing' && socket) {
            const handleProgress = (data) => {
                if (data.videoId === video._id) {
                    setProgress(data.progress);
                    setStatus(data.status);
                    if (data.sensitivity) setSensitivity(data.sensitivity);
                    if (data.message) setStatusMessage(data.message);
                }
            };

            // Listen to specific video channel
            const eventName = `video:progress:${video._id}`;
            socket.on(eventName, handleProgress);

            return () => {
                socket.off(eventName, handleProgress);
            };
        }
    }, [status, socket, video._id]);

    const isSafe = sensitivity?.status === 'safe';
    const isFlagged = sensitivity?.status === 'flagged';

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors group"
        >
            <div className="aspect-video bg-black relative flex items-center justify-center">
                {status === 'processing' ? (
                    <div className="text-center w-full px-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                        <p className="text-xs text-gray-400 mb-2">{statusMessage} <span className="text-white/60">({progress}%)</span></p>
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-in-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                ) : status === 'ready' ? (
                    // Placeholder for thumbnail (using a gradient or icon for now as we didn't generate one)
                    <div
                        className="w-full h-full bg-gray-900 group-hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer relative"
                        onClick={onPlay}
                    >
                        {isFlagged && (
                            <div className="absolute inset-0 bg-red-900/20 backdrop-blur-[2px] flex items-center justify-center z-10">
                                <div className="bg-destructive text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                    <AlertTriangle className="w-3 h-3 mr-1" /> FLAGGED
                                </div>
                            </div>
                        )}
                        <Play className="w-10 h-10 text-white/50 group-hover:text-white transition-colors z-20" />

                        {isSafe && (
                            <div className="absolute top-2 right-2 bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-medium border border-green-500/20 flex items-center z-20">
                                <CheckCircle className="w-3 h-3 mr-1" /> SAFE
                            </div>
                        )}

                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-medium z-20">
                            {video.duration ? new Date(video.duration * 1000).toISOString().slice(14, 19) : "00:00"}
                        </div>
                    </div>
                ) : (
                    <div className="text-red-500 text-sm">Processing Failed</div>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-medium truncate flex-1" title={video.title}>{video.title}</h3>
                    {video.category && video.category !== 'Uncategorized' && (
                        <span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded ml-2">
                            {video.category}
                        </span>
                    )}
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    <span>{(video.size / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
                {user?.role === 'admin' && video.owner && (
                    <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-gray-400">
                        Owner: <span className="text-gray-300">{video.owner.username || 'Unknown'}</span>
                    </div>
                )}

                {/* Delete Action: Admin OR (Editor AND Owner) */}
                {/* User object from auth has 'id', video.owner (populated) has '_id' */}
                {(user?.role === 'admin' ||
                    (user?.role === 'editor' && video.owner && (user?.id === video.owner?._id || user?.id === video.owner))
                ) && (
                        <div className="mt-3 flex justify-end">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(video._id);
                                }}
                                className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                title="Delete Video"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    )}
            </div>
        </motion.div>
    );
};

export default Dashboard;
