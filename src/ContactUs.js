import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from './firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const ContactUs = () => {
  const [formdata, setFormdata] = useState({ name: "", email: "", phone: "", grade: "", info: "", createdAt: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contactus"), {
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        grade: formdata.grade,
        info: formdata.info,
        createdAt: Timestamp.now(), 
      });
      setSubmitStatus('success');
      setFormdata({ name: "", email: "", phone: "", grade: "", info: "" });
      navigate("/thank-you");
    } catch (error) {
      setSubmitStatus('error');
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white text-black ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 relative inline-block">
          Contact Us
          <svg 
            className="absolute left-0 bottom-[-5px] w-full h-1" 
            viewBox="0 0 200 2" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <line 
              x1="0" y1="1" x2="200" y2="1" 
              stroke="black" 
              strokeWidth="4" 
            />
          </svg>
        </h1>
        <div className="relative px-4 max-w-8xl">
          <div className="absolute px-4 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-md opacity-100 group-hover:opacity-100 transition-all"></div>
          <div className="relative bg-white shadow-2xl rounded-lg p-8 backdrop-blur-lg border border-gray-300 transition-shadow duration-300 hover:shadow-3xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-center">We'd Love to Hear From You</h2>
              <p className="text-center text-gray-500 mt-2">
  If you <b>ONLY</b> have questions, please fill out the form below. Otherwise, <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW" className="text-blue-500 underline">sign up for a consultation meeting</a>.
</p>

            </div>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formdata.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-transform duration-300 "
                />
                <input
                  type="email"
                  name="email"
                  value={formdata.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-transform duration-300 "
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="phone"
                  value={formdata.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                  className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-transform duration-300"
                />
                <input
                  type="text"
                  name="grade"
                  value={formdata.grade}
                  onChange={handleChange}
                  placeholder="Your Grade"
                  required
                  className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-transform duration-300 "
                />
              </div>
              <textarea
                name="info"
                value={formdata.info}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="border border-gray-300 rounded-lg py-3 px-4 w-full h-40 bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-transform duration-300 "
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 transition-opacity duration-300 animate-fade-in">
                  Message sent successfully!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 transition-opacity duration-300 animate-fade-in">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
