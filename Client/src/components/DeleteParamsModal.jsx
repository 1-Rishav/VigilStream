import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

const DeleteParamsModal = ({ isOpen, onClose, onConfirm, title }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-sm p-6 relative shadow-2xl"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                            <Trash2 className="w-6 h-6 text-red-500" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">Delete Video?</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Are you sure you want to delete <span className="text-white font-medium">"{title}"</span>?
                            This action cannot be undone.
                        </p>

                        <div className="flex gap-3 w-full">
                            <Button
                                onClick={onClose}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onConfirm}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DeleteParamsModal;
