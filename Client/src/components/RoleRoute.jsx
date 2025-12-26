import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleRoute = ({ allowedRoles }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirect to dashboard or unauthorized page
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default RoleRoute;
