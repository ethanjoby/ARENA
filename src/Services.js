import React from "react";

const CollegeCounselingServices = () => {
  const services = [
    {
      title: "Finding programs that are right for you.",
      icon: "https://www.pngall.com/wp-content/uploads/8/College-PNG-Pic.png",
      gradient: "bg-gradient-to-r from-blue-600 to-blue-900",
      paragraph: "At ARENA, we help students discover academic opportunities that align with their goals, interests, and strengths. Through personalized assessments, we understand your passions and career aspirations, recommending colleges, majors, and programs tailored to your profile. Whether you’re exploring research opportunities, honors tracks, or specialized academic paths, we guide you toward institutions that fit your ambitions. Our expert support ensures you make confident choices, setting the stage for long-term success.",
    },
    {
      title: "Application essay review and feedback.",
      icon: "https://cdn-icons-png.flaticon.com/512/4928/4928898.png",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-600",
      paragraph: "Crafting a compelling application essay is key to standing out in the admissions process, and ARENA is here to help you shine. Our team of experienced counselors provides personalized reviews and constructive feedback to help you tell your story authentically and effectively. We focus on refining your ideas, improving clarity, and showcasing your unique voice while ensuring your essay aligns with the specific expectations of your target schools. With our guidance, you’ll submit an essay that leaves a lasting impression."
    },
    {
      title: "Finding and connecting with professors.",
      icon: "https://cdn1.iconfinder.com/data/icons/file-format-22/64/File_Format_Glyph-29-512.png",
      gradient: "bg-gradient-to-r from-green-500 to-teal-500",
      paragraph: "Choosing the right path—whether it’s selecting a major, career focus, or extracurriculars—can feel overwhelming. ARENA’s counselors provide holistic guidance, using personalized assessments and one-on-one discussions. We help you explore your interests, evaluate options, and create a clear, achievable plan for success. Our goal is to empower you to make informed decisions that align with your aspirations and set you on a path to thrive in college and beyond."
    },
    {
      title: "Guidance on what path is best for you.",
      icon: "https://static.thenounproject.com/png/768328-200.png",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500",
      paragraph: "Choosing the right path—whether it’s selecting a major, career focus, or extracurricular involvement—can feel overwhelming. ARENA’s counselors take a holistic approach to guide you. Through personalized assessments and one-on-one discussions, we help you explore your interests, evaluate options, and map out a clear and achievable plan for success. Our goal is to empower you to make informed decisions that align with your aspirations and set you on a path to thrive in college and beyond."
    },
  ];

  return (
    <section className="services-section bg-black text-white py-16 px-8">
      <h2 className="text-4xl font-bold text-center mb-12">
        What We Do
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card ${service.gradient} p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-between relative`}
          >
            {/* Circled Number */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">
              {index + 1}
            </div>

            {/* Icon */}
            <img
              src={service.icon}
              alt={`${service.title} Icon`}
              className="h-12 w-12 mb-4"
            />

            {/* Title */}
            <p className="font-medium text-lg mb-2">{service.title}</p>
            <p className="font-small text-xs text-gray-200 italic">{service.paragraph}</p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default CollegeCounselingServices;

