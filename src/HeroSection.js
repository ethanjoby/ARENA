import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section bg-black text-white min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        <div className="logo flex items-center text-lg font-bold">
          <img src="/path-to-logo.png" alt="Logo" className="h-8 mr-2" />
          <span>CollegePath</span>
        </div>
        <nav className="text-sm space-x-8">
          <a href="#services" className="hover:underline">Services</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
          <a href="#register" className="hover:underline">Register</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <a href="#get-started" className="bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 rounded-full text-black text-sm">
          Get Started
        </a>
      </header>

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center px-4">
        <div className="neon-logo mb-8">
          <img src="/path-to-neon-logo.png" alt="Neon Logo" className="h-32" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-snug">
          Your Path to College Starts Here!
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl">
          Expert college counseling to help you find your dream school. From applications to essays, we guide you every step of the way!
        </p>
        <button className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 px-6 py-3 text-black font-medium rounded-full text-lg shadow-lg hover:opacity-90">
          Register Now →
        </button>
      </div>
    </section>
  );
};

export default HeroSection;




