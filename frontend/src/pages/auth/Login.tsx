import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import type { AxiosError, AxiosResponse } from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    { username: string; password: string }
  >({
    mutationFn: (credentials) => api.post("/auth/login", credentials),
    onSuccess: (res) => {
      login(res.data.user, res.data.token);
      navigate(res.data.user.role === "ADMIN" ? "/admin" : "/");
    },
    onError: (err) => {
      setError(err.response?.data.message || "Invalid username or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    mutate({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="card max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Voting System</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center">
              {error || "Invalid username or password"}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-3xl transition text-lg"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500">
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>

        <div className="mt-8 text-xs text-center text-gray-400">
          Demo Admin: <span className="font-mono">admin / admin123</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
