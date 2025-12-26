import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { X, UploadCloud, Loader2, Video as VideoIcon } from 'lucide-react';
import { Button } from './ui/button';
import axios from '../utils/axios';

const UploadModal = ({ onClose, onSuccess }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Uncategorized');

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);
            setTitle(droppedFile.name.split('.').slice(0, -1).join('.'));
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setTitle(selectedFile.name.split('.').slice(0, -1).join('.'));
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title || file.name);
        formData.append('description', description);
        formData.append('category', category);

        try {
            const res = await axios.post('/videos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });
            onSuccess(res.data.data);
            toast.success("Video uploaded successfully!", {
                theme: "dark",
                progressClassName: "bg-primary"
            });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Upload failed. Please try again.", {
                theme: "dark"
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-6">Upload Video</h2>

                {!file ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center transition-colors cursor-pointer
                    ${isDragging ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}
                `}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            accept="video/*"
                            className="hidden"
                            onChange={handleFileSelect}
                        />
                        <div className="bg-zinc-900 p-4 rounded-full mb-4">
                            <UploadCloud className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">MP4, MOV, MKV up to 100MB</p>
                    </div>
                ) : (
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                                    <VideoIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button onClick={() => setFile(null)} className="text-gray-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3 mb-4">
                            <input
                                type="text"
                                placeholder="Video Title"
                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Description (Optional)"
                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none resize-none h-20"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <select
                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Uncategorized">Select Category</option>
                                <option value="Education">Education</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="News">News</option>
                                <option value="Sports">Sports</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {uploading && (
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-150 ease-out"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={handleUpload}
                            className="w-full bg-primary hover:bg-primary/90 text-white"
                            disabled={uploading}
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                                </>
                            ) : (
                                'Start Upload'
                            )}
                        </Button>
                    </div>
                )}

            </motion.div>
        </div>
    );
};

export default UploadModal;
