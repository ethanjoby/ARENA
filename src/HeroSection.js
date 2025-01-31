import React from 'react';
import logo from './assets/logo123.webp'; // Adjust the path
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// Smooth scroll function
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section bg-white text-black min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        <div className="logo flex items-center text-lg font-bold">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <span>ARENA</span>
        </div>
        <nav className="hidden lg:flex text-sm space-x-8">
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
            onClick={() => scrollToSection('faq')}
            className="hover:underline"
          >
            FAQs
          </button>

          

        </nav>
        <Link
              to="/sign-up"
              className=" inline-flex border-black items-center gap-2 rounded-full border  bg-black px-8 py-3 text-white transition-all duration-800 hover:bg-transparent hover:text-black focus:outline-none focus:ring active:bg-white/90 py-12 px-4 sm:px-6 lg:px-8"
            >
              <span className="text-sm font-medium">Register</span>
             
            </Link>
      </header>

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center px-4">
        <div className="neon-logo">
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
            onClick={() => scrollToSection('services')}
            className="hover:bg-white duration-800 hover:text-black relative inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-white transition-all duration-200 bg-black  font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Learn More →
          </button>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;
