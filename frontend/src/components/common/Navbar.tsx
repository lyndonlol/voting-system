import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Voting System
        </Link>
        <div className="flex items-center gap-6">
          {user && (
            <>
              {user.role === "ADMIN" && (
                <Link to="/admin" className="hover:text-blue-400">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/my-votes" className="hover:text-blue-400">
                My Votes
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
