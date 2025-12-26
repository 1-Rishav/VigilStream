import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Play, Shield, Upload } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative selection:bg-primary selection:text-white">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen" />

            {/* Navbar */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-purple-500 rounded-lg flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">VigilStream</span>
                </div>
                <div className="flex gap-4">
                    <Link to="/login">
                        <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button className="bg-white text-black hover:bg-white/90">Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Secure Media Delivery
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500"
                >
                    Upload. Process. <br />
                    Stream Securely.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
                >
                    An enterprise-grade platform for sensitive content analysis and secure video streaming.
                    Powered by real-time processing and extensive sensitivity classification.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link to="/register">
                        <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity border-0">
                            Start Uploading
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 bg-transparent text-white hover:bg-white/10">
                        View Demo
                    </Button>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full">
                    {[
                        { icon: Upload, title: "Smart Upload", desc: "Drag & drop interface with real-time progress tracking via Socket.io." },
                        { icon: Shield, title: "Sensitivity Analysis", desc: "Automated flagging system for sensitive content detection." },
                        { icon: Play, title: "Adaptive Streaming", desc: "Seamless playback with optimized range requests and buffering." }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 + (idx * 0.1) }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-left"
                        >
                            <feature.icon className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Landing;
