import React from "react";
import LingoSage from "./assets/LingoSage.png";
import SAT from "./assets/1580.png";

const Testimonials = () => {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl text-center mt-12 leading-snug text-gray-400">
          Don't listen to us.
          <span className="block text-4xl md:text-5xl relative">
            Listen to our{" "}
            <span className="font-bold text-black relative inline-block">
              students.
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
          </span>
        </h1>
        {/* Student Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              name: "Aditi S.",
              role: "Research Intern at UCLA",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_logo.svg/1280px-UCLA_Bruins_logo.svg.png",
              text: (
                <>
                  Before working with Arena Counseling Services, I had no idea
                  how to approach professors for research opportunities. Their
                  team helped me craft the <span className="highlight">perfect</span> email, refine my{" "}
                  <span className="highlight">resume</span>, and prepare for
                  interviews. Thanks to their guidance, I landed a{" "}
                  <span className="highlight">research internship</span> at a{" "}
                  <span className="highlight">top university</span> that aligns
                  perfectly with my interests!
                </>
              ),
            },
            {
              name: "Jake M.",
              role: "Accepted into EinR at Berkeley Labs",
              logo: "https://www.lbl.gov/wp-content/uploads/2022/07/About-4-UC.png",
              text: (
                <>
                  I didn’t know where to start when applying to{" "}
                  <span className="highlight">summer programs</span>, but Arena
                  Counseling Services made everything so much easier. They
                  curated a list of opportunities that matched my interests and
                  helped me polish my <span className="highlight">essays</span>.
                  I not only got accepted into my{" "}
                  <span className="highlight">top-choice</span> program, but I
                  also received a <span className="highlight">scholarship</span>!
                </>
              ),
            },
            {
              name: "Sophia L.",
              role: "Landed a Corporate Internship at a Tech Company",
              logo: LingoSage,
              text: (
                <>
                  I was struggling to find <span className="highlight">internships</span>, but Arena
                  Counseling Services connected me with the right people and gave me the confidence to apply. They revamped my{" "}
                  <span className="highlight">resume</span> and{" "}
                  <span className="highlight">cover letter</span>, and their{" "}
                  <span className="highlight">interview coaching</span> made all the difference. I secured an internship at a tech start-up{" "}
                  <span className="highlight">LingoSage</span>, and I know I couldn’t have done it without their help!
                </>
              ),
            },
            {
              name: "Ryan T.",
              role: "Scored a 1580 on the SAT",
              logo: SAT,
              text: (
                <>
                  I was struggling to improve my{" "}
                  <span className="highlight">SAT score</span>, but Arena Counseling Services completely transformed my approach. Their personalized study plan and{" "}
                  <span className="highlight">expert strategies</span> helped me boost my score to a{" "}
                  <span className="highlight">1580</span>! The practice tests and{" "}
                  <span className="highlight">test-taking tips</span> they provided made a huge difference in my{" "}
                  <span className="highlight">confidence</span> and performance. I’m so grateful for their guidance, which helped me achieve a score I’m proud of!
                </>
              ),
            },
            {
              name: "Joseph C.",
              role: "Accepted into the Stanford SIMR Summer Program",
              logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png",
              text: (
                <>
                  I was determined to get into the{" "}
                  <span className="highlight">Stanford SIMR</span> program, but I wasn’t sure how to make my application stand out. Arena Counseling Services guided me through every step—from selecting the right program to crafting a compelling{" "}
                  <span className="highlight">personal statement</span>. Their support helped me fine-tune my{" "}
                  <span className="highlight">application</span> and make it truly shine. I was ecstatic when I was{" "}
                  <span className="highlight">accepted</span> into the program!
                </>
              ),
            },
            {
              name: "Wei Y.",
              role: "Landed a Research Internship at Harvard",
              logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png",
              text: (
                <>
                  I never imagined I’d have the chance to intern at{" "}
                  <span className="highlight">Harvard</span>, but Arena Counseling Services made it possible! They helped me identify the right professors to contact, refine my{" "}
                  <span className="highlight">outreach emails</span>, and prepare a standout{" "}
                  <span className="highlight">application</span>. Their resume and{" "}
                  <span className="highlight">interview coaching</span> gave me the confidence I needed, and I was thrilled to receive an offer!
                </>
              ),
            },
          ].map((testimonial, index) => (
            <div className="relative inline-flex group" key={index}>
              {/* Gradient Background for the hovered card */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-md opacity-0 group-hover:opacity-100 group-hover:duration-300 transition-all"></div>

              <div
                className={
                  "relative group bg-white shadow-2xl rounded-lg p-6 shadow-md text-center duration-500 hover:scale-103 opacity-100"
                }
              >
                <img
                  src={testimonial.logo}
                  alt={`${testimonial.name} logo`}
                  className="h-10 mx-auto mb-4"
                />
                <p className="text-black italic mb-4">{testimonial.text}</p>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Parent Testimonials */}
        <h2 className="text-4xl md:text-5xl text-center mt-12 leading-snug text-gray-400">
          And here's what
          <span>
            {" "}
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
            </span>
            {" "}
          </span>
          are saying.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              name: "Susan D.",
              role: "Parent of a High School Junior",
              text: (
                <>
                  Arena Counseling Services helped my daughter secure a{" "}
                  <span className="highlight">research internship at the UCLA Plasma Physics Lab</span>. Their team not only
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
                  Arena Counseling Services completely transformed my son's approach to the <span className="highlight">SAT</span>. With their personalized study plan and expert guidance, he was able to improve his score by <span className="highlight">200 points</span>. The one-on-one tutoring and tailored test-taking strategies gave him the confidence he needed, and we’re thrilled with the results. Their support made all the difference in helping him reach his <span className="highlight">college goals</span>.
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
              {/* Gradient Background for the hovered card */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-md opacity-0 group-hover:opacity-100 group-hover:duration-300 transition-all"></div>

              <div
                className={
                  "relative group bg-white shadow-2xl rounded-lg p-6 shadow-md text-center duration-500 hover:scale-103 opacity-100"
                }
              >
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
