import React, { useState } from "react";
import essaysData from "./assets/essays.json"; 

const Essays = () => {
  const presetPassword = "shitter123";

  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [visibleCount, setVisibleCount] = useState(21); // idk
  const [selectedSchool, setSelectedSchool] = useState(""); 

  const filteredEssays = selectedSchool
    ? essaysData.filter((essay) => essay.school === selectedSchool)
    : essaysData;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === presetPassword) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password!");
    }
  };

  // Essays dashboard
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-4">Previous Essays</h1>
        <select
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Schools</option>
          {Array.from(new Set(essaysData.map((essay) => essay.school))).map(
            (school) => (
              <option key={school} value={school}>
                {school}
              </option>
            )
          )}
        </select>
        <div className="w-full max-w-4xl">
          {filteredEssays.slice(0, visibleCount).map((essay, index) => (
            <div
              key={index}
              className="mb-6 p-4 bg-white shadow rounded-lg border"
            >
              <h2 className="text-xl font-semibold mb-2">
                {essay.school} - {essay.prompt}
              </h2>
              <p className="text-gray-700">{essay.essay}</p>
            </div>
          ))}
        </div>

        {visibleCount < filteredEssays.length && (
          <button
            onClick={() => setVisibleCount(visibleCount + 20)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
        <button
          onClick={() => setIsLoggedIn(false)}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return ( // login
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Essays Login</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
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
          className="w-full py-2 bg-black text-white font-bold rounded transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Essays;
