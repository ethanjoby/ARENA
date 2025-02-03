import React, { useState } from "react";
import TypingAnimation from "./TypingAnimation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQs = () => {
  const faqData = [
    {
      question: "What is the ARENA program?",
      answer: "ARENA is a comprehensive counseling service designed to help high school students secure competitive summer programs and internships. ARENA also offers SAT/ACT test preparation.",
      boldWords: ["counseling", "service", "maximize", "acceptance", "summer", "programs", "internships", "SAT/ACT", "test", "preparation"],
    },
    {
      question: "Who is eligible to join the ARENA program?",
      answer: "Any high school student looking to strengthen their summer program applications, secure internships, or improve their SAT/ACT scores is welcome to join ARENA.",
      boldWords: ["high", "school", "summer", "program", "internships", "scores", "ARENA"],
    },
    {
      question: "What services does ARENA provide?",
      answer: "We offer curated summer program lists, essay mentorship, guaranteed or assisted internship placements, resume and cover letter help, and SAT/ACT test prep to ensure students stand out in their applications.",
      boldWords: ["curated", "essay", "mentorship", "internship", "placements", "resume", "cover", "letter", "SAT/ACT", "stand", "out"],
    },
    {
      question: "How much does the ARENA program cost?",
      answer: "Our pricing structure depends on the service you are interested in. Please fill out the interest form and join a free 15-minute consultation meeting to discuss your interests and pricing.",
      boldWords: ["depends", "on", "the", "service", "interest", "form", "free", "consultation", "meeting"],
    },
    {
      question: "How do I make a payment for ARENA services?",
      answer: "After confirming your interest, we will provide a secure payment option via email. Payments will be made via PayPal.",
      boldWords: ["secure", "payment", "PayPal"],
    },
    {
      question: "What is the refund policy for the ARENA program?",
      answer: "Since our services involve expert guidance and personalized mentorship, we do not offer refunds once services have been provided. Please reach out with any questions before committing.",
      boldWords: ["do", "not", "refunds", "personalized", "mentorship", "guidance"],
    },
    {
      question: "How does ARENA improve my chances of acceptance?",
      answer: "Our team provides tailored mentorship, essay feedback, and strategic advice based on past successful applicants. We help craft compelling applications, secure professor and company connections for internships, and offer proven test-taking strategies.",
      boldWords: ["mentorship", "essay", "feedback", "compelling", "applications", "internships", "test-taking"],
    },
    {
      question: "How does ARENA help with internships?",
      answer: "We offer direct support in securing internships, whether through guaranteed placements, professor outreach, or company connections. Our resume and cover letter guidance ensure students present themselves as strong candidates.",
      boldWords: ["internships", "guaranteed", "placements", "professor", "outreach", "company", "connections", "resume", "cover", "letter"],
    },
    {
      question: "How does SAT/ACT prep with ARENA work?",
      answer: "Our test prep includes personalized study plans, expert-led sessions, practice tests, and targeted strategies to help students maximize their scores and reach their target colleges.",
      boldWords: ["test", "prep", "personalized", "study", "plans", "practice", "tests", "targeted", "strategies"],
    },
    {
      question: "How do I get started with ARENA?",
      answer: "Simply fill out the interest form by clicking the Register button, and we’ll guide you through the process to get started on your path to success!",
      boldWords: ["interest", "form", "Register", "button", "guide", "goals", "success"],
    }
  ];

  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index) // Close it if already open
        : [...prevIndexes, index] // Open it if closed
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-24 bg-white text-black">
      <h1 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 rounded-lg shadow-md p-5 bg-gray-50">
            <button
              className="w-full flex justify-between items-center text-lg font-medium focus:outline-none transition-all duration-300 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="text-gray-600 text-xl">
                {openIndexes.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {openIndexes.includes(index) && (
              <div className="mt-3 text-gray-700 italic text-left">
                <TypingAnimation text={faq.answer} speed={10} boldWords={faq.boldWords} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
