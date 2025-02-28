import React, { useState, useEffect } from "react";
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
  const [showNotification, setShowNotification] = useState(false);

  // Show notification after a short delay for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <section className="hero-section bg-white text-black py-24 flex flex-col items-center justify-center">
      {/* Bootcamp Notification Popup */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 z-50 w-64 md:w-80 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform translate-x-0 opacity-100">
          <div className="h-1 bg-gradient-to-r from-black via-gray-100 to-gray-400"></div>
          <div className="p-4">
          <div className="flex justify-between items-start">
        <div className="flex">
          <span className="text-lg mr-2">🚀</span>
          <h3 className="font-bold text-gray-800">New Bootcamps!</h3>
        </div>
        {/* Close button */}
        <button
          onClick={() => setShowNotification(false)}
          className="text-gray-500 hover:text-gray-800 text-lg font-bold focus:outline-none"
        >
          ×
        </button>
      </div>
            <p className="mt-2 text-sm text-gray-600 text-left">
              We're now offering SAT/ACT and AP Bootcamps to help you excel!
            </p>
            <Link
              to="/bootcamp"
              className="block text-left mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 text-left" 
            >
              Learn More →
            </Link>
          </div>
        </div>
      )}

      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        <div className="logo flex items-center text-lg font-bold">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <span>ARENA</span>
        </div>
        <nav className="hidden lg:flex text-sm space-x-8">
          <button onClick={() => scrollToSection("services")} className="underline-effect">
            Services
          </button>
          <button onClick={() => scrollToSection("about-us")} className="underline-effect">
            About Us
          </button>
          <button onClick={() => scrollToSection("testimonials")} className="underline-effect">
            Testimonials
          </button>
          <button onClick={() => scrollToSection("faq")} className="underline-effect">
            FAQs
          </button>
          <button onClick={() => scrollToSection("contact-us")} className="underline-effect">
            Contact Us
          </button>
          <button onClick={() => navigate("/essays")} className="underline-effect">
            Essays
          </button>
          <button onClick={() => navigate("/bootcamp")} className="underline-effect">
            Bootcamps
          </button>
        </nav>
        <Link
  to="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW"
  target = "_blank"
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

      <div className="flex flex-col items-center text-center px-4 py-12">
        <div className="neon-logo">
          <img src={logo} alt="Logo" className="h-48" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-snug">
          Your Path to College Starts Here!
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl italic">
          Let us help you make the best of your summer and make the best application possible!
        </p>
        <div className="relative inline-flex group mt-10">
          <div
            className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
          ></div>
          <button
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW', '_blank', 'noopener,noreferrer')}
            className="relative inline-flex items-center bg-white justify-center px-6 py-3 text-md font-semibold rounded-full overflow-hidden focus:outline-none"
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
              Schedule a Free Consultation
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;