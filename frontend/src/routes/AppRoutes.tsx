import { Navigate, Route, Routes } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import VotingDashboard from "../pages/user/VotingDashboard";
import MyVotes from "../pages/user/MyVotes";
import EventsList from "../pages/admin/EventsList";
import CreateEvent from "../pages/admin/CreateEvent";
import EventTrend from "../pages/admin/EventTrend";

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
        <Route path="/admin/events" element={<EventsList />} />
        <Route path="/admin/events/new" element={<CreateEvent />} />
        <Route path="/admin/events/:eventId" element={<EventTrend />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
