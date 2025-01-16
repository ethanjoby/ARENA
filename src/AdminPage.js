import React, { useState } from "react";

const AdminPage = () => {
  // Preset login credentials
  const presetUsername = "admin";
  const presetPassword = "password123";

  // State for login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === presetUsername && password === presetPassword) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password!");
    }
  };

  // Admin dashboard
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <p className="text-lg">You are successfully logged in.</p>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  // Login form
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded hover:from-purple-500 hover:to-blue-500 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
