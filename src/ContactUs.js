import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";

const ContactUS = () => {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        info: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformdata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const OnSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await addDoc(collection(db, "contactus"), {
                name: formdata.name,
                email: formdata.email,
                info: formdata.info,
            });
            
            setSubmitStatus('success');
            setformdata({ name: "", email: "", info: "" });
        } catch (error) {
            setSubmitStatus('error');
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
                
                <form onSubmit={OnSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formdata.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formdata.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="info" className="block text-sm font-medium text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                id="info"
                                name="info"
                                value={formdata.info}
                                onChange={handleChange}
                                required
                                placeholder="Type your message here..."
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors resize-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors disabled:bg-yellow-300 font-medium text-lg shadow-sm"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
                            Message sent successfully!
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
                            Failed to send message. Please try again.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactUS;