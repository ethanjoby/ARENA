import React, { useState } from "react";

function ArenaSignUpForm() {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl px-8">
      <h1
  className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
    from-blue-500 via-purple-500 via-pink-500 to-red-500 text-center mb-2 
    leading-normal lg:leading-relaxed px-4 md:px-0"
>
  ARENA - Sign Up
</h1>


        <p className="text-gray-400 text-center mb-8 text-lg tracking-wide leading-relaxed">
        Thank you for your interest in ARENA. Fill out this form so we can learn about you and your interest in our program.
        </p>

        <form className="bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-3xl shadow-2xl w-full border border-gray-700 backdrop-blur-lg">
          {/* Name and Email Fields */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-gray-300 text-sm font-bold mb-2 text-left"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-bold mb-2 text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Plan Selection */}
          <div className="mt-10">
            <label className="block text-gray-300 text-sm font-bold mb-4 text-left">
              Choose Your Plan:
            </label>
            <div className="flex space-x-4">
              {/* Starter Plan */}
              <div
                className={`cursor-pointer p-6 w-1/3 rounded-xl border-4 transition-all duration-300 text-center ${
                  selectedPlan === "starter"
                    ? "border-blue-500 bg-blue-900 scale-105"
                    : "border-gray-700 bg-gray-700"
                }`}
                onClick={() => handlePlanSelect("starter")}
              >
                <h3 className="text-xl text-white font-bold mb-2">Starter</h3>
                <p className="text-gray-300">Basic access to the program.</p>
              </div>

              {/* Advanced Plan */}
              <div
                className={`cursor-pointer p-6 w-1/3 rounded-xl border-4 transition-all duration-300 text-center ${
                  selectedPlan === "advanced"
                    ? "border-purple-500 bg-purple-900 scale-105"
                    : "border-gray-700 bg-gray-700"
                }`}
                onClick={() => handlePlanSelect("advanced")}
              >
                <h3 className="text-xl text-white font-bold mb-2">Advanced</h3>
                <p className="text-gray-300">Includes advanced features.</p>
              </div>

              {/* Premium Plan */}
              <div
                className={`cursor-pointer p-6 w-1/3 rounded-xl border-4 transition-all duration-300 text-center ${
                  selectedPlan === "premium"
                    ? "border-red-500 bg-red-900 scale-105"
                    : "border-gray-700 bg-gray-700"
                }`}
                onClick={() => handlePlanSelect("premium")}
              >
                <h3 className="text-xl text-white font-bold mb-2">Premium</h3>
                <p className="text-gray-300">All features unlocked.</p>
              </div>
            </div>
          </div>

          {/* Comments Field */}
          <div className="mt-8">
            <label
              htmlFor="comments"
              className="block text-gray-300 text-sm font-bold mb-2 text-left"
            >
              Additional Comments:
            </label>
            <textarea
              id="comments"
              placeholder="Tell us more..."
              className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
          <button
  type="submit"
  className="relative z-10 w-full py-3 px-6 text-lg font-bold text-white bg-gradient-to-r 
  from-blue-500 via-purple-500 via-pink-500 to-red-500 rounded-lg hover:from-indigo-600 hover:via-purple-600 
  hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-102 
  hover:shadow-[0_0_20px_10px_rgba(255,105,180,0.8)] hover:ring-4 ring-pink-500"
>
  Join the Arena
</button>


          </div>
        </form>
      </div>
    </div>
  );
}

export default ArenaSignUpForm;
