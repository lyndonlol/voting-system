import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({
  allowedRoles,
}: {
  allowedRoles: ("USER" | "ADMIN")[];
}) => {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
