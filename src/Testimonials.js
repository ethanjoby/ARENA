import React from "react";

const Testimonials = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-purple-900 text-white py-16">
      <div className="container mx-auto px-6">
        {/* Top section with logos */}
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-sm uppercase text-gray-400">
            Trusted by students at 3,000+ colleges
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <img
              src="https://www.turbolearn.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstanford.57682cbd.png&w=1920&q=75"
              alt="Stanford"
              className="h-8 opacity-75"
            />
            <img
              src="https://calbridge.org/wp-content/uploads/2024/05/Seal_of_the_California_Institute_of_Technology-svg.png"
              alt="Caltech"
              className="h-8 opacity-75"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/MIT_Seal.svg"
              alt="MIT"
              className="h-8 opacity-75"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a8/University_of_Texas_seal.svg"
              alt="Texas"
              className="h-8 opacity-75"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/Duke_University_seal.svg"
              alt="Duke"
              className="h-8 opacity-75"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Princeton_shield.svg"
              alt="Princeton"
              className="h-8 opacity-75"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mt-12">
          Join 500,000+ students.
        </h2>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Testimonial Card */}
          {[
            {
              name: "Sheryl Berge",
              role: "Physics Major at MIT",
              logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/MIT_Seal.svg",
              text: "I can focus on understanding concepts, not just jotting down notes. It's like having a personal study assistant.",
            },
            {
              name: "Kiehn Po",
              role: "Princeton Student",
              logo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Princeton_shield.svg",
              text: "Love how it generates quizzes from my lectures. Makes revising so much more efficient and less stressful.",
            },
            {
              name: "Peter Renolds",
              role: "Political Science Major",
              logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Stanford_University_seal_2003.svg",
              text: "I love how it can take an article and break it into bite-sized materials. Reading academic articles feels less daunting now.",
            },
            {
              name: "Yash Sharma",
              role: "Public Policy Student at Duke",
              logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/Duke_University_seal.svg",
              text: "The flashcards created are tailored to my learning style. It's like the AI knows exactly what I need to study.",
            },
            {
              name: "Presley Burghardt",
              role: "Premed student at Stanford",
              logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Stanford_University_seal_2003.svg",
              text: "It turns my YouTube binges into productive study sessions. It's a game-changer.",
            },
            {
              name: "Rithik Duvva",
              role: "Economics Major at Duke",
              logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/Duke_University_seal.svg",
              text: "I feel like I'm studying smarter, not harder. It's a boon for anyone who values efficiency.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-md text-center"
            >
              <img
                src={testimonial.logo}
                alt={`${testimonial.name} logo`}
                className="h-10 mx-auto mb-4"
              />
              <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;