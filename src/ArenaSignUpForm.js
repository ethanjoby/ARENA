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
  const [satOneHourCount, setSatOneHourCount] = useState(0);

  const handleProgramAdd = () => {
    const newProgram = `Program ${programs.length + 1}`;
    setPrograms((prev) => [...prev, newProgram]);
    setShowHelperMessage(true);
  };

  const additionalOptions = [
    { name: "General Internship Help", price: 40 },
    { name: "Guaranteed Internship Placement", price: 150 },
    { name: "General Professor Internship Help", price: 60 },
    { name: "Hourly SAT/ACT Prep (10 hours)", price: 149 },
    { name: "Hourly SAT/ACT Prep (25 hours)", price: 359 },
    { name: "Hourly SAT/ACT Prep (50 hours)", price: 699 },
    { name: "Interview Prep", price: 30 },
    { name: "Resume & Cover Letter Review", price: 25 },
  ];

  const handleProgramSelect = (program) => {
    setSelectedPrograms((prev) =>
      prev.includes(program)
        ? prev.filter((item) => item !== program)
        : [...prev, program]
    );
  };

  const handleSatOneHourChange = (operation) => {
    if (operation === "increment") {
      setSatOneHourCount(satOneHourCount + 1);
    } else if (operation === "decrement" && satOneHourCount > 0) {
      setSatOneHourCount(satOneHourCount - 1);
    }
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
    let total = 0;

    // Base cost for summer programs
    const summerPrograms = programs.filter((program) =>
      selectedPrograms.includes(program)
    );

    if (summerPrograms.length > 0) {
      total += 10; // $10 for the first summer program
      total += (summerPrograms.length - 1) * 5; // $5 for each additional summer program
    }

    // Additional options cost
    const selectedOptions = additionalOptions.filter((option) =>
      selectedPrograms.includes(option.name)
    );

    selectedOptions.forEach((option) => {
      total += option.price;
    });

    // Add SAT 1-hour prep count to total
    total += satOneHourCount * 22;

    return total;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      selectedPrograms,
      totalPrice: calculateTotalPrice(),
    };

    localStorage.setItem("arenaSignUpData", JSON.stringify(formData));

    const templateParams = {
      name,
      email,
      selectedPrograms: selectedPrograms.join(", "),
      totalPrice: calculateTotalPrice(),
    };

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
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center mb-4">
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
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg focus:ring-4 focus:ring-indigo-500"
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
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg focus:ring-4 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Summer Programs */}
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
              <div key={index} className="flex items-center bg-gray-700 p-3 my-2 rounded-lg shadow-lg">
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
                      className="flex-1 px-4 py-2 text-gray-300 bg-gray-600 rounded-lg"
                      placeholder="Edit program name"
                    />
                    <button
                      type="button"
                      onClick={() => handleEditSubmit(index)}
                      className="ml-3 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg"
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
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProgram(index)}
                        className="text-red-500 hover:text-red-700 transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Options - Displaying in rows */}
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-bold">Internship & Professor Help</label>
                {additionalOptions.slice(0, 3).map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => handleProgramSelect(option.name)}
                    className={`block w-full py-3 px-4 mt-3 rounded-lg text-white ${selectedPrograms.includes(option.name)
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-blue-500"
                      }`}
                  >
                    {option.name} - ${option.price}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-bold">SAT Prep</label>
                {additionalOptions.slice(3, 6).map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => handleProgramSelect(option.name)}
                    className={`block w-full py-3 px-4 mt-3 rounded-lg text-white ${selectedPrograms.includes(option.name)
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-blue-500"
                      }`}
                  >
                    {option.name} - ${option.price}
                  </button>
                ))}
              </div>

              
            </div>
            <div className = "mt-10">
                <label className="block text-gray-300 text-sm font-bold">Resume & Interview Prep</label>
                {additionalOptions.slice(6).map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => handleProgramSelect(option.name)}
                    className={`block w-full py-3 px-4 mt-3 rounded-lg text-white ${selectedPrograms.includes(option.name)
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-blue-500"
                      }`}
                  >
                    {option.name} - ${option.price}
                  </button>
                ))}
              </div>

            {/* For the SAT 1-hour count */}
            <div className="flex justify-between items-center mt-8 text-lg text-gray-300">
              <p>SAT/ACT Prep (1 hour)</p>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleSatOneHourChange("decrement")}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  -
                </button>
                <p className="mx-4 text-white">{satOneHourCount}</p>
                <button
                  type="button"
                  onClick={() => handleSatOneHourChange("increment")}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total Price */}
          <div className="mt-8">
            <div className="flex justify-between items-center text-lg text-gray-300">
              <p>Total Price</p>
              <p className="font-semibold">${calculateTotalPrice()}</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full py-3 text-white bg-gradient-to-r from-blue-500 to-teal-500 font-bold rounded-lg hover:bg-gradient-to-l transition-all"
          >
            Sign Up Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default ArenaSignUpForm;
