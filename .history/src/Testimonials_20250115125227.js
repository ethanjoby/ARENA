import React from "react";

const Testimonials = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-6">
        {/* Top section with logos */}
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-sm uppercase text-gray-400">
            Our team has been accepted to programs  and done research with professors a
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <img
              src="https://www.turbolearn.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstanford.57682cbd.png&w=1920&q=75"
              alt="Stanford"
              className="h-20 opacity-75"
            />
            <img
              src="https://calbridge.org/wp-content/uploads/2024/05/Seal_of_the_California_Institute_of_Technology-svg.png"
              alt="Caltech"
              className="h-20 opacity-75"
            />
            <img
              src="https://seeklogo.com/images/H/harvard-university-logo-D7CC65EE30-seeklogo.com.png"
              alt="Harvard"
              className="h-20 opacity-75"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_logo.svg/1280px-UCLA_Bruins_logo.svg.png"
              alt="UCLA"
              className="h-20 opacity-75"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png"
              alt="UC Berkley"
              className="h-20 opacity-75"
            />

          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mt-12">
          Don't listen to us. Listen to our students.
        </h2>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Testimonial Card */}
          {[
            {
              name: "Sheryl Berge",
              role: "Physics Major at MIT",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1280px-MIT_logo.svg.png",
              text: "I can focus on understanding concepts, not just jotting down notes. It's like having a personal study assistant.",
            },
            {
              name: "Kiehn Po",
              role: "Princeton Student",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Princeton_Tigers_logo.svg/1200px-Princeton_Tigers_logo.svg.png",
              text: "Love how it generates quizzes from my lectures. Makes revising so much more efficient and less stressful.",
            },
            {
              name: "Peter Renolds",
              role: "Political Science Major",
              logo: "https://seeklogo.com/images/H/harvard-university-logo-D7CC65EE30-seeklogo.com.png",
              text: "I love how it can take an article and break it into bite-sized materials. Reading academic articles feels less daunting now.",
            },
            {
              name: "Yash Sharma",
              role: "Public Policy Student at Duke",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/1200px-Duke_Athletics_logo.svg.png",
              text: "The flashcards created are tailored to my learning style. It's like the AI knows exactly what I need to study.",
            },
            {
              name: "Presley Burghardt",
              role: "Premed student at Stanford",
              logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png",
              text: "It turns my YouTube binges into productive study sessions. It's a game-changer.",
            },
            {
              name: "Rithik Duvva",
              role: "Economics Major at Duke",
              logo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg",
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