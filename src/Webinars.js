import React, { useState, useEffect } from "react";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Webinars = () => {
    const webinarData = [
      {
          date: "Mar 6, 2025",
          time: "6:30 PM",
          title: "Balancing AP Courses: Foothill Student Success Stories",
          description: "Hear directly from Foothill seniors who have successfully managed rigorous AP course loads while maintaining extracurriculars and mental health. Learn time management strategies that actually work.",
          category: "Academic Success",
          registration: "https://calendar.app.google/1qx3bEh7jnHFny9cA"
        },
        
        {
          date: "Mar 13, 2025",
          time: "6:30 PM",
          title: "Finding Physics at Foothill difficult? What's next?",
          description: "Struggling with Physics at Foothill? Join us to explore practical strategies and next steps—you don’t have to just sit around!",
          category: "School Options",
          registration: "https://calendar.app.google/vZPSNPwVgTJwezVk6"
        },
        {
          date: "Mar 20, 2025",
          time: "6:30 PM",
          title: "Beyond Test Scores: Building a Well-Rounded College Application",
          description: "Foothill seniors and counselors discuss how to develop a compelling personal profile that showcases your unique strengths beyond academics. Learn what actually impressed admission officers at top colleges.",
          category: "College Planning",
          registration: "https://calendar.app.google/94AR9pWmqru76jCE7"
        },
        {
          date: "Mar 27, 2025",
          time: "6:30 PM",
          title: "Navigating STEM Pathways: From Foothill to Top Research Universities",
          description: "Meet Foothill seniors who've secured spots in competitive STEM programs. Learn about research opportunities, coursework preparation, and extracurriculars that helped them stand out to selective universities.",
          category: "Career Pathways",
          registration: "https://calendar.app.google/GGr6PrtNTfo2zxPe6"
        },
        {
          date: "Apr 3, 2025",
          time: "6:30 PM",
          title: "College Decision Day: Insights from Foothill Seniors",
          description: "Current Foothill seniors share their college application journeys and decision-making processes. Get firsthand advice on navigating acceptances, comparing financial aid packages, and making your final choice.",
          category: "Student Experiences",
          registration: "https://calendar.app.google/8uUMjLfhWy49TN9v9"
        },
        {
          date: "Apr 10, 2025",
          time: "6:30 PM",
          title: "What is happening to the CS Job Market? Is it still THE field or should you explore other options?",
          description: "Wondering what’s going on with the CS job market—booming industry or oversaturated field? Join us as we break down the trends, challenges, and whether it’s still the path to pursue!",
          category: "Financial Planning",
          registration: "https://calendar.app.google/PAubCmX4rry3RJFQA"
        },
        {
          date: "Apr 17, 2025",
          time: "6:30 PM",
          title: "Honors English vs. Regular English: Which One is Right for You?",
          description: "Debating between Honors English and Regular English? We’ll discuss the differences in workload, expectations, and benefits to help you make the best choice for your strengths and goals!",
          category: "Career Pathways",
          registration: "https://calendar.app.google/j9QDuFK2vWvZ2dTn9"
        },
        {
          date: "Apr 24, 2025",
          time: "6:30 PM",
          title: "Summer Before College: Essential Preparations with Foothill Seniors",
          description: "Foothill Seniors return to share what they wish they'd known before starting college. Get practical advice on everything from roommate relationships to course selection and campus resources.",
          category: "College Transition",
          registration: "https://calendar.app.google/kLq2UVRbVz3Gqtc46"
        },
        {
          date: "May 1, 2025",
          time: "6:30 PM",
          title: "Online Courses: Are UC Scout, BYU, and Others Worth It?",
          description: "Thinking about taking an online course to get ahead or fulfill requirements? Join us as we explore the pros, cons, and best strategies for making the most of UC Scout, BYU, and other online options!",
          category: "Student Wellness",
          registration: "https://calendar.app.google/nydapett4nvwcQpS7"
        },
        {
          date: "May 8, 2025",
          time: "6:30 PM",
          title: "Authentic Essays That Worked: Foothill Seniors Share Their Stories",
          description: "Hear directly from Foothill students who crafted compelling personal statements that helped them gain admission to selective colleges. Learn about their writing process and revision strategies.",
          category: "College Planning",
          registration: "https://calendar.app.google/s7QZguMnCgfbq7ZCA"
        },
        {
          date: "May 15, 2025",
          time: "6:30 PM",
          title: "First-Generation Parents: What’s Your Role in the College Journey?",
          description: "Navigating college as the child of first-generation parents comes with unique challenges and responsibilities. Join us to discuss how you can support your family while advocating for yourself in the college process!",
          category: "Student Experiences",
          registration: "https://calendar.app.google/iTzqDaxAkth9qYLL9"
        },
        {
          date: "May 22, 2025",
          time: "6:30 PM",
          title: "Internships & Research: How Foothill Students Secured Valuable Experience",
          description: "Learn how current Foothill seniors found and secured competitive internships and research positions that strengthened their college applications and career preparation.",
          category: "Career Development",
          registration: "https://calendar.app.google/p75Ch2S5CeDrqCwX9"
        }
    ];
    
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredWebinars, setFilteredWebinars] = useState(webinarData);

  const categories = ["All", ...new Set(webinarData.map(webinar => webinar.category))];

  useEffect(() => {
    const filtered = webinarData.filter(webinar => {
      const matchesCategory = selectedCategory === "All" || webinar.category === selectedCategory;
      return matchesCategory;
    });
    setFilteredWebinars(filtered);
  }, [selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Free Webinars for Parents & Students
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join sessions led by Foothill seniors who can answer your questions directly and share 
          their firsthand experiences with college admissions, academic success, and more.
        </p>
      </div>

      {/* Webinar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredWebinars.map((webinar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {webinar.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{webinar.title}</h3>
                <div className="flex items-center justify-center mb-4 text-gray-600">
                  <Calendar className="mr-2 w-4 h-4" />
                  <span className="mr-4">{webinar.date}</span>
                  <Clock className="mr-2 w-4 h-4" />
                  <span>{webinar.time}</span>
                </div>
                <p className="text-gray-600 mb-6">{webinar.description}</p>
              </div>

              <div className="px-6 pb-6 mt-auto">
                <a
                  href={webinar.registration}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 px-4 bg-black hover:bg-white hover:text-black border border-black text-white text-center rounded-md transition-colors flex items-center justify-center"
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Register Now
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredWebinars.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500"
        >
          <p className="text-xl mb-3">No webinars found matching your criteria.</p>
          <p>Try selecting a different category.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Webinars;