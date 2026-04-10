import { Navigate, Route, Routes } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import VotingDashboard from "../pages/user/VotingDashboard";
import MyVotes from "../pages/user/MyVotes";
import EventsList from "../pages/admin/EventsList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User routes */}
      <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}>
        <Route path="/" element={<VotingDashboard />} />
        <Route path="/my-votes" element={<MyVotes />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<EventsList />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
