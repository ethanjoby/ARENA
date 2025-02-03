import React from "react";
import nirav from "./assets/nirav_headshot.jpg";

const teamLeaders = [
    {
      name: "Aryan Kumar",
      awards: [
        "Robotics <strong> State Champion </strong>",
        "USCF Chess <strong> State Champion </strong>",
        "<strong>Top 1%</strong> Blue Ocean International Pitch Competition"
      ],
      accomplishments: [
        "Developed a modern gradebook system used by <strong> 50,000+ </strong> students",
        "Worked with <strong> UCLA </strong> Professor on a <strong>patented venture</strong>",
        "UC Davis Research Assistant @ <strong>ECE Lab</strong>"
      ],
      funFact: "Once played chess for 24 hours straight—only stopped when the board started looking 3D.",
      image: "https://static.wixstatic.com/media/f2b832_8e95bd0825f346ed9e2e065ad2587b73~mv2.jpeg/v1/crop/x_0,y_333,w_828,h_830/fill/w_494,h_494,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Aryan.jpeg"
    },
    {
      name: "Ratul Chakraborty",
      awards: [
        "<strong> Top 0.2% </strong> Quiz Bowl Players Nationally",
        "AIME <strong>3x</strong> Qualifier",
        "<strong>John Locke Essay</strong> Contest Merit Awardee"
      ],
      accomplishments: [
        "<strong> Patent holder </strong> for a navigation system for the visually impaired",
        "Conducted <strong>award-winning research</strong> in machine learning",
        "Developed innovative apps and technologies with over <strong>10,000 users</strong>"
      ],
      funFact: "Can recall random historical events faster than Google (but only when no one's testing him).",
      image: ""
    },
    {
      name: "Ethan Varghese",
      awards: [
        "USACO <strong> Gold </strong>",
        "4× International Hackathon Winner | 1st out of ~1,000 participants in each competition | $3,000+ in Total Cash Prizes",
      ],
      accomplishments: [
        "Intern at <strong>Caltech's Netlab</strong>",
        "Designed and developed Anti-Covid Sanitization Robot for <strong> Amazon </strong> storage facilities, demoed at Intel partner showcase",
        "Published research paper at <strong> National Linguistics Conference </strong>",
        "Run an EdTech start-up with <strong>10,000+</strong> users, patent holding status, and VC funding"
      ],
      funFact: "I am an avid philatelist (collect lots of stamps)!",
      image: "https://netlab.caltech.edu/assets/img/people/visiting-graduates/Ethan_Varghese-480.webp"
    },
    {
      name: "Nirav Jaiswal",
      awards: [
        "Stanford Speech & Debate Semifinalist",
        "<strong> Top 0.5% </strong> SAT, PSAT, ACT Scores",
      ],
      accomplishments: [
        "Worked with <strong> Wingstop and LegalZoom </strong> while running a <strong> five-figure </strong> clothing startup",
        "Interned at <strong> Berkeley Lab </strong>, contributing to cutting-edge research on energy-efficient computing and data systems",
        "Worked with <strong> Duke PhD </strong> student on reinforcement learning research paper accepted for publication"
      ],
      funFact: "Once got mistaken for a professional marketer after a school project went viral.",
      image: nirav
    },
    {
      name: "Aaron Rathore",
      awards: [
        "USABO <strong>Honor List</strong>",
        "3rd Place <strong>Lockheed Martin</strong> CyberQuest Competition",
        "International Biology Bowl <strong>Semifinalist</strong>"
      ],
      accomplishments: [
        "Interned at a company to computationally design enzymes",
        "Research Intern @ <strong> Stanford </strong> MechE Lab",
        "<strong> UCSD </strong> Assistant with Bioengineering Group"
      ],
      funFact: "Accidentally joined a chess tournament thinking it was a coding competition—and still won a few rounds.",
      image: ""
    },
    {
      name: "Advay Bajpai",
      awards: [
        "<strong>Congressional App Challenge</strong> District Finalist"
      ],
      accomplishments: [
        "Managed logistics and operations for tech-driven projects",
        "Ensured seamless execution of multi-team collaborations",
        "Specialized in operations for high-stakes environments",
        "Streamlined processes for team efficiency"
      ],
      funFact: "Once turned a simple spreadsheet into an automated task manager that everyone in his team started using.",
      image: "https://static.wixstatic.com/media/f2b832_1e4bda9652e8405f8cdea759c85f5060~mv2.png/v1/crop/x_0,y_11,w_260,h_260/fill/w_364,h_364,al_c,lg_1,q_85,enc_auto/AdvayBajpai.png"
    }
  ];

  function AboutUs() {
    return (
      <div className="py-16 bg-gray-50 text-black">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-12 uppercase tracking-wide text-gray-800">
            Meet Our Team
          </h1>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamLeaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-blue-500 p-6 text-center"
              >
                <div className="relative flex justify-center mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
                  />
                </div>
  
                <h3 className="text-2xl font-bold text-gray-900">{leader.name}</h3>
  
                <div className="mt-4 text-center">
                  <h4 className="text-md font-semibold text-gray-700 uppercase flex items-center gap-2 justify-center">
                    🏆 Awards
                  </h4>
                  <ul className="text-gray-600 text-sm mt-1 leading-relaxed text-center">
                    {leader.awards.map((award, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: award }} />
                    ))}
                  </ul>
                </div>
  
                <div className="mt-4 text-center">
                  <h4 className="text-md font-semibold text-gray-700 uppercase flex items-center gap-2 justify-center">
                    🚀 Accomplishments
                  </h4>
                  <ul className="text-gray-600 text-sm mt-1 leading-relaxed text-center">
                    {leader.accomplishments.map((accomplishment, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: accomplishment }} />
                    ))}
                  </ul>
                </div>
  
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-700 uppercase flex items-center gap-2 justify-center">
                    🤔 Fun Fact
                  </h4>
                  <p className="text-gray-600 text-sm italic">{leader.funFact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  

export default AboutUs;