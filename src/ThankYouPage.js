import React from "react";
import { Link } from "react-router-dom";

function ThankYouPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Submission!</h1>
        <p className="text-gray-700 mb-6">
          We've received your information and will be in touch shortly via email.
        </p>
        <Link to="/" className="bg-black text-white py-2 px-4 rounded-md">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ThankYouPage;