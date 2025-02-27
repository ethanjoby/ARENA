import React, { useState, useEffect } from "react";
import { Calendar, Clock, Search, ExternalLink, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Webinars = () => {
    const webinarData = [
        {
          date: "Feb 27, 2025",
          time: "6:30 PM",
          title: "Finding the Right Major: A Strategic Approach",
          description: "Uncover strategies to identify a major that aligns with your skills, interests, and long-term goals. Learn how to leverage personality assessments, career trends, and academic strengths.",
          category: "College Planning",
          registration: "https://zoom.us/webinar/register/WN_newexample1"
        },
        {
          date: "Mar 6, 2025",
          time: "6:30 PM",
          title: "SAT vs. ACT: Which Test Plays to Your Strengths?",
          description: "Analyze the fundamental differences between the SAT and ACT, understand scoring nuances, and determine which test best suits your academic style and college aspirations.",
          category: "Test Prep",
          registration: "https://zoom.us/webinar/register/WN_newexample2"
        },
        {
          date: "Mar 13, 2025",
          time: "6:30 PM",
          title: "Elevating Your GPA: Smart Study Habits That Work",
          description: "Master study techniques, organization methods, and productivity hacks to boost your GPA while maintaining a balanced lifestyle.",
          category: "Academic Success",
          registration: "https://zoom.us/webinar/register/WN_newexample3"
        },
        {
          date: "Mar 20, 2025",
          time: "6:30 PM",
          title: "The Road to Medical School: What High Schoolers Need to Know",
          description: "Explore the essential steps for aspiring medical students, including competitive coursework, extracurriculars, and early planning for BS/MD programs.",
          category: "Career Pathways",
          registration: "https://zoom.us/webinar/register/WN_newexample4"
        },
        {
          date: "Mar 27, 2025",
          time: "6:30 PM",
          title: "Demystifying Standardized Testing: The Role of SAT & ACT in Admissions",
          description: "Gain insights into how colleges evaluate standardized test scores and develop a personalized strategy to optimize your performance.",
          category: "Test Prep",
          registration: "https://zoom.us/webinar/register/WN_newexample5"
        },
        {
          date: "Apr 3, 2025",
          time: "6:30 PM",
          title: "Engineering & Tech Careers: Planning Your Future Now",
          description: "Discover the academic pathways and skill-building strategies that can set you up for success in engineering, computer science, AI, and emerging technologies.",
          category: "Career Pathways",
          registration: "https://zoom.us/webinar/register/WN_newexample6"
        },
        {
          date: "Apr 10, 2025",
          time: "6:30 PM",
          title: "Alternative Education Paths: Exploring Online & Hybrid Learning",
          description: "Learn how flexible education models, including online schools and hybrid programs, can offer personalized academic experiences.",
          category: "School Options",
          registration: "https://zoom.us/webinar/register/WN_newexample7"
        },
        {
          date: "Apr 17, 2025",
          time: "6:30 PM",
          title: "Making the Most of Summer: Productive & Impactful Activities",
          description: "Get practical ideas for internships, research projects, leadership roles, and online courses to maximize your summer break.",
          category: "Summer Planning",
          registration: "https://zoom.us/webinar/register/WN_newexample8"
        },
        {
          date: "Apr 24, 2025",
          time: "6:30 PM",
          title: "How to Approach the SAT & ACT: Strategies for Success",
          description: "Break down the best test-taking strategies, time management techniques, and preparation methods to excel on college entrance exams.",
          category: "Test Prep",
          registration: "https://zoom.us/webinar/register/WN_newexample9"
        },
        {
          date: "May 1, 2025",
          time: "6:30 PM",
          title: "Writing Standout College Essays: Crafting a Memorable Narrative",
          description: "Learn how to tell your unique story through compelling college essays that captivate admissions officers.",
          category: "College Planning",
          registration: "https://zoom.us/webinar/register/WN_newexample10"
        },
        {
          date: "May 22, 2025",
          time: "6:30 PM",
          title: "Understanding College Applications: From Start to Finish",
          description: "A step-by-step guide to college applications, including timelines, recommendations, and early admissions strategies.",
          category: "College Planning",
          registration: "https://zoom.us/webinar/register/WN_newexample11"
        },
        {
          date: "May 29, 2025",
          time: "6:30 PM",
          title: "Acing Summer Programs: Maximizing Your Learning Experience",
          description: "Learn how to make the most of summer enrichment programs, including test prep courses, research opportunities, and academic camps.",
          category: "Summer Planning",
          registration: "https://zoom.us/webinar/register/WN_newexample12"
        }
    ];
    

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredWebinars, setFilteredWebinars] = useState(webinarData);
  const [email, setEmail] = useState("");
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);

  const categories = ["All", ...new Set(webinarData.map(webinar => webinar.category))];

  useEffect(() => {
    const filtered = webinarData.filter(webinar => {
      const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          webinar.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || webinar.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredWebinars(filtered);
  }, [searchTerm, selectedCategory]);

  const handleEmailSignup = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to your backend
      console.log("Email submitted:", email);
      setEmail("");
      setShowSignupSuccess(true);
      setTimeout(() => setShowSignupSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Free Webinars for Parents & Students
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join our expert-led sessions to navigate high school success, college admissions, 
          and academic excellence. All webinars are free and hosted online.
        </p>
      </div>

      {/* Email Signup */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Never Miss a Webinar</h2>
            <p className="text-gray-600">Get reminders and updates about our upcoming sessions</p>
          </div>
          <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Subscribe
            </button>
          </form>
        </div>
        <AnimatePresence>
          {showSignupSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-green-600 text-sm"
            >
              Thanks for subscribing! You'll receive updates about our upcoming webinars.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search webinars by topic..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
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
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {webinar.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{webinar.title}</h3>
                <div className="flex items-center mb-4 text-gray-600">
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
                  className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md transition-colors flex items-center justify-center"
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
          <p className="text-xl mb-3">No webinars found matching your search criteria.</p>
          <p>Try adjusting your search terms or browse all categories.</p>
        </motion.div>
      )}

      {/* FAQ Note */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Have Questions?</h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for or need more information about our webinars?
        </p>
        <a
          href="/faqs"
          className="inline-flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
        >
          View our FAQs
        </a>
      </div>
    </div>
  );
};

export default Webinars;