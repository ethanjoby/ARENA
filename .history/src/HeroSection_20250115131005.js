import React from 'react';
import logo from './assets/logo123.png'; // Adjust the path

// Smooth scroll function
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const HeroSection = () => {
  return (
    <section className="hero-section bg-black text-white min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        <div className="logo flex items-center text-lg font-bold">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <span>ARENA</span>
        </div>
        <nav className="text-sm space-x-8">
          <button
            onClick={() => scrollToSection('services')}
            className="hover:underline"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="hover:underline"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:underline"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('register')}
            className="hover:underline"
          >
            Register
          </button>
        </nav>
        <div className="relative inline-flex group">
          <div
            className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-md group-hover:opacity-100 group-hover:-inset-0.5 group-hover:duration-200 animate-tilt"
          ></div>
          <button
            onClick={() => scrollToSection('register')}
            className="relative inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-white transition-all duration-200 bg-black font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center px-4">
        <div className="neon-logo mb-8">
          <img src={logo} alt="Logo" className="h-48" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-snug">
          Your Path to College Starts Here!
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl">
          Get help finding and applying to internships from students who have
          done it.
        </p>
        <div className="relative inline-flex group mt-10">
          <div
            className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-md group-hover:opacity-100 group-hover:-inset-0.5 group-hover:duration-200 animate-tilt"
          ></div>
          <button
            onClick={() => scrollToSection('register')}
            className="relative inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-white transition-all duration-200 bg-black font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Register Now →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
