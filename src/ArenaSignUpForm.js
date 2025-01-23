import React, { useState } from "react";
import Select from "react-select";
import emailjs from "emailjs-com";

function ArenaSignUpForm() {
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [satOneHourCount, setSatOneHourCount] = useState(0);
  const [selectedInternshipOptions, setSelectedInternshipOptions] = useState([]);
  const [selectedResumeOptions, setSelectedResumeOptions] = useState([]);
  const [selectedSATPrep, setSelectedSATPrep] = useState([]);

  const internshipOptions = [
    { value: "General Internship Help", label: "General Internship Help - $40", price: 40 },
    { value: "Guaranteed Internship Placement", label: "Guaranteed Internship Placement - $150", price: 150 },
    { value: "General Professor Internship Help", label: "General Professor Internship Help - $60", price: 60 },
  ];

  const resumeOptions = [
    { value: "Resume & Cover Letter Review", label: "Resume & Cover Letter Review - $25", price: 25 },
    { value: "Interview Prep", label: "Interview Prep - $30", price: 30 },
  ];

  const satPrepOptions = [
    { value: "Hourly SAT/ACT Prep (10 hours)", label: "10 hours - $149", price: 149 },
    { value: "Hourly SAT/ACT Prep (25 hours)", label: "25 hours - $359", price: 359 },
    { value: "Hourly SAT/ACT Prep (50 hours)", label: "50 hours - $699", price: 699 },
  ];

  const handleProgramAdd = () => {
    const newProgram = "Edit Program Name";
    setPrograms((prev) => [...prev, newProgram]);
  };

  const calculateTotalPrice = () => {
    let total = 0;

    // Calculate price for selected summer programs
    const summerPrograms = programs.filter((program) =>
      selectedPrograms.includes(program)
    );
    if (summerPrograms.length > 0) {
      total += 10;
      total += (summerPrograms.length - 1) * 5;
    }

    // Calculate price for internships and professor help
    selectedInternshipOptions.forEach((option) => {
      const selectedOption = internshipOptions.find((o) => o.value === option);
      if (selectedOption) total += selectedOption.price;
    });

    // Calculate price for resume and interview prep
    selectedResumeOptions.forEach((option) => {
      const selectedOption = resumeOptions.find((o) => o.value === option);
      if (selectedOption) total += selectedOption.price;
    });

    // Calculate price for SAT/ACT prep
    selectedSATPrep.forEach((option) => {
      const selectedOption = satPrepOptions.find((o) => o.value === option);
      if (selectedOption) total += selectedOption.price;
    });

    // Add hourly SAT/ACT price
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
        "service_2wckxjr",
        "template_xugiogj",
        templateParams,
        "Q1b_pv0uG9JEXJhAl"
      )
      .then(
        () => alert("Thank you for signing up! A confirmation email has been sent."),
        () => alert("Oops! Something went wrong. Please try again.")
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white p-12 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ARENA - Sign Up
        </h1>
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Selected Summer Programs */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Selected Summer Programs</h2>
            {programs.map((program, index) => (
              <div key={index} className="flex justify-between items-center mb-3">
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 mr-2"
                    />
                    <button
                      onClick={() => {
                        const updatedPrograms = [...programs];
                        updatedPrograms[index] = editingValue;
                        setPrograms(updatedPrograms);
                        setEditingIndex(null);
                        setEditingValue("");
                      }}
                      className="px-4 py-2 bg-gray-800 text-white rounded-md"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-gray-700">{program}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingIndex(index);
                          setEditingValue(program);
                        }}
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setPrograms((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleProgramAdd}
              className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              Add Program
            </button>
          </div>

          {/* Internship & Professor Help */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Internship & Professor Help</h2>
            <Select
              options={internshipOptions}
              isMulti
              onChange={(selected) =>
                setSelectedInternshipOptions(selected.map((item) => item.value))
              }
              className="rounded-md"
            />
          </div>

          {/* Resume & Interview Prep */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Resume & Interview Prep</h2>
            <Select
              options={resumeOptions}
              isMulti
              onChange={(selected) =>
                setSelectedResumeOptions(selected.map((item) => item.value))
              }
              className="rounded-md"
            />
          </div>

          {/* SAT/ACT Prep */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">SAT/ACT Prep</h2>
            <Select
              options={satPrepOptions}
              isMulti
              onChange={(selected) =>
                setSelectedSATPrep(selected.map((item) => item.value))
              }
              className="rounded-md"
            />
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-800">Hourly Prep (1 hour):</p>
              <div className="flex items-center">
                <button
                  onClick={() => satOneHourCount > 0 && setSatOneHourCount(satOneHourCount - 1)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  -
                </button>
                <span className="mx-4">{satOneHourCount}</span>
                <button
                  onClick={() => setSatOneHourCount(satOneHourCount + 1)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total Price */}
          <div className="text-lg font-semibold flex justify-between items-center text-gray-800">
            <span>Total Price:</span>
            <span>${calculateTotalPrice()}</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-gray-800 rounded-md hover:bg-gray-900"
          >
            Sign Up Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default ArenaSignUpForm;