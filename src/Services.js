import React, { useState } from "react";

const CollegeCounselingServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedCards, setExpandedCards] = useState([]);
  const consultationLink = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW";

  const services = [
    {
      title: "Curated Summer Program List & Admissions Strategy",
      icon: "https://www.pngall.com/wp-content/uploads/8/College-PNG-Pic.png",
      gradient: "from-blue-600 to-blue-900",
      borderGradient: "rgba(59, 130, 246, 0.6), rgba(30, 58, 138, 0.6)",
      description: "We analyze your academic profile, interests, and career goals to identify the most strategic summer programs that will strengthen your college applications. Our counselors have placed students in prestigious programs at institutions like Harvard, Stanford, and MIT.",
      features: [
        "Personalized list of 200+ programs tailored to your interests",
        "Application guidance for competitive programs",
        "Strategic planning to enhance your college profile"
      ]
    },
    {
      title: "Guaranteed Internships & Internship Guidance",
      icon: "https://static.thenounproject.com/png/768328-200.png",
      gradient: "from-purple-500 to-pink-600",
      borderGradient: "rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6)",
      description: "Gain real-world experience with our guaranteed internship placements. We partner with companies across various industries to provide meaningful opportunities that enhance your college applications and build professional skills.",
      features: [
        "Guaranteed placement in field of interest",
        "Interview preparation and professional coaching",
        "Ongoing support throughout internship experience"
      ]
    },
    {
      title: "Career Path Development & Future Planning",
      icon: "https://cdn-icons-png.flaticon.com/512/4928/4928898.png",
      gradient: "from-green-500 to-teal-500",
      borderGradient: "rgba(34, 197, 94, 0.6), rgba(20, 184, 166, 0.6)",
      description: "Our career counselors work one-on-one with students to identify their passions, strengths, and potential career paths. We provide a comprehensive roadmap that aligns academic choices with long-term goals and connects students with industry mentors.",
      features: [
        "Career interest assessment and analysis",
        "Industry exploration and informational interviews",
        "Long-term academic and professional roadmap creation"
      ]
    },
    {
      title: "Comprehensive Academic Achievement Support",
      icon: "https://cdn1.iconfinder.com/data/icons/file-format-22/64/File_Format_Glyph-29-512.png",
      gradient: "from-orange-500 to-red-500",
      borderGradient: "rgba(249, 115, 22, 0.6), rgba(220, 38, 38, 0.6)",
      description: "Our expert tutors provide comprehensive support for all standardized tests and advanced coursework. From SAT/ACT prep to AP classes, Olympiads, and honors courses, we help students achieve their highest potential across all academic challenges.",
      features: [
        "SAT/ACT preparation with score improvement guarantees",
        "AP/IB class support and exam preparation",
        "Competition coaching for Olympiads and academic competitions"
      ]
    },
  ];

  const handleCardClick = (index) => {
    setExpandedCards(prev => {
      // If card is already expanded, remove it from array
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } 
      // Otherwise add it to array
      return [...prev, index];
    });
  };

  const isExpanded = (index) => {
    return expandedCards.includes(index);
  };

  return (
    <section className="container mx-auto bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center mb-4">What We Do</h1>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Our comprehensive college counseling services are designed to maximize your chances of admission to top universities through strategic planning and personalized guidance.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group flex flex-col items-center text-center transition-all duration-300 w-full min-w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCardClick(index)}
          >
            {/* Animated Border Effect */}
            <div className={`absolute -inset-1 rounded-xl overflow-hidden transition-opacity duration-300 ${hoveredIndex === index || isExpanded(index) ? 'opacity-100' : 'opacity-0'}`}>
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
            <div 
              className={`relative bg-white hover:bg-gray-50 rounded-xl shadow-xl p-6 flex flex-col items-center h-full w-full ${
                isExpanded(index) ? 'transform scale-105 z-10' : ''
              } transition-all duration-300`}
            >
              {/* Circled Number */}
              <div 
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md bg-black text-white transition-colors duration-300"
              >
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="h-16 w-16 flex items-center justify-center mb-4 mt-4 p-2 rounded-full">
                <img 
                  src={service.icon} 
                  alt={`${service.title} Icon`} 
                  className="h-12 w-12" 
                />
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-xl mb-3">{service.title}</h3>
              
              {/* Description - shown when expanded */}
              <div className={`overflow-hidden transition-all duration-300 ${
                isExpanded(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-gray-700 text-sm mb-4">{service.description}</p>
                
                <div className="w-full bg-gray-100 p-3 rounded-lg mb-8">
                  <h4 className="font-semibold text-left mb-2 text-sm">Key Benefits:</h4>
                  <ul className="text-left text-xs space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" 
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                clipRule="evenodd" 
                                className={`text-gradient-${index}`}
                                style={{
                                  color: index === 0 ? '#3B82F6' : 
                                         index === 1 ? '#A855F7' : 
                                         index === 2 ? '#22C55E' : '#F97316'
                                }}
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Toggle indicator text with more padding */}
              <p className="text-sm text-gray-500 mt-4 absolute bottom-3 w-full left-0">
                {isExpanded(index) ? "Click to collapse" : "Click to expand"}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <a 
          href={consultationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors duration-300 shadow-lg inline-block"
        >
          Schedule a Free Consultation
        </a>
      </div>
    </section>
  );
};

export default CollegeCounselingServices;