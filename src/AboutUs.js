import React from "react";
import nirav from "./assets/Nirav.jpg";
import aaron from "./assets/Aaron1.jpg"
import advay from "./assets/AdvayPFP.jpg"
import aryan from "./assets/Aryan.jpg"
import ratul from "./assets/Ratul1.jpg"
import ethan from "./assets/Ethan4.jpg"

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
    funFact: "Aryan enjoys collecting rare chess sets and has played in tournaments across different states.",
    image: aryan
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
    funFact: "Ratul has an extensive personal library of over 300 books, covering topics from philosophy to artificial intelligence, and re-reads his favorites often.",
    image: ratul
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
    funFact: "Ethan is an avid philatelist and enjoys collecting stamps from around the world.",
    image: ethan
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
    funFact: "Nirav has a passion for fashion and design, spending hours sketching concepts and analyzing trends before launching his own successful clothing line.",
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
    funFact: "Aaron has always been fascinated by nature and has a collection of pressed flowers and plants from different places he’s visited.",
    image: aaron
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
    funFact: "Advay loves experimenting with productivity techniques and has meticulously tested different methods to optimize his daily workflow.",
    image: advay
  }
];




  function AboutUs() {
    return (
      <div className="py-16 bg-white text-black">
        <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-4 mb-16">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center tracking-wide">
  Our team has been accepted to programs and conducted research with professors at top universities
</h2>



  <div className="flex flex-wrap justify-center gap-6 py-8">
    <img
      src="https://www.turbolearn.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstanford.57682cbd.png&w=1920&q=75"
      alt="Stanford"
      className="h-20"
    />
    <img
      src="https://calbridge.org/wp-content/uploads/2024/05/Seal_of_the_California_Institute_of_Technology-svg.png"
      alt="Caltech"
      className="h-20"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png"
      alt="Harvard"
      className="h-20"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_logo.svg/1280px-UCLA_Bruins_logo.svg.png"
      alt="UCLA"
      className="h-20"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png"
      alt="UC Berkley"
      className="h-20"
    />
  </div>
</div>

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