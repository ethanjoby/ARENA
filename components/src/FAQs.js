import React, { useState } from "react";

const FAQs = () => {
  const faqData = [
    {
      question: "What is the ARENA program?",
      answer: "ARENA is a program designed to help high school students craft exceptional essays for their summer program applications.",
    },
    {
      question: "Who is eligible to join the ARENA program?",
      answer: "The ARENA program is open to all high school students preparing for summer program applications.",
    },
    {
      question: "What services does ARENA provide?",
      answer: "We offer personalized essay guidance, expert feedback, and one-on-one mentoring to maximize your chances of getting accepted into top summer programs.",
    },
    {
      question: "How much does the ARENA program cost?",
      answer: "The first program costs $10, and each additional program is $5. Total cost depends on the number of programs selected.",
    },
    {
      question: "How do I make a payment for ARENA services?",
      answer: "Payment details will be shared via email after you confirm your interest in our services.",
    },
    {
      question: "What is the refund policy for the ARENA program?",
      answer: "Unfortunately, we do not offer refunds once services have been provided. Please ensure you're fully committed before proceeding.",
    },
    {
      question: "How will ARENA improve my chances of acceptance?",
      answer: "Our specialists provide tailored advice, essay reviews, and proven strategies to help your application stand out to program admissions teams.",
    },
  ];
  

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" container mx-auto p-6 bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
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
