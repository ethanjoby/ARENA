import React, { useState } from 'react';
import logo from './assets/logo123.webp'; // Adjust the path
import { useNavigate } from 'react-router-dom';

const NAVBAR1 = () => {
  const navigate = useNavigate();
  const [hoverEffect, setHoverEffect] = useState({ x: 0, y: 0, size: 20, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverEffect({ x, y, size: 300, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setHoverEffect({ x: 0, y: 0, size: 20, opacity: 0 });
  };

  return (
    <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
      <div className="logo flex items-center text-lg font-bold">
        <img src={logo} alt="Logo" className="h-8 mr-2" />
        <span>ARENA</span>
      </div>
      
      <div className="relative inline-flex group">
        <div
          className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
        ></div>
        <button
          onClick={() => navigate('/')}
          className="relative inline-flex items-center bg-white justify-center px-6 py-3 text-md font-semibold rounded-full overflow-hidden focus:outline-none"
          onMouseMove={handleMouseMove}
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
            Exit Form
          </span>
        </button>
      </div>
    </header>
  );
};

export default NAVBAR1;

