import React, { useState } from "react";

const CollegeCounselingServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      title: "Curated Summer Program List & Admissions Strategy",
      icon: "https://www.pngall.com/wp-content/uploads/8/College-PNG-Pic.png",
      gradient: "from-blue-600 to-blue-900",
      borderGradient: "rgba(59, 130, 246, 0.6), rgba(30, 58, 138, 0.6)",
    },
    {
      title: "Guaranteed Internships & Internship Guidance",
      icon: "https://static.thenounproject.com/png/768328-200.png",
      gradient: "from-purple-500 to-pink-600",
      borderGradient: "rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6)",
    },
    {
      title: "Resume & Cover Letter Optimization",
      icon: "https://cdn-icons-png.flaticon.com/512/4928/4928898.png",
      gradient: "from-green-500 to-teal-500",
      borderGradient: "rgba(34, 197, 94, 0.6), rgba(20, 184, 166, 0.6)",
    },
    {
      title: "Standardized Test Preparation",
      icon: "https://cdn1.iconfinder.com/data/icons/file-format-22/64/File_Format_Glyph-29-512.png",
      gradient: "from-orange-500 to-red-500",
      borderGradient: "rgba(249, 115, 22, 0.6), rgba(220, 38, 38, 0.6)",
    },
  ];

  return (
    <section className="container mx-auto bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center mb-12">What We Do</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group flex flex-col items-center text-center transition-opacity duration-300 w-full min-w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Animated Border Effect */}
            <div className="absolute -inset-1 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="absolute left-[-35%] top-[-35%] h-[170%] w-[170%] animate-border-spin-fast"
                style={{
                  background: `conic-gradient(from 0deg, ${service.borderGradient} 0deg, transparent 110deg)`,
                  maskImage: "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
                  filter: "blur(6px)",
                  transition: "background 0.4s ease-in-out",
                }}
              ></div>
            </div>

            {/* Card Content */}
            <div className="relative bg-white hover:bg-gray-100 hover:scale-100 rounded-xl shadow-2xl p-6 flex flex-col items-center h-full w-full min-w-full">
              {/* Circled Number */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">
                {index + 1}
              </div>

              {/* Icon */}
              <img src={service.icon} alt={`${service.title} Icon`} className="h-12 mt-4 w-12 mb-4" />

              {/* Title */}
              <p className="font-medium text-lg mb-2">{service.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollegeCounselingServices;
