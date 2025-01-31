import React, { useState } from "react";

const FAQs = () => {
  const faqData = [
    {
      question: "What is the ARENA program?",
      answer: "ARENA is a comprehensive counseling service designed to help high school students maximize their chances of acceptance into competitive summer programs. We provide expert guidance on program selection, essay writing, internships, and standardized test preparation.",
    },
    {
      question: "Who is eligible to join the ARENA program?",
      answer: "Any high school student looking to strengthen their summer program applications, secure internships, or improve their SAT/ACT scores is welcome to join ARENA.",
    },
    {
      question: "What services does ARENA provide?",
      answer: "We offer curated summer program lists, essay mentorship, guaranteed or assisted internship placements, resume and cover letter help, and SAT/ACT test prep to ensure students stand out in their applications.",
    },
    {
      question: "How much does the ARENA program cost?",
      answer: "Our pricing structure is simple: the first summer program application costs $10, with each additional program costing $5. Internship guidance and test prep pricing may vary—contact us for details.",
    },
    {
      question: "How do I make a payment for ARENA services?",
      answer: "After confirming your interest, we will provide secure payment options via email. Payments can be made via Venmo, PayPal, or other convenient methods.",
    },
    {
      question: "What is the refund policy for the ARENA program?",
      answer: "Since our services involve expert guidance and personalized mentorship, we do not offer refunds once services have been provided. Please reach out with any questions before committing.",
    },
    {
      question: "How does ARENA improve my chances of acceptance?",
      answer: "Our team provides tailored mentorship, essay feedback, and strategic advice based on past successful applicants. We help craft compelling applications, secure professor and company connections for internships, and offer proven test-taking strategies.",
    },
    {
      question: "How does ARENA help with internships?",
      answer: "We offer direct support in securing internships, whether through guaranteed placements, professor outreach, or company connections. Our resume and cover letter guidance ensure students present themselves as strong candidates.",
    },
    {
      question: "How does SAT/ACT prep with ARENA work?",
      answer: "Our test prep includes personalized study plans, expert-led sessions, practice tests, and targeted strategies to help students maximize their scores and reach their target colleges.",
    },
    {
      question: "How do I get started with ARENA?",
      answer: "Simply reach out to us through our website or email to discuss your goals, and we’ll guide you through the process to get started on your path to success!"
    }
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
