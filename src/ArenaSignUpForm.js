import React, { useState } from "react";
import emailjs from "emailjs-com";
function ArenaSignUpForm() {
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showHelperMessage, setShowHelperMessage] = useState(false);

  const handleProgramAdd = () => {
    const newProgram = `Program ${programs.length + 1}`;
    setPrograms((prev) => [...prev, newProgram]);
    setShowHelperMessage(true); // Show the helper message when a program is added
  };
  
  const handleProgramSelect = (program) => {
    setSelectedPrograms((prev) =>
      prev.includes(program)
        ? prev.filter((item) => item !== program)
        : [...prev, program]
    );
  };

  const handleEditProgram = (index) => {
    setEditingIndex(index);
    setEditingValue(programs[index]);
  };

  const handleEditSubmit = (index) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index] = editingValue;
    setPrograms(updatedPrograms);
    setEditingIndex(null);
  };

  const handleDeleteProgram = (index) => {
    const programToDelete = programs[index];
    setPrograms((prev) => prev.filter((_, i) => i !== index));
    setSelectedPrograms((prev) => prev.filter((item) => item !== programToDelete));
  };

  const calculateTotalPrice = () => {
    if (selectedPrograms.length === 0) return 0;
    return 10 + (selectedPrograms.length - 1) * 5;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      selectedPrograms,
      totalPrice: calculateTotalPrice(),
    };

    // Save to localStorage
    localStorage.setItem("arenaSignUpData", JSON.stringify(formData));
    const totalPrice = calculateTotalPrice();

    // Create email template data
    const templateParams = {
      name,
      email,
      selectedPrograms: selectedPrograms.join(", "),
      totalPrice,
    };

    // Send email using EmailJS
    emailjs
      .send(
        "service_2wckxjr", // Replace with your EmailJS service ID
        "template_xugiogj", // Replace with your EmailJS template ID
        templateParams,
        "Q1b_pv0uG9JEXJhAl" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
          alert("Thank you for signing up! A confirmation email has been sent.");
        },
        (error) => {
          console.error("Failed to send email.", error);
          alert("Oops! Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-9xl px-8">
        <h1
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
          from-blue-500 via-purple-500 to-pink-500 text-center mb-4"
        >
          ARENA - Sign Up
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Join the ARENA and become part of something extraordinary.
        </p>

        <form
          className="bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-3xl shadow-xl border border-gray-700"
          onSubmit={handleFormSubmit}
        >
          {/* Name and Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="group">
              <label className="block text-gray-300 text-sm font-bold mb-2 text-left">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg focus:ring-4 focus:ring-indigo-500 autofill:bg-gray-700"
              />
            </div>
            <div className="group">
              <label className="block text-gray-300 text-sm font-bold mb-2 text-left">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg focus:ring-4 focus:ring-indigo-500 autofill:bg-gray-700"
              />
            </div>
          </div>

          {/* Pricing Description */}
          <div className="mt-8 bg-gray-800 p-4 rounded-lg border border-gray-700 text-gray-300">
            <p className="text-lg font-bold">Pricing:</p>
            <p>
              The first summer program costs <span className="font-bold">$10</span>.
              Each additional program costs <span className="font-bold">$5</span>.
            </p>
          </div>

          {/* Summer Programs Selection */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label className="block text-gray-300 text-sm font-bold">
                Selected Summer Programs
              </label>
              <button
                type="button"
                onClick={handleProgramAdd}
                className="py-2 px-4 text-sm font-bold text-gray-300 bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105 transform transition-all"
              >
                + Add Program
              </button>
            </div>
            {showHelperMessage && (
              <p className="text-gray-500 text-sm mt-2 italic">
                Double-click a program or click the pencil icon to edit its name.
              </p>
            )}
            {programs.map((program, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-700 p-3 my-2 rounded-lg shadow-lg"
              >
                <input
                  type="checkbox"
                  id={program}
                  checked={selectedPrograms.includes(program)}
                  onChange={() => handleProgramSelect(program)}
                  className="mr-2"
                />
                {editingIndex === index ? (
                  <div className="flex items-center w-full">
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="flex-1 px-4 py-2 text-gray-300 bg-gray-600 rounded-lg focus:ring focus:ring-indigo-500"
                      placeholder="Edit program name"
                    />
                    <button
                      type="button"
                      onClick={() => handleEditSubmit(index)}
                      className="hidden lg:flex ml-3 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg hover:from-teal-500 hover:to-green-500 transition-all shadow-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <label htmlFor={program} className="text-gray-300 cursor-pointer">
                      {program}
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleEditProgram(index)}
                        className="text-gray-400 hover:text-blue-400 transition-all"
                        aria-label="Edit Program Name"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProgram(index)}
                        className="text-red-500 hover:text-red-700 transition-all"
                        aria-label="Delete Program"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Total Price Display */}
          <div className="mt-6 text-gray-300 text-lg font-bold bg-gray-800 p-4 rounded-lg shadow-lg">
            Total Price: ${calculateTotalPrice()}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 px-6 text-lg font-bold text-white bg-gradient-to-r 
              from-blue-500 to-pink-500 rounded-lg hover:scale-105 transform transition-all"
            >
              Join the ARENA!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArenaSignUpForm;
