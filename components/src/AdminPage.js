import React, { useState, useEffect } from "react";

const AdminPage = () => {
  // Preset login credentials
  const presetUsername = "admin";
  const presetPassword = "password123";

  // State for login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // State for form responses
  const [responses, setResponses] = useState([]);

  // Fetch responses from localStorage on login
  useEffect(() => {
    if (isLoggedIn) {
      const storedResponse = JSON.parse(localStorage.getItem("arenaSignUpData"));
      if (storedResponse) {
        setResponses([storedResponse]); // Wrap in an array for table mapping
      }
    }
  }, [isLoggedIn]);

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
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>

        {responses.length > 0 ? (
          <table className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Selected Programs</th>
                <th className="py-3 px-4">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } text-gray-700`}
                >
                  <td className="py-3 px-4">{response.name}</td>
                  <td className="py-3 px-4">{response.email}</td>
                  <td className="py-3 px-4">
                    {response.selectedPrograms.join(", ")}
                  </td>
                  <td className="py-3 px-4">${response.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">No responses available.</p>
        )}
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
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
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
          className="w-full py-2 bg-black text-white font-bold rounded  transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
