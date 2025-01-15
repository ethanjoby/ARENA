import React from "react";

const CollegeCounselingServices = () => {
  const services = [
    {
      title: "Help finding programs that are right for you.",
      icon: "https://www.pngall.com/wp-content/uploads/8/College-PNG-Pic.png",
      gradient: "bg-gradient-to-r from-blue-600 to-blue-900",
    },
    {
      title: "Application essay review and feedback.",
      icon: "https://cdn-icons-png.flaticon.com/512/4928/4928898.png",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-600",
    },
    {
      title: "Help finding and connecting with professors.",
      icon: "https://cdn1.iconfinder.com/data/icons/file-format-22/64/File_Format_Glyph-29-512.png",
      gradient: "bg-gradient-to-r from-green-500 to-teal-500",
    },
    {
      title: "Guidance on what path is .",
      icon: "https://static.thenounproject.com/png/768328-200.png",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="services-section bg-black text-white py-16 px-8">
      <h2 className="text-4xl font-bold text-center mb-12">
        What We Do
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card ${service.gradient} p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-between relative`}
          >
            {/* Circled Number */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">
              {index + 1}
            </div>

            {/* Icon */}
            <img
              src={service.icon}
              alt={`${service.title} Icon`}
              className="h-12 w-12 mb-4"
            />

            {/* Title */}
            <p className="font-medium text-lg">{service.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollegeCounselingServices;

