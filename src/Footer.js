import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [hoverEffect, setHoverEffect] = useState({
    x: 0,
    y: 0,
    size: 20,
    opacity: 0,
  });

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHoverEffect((prev) => ({
      ...prev,
      x,
      y,
      opacity: 1,
    }));
  };

  const handleMouseEnter = () => {
    setHoverEffect((prev) => ({
      ...prev,
      size: 300,
      opacity: 1,
    }));
  };

  const handleMouseLeave = () => {
    setHoverEffect((prev) => ({
      ...prev,
      size: 20,
      opacity: 0,
    }));
  };

  return (
    <footer className="bg-white dark:bg-white">
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="border-t border-gray-100 pt-8 dark:border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © Company 2025 ARENA. All rights reserved.
            </p>
            <Link
              to="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW"
              className="relative inline-flex items-center gap-2 rounded-full border border-black px-8 py-3 font-medium transition-all duration-300 overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                style={{
                  position: "absolute",
                  top: hoverEffect.y,
                  left: hoverEffect.x,
                  width: hoverEffect.size,
                  height: hoverEffect.size,
                  backgroundColor: "black",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "width 0.5s ease, height 0.5s ease, opacity 0.5s ease",
                  opacity: hoverEffect.opacity,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <span
                className="relative z-10"
                style={{ color: hoverEffect.opacity > 0 ? "white" : "black" }}
              >
                Register
              </span>
              <svg
                className="relative z-10 size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: hoverEffect.opacity > 0 ? "white" : "black" }} // Change arrow color
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
