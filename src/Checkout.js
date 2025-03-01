import React, { useState, useEffect } from "react";
import NAVBAR2 from "./navbar2";

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    zipCode: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Retrieve checkout data from localStorage
    const savedData = localStorage.getItem('checkout_data');
    if (savedData) {
      setCheckoutData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      
      // In a real application, you would:
      // 1. Process payment through a payment gateway
      // 2. Store enrollment information in your database
      // 3. Send confirmation emails
      
      // Clear checkout data from localStorage
      localStorage.removeItem('checkout_data');
    }, 2000);
  };

  if (!checkoutData) {
    return (
      <div className="bg-white min-h-screen">
        <NAVBAR2 />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">No Checkout Information Found</h2>
          <p className="mb-8">Please select a program and session first.</p>
          <a href="/#bootcamp-offerings" className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors">
            View Programs
          </a>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="bg-white min-h-screen">
        <NAVBAR2 />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-green-800">Enrollment Confirmed!</h3>
                <p className="text-green-700 mt-2">
                  Thank you for enrolling in our {checkoutData.program} - {checkoutData.session} program.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center">What's Next?</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                    <span className="text-xl font-bold">1</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">Check Your Email</h3>
                  <p className="text-gray-600 mt-1">
                    We've sent a confirmation email to {formData.email} with all the details about your enrollment.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                    <span className="text-xl font-bold">2</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">Prepare for Your First Session</h3>
                  <p className="text-gray-600 mt-1">
                    We'll be sending you preparation materials prior to your first session to help you get the most out of the program.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                    <span className="text-xl font-bold">3</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">Mark Your Calendar</h3>
                  <p className="text-gray-600 mt-1">
                    Don't forget to add your session dates to your calendar. Your program starts on {checkoutData.session?.split(' - ')[0]}.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <a href="/" className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors">
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <NAVBAR2 />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Enrollment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-6">
              <h2 className="text-xl font-bold mb-4 pb-4 border-b border-gray-200">Order Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{checkoutData.program}</h3>
                  <p className="text-gray-600">{checkoutData.session}</p>
                </div>
                
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span>Program Fee</span>
                    <span>${checkoutData.price?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Materials Included</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${checkoutData.price?.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-sm">
                  <div className="flex">
                    <svg className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Our bootcamps fill quickly due to limited class sizes. Your spot is reserved for 30 minutes during checkout.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-6">Student Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-black text-white py-3 rounded-md font-semibold ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
                    } transition-colors`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Complete Payment - $${checkoutData.price?.toFixed(2)}`
                    )}
                  </button>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;