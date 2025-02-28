import React, { useState, useEffect } from "react";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Webinars = () => {
    const webinarData = [
        {
          date: "Mar 3, 2025",
          time: "6:30 PM",
          title: "College Decision Day: Insights from Foothill Seniors",
          description: "Current Foothill seniors share their college application journeys and decision-making processes. Get firsthand advice on navigating acceptances, comparing financial aid packages, and making your final choice.",
          category: "Student Experiences",
          registration: "https://zoom.us/webinar/register/WN_newexample1"
        },
        {
          date: "Mar 10, 2025",
          time: "6:30 PM",
          title: "Balancing AP Courses: Foothill Student Success Stories",
          description: "Hear directly from Foothill seniors who have successfully managed rigorous AP course loads while maintaining extracurriculars and mental health. Learn time management strategies that actually work.",
          category: "Academic Success",
          registration: "https://zoom.us/webinar/register/WN_newexample2"
        },
        {
          date: "Mar 17, 2025",
          time: "6:30 PM",
          title: "Beyond Test Scores: Building a Well-Rounded College Application",
          description: "Foothill seniors and counselors discuss how to develop a compelling personal profile that showcases your unique strengths beyond academics. Learn what actually impressed admission officers at top colleges.",
          category: "College Planning",
          registration: "https://zoom.us/webinar/register/WN_newexample3"
        },
        {
          date: "Mar 24, 2025",
          time: "6:30 PM",
          title: "Navigating STEM Pathways: From Foothill to Top Research Universities",
          description: "Meet Foothill seniors who've secured spots in competitive STEM programs. Learn about research opportunities, coursework preparation, and extracurriculars that helped them stand out to selective universities.",
          category: "Career Pathways",
          registration: "https://zoom.us/webinar/register/WN_newexample4"
        },
        {
          date: "Mar 31, 2025",
          time: "6:30 PM",
          title: "Finding Your Fit: Community College, Gap Year or Four-Year University?",
          description: "Foothill seniors discuss their different post-graduation paths and the decision-making process behind each choice. Get honest perspectives on the benefits of various educational routes.",
          category: "School Options",
          registration: "https://zoom.us/webinar/register/WN_newexample5"
        },
        {
          date: "Apr 7, 2025",
          time: "6:30 PM",
          title: "Scholarship Success: How Foothill Students Secured Financial Aid",
          description: "Learn winning strategies from Foothill seniors who earned substantial scholarships. Get insider tips on local opportunities, essay approaches, and application techniques that helped them fund their education.",
          category: "Financial Planning",
          registration: "https://zoom.us/webinar/register/WN_newexample6"
        },
        {
          date: "Apr 14, 2025",
          time: "6:30 PM",
          title: "The Arts & Humanities Path: Portfolio Development and Audition Prep",
          description: "Foothill seniors headed to arts programs share their experiences preparing portfolios, auditions, and supplemental materials. Learn what creative admissions committees are really looking for.",
          category: "Career Pathways",
          registration: "https://zoom.us/webinar/register/WN_newexample7"
        },
        {
          date: "Apr 21, 2025",
          time: "6:30 PM",
          title: "Summer Before College: Essential Preparations with Foothill Seniors",
          description: "Foothill Seniors return to share what they wish they'd known before starting college. Get practical advice on everything from roommate relationships to course selection and campus resources.",
          category: "College Transition",
          registration: "https://zoom.us/webinar/register/WN_newexample8"
        },
        {
          date: "Apr 28, 2025",
          time: "6:30 PM",
          title: "Mental Health & Academic Success: Balancing the College Prep Journey",
          description: "Foothill seniors and counselors discuss practical strategies for maintaining wellness while pursuing academic excellence. Learn techniques for stress management during the college application process.",
          category: "Student Wellness",
          registration: "https://zoom.us/webinar/register/WN_newexample9"
        },
        {
          date: "May 5, 2025",
          time: "6:30 PM",
          title: "Authentic Essays That Worked: Foothill Seniors Share Their Stories",
          description: "Hear directly from Foothill students who crafted compelling personal statements that helped them gain admission to selective colleges. Learn about their writing process and revision strategies.",
          category: "College Planning",
          registration: "https://zoom.us/webinar/register/WN_newexample10"
        },
        {
          date: "May 12, 2025",
          time: "6:30 PM",
          title: "First-Generation College Students: Navigating the Unknown",
          description: "First-gen Foothill seniors share their unique challenges and triumphs throughout the college preparation process. Learn about resources and support systems that helped them succeed.",
          category: "Student Experiences",
          registration: "https://zoom.us/webinar/register/WN_newexample11"
        },
        {
          date: "May 19, 2025",
          time: "6:30 PM",
          title: "Internships & Research: How Foothill Students Secured Valuable Experience",
          description: "Learn how current Foothill seniors found and secured competitive internships and research positions that strengthened their college applications and career preparation.",
          category: "Career Development",
          registration: "https://zoom.us/webinar/register/WN_newexample12"
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