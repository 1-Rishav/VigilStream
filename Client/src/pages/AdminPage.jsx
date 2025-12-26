import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Button } from '../components/ui/button';
import { Loader2, User, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/users');
            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`/users/${userId}/role`, { role: newRole });

            // Optimistic update
            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));

            toast.success(`User role updated to ${newRole}`, {
                theme: "dark",
                progressClassName: "bg-green-500"
            });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to update role", { theme: "dark" });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-foreground p-8 pt-20">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Console</h1>
            <p className="text-gray-400 mb-8">Manage users and system settings</p>

            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                        <User className="w-5 h-5 mr-2 text-primary" />
                        User Management
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Joined</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 text-sm font-medium text-gray-300">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-white font-medium">{user.username}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${user.role === 'admin' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                user.role === 'editor' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                    'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="bg-[#111] border border-white/20 text-white text-sm rounded px-3 py-1 outline-none focus:border-primary cursor-pointer hover:bg-white/5"
                                        >
                                            <option value="viewer">Viewer</option>
                                            <option value="editor">Editor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
