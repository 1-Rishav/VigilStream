import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/authSlice';
import { Button } from './ui/button';
import { Video as VideoIcon, User, LogOut, Menu, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    if (!user) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 h-16">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo */}
                <Link to="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">V</div>
                    <span className="text-xl font-bold text-white hidden sm:block">VigilStream</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    {user.role === 'admin' && (
                        <Link to="/admin" className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3" /> Admin Area
                        </Link>
                    )}

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-1 pr-3 py-1 transition-colors"
                        >
                            <div className="w-7 h-7 bg-zinc-700 rounded-full flex items-center justify-center text-xs text-white">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm text-gray-200">{user.username}</span>
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsProfileOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-white/5">
                                            <p className="text-sm text-white font-medium">{user.username}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" /> My Profile
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-950/20 hover:text-red-300"
                                        >
                                            <div className="flex items-center gap-2">
                                                <LogOut className="w-4 h-4" /> Logout
                                            </div>
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-300 hover:text-white"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-[#111] border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-white font-bold">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{user.username}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            <Link
                                to="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-gray-300 hover:text-white py-2"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-gray-300 hover:text-white py-2"
                            >
                                My Profile
                            </Link>
                            {user.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-gray-300 hover:text-white py-2"
                                >
                                    Admin Area
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="w-full text-left text-red-500 hover:text-red-400 py-2"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
