import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // If implementing a loading state in AuthContext (recommended), handle it here
    if (loading) return <div className="flex justify-center items-center h-screen text-[var(--color-primary)]">Loading...</div>;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role or home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
