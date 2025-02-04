import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase";

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [activeView, setActiveView] = useState('contact'); 
  const presetUsername = "admin";
  const presetPassword = "password123";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const db = getFirestore(app);
          const questionCollection = collection(db, "contactus");
          const responsesCollection = collection(db, "arenaSignUps");
          
          const contactQuestions = await getDocs(questionCollection);
          const signupResponses = await getDocs(responsesCollection);
          
          const questionList = contactQuestions.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          const responsesList = signupResponses.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          
          setQuestions(questionList);
          setResponses(responsesList);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === presetUsername && password === presetPassword) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password!");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => setActiveView('contact')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeView === 'contact'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Contact Messages
            </button>
            <button
              onClick={() => setActiveView('signup')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeView === 'signup'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Program Sign-ups
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            {activeView === 'contact' ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Contact Form Messages</h2>
                {questions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions.map((question, index) => (
                          <tr key={question.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="py-3 px-4">{question.name}</td>
                            <td className="py-3 px-4">{question.email}</td>
                            <td className="py-3 px-4">{question.info}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No contact form messages available.</p>
                )}
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Program Sign-ups</h2>
                {responses.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Programs</th>
                          <th className="py-3 px-4">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {responses.map((response, index) => (
                          <tr key={response.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="py-3 px-4">{response.name}</td>
                            <td className="py-3 px-4">{response.email}</td>
                            <td className="py-3 px-4">
                              {Array.isArray(response.selectedPrograms) 
                                ? response.selectedPrograms.join(", ") 
                                : response.selectedPrograms || "N/A"}
                            </td>
                            <td className="py-3 px-4">
                              <details className="cursor-pointer">
                                <summary className="text-blue-600 hover:text-blue-800">View Details</summary>
                                <div className="mt-2 text-sm">
                                  <p><strong>Internship:</strong> {Array.isArray(response.selectedInternshipOptions) 
                                    ? response.selectedInternshipOptions.join(", ") 
                                    : response.selectedInternshipOptions || "N/A"}</p>
                                    <p><strong>Olympiads:</strong> {Array.isArray(response.selectedOlympiadOptions) 
                                    ? response.selectedOlympiadOptions.join(", ") 
                                    : response.selectedOlympiadOptions || "N/A"}</p>
                                  <p><strong>Resume:</strong> {Array.isArray(response.selectedResumeOptions) 
                                    ? response.selectedResumeOptions.join(", ") 
                                    : response.selectedResumeOptions || "N/A"}</p>
                                  <p><strong>SAT Prep:</strong> {Array.isArray(response.selectedSATPrep) 
                                    ? response.selectedSATPrep.join(", ") 
                                    : response.selectedSATPrep || "N/A"}</p>
                                  <p><strong>SAT Hours:</strong> {response.satOneHourCount || "N/A"}</p>
                                  {response.additionalInfo && (
                                    <p><strong>Additional Info:</strong> {response.additionalInfo}</p>
                                  )}
                                </div>
                              </details>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No sign-up responses available.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

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
          className="w-full py-2 bg-black text-white font-bold rounded transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminPage;