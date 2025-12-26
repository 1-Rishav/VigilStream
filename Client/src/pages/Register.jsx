import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../redux/authSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'viewer' });
    const { username, email, password, role } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message, { theme: "dark" });
        }

        if (isSuccess || user) {
            toast.success("Registration successful! Welcome to VigilStream.", {
                theme: "dark",
                progressClassName: "bg-primary"
            });
            navigate('/dashboard');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ username, email, password, role }));
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl"
                >
                    <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
                    <p className="text-gray-400 text-center mb-8">Join VigilStream to upload securely.</p>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                name="username"
                                value={username}
                                onChange={onChange}
                                placeholder="Username"
                                className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="name@example.com"
                                className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                                className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline">
                            Log in
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
