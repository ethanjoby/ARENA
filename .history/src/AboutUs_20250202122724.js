import React from "react";
import nirav from "./assets/nirav_headshot.jpg";

const teamLeaders = [
  {
    name: "Aryan Kumar",
    awards: [
      "Robotics <strong> State Champion </strong>",
      "USCF Chess <strong> State Champion </strong>",
      "Top 1% Blue Ocean International Pitch Competition"
    ],
    accomplishments: [
      "Developed a modern gradebook system used by <strong> 50,000+ </strong> students",
      "Worked with <strong> UCLA </strong> Professor on a patented venture",
      "UC Davis Research Assistant @ ECE Lab"
    ],
    funFact: "Once played chess for 24 hours straight—only stopped when the board started looking 3D.",
    image: "https://static.wixstatic.com/media/f2b832_8e95bd0825f346ed9e2e065ad2587b73~mv2.jpeg/v1/crop/x_0,y_333,w_828,h_830/fill/w_494,h_494,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Aryan.jpeg"
  },
  {
    name: "Ratul Chakraborty",
    awards: [
      "<strong> Top 0.2% </strong> Quiz Bowl Players Nationally",
      "AIME 3x Qualifier",
      "USA Biology Olympiad Honorable Mention",
      "John Locke Essay Contest Merit Awardee"
    ],
    accomplishments: [
      "<strong> Patent holder </strong> for a navigation system for the visually impaired",
      "Conducted award-winning research in machine learning",
      "Developed innovative apps and technologies"
    ],
    funFact: "Can recall random historical events faster than Google (but only when no one's testing him).",
    image: "data:image/jpeg;base64,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"
  },
  {
    name: "Ethan Varghese",
    awards: [
      "USACO <strong> Gold </strong>",
      "4× International Hackathon Winner | 1st out of ~1,000 participants in each competition | $3,000+ in Total Cash Prizes",

    ],
    accomplishments: [
      "Intern at <strong>Caltech's Netlab</strong> ",
      "Designed and developed Anti-Covid Sanitization Robot for <strong> Amazon </strong> storage facilities, demoed at Intel partner showcase",
      "Published research paper at <strong> National Linguistics Conference </strong>",
      "Run an EdTech start-up with <strong>10,000+</strong> users, patent holding status, and VC funding"
    ],
    funFact: "I am an avid philatelist(collect lots of stamps)!",
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
      "USABO Honor List",
      "3rd Place Lockheed Martin CyberQuest Competition",
      "International Biology Bowl Semifinalist"
    ],
    accomplishments: [
      "Interned at a company to computationally design enzymes",
      "Research Intern @ <strong> Stanford </strong> MechE Lab",
      "<strong> UCSD </strong> Assistant with Bioengineering Group"
    ],
    funFact: "Accidentally joined a chess tournament thinking it was a coding competition—and still won a few rounds.",
    image: "data:image/jpeg;base64,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"
  },
  {
    name: "Advay Bajpai",
    awards: [
      "Congressional App Challenge District Finalist"
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
    <div className="py-16 bg-white text-black">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-bold text-center mb-12 uppercase tracking-widest">
          Meet Our Team
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamLeaders.map((leader, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 p-6 border border-gray-300"
            >
              <div className="h-49 w-full bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover"
                />
              </div>


              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900">{leader.name}</h3>

                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-700 uppercase">
                    Awards
                  </h4>
                  <ul className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {leader.awards.map((award, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: award }} />
                    ))}
                  </ul>
                </div>


                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-700 uppercase">
                    Accomplishments
                  </h4>
                  <ul className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {leader.accomplishments.map((accomplishment, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: accomplishment }} />
                    ))}
                  </ul>
                </div>


                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-700 uppercase">
                    Fun Fact
                  </h4>
                  <p className="text-gray-600 text-sm italic">{leader.funFact}</p>
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
