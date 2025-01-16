import React, { useState } from "react";

const FAQs = () => {
  const faqData = [
    {
      question: "What's the best thing about Switzerland?",
      answer: "I don't know, but the flag is a big plus.",
    },
    {
      question: "How do you make holy water?",
      answer: "You boil the hell out of it.",
    },
    {
      question: "What do you call someone with no body and no nose?",
      answer: "Nobody knows.",
    },
    {
      question: "Why do you never see elephants hiding in trees?",
      answer: "Because they're so good at it.",
    },
    {
      question: "Why can't you hear a pterodactyl go to the bathroom?",
      answer: "Because the 'P' is silent.",
    },
    {
      question: "Why did the invisible man turn down the job offer?",
      answer: "He couldn't see himself doing it.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" mx-auto p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-700">
            <button
              className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="text-gray-400 py-2 text-left">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
