import React from "react";

function ArenaSignUpForm() {
  return (
    <div className="min-h-screen bg-black  flex items-center justify-center">
      <div className="w-full max-w-5xl px-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
              from-blue-500 via-purple-500 via-pink-500 to-red-500
 text-center mb-8">
          ARENA - Sign Up
        </h1>
        <p className="text-gray-400 text-center mb-10">
          Thank you for your interest in ARENA. Please fill this form to help us
          learn about you and your interest in our program.
        </p>

        <form className="bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-2xl shadow-2xl w-full">
          {/* Name and Email Fields */}
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
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
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
                className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
         

          {/* Plan Selection */}
          <div className="mt-8">
            <label className="block text-gray-300 text-sm font-bold mb-4 text-left">
              Plan:
            </label>
            <div className="space-y-4">
              <label className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="plan"
                  value="starter"
                  className="text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-gray-300">Starter</span>
              </label>
              <label className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="plan"
                  value="advanced"
                  className="text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-gray-300">Advanced</span>
              </label>
              <label className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="plan"
                  value="premium"
                  className="text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-gray-300">Premium</span>
              </label>
            </div>
          </div>

          {/* Comments Field */}
          <div className="mt-8">
            <label
              htmlFor="comments"
              className="block text-gray-300 text-sm font-bold mb-2 text-left"
            >
              Any additional comments you would like to leave us:
            </label>
            <textarea
              id="comments"
              placeholder="Your answer"
              className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 px-6 text-lg font-bold text-white bg-gradient-to-r 
              from-blue-500 via-purple-500 via-pink-500 to-red-500 rounded-lg hover:scale-105 shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArenaSignUpForm;

