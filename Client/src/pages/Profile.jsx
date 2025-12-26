import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Shield, Calendar, Film } from 'lucide-react';
import axios from '../utils/axios';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [videoCount, setVideoCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Determine usage based on fetched videos for now, or add a stats endpoint later.
                // We'll just hit the videos endpoint which filters by owner for non-admins.
                // For admins it shows all, so stats might be skewed if we rely on that endpoint blindly.
                // But for now it's a good approximation for regular users.
                const res = await axios.get('/videos');
                // If admin, we might want to filter by owner ID to see *their* videos, 
                // but the current endpoint for admins returns ALL videos.
                // Let's manually filter client side if admin, just to show "My Videos" count.
                let myVideos = res.data.data;
                if (user.role === 'admin') {
                    myVideos = myVideos.filter(v => v.owner._id === user._id);
                }
                setVideoCount(myVideos.length);
            } catch (err) {
                console.error(err);
            }
        };

        if (user) fetchStats();
    }, [user]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                    <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 h-32 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-3xl font-bold border-4 border-[#111] text-white">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                                <p className="text-gray-400"> Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-primary uppercase">
                                {user.role}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-200 border-b border-white/10 pb-2">Information</h3>

                                <div className="flex items-center gap-3 text-gray-400">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Shield className="w-5 h-5 text-gray-500" />
                                    <span className="capitalize">{user.role} Account</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span>Joined {new Date(user.createdAt || Date.now()).toDateString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-200 border-b border-white/10 pb-2">Statistics</h3>

                                <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                        <Film className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-white">{videoCount}</p>
                                        <p className="text-xs text-gray-400">Videos Uploaded</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
