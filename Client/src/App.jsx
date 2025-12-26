import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
import RoleRoute from './components/RoleRoute';
import Navbar from './components/Navbar';

const ProtectedRoute = () => {
    const { user } = useSelector((state) => state.auth);
    if (!user) return <Navigate to="/login" replace />;

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background text-foreground antialiased font-sans">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />

                        {/* RBAC Protected Route: Only Admins can enter */}
                        <Route element={<RoleRoute allowedRoles={['admin']} />}>
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
