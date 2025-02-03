import React, { useState } from "react";

const CollegeCounselingServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      title: "Curated Summer Program List & Admissions Strategy",
      icon: "https://www.pngall.com/wp-content/uploads/8/College-PNG-Pic.png",
      gradient: "bg-blue-50",
      border: "border-blue-400",
      hoverBg: "hover:bg-blue-100",
    },
    {
      title: "Guaranteed Internships & Internship Guidance",
      icon: "https://cdn-icons-png.flaticon.com/512/4928/4928898.png",
      gradient: "bg-purple-50",
      border: "border-purple-400",
      hoverBg: "hover:bg-purple-100",
    },
    {
      title: "Resume & Cover Letter Optimization",
      icon: "https://cdn1.iconfinder.com/data/icons/file-format-22/64/File_Format_Glyph-29-512.png",
      gradient: "bg-green-50",
      border: "border-green-400",
      hoverBg: "hover:bg-green-100",
    },
    {
      title: "Standardized Test Preparation",
      icon: "https://static.thenounproject.com/png/768328-200.png",
      gradient: "bg-orange-50",
      border: "border-orange-400",
      hoverBg: "hover:bg-orange-100",
    },
  ];

  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center mb-12">What We Do</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`relative group flex flex-col items-center text-center rounded-xl p-6 shadow-lg transition-transform duration-300 border-2 border-transparent ${service.gradient} ${service.hoverBg} hover:scale-105 hover:${service.border}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Circled Number */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">
              {index + 1}
            </div>

            {/* Icon */}
            <img src={service.icon} alt={`${service.title} Icon`} className="h-12 w-12 mb-4" />

            {/* Title */}
            <p className="font-semibold text-lg text-gray-800">{service.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollegeCounselingServices;
