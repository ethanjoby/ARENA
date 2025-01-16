import React, { useState } from "react";

function ArenaSignUpForm() {
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleProgramAdd = () => {
    const newProgram = `Program ${programs.length + 1}`;
    setPrograms((prev) => [...prev, newProgram]);
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
    alert("Form data saved to localStorage!");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl px-8">
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
                style={{
                  WebkitTextFillColor: "inherit",
                  WebkitBoxShadow: "0 0 0px 1000px #3b3b3b inset",
                }}
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
                style={{
                  WebkitTextFillColor: "inherit",
                  WebkitBoxShadow: "0 0 0px 1000px #3b3b3b inset",
                }}
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
            {programs.map((program, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-700 p-3 my-2 rounded-lg shadow-lg hover:shadow-purple-500 transition-all"
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
                      className="flex-1 px-2 py-1 text-gray-300 bg-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleEditSubmit(index)}
                      className="ml-2 px-2 py-1 bg-green-500 rounded-lg text-white hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-between w-full"
                    onClick={() => handleEditProgram(index)}
                  >
                    <label htmlFor={program} className="text-gray-300 cursor-pointer">
                      {program}
                    </label>
                    <span className="text-gray-400 cursor-pointer ml-4">
                      ✏️
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Total Price Display */}
          <div className="mt-6 text-gray-300 text-lg font-bold bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-purple-500 transition-all">
            Total Price: ${calculateTotalPrice()}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 px-6 text-lg font-bold text-white bg-gradient-to-r 
              from-blue-500 to-pink-500 rounded-lg hover:scale-105 transform transition-all"
            >
              Continue To Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArenaSignUpForm;
