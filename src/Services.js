import React, { useState } from "react";

const CollegeCounselingServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      title: "Curated Summer Program List & Admissions Strategy",
      icon: "https://www.pngall.com/wp-content/uploads/8/College-PNG-Pic.png",
      gradient: "from-blue-600 to-blue-900",
      borderGradient: "rgba(59, 130, 246, 0.6), rgba(30, 58, 138, 0.6)",
      paragraph: (
        <>
          - Thousands of summer programs can be overwhelming.<br />
          - We simplify by curating a <strong>personalized list</strong> based on academic interests, <strong>career goals</strong>, and strengths.<br />
          - Includes <strong>research opportunities</strong>, pre-college programs, specialized camps, and leadership experiences.<br />
          - We help refine essays, personal statements, recommendation letters, and <strong>interview prep</strong>.<br />
          - Ensures you present yourself in the <strong>strongest possible way</strong>.<br />
        </>
      ),
    },
    {
      title: "Guaranteed Internships & Internship Guidance",
      icon: "https://cdn-icons-png.flaticon.com/512/4928/4928898.png",
      gradient: "from-purple-500 to-pink-600",
      borderGradient: "rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6)",
      paragraph: (
        <>
          - We secure <strong>guaranteed placements</strong> through our network of professors, research labs, and <strong>industry professionals</strong>.<br />
          - Support in identifying top opportunities, crafting outreach emails, and connecting with companies.<br />
          - Helps refine applications and prepare for <strong>interviews</strong>.<br />
          - Gain <strong>real-world experience</strong> in research, corporate internships, or startups.<br />
        </>
      ),
    },
    {
      title: "Resume & Cover Letter Optimization",
      icon: "https://cdn1.iconfinder.com/data/icons/file-format-22/64/File_Format_Glyph-29-512.png",
      gradient: "from-green-500 to-teal-500",
      borderGradient: "rgba(34, 197, 94, 0.6), rgba(20, 184, 166, 0.6)",
      paragraph: (
        <>
          - We help build <strong>polished resumes</strong> that highlight skills, achievements, and experiences.<br />
          - <strong>Cover letter coaching</strong> ensures you craft a compelling narrative that stands out.<br />
          - Focuses on clarity, professionalism, and <strong>personalization</strong>.<br />
          - Showcase strengths for internship, job, or research position applications.<br />
        </>
      ),
    },
    {
      title: "Standardized Test Preparation",
      icon: "https://static.thenounproject.com/png/768328-200.png",
      gradient: "from-orange-500 to-red-500",
      borderGradient: "rgba(249, 115, 22, 0.6), rgba(220, 38, 38, 0.6)",
      paragraph: (
        <>
          - Tailored <strong>SAT/ACT prep</strong> helps students maximize their scores.<br />
          - Includes diagnostic testing, personalized study plans, and <strong>test-taking strategies</strong>.<br />
          - Expert guidance, high-quality practice materials, and <strong>real test simulations</strong>.<br />
          - Support in math, reading, writing, and science reasoning to achieve the <strong>best score</strong>.<br />
        </>
      ),
    },
  ];

  return (
    <section className="container mx-auto bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center mb-12">What We Do</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {services.map((service, index) => (
          <div
            key={index}
            className={`relative group flex flex-col items-center text-center transition-opacity duration-300 ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-30" : "opacity-100"}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Animated Border Effect */}
            <div
              className="absolute -inset-1 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div
                className="absolute left-[-25%] top-[-25%] h-[150%] w-[150%] animate-border-spin"
                style={{
                  background: `conic-gradient(${service.borderGradient} 0deg, transparent 80deg)`,
                }}
              ></div>
            </div>

            {/* Card Content */}
            <div className="relative bg-white hover:bg-gray-100 hover:scale-100 rounded-xl shadow-2xl p-6 flex flex-col items-center h-full">
              {/* Circled Number */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">
                {index + 1}
              </div>

              {/* Icon */}
              <img src={service.icon} alt={`${service.title} Icon`} className="h-12 mt-4 w-12 mb-4" />

              {/* Title */}
              <p className="font-medium text-lg mb-2">{service.title}</p>

              {/* Paragraph */}
              <p className="text-xs text-gray-800">{service.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollegeCounselingServices;
