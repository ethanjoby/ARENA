import React, { useState } from "react";
import logo from "./assets/logo123.webp";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const HeroSection = () => {
  const navigate = useNavigate();

  const [hoverEffects, setHoverEffects] = useState({
    register: { x: 0, y: 0, size: 20, opacity: 0 },
    learnMore: { x: 0, y: 0, size: 20, opacity: 0 },
  });

  const handleMouseMove = (e, key) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHoverEffects((prev) => ({
      ...prev,
      [key]: { ...prev[key], x, y, opacity: 1 },
    }));
  };

  const handleMouseEnter = (key) => {
    setHoverEffects((prev) => ({
      ...prev,
      [key]: { ...prev[key], size: 300, opacity: 1 },
    }));
  };

  const handleMouseLeave = (key) => {
    setHoverEffects((prev) => ({
      ...prev,
      [key]: { ...prev[key], size: 20, opacity: 0 },
    }));
  };

  return (
    <section className="hero-section bg-white text-black min-h-screen flex flex-col items-center justify-center">
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        <div className="logo flex items-center text-lg font-bold">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <span>ARENA</span>
        </div>
        <nav className="hidden lg:flex text-sm space-x-8">
          <button onClick={() => scrollToSection("services")} className="underline-effect">
            Services
          </button>
          <button onClick={() => scrollToSection("testimonials")} className="underline-effect">
            Testimonials
          </button>
          <button onClick={() => scrollToSection("faq")} className="underline-effect">
            FAQs
          </button>
        </nav>
        <Link
          to="/sign-up"
          className="relative inline-flex items-center gap-2 rounded-full border border-black px-8 py-3 font-medium transition-all duration-300 overflow-hidden"
          onMouseMove={(e) => handleMouseMove(e, "register")}
          onMouseEnter={() => handleMouseEnter("register")}
          onMouseLeave={() => handleMouseLeave("register")}
        >
          <div
            style={{
              position: "absolute",
              top: hoverEffects.register.y,
              left: hoverEffects.register.x,
              width: hoverEffects.register.size,
              height: hoverEffects.register.size,
              backgroundColor: "black",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              transition: "width 0.5s ease, height 0.5s ease, opacity 0.5s ease",
              opacity: hoverEffects.register.opacity,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <span
            className="relative z-10"
            style={{ color: hoverEffects.register.opacity > 0 ? "white" : "black" }}
          >
            Register
          </span>
        </Link>
      </header>

      <div className="flex flex-col items-center text-center px-4">
        <div className="neon-logo">
          <img src={logo} alt="Logo" className="h-48" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-snug">
          Your Path to College Starts Here!
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl">
          Get help finding and applying to internships from students who have done it.
        </p>
        <div className="relative inline-flex group mt-10">
        <div
            className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
          ></div>
          
          <button
            onClick={() => scrollToSection("services")}
            className="relative inline-flex items-center bg-white justify-center px-6 py-3 text-md font-semibold  rounded-full overflow-hidden focus:outline-none"
            onMouseMove={(e) => handleMouseMove(e, "learnMore")}
            onMouseEnter={() => handleMouseEnter("learnMore")}
            onMouseLeave={() => handleMouseLeave("learnMore")}
          >
            <div
              style={{
                position: "absolute",
                top: hoverEffects.learnMore.y,
                left: hoverEffects.learnMore.x,
                width: hoverEffects.learnMore.size,
                height: hoverEffects.learnMore.size,
                backgroundColor: "black",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                transition: "width 0.5s ease, height 0.5s ease, opacity 0.5s ease",
                opacity: hoverEffects.learnMore.opacity,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <span
              className="relative z-10"
              style={{ color: hoverEffects.learnMore.opacity > 0 ? "white" : "black" }}
            >
              Learn More →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
