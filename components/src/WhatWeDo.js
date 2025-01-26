import React, { useState } from "react";

const WhatWeDo = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const sections = [
    { text: "Financial reports", image: "https://via.placeholder.com/600x400?text=Financial+Reports" },
    { text: "Legal analysis", image: "https://via.placeholder.com/600x400?text=Legal+Analysis" },
    { text: "Insurance claims", image: "https://via.placeholder.com/600x400?text=Insurance+Claims" },
    { text: "Logistics documents", image: "https://via.placeholder.com/600x400?text=Logistics+Documents" },
    { text: "Health records", image: "https://via.placeholder.com/600x400?text=Health+Records" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-screen px-10 py-20 bg-gray-100">
      {/* Sidebar */}
      <div className="relative">
        {/* Orange circle */}
        <div
          className="absolute left-[-10px] w-4 h-4 bg-orange-500 rounded-full transition-all duration-300"
          style={{ top: `${hoveredIndex * 50}px` }}
        />
        <ul className="space-y-4">
          {sections.map((section, index) => (
            <li
              key={index}
              className={`cursor-pointer text-lg font-medium transition-colors duration-300 ${
                hoveredIndex === index ? "text-orange-500" : "text-gray-700"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {section.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Image section */}
      <div className="relative flex-1 flex items-center justify-center h-[400px] w-[600px] bg-gray-200 rounded-lg shadow-md overflow-hidden">
        {sections.map((section, index) => (
          <img
            key={index}
            src={section.image}
            alt={section.text}
            className={`absolute max-w-full max-h-full object-cover transition-opacity duration-500 ${
              hoveredIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
