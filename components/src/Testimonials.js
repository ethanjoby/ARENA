import React from "react";

const Testimonials = () => {
  return (
    <div className="bg-white text-black py-16">
      <div className="container mx-auto px-6">
        {/* Top section with logos */}
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-sm uppercase text-gray-500">
            Our team has been accepted to programs  and done research with professors at top universities:
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <img
              src="https://www.turbolearn.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstanford.57682cbd.png&w=1920&q=75"
              alt="Stanford"
              className="h-20 "
            />
            <img
              src="https://calbridge.org/wp-content/uploads/2024/05/Seal_of_the_California_Institute_of_Technology-svg.png"
              alt="Caltech"
              className="h-20 "
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png"
              alt="Harvard"
              className="h-20 "
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_logo.svg/1280px-UCLA_Bruins_logo.svg.png"
              alt="UCLA"
              className="h-20 "
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png"
              alt="UC Berkley"
              className="h-20 "
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
              text: "Working with ARENA completely transformed my college application process. The personalized guidance and essay reviews helped me stand out in ways I couldn’t have imagined. I owe my acceptance to Harvard to their amazing team!",
            },
            {
              name: "Kiehn Po",
              role: "Princeton Student",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Princeton_Tigers_logo.svg/1200px-Princeton_Tigers_logo.svg.png",
              text: "ARENA made applying to college so much less stressful. From creating a strong application strategy to perfecting my essays, their support was invaluable. I never thought I’d get into my dream school, but they made it happen!",
            },
            {
              name: "Peter Renolds",
              role: "Political Science Major",
              logo: "https://seeklogo.com/images/H/harvard-university-logo-D7CC65EE30-seeklogo.com.png",
              text: "I was overwhelmed by the number of schools and requirements, but ARENA’s step-by-step approach made everything manageable. They helped me highlight my strengths and build a compelling application. Couldn’t have done it without them!",
            },
            {
              name: "Yash Sharma",
              role: "Public Policy Student at Duke",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/1200px-Duke_Athletics_logo.svg.png",
              text: "ARENA’s counselors were so approachable and knowledgeable. They gave me honest feedback and pushed me to submit my best work. I’m thrilled with my results and can’t recommend them enough.",
            },
            {
              name: "Presley Burghardt",
              role: "Premed student at Stanford",
              logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png",
              text: "I felt like I had someone in my corner every step of the way. ARENA made me believe in myself and my potential. Their essay workshops and mock interviews were a game-changer for me.",
            },
            {
              name: "Rithik Duvva",
              role: "Economics Major at Duke",
              logo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg",
              text: "Before working with ARENA, I had no idea how to tackle college essays or build a strong application. They helped me tell my story in a way that was both authentic and impressive. I’m so grateful for their guidance!",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-6 shadow-md text-center"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;