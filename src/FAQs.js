import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQs = () => {
  const faqData = [
    {
      question: "What is the ARENA program?",
      answer: "ARENA is a comprehensive counseling service designed to help high school students secure competitive summer programs and internships. ARENA also offers SAT/ACT test preparation.",
      category: "General",
    },
    {
      question: "Who is eligible to join the ARENA program?",
      answer: "Any high school student looking to strengthen their summer program applications, secure internships, or improve their SAT/ACT scores is welcome to join ARENA.",
      category: "Eligibility",
    },
    {
      question: "What services does ARENA provide?",
      answer: "We offer curated summer program lists, essay mentorship, guaranteed or assisted internship placements, resume and cover letter help, and SAT/ACT test prep to ensure students stand out in their applications.",
      category: "Services",
    },
    {
      question: "How much does the ARENA program cost?",
      answer: "Our pricing structure depends on the service you are interested in. Please fill out the interest form and join a free 30-minute consultation meeting to discuss your interests and pricing.",
      category: "Pricing",
    },
    {
      question: "How do I make a payment for ARENA services?",
      answer: "After confirming your interest, we will provide a secure payment option via email. Payments will be made via PayPal.",
      category: "Payments",
    },
    {
      question: "What is the refund policy for the ARENA program?",
      answer: "Since our services involve expert guidance and personalized mentorship, we do not offer refunds once services have been provided. Please reach out with any questions before committing.",
      category: "Payments",
    },
    {
      question: "How does ARENA improve my chances of acceptance?",
      answer: "Our team provides tailored mentorship, essay feedback, and strategic advice based on past successful applicants. We help craft compelling applications, secure professor and company connections for internships, and offer proven test-taking strategies.",
      category: "Services",
    },
    {
      question: "How does ARENA help with internships?",
      answer: "We offer direct support in securing internships, whether through guaranteed placements, professor outreach, or company connections. Our resume and cover letter guidance ensure students present themselves as strong candidates.",
      category: "Services",
    },
    {
      question: "How does SAT/ACT prep with ARENA work?",
      answer: "Our test prep includes personalized study plans, expert-led sessions, practice tests, and targeted strategies to help students maximize their scores and reach their target colleges.",
      category: "Services",
    },
    {
      question: "How do I get started with ARENA?",
      answer: "Simply fill out the interest form by clicking the Register button, and we'll guide you through the process to get started on your path to success! Or, straight away sign up for a consultation meeting.",
      category: "Getting Started",
    }
  ];

  const [openIndexes, setOpenIndexes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);

  const categories = ["All", ...new Set(faqData.map(faq => faq.category))];

  useEffect(() => {
    const filtered = faqData.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredFaqs(filtered);
  }, [searchTerm, selectedCategory]);

  const toggleFAQ = (index) => {
    setOpenIndexes(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-16 bg-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h1>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
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
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-all"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndexes.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndexes.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 py-4 bg-gray-50 text-gray-600 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            No FAQs found matching your search criteria.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FAQs;