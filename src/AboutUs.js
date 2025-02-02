import React from "react";

const teamLeaders = [
  { 
    name: "Aryan Kumar", 
    role: "Project Manager", 
    description: "Aryan...",
    awards: ["Forbes 30 Under 30", "Top Innovator 2023"],
    funFact: "Has traveled to 20+ countries for business & leisure.",
    image: "" 
  },
  { 
    name: "Ratul Chakraborty", 
    role: "Lead Developer", 
    description: "Ratul...",
    awards: ["Google Developer Award", "Hackathon Champion 2022"],
    funFact: "Built his first app at age 14.",
    image: "" 
  },
  { 
    name: "Ethan Varghese", 
    role: "UI/UX Designer", 
    description: "Ethan...",
    awards: ["Best App Design 2023", "Top 10 Behance Designs"],
    funFact: "Obsessed with vintage typography and neon aesthetics.",
    image: "" 
  },
  { 
    name: "Nirav Jaiswal", 
    role: "Marketing Head", 
    description: "Nirav...",
    awards: ["Top 50 Digital Marketers", "AdWeek Rising Star"],
    funFact: "Once wrote an ad that got 10M+ views in a day!",
    image: "" 
  },
  { 
    name: "Aaron Rathore", 
    role: "Data Scientist", 
    description: "Aaron does Backend",
    awards: ["AI Innovator of the Year", "MIT Data Science Challenge Winner"],
    funFact: "Loves analyzing chess grandmaster games in his free time.",
    image: "" 
  },
  { 
    name: "Advay Bajpai", 
    role: "Operations Lead", 
    description: "Advay...",
    awards: ["Efficiency Expert Award", "Lean Six Sigma Black Belt"],
    funFact: "Can solve a Rubik’s Cube in under 30 seconds!",
    image: "" 
  }
];

function AboutUs() {
  return (
    <div className="py-16 bg-white text-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamLeaders.map((leader, index) => (
            <div 
              key={index} 
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 p-6 backdrop-blur-md border border-gray-300"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold rounded-t-xl overflow-hidden">
                {leader.image ? (
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover"/>
                ) : (
                  "Profile Image"
                )}
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-600">{leader.name}</h3>
                <p className="text-sm text-gray-600">{leader.role}</p>
                <p className="text-gray-700 mt-3">{leader.description}</p>

                <div className="mt-4">
                  <h4 className="text-md font-semibold text-purple-600">Awards & Achievements:</h4>
                  <ul className="text-gray-600 text-sm mt-1">
                    {leader.awards.map((award, i) => (
                      <li key={i}>• {award}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="text-md font-semibold text-green-600">Fun Fact:</h4>
                  <p className="text-gray-600 text-sm">{leader.funFact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
