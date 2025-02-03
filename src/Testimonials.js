import React, { useState } from "react";
import LingoSage from "./assets/LingoSage.png";
import SAT from "./assets/1580.png";

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl  text-center mt-12  leading-snug text-gray-400">
  Don't listen to us.  
  <span className="block text-4xl md:text-5xl ">
    Listen to our <span className = "font-bold text-black">students.</span>
  </span>
</h1>




        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              name: "Aditi R.",
              role: "Research Intern at UCLA",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_logo.svg/1280px-UCLA_Bruins_logo.svg.png",
              text: "Before working with Arena Counseling Services, I had no idea how to approach professors for research opportunities. Their team helped me craft the perfect email, refine my resume, and prepare for interviews. Thanks to their guidance, I landed a research internship at a top university that aligns perfectly with my interests!",
            },
            {
              name: "Jake M.",
              role: "Accepted into EinR at Berkley Labs",
              logo: "https://www.lbl.gov/wp-content/uploads/2022/07/About-4-UC.png",
              text: "I didn’t know where to start when applying to summer programs, but Arena Counseling Services made everything so much easier. They curated a list of opportunities that matched my interests and helped me polish my essays. I not only got accepted into my top-choice program, but I also received a scholarship!",
            },
            {
              name: "Sophia L.",
              role: "Landed a Corporate Internship at a Tech Company",
              logo: LingoSage,
              text: "I was struggling to find internships, but Arena Counseling Services connected me with the right people and gave me the confidence to apply. They revamped my resume and cover letter, and their interview coaching made all the difference. I secured an internship at a tech start-up LingoSage, and I know I couldn’t have done it without their help!",
            },
            {
              name: "Ryan T.",
              role: "Scored a 1580 on the SAT",
              logo: SAT,
              text: "I was struggling to improve my SAT score, but Arena Counseling Services completely transformed my approach. Their personalized study plan and expert strategies helped me boost my score to a 1580! The practice tests and test-taking tips they provided made a huge difference in my confidence and performance. I’m so grateful for their guidance, which helped me achieve a score I’m proud of!",
            },
            {
              name: "Daniel K.",
              role: "Accepted into the Stanford SIMR Summer Program",
              logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png",
              text: "I was determined to get into the Stanford SIMR program, but I wasn’t sure how to make my application stand out. Arena Counseling Services guided me through every step—from selecting the right program to crafting a compelling personal statement. Their support helped me fine-tune my application and make it truly shine. I was ecstatic when I was accepted into the program!",
            },
            {
              name: "Maya S.",
              role: "Landed a Research Internship at Harvard",
              logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png",
              text: "I never imagined I’d have the chance to intern at Harvard, but Arena Counseling Services made it possible! They helped me identify the right professors to contact, refine my outreach emails, and prepare a standout application. Their resume and interview coaching gave me the confidence I needed, and I was thrilled to receive an offer!",
            },
          ].map((testimonial, index) => (
            <div className="relative inline-flex group" key={index}>
              {/* Gradient Background for the hovered card */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-md opacity-0 group-hover:opacity-100 group-hover:duration-300 transition-all"></div>
              
              <div
                className={`relative group bg-white shadow-2xl rounded-lg p-6 shadow-md text-center duration-500 hover:scale-103 ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-100" : "opacity-100"}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={testimonial.logo}
                  alt={`${testimonial.name} logo`}
                  className="h-10 mx-auto mb-4"
                />
                <p className="text-black italic mb-4">"{testimonial.text}"</p>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
