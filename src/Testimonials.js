import React from "react";
import LingoSage from "./assets/LingoSage.png";
import SAT from "./assets/1580.png";

const testimonials = [
  {
    name: "Aditi S.",
    role: "Research Intern at UCLA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_logo.svg/1280px-UCLA_Bruins_logo.svg.png",
    before: [
      "Had no idea how to approach professors",
      "Struggled with writing outreach emails",
      "Unclear on how to structure a research resume"
    ],
    after: [
      "Crafted the perfect outreach email",
      "Refined resume and interview skills",
      "Landed a research internship at UCLA"
    ]
  },
  {
    name: "Jake M.",
    role: "Accepted into EinR at Berkeley Labs",
    logo: "https://www.lbl.gov/wp-content/uploads/2022/07/About-4-UC.png",
    before: [
      "Overwhelmed by summer program applications",
      "Struggled with writing compelling essays",
      "Didn't know how to showcase achievements"
    ],
    after: [
      "Received a curated list of opportunities",
      "Polished essays with expert feedback",
      "Accepted into top-choice program with a scholarship"
    ]
  },
  {
    name: "Sophia L.",
    role: "Corporate Internship at LingoSage",
    logo: LingoSage,
    before: [
      "Had no leads for internships",
      "Resume lacked industry appeal",
      "Struggled with confidence in interviews"
    ],
    after: [
      "Connected with the right people",
      "Revamped resume and cover letter",
      "Secured an internship at LingoSage"
    ]
  },
  {
    name: "Ryan T.",
    role: "Scored a 1580 on the SAT",
    logo: SAT,
    before: [
      "Struggled to break past a score plateau",
      "Inefficient study methods",
      "Low confidence in test-taking"
    ],
    after: [
      "Personalized study plan & expert strategies",
      "Improved time management",
      "Achieved a 1580 SAT score"
    ]
  },
  {
    name: "Joseph C.",
    role: "Accepted into the Stanford SIMR Program",
    logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png",
    before: [
      "Uncertain how to make application stand out",
      "Struggled with crafting a strong personal statement",
      "Lacked direction in program selection"
    ],
    after: [
      "Received step-by-step application guidance",
      "Personal statement refined to highlight strengths",
      "Accepted into Stanford SIMR"
    ]
  },
  {
    name: "Wei Y.",
    role: "Research Internship at Harvard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png",
    before: [
      "Didn't know how to secure a research internship",
      "Generic outreach emails were ignored",
      "Lacked interview experience"
    ],
    after: [
      "Identified & contacted the right professors",
      "Outreach emails refined for impact",
      "Confidently nailed the interview & secured offer"
    ]
  }
];

const Testimonials = () => {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl text-center mt-12 leading-snug text-gray-400">
          Real Stories. Real{" "}
          <span className="font-bold text-black relative inline-block">
            successes.
            <svg
              className="absolute left-0 bottom-[-8px] w-full h-5"
              viewBox="0 0 200 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15 C 50 25, 150 5, 195 15"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
          </span>
        </h1>

        {/* Student Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div className="relative inline-flex group" key={index}>
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              <div className="relative bg-white shadow-2xl rounded-lg p-6 text-center duration-500 hover:scale-105 w-full">
                <img
                  src={testimonial.logo}
                  alt={`${testimonial.name} logo`}
                  className="h-12 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>
                <div className="text-left space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-gray-600 font-semibold mb-2 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      The Challenge
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      {testimonial.before.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-blue-600 font-semibold mb-2 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      The Result
                    </h4>
                    <ul className="space-y-2 text-blue-600">
                      {testimonial.after.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Parent Testimonials */}
        <h2 className="text-4xl md:text-5xl text-center mt-12 leading-snug text-gray-400">
          And here's what{" "}
          <span className="font-bold text-black relative inline-block">
            parents
            <svg
              className="absolute left-0 bottom-[-8px] w-full h-5"
              viewBox="0 0 200 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15 C 50 25, 150 5, 195 15"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
          </span>{" "}
          are saying.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-12">
          {[
            {
              name: "Susan D.",
              role: "Parent of a High School Junior",
              text: (
                <>
                  Arena Counseling Services helped my daughter secure a{" "}
                  <span className="highlight">research internship at UCLA</span>. Their team not only
                  helped her refine her <span className="highlight">resume</span> and craft tailored <span className="highlight">outreach emails</span> to professors, but also provided interview coaching that gave her the
                  confidence she needed to excel. The level of detail and dedication they provided was
                  exceptional, and the internship opportunity has been a turning point in her academic
                  career!
                </>
              ),
            },
            {
              name: "Mark T.",
              role: "Parent of a College-Bound Senior",
              text: (
                <>
                  Arena Counseling Services completely transformed my son's approach to the <span className="highlight">SAT</span>. With their personalized study plan and expert guidance, he was able to improve his score by <span className="highlight">200 points</span>. The one-on-one tutoring and tailored test-taking strategies gave him the confidence he needed, and we're thrilled with the results. Their support made all the difference in helping him reach his <span className="highlight">college goals</span>.
                </>
              ),
            },
            {
              name: "Emily W.",
              role: "Parent of a Student Preparing for the USABO",
              text: (
                <>
                  My daughter was preparing for the{" "}
                  <span className="highlight">USA Biology Olympiad (USABO)</span> and needed support beyond regular schoolwork. Arena Counseling Services provided <span className="highlight">personalized tutoring</span> focused on competition-level content, which helped her gain a deeper understanding of biology concepts and <span className="highlight">excel in the semifinals</span>. Their team went above and beyond to ensure she was fully prepared for each phase of the competition.
                </>
              ),
            },
          ].map((testimonial, index) => (
            <div className="relative inline-flex group" key={index}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-md opacity-0 group-hover:opacity-100 group-hover:duration-300 transition-all"></div>

              <div className="relative bg-white shadow-2xl rounded-lg p-6 text-center duration-500 hover:scale-105">
                <p className="text-black italic mb-4">{testimonial.text}</p>
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