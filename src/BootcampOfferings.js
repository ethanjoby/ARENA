import React, { useState, useEffect } from "react";
import NAVBAR2 from "./navbar2";
import HeroSectionSAT from "./HeroSectionSAT";

const bootcampOfferings = [
  {
    title: "SAT Intensive Bootcamp",
    icon: "📊",
    description: "Crush the SAT with our last-minute intensive bootcamp! Designed for students who need a quick score boost, this program focuses on high-impact strategies and targeted practice to maximize your results in just 4 weeks.",
    highlights: [
      "Small group sessions for personalized attention",
      "16 hours of focused, high-yield instruction",
      "Weekly practice tests with detailed analysis to track progress",
      "Targeted strategies for quick score improvement"
    ],
    details: [
      {
        heading: "Curriculum",
        points: [
          "Critical Reading: Quick strategies for passage analysis & question patterns",
          "Mathematics: Fast-track problem-solving approaches & content review",
          "Writing & Language: Rapid grammar rules & essay structure techniques",
          "Test-specific strategies & time management hacks"
        ]
      },
      {
        heading: "Results",
        points: [
          "Average score improvement: 150+ points (SAT) / 4+ points (ACT) in just 4 weeks!",
          "93% of students exceed their target scores with our last-minute strategies",
          "Comprehensive materials included for immediate use",
          "Guaranteed results or free follow-up sessions"
        ]
      }
    ],
    sessions: [
      {
        name: "Winter Preparation",
        dates: "Feb 8 - Mar 1, 2025",
        schedule: "Saturday, 9:00 AM - 1:00 PM",
        price: "$950",
        spaces: "Limited Spots",
        popularity: "Complete",
        targetExam: "Targeting March 8th Sat Exam"
      },
      {
        name: "Summer Intensive",
        dates: "May 10 - May 31, 2025",
        schedule: "Saturday, 9:00 AM - 1:00 PM",
        price: "$950",
        spaces: "Limited Spots",
        popularity: "High demand",
        targetExam: "Targeting June 7th SAT Exam",
        urgencyNote: "Last chance to boost your score before the June SAT!"
      },
      {
        name: "Fall Preparation",
        dates: "Jul 26 - August 16, 2025",
        schedule: "Saturday, 9:00 AM - 1:00 PM",
        price: "$950",
        spaces: "Limited Spots",
        popularity: "Filling quickly",
        targetExam: "Targeting August 23rd SAT Exam",
        urgencyNote: "Don't miss this final opportunity to prepare for the August SAT!"
      },
    ]
  },
  {
    title: "ACT Intensive Bootcamp",
    icon: "📈",
    description: "Ace the ACT with our last-minute crash course! This intensive 4-week program is perfect for students looking to quickly improve their scores with focused, high-impact strategies and personalized coaching.",
    highlights: [
      "Small group sessions for maximum focus",
      "16 hours of concentrated, high-yield instruction",
      "Weekly practice tests with detailed feedback",
      "Quick-score strategies tailored to your needs"
    ],
    details: [
      {
        heading: "Curriculum",
        points: [
          "Critical Reading: Quick strategies for passage analysis & question patterns",
          "Mathematics: Fast-track problem-solving approaches & content review",
          "Writing & Language: Rapid grammar rules & essay structure techniques",
          "Test-specific strategies & time management hacks"
        ]
      },
      {
        heading: "Results",
        points: [
          "Average score improvement: 150+ points (SAT) / 4+ points (ACT) in just 4 weeks!",
          "93% of students exceed their target scores with our last-minute strategies",
          "Comprehensive materials included for immediate use",
          "Guaranteed results or free follow-up sessions"
        ]
      }
    ],
    sessions: [
      {
        name: "Summer Intensive",
        dates: "May 17 - June 7, 2025",
        schedule: "Saturday, 9:00 AM - 1:00 PM",
        price: "$950",
        spaces: "Limited Spots",
        popularity: "High demand",
        targetExam: "Targeting June 14th ACT Exam"
      },
      {
        name: "Fall Preparation",
        dates: "Aug 9 - Aug 30, 2025",
        schedule: "Saturday, 9:00 AM - 1:00 PM",
        price: "$950",
        spaces: "Limited Spots",
        popularity: "Filling quickly",
        targetExam: "Targeting September 6th ACT Exam"
      },
      {
        name: "Winter Preparation",
        dates: "TBD, 2025",
        schedule: "Saturday, 9:00 AM - 1:00 PM",
        price: "$950",
        spaces: "Limited Spots",
        popularity: "Early registration",
        targetExam: "Targeting December 13th ACT Exam"
      },
    ]
  },
  {
    title: "AP Exam Preparation Bootcamp",
    icon: "🎓",
    description: "Comprehensive preparation for AP exams designed to strengthen your understanding of key concepts and develop effective test-taking strategies.",
    highlights: [
      "Subject-specific intensive review",
      "16 hours of focused instruction per AP subject",
      "Practice with authentic AP questions",
      "Expert instruction from experienced AP teachers"
    ],
    details: [
      {
        heading: "Subjects Offered",
        points: [
          "AP Biology",
          "AP World History",
          "AP CSA",
        ]
      },
      {
        heading: "Program Benefits",
        points: [
          "Content mastery & gap identification",
          "Targeted strategies for free-response questions",
          "Complete review of course material",
        ]
      }
    ],
    sessions: [
      {
        name: "Spring Break Intensive",
        dates: "March 22-23 & March 29-30, 2025",
        schedule: "Sat & Sun, 5:00 PM - 9:00 PM",
        price: "$795/subject",
        spaces: "Limited Spots",
        popularity: "Early Prep",
        targetExam: "Targeting 2025 AP Exams"
      },
      {
        name: "April Crash Course",
        dates: "April 5-26, 2025",
        schedule: "Saturday, 5:00 PM - 9:00 PM",
        price: "$895/subject",
        spaces: "Limited Spots",
        popularity: "Deep Dive",
        targetExam: "Targeting 2025 AP Exams"
      },
      {
        name: "Final Review Sessions",
        dates: "April 26-27 & May 3-4, 2025",
        schedule: "Sat & Sun, 5:00 PM - 9:00 PM",
        price: "$995/subject",
        spaces: "Limited Spots",
        popularity: "Last-Minute",
        targetExam: "Targeting 2025 AP Exams"
      }
]

  }
];

// Statistics for animated counters
const statistics = [
  { label: "Average Score Improvement", target: 170, suffix: " points" },
  { label: "Student Satisfaction", target: 98, suffix: "%" }
];
const handleCheckout = (offeringTitle, sessionName, price) => {
  // Remove $ and convert to number
  const priceValue = parseFloat(price.replace('$', ''));

  // Determine the payment link based on the offering title
  let paymentLink = '';
  if (offeringTitle.includes("SAT")) {
    paymentLink = "https://www.paypal.com/ncp/payment/U89XS9CLFZ5BQ";
  } else if (offeringTitle.includes("ACT")) {
    paymentLink = "https://www.paypal.com/ncp/payment/2J8CYWVABXYMU";
  } else if (offeringTitle.includes("AP")) {
    paymentLink = "https://www.paypal.com/ncp/payment/7N9W9SBDGQ3XL";
  }

  // Create checkout object
  const checkoutData = {
    program: offeringTitle,
    session: sessionName,
    price: priceValue,
    date: new Date().toISOString()
  };

  // Save checkout data to localStorage
  localStorage.setItem('checkout_data', JSON.stringify(checkoutData));

  // Redirect to the appropriate payment link
  window.open(paymentLink, '_blank');
};



// Testimonials
const testimonials = [
  {
    quote: "I joined the SAT bootcamp just 3 weeks before my exam and my score improved by 210 points! The last-minute strategies were exactly what I needed.",
    author: "Michael T.",
    role: "SAT Bootcamp Graduate",
    initials: "MT",
    score: "1580 SAT",
    rating: 5
  },
  {
    quote: "The ACT bootcamp helped me improve my score by 4 points in just 4 weeks. The quick, targeted strategies made all the difference!",
    author: "Emma R.",
    role: "ACT Bootcamp Graduate",
    initials: "ER",
    score: "33 ACT",
    rating: 5
  },
  {
    quote: "I tried other prep programs before, but this bootcamp was truly transformative. The personalized approach made all the difference in my ACT score.",
    author: "James K.",
    role: "ACT Bootcamp Graduate",
    initials: "JK",
    score: "35 ACT",
    rating: 5
  },
  {
    quote: "The SAT Math bootcamp helped me overcome my anxiety with problem-solving. My score jumped from 620 to 780 after just three weeks of focused preparation.",
    author: "Olivia M.",
    role: "SAT Math Student",
    initials: "OM",
    score: "780 SAT Math",
    rating: 5
  },
  {
    quote: "The SAT Reading bootcamp transformed my approach to complex passages. My score improved from 720 to 760 in just six sessions!",
    author: "Jason T.",
    role: "SAT Reading Student",
    initials: "JT",
    score: "760 SAT Reading",
    rating: 5
  },
  {
    quote: "I was scoring in the mid-20s on ACT English before the bootcamp. The grammar rules and passage strategies helped me achieve a perfect 36 on that section!",
    author: "Noah C.",
    role: "ACT English Student",
    initials: "NC",
    score: "36 ACT English",
    rating: 5
  }
];

// FAQ data
const faqData = [
  {
    question: "Is it too late to improve my SAT/ACT score?",
    answer: "Not at all! Our last-minute bootcamps are specifically designed to help students make significant score improvements in a short amount of time. With targeted strategies and focused practice, you can still achieve your goal score."
  },
  {
    question: "What if I only have a few weeks before my exam?",
    answer: "Our bootcamps are perfect for last-minute preparation. We focus on high-yield strategies and quick wins that can make a big difference in your score, even with limited time."
  },
  {
    question: "How are your bootcamps different from other test prep programs?",
    answer: "Our bootcamps feature small group sizes (maximum 8 students), personalized study plans, and instructors who scored in the top 0.01% on the tests they teach. We focus on proven strategies and techniques rather than generic content review, resulting in significantly higher score improvements compared to traditional programs."
  },
  {
    question: "What if I can't attend all sessions?",
    answer: "While we recommend attending all sessions for maximum benefit, we record each session and make it available to enrolled students. We also offer one-on-one makeup sessions for an additional fee if needed."
  },
  {
    question: "Do you offer any guarantees?",
    answer: "Yes! For our SAT/ACT bootcamps, we set a target score in our first meeting and if its not met, we refund 10% of the cost."
  },
  {
    question: "Are materials included in the price?",
    answer: "Absolutely. All necessary study materials, practice tests, and digital resources are included in the program fee. Students only need to bring a laptop or tablet and their enthusiasm for learning."
  },
  {
    question: "How do I know which bootcamp is right for me?",
    answer: "We offer a complimentary 30-minute consultation with our academic advisors who will assess your goals, timeline, and current level to recommend the most suitable program. This personalized guidance ensures you select the bootcamp that aligns with your specific needs."
  }
];

const CounterAnimation = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const BootcampOfferings = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabs, setActiveTabs] = useState({});
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showCompetitorPricing, setShowCompetitorPricing] = useState(false);
const [currentCompetitorPricing, setCurrentCompetitorPricing] = useState([]);
const competitorPricing = {
  SAT: [
    { name: "Huntington Learning Center", price: "$3,200", features: ["$100/hr", "Group sessions", "Weekly Practice Test"] },
    { name: "Princeton Review SAT 1500+ Tutoring", price: "$6,560", features: ["$278/hour", "1-on-1 coaching", "18 hours"] },
    { name: "Kaplan Tutoring", price: "$4,420", features: ["$170/hour", "1-on-1 coaching", "2 Practice Tests"] },
  ],
  ACT: [
    { name: "Aydin's ACT Prep", price: "$6,400", features: ["$213/hr", "Live instruction", "Weekly tests"] },
    { name: "PrepScholar ACT Prep", price: "$5,590", features: ["$310/hr", "18 hours", "1-on-1 coaching"] },
    { name: "Private Tutoring-Princeton Review", price: "$5,250", features: ["$175/hr", "1-on-1 coaching", "30 hours"] }
  ],
  AP: [
    { name: "Wyzant-Kubrat D.", price: "$5,250", features: ["$175/hr", "Subject-specific", "30 hours"] },
    { name: "Prep Scholar AP Prep", price: "$3,200", features: ["$100/hr", "Prep for up to four AP subjects", "32 hours"] },
    { name: "C2 Education", price: "$8,000", features: ["$100/hr", "80 hours", "Group Classes"] }
  ]
};
const handleCompetitorPricingClick = (offeringTitle) => {
  if (offeringTitle.includes("SAT")) {
    setCurrentCompetitorPricing(competitorPricing.SAT);
  } else if (offeringTitle.includes("ACT")) {
    setCurrentCompetitorPricing(competitorPricing.ACT);
  } else if (offeringTitle.includes("AP")) {
    setCurrentCompetitorPricing(competitorPricing.AP);
  }
  setShowCompetitorPricing(true);
};

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const setActiveTabFor = (offeringIndex, tabIndex) => {
    setActiveTabs({
      ...activeTabs,
      [offeringIndex]: tabIndex
    });
  };

  // Replace the last useEffect in your BootcampOfferings component (lines ~208-218)
useEffect(() => {
    // Initialize active tab for each offering
    const initialTabs = {};
    bootcampOfferings.forEach((_, index) => {
      initialTabs[index] = 0;
    });
    setActiveTabs(initialTabs);
    
    // Remove automatic rotation interval to prevent users waiting
    // The navigation will now be fully manual through the dots
  }, []);
  
  // Add these navigation functions right before or after the useEffect
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const CompetitorPricingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Competitor Pricing</h3>
          <button 
            onClick={() => setShowCompetitorPricing(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {currentCompetitorPricing.map((competitor, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">{competitor.name}</h4>
                <span className="text-lg font-bold text-black">{competitor.price}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {competitor.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-600">• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <div className="bg-white text-gray-900 font-sans">
    
    <NAVBAR2/>
    <HeroSectionSAT />
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Bootcamp Tabs - Enhanced for Visibility with Distinct Colors */}
<div className="py-6 px-4 bg-gray-50 rounded-lg shadow-sm mb-12">
  <h2 className="text-2xl font-bold text-center mb-6">Our Test Prep Bootcamps</h2>
  <div className="flex flex-wrap justify-center gap-4">
    {bootcampOfferings.map((offering, index) => {
      // Create distinct color schemes for each tab
      let activeColors, inactiveColors;
      if (index === 0) {
        // SAT - Blue theme
        activeColors = "bg-blue-600 text-white";
        inactiveColors = "bg-blue-50 text-blue-800 hover:bg-blue-100";
      } else if (index === 1) {
        // ACT - Green theme
        activeColors = "bg-green-600 text-white";
        inactiveColors = "bg-green-50 text-green-800 hover:bg-green-100";
      } else {
        // AP - Purple theme
        activeColors = "bg-purple-600 text-white";
        inactiveColors = "bg-purple-50 text-purple-800 hover:bg-purple-100";
      }
      
      return (
        <button
          key={index}
          className={`py-5 px-6 md:px-8 text-lg font-bold rounded-lg transition-all duration-300 shadow-sm ${
            activeTab === index
              ? `${activeColors} transform scale-105`
              : `${inactiveColors} hover:transform hover:scale-105`
          }`}
          onClick={() => setActiveTab(index)}
        >
          <span className="mr-2 inline-block">{offering.icon}</span>
          {offering.title}
          {activeTab === index && (
            <div className="mt-2 h-1 w-12 bg-white mx-auto rounded-full"></div>
          )}
        </button>
      );
    })}
  </div>
</div>


        {/* Bootcamp Offerings */}
        <div className="">
          {bootcampOfferings.map((offering, offeringIndex) => (
            <div 
              key={offeringIndex} 
              className={`transition-all duration-500 ${
                activeTab === offeringIndex ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-black to-gray-500 text-white px-8 py-8 relative flex flex-col items-center text-center">
  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
  <div className="relative">
    <h2 className="text-3xl font-bold mb-3">{offering.title}</h2>
    <p className="text-gray-100 text-lg max-w-3xl">{offering.description}</p>
  </div>
</div>

                
                {/* Interior Navigation */}
<div className="border-b border-gray-200 flex overflow-x-auto no-scrollbar">
  <div className="flex w-full max-w-full">
    {["Available Sessions", "Program Overview", "Curriculum Details"].map((tab, tabIndex) => (
      <button
        key={tabIndex}
        className={`py-4 px-6 flex-1 min-w-[33%] text-center font-medium text-base sm:text-lg relative focus:outline-none ${
          activeTabs[offeringIndex] === tabIndex
            ? "text-black bg-white"
            : "text-gray-500 hover:text-gray-700 bg-gray-50"
        }`}
        onClick={() => setActiveTabFor(offeringIndex, tabIndex)}
      >
        {tab}
        {activeTabs[offeringIndex] === tabIndex && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
        )}
      </button>
    ))}
  </div>
</div>



                
                {/* Tab Content - Overview */}
                <div className={activeTabs[offeringIndex] === 1 ? "block" : "hidden"}>
                  <div className="p-8">
                    <div className="mb-10">
                      <h3 className="text-xl font-semibold mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Program Highlights
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {offering.highlights.map((highlight, i) => (
    <div key={i} className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="h-2 w-8 bg-gray-700 rounded-full mr-2"></div>
        <div className="h-2 w-2 bg-black rounded-full"></div>
      </div>
      <p className="text-gray-700">{highlight}</p>
    </div>
  ))}
</div>
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-semibold mb-4 text-black">Why Choose This Program</h3>
                      <p className="text-gray-700 mb-4">
  Join a community of successful students who have transformed their academic journey with our tailored bootcamps.
  Our expert instructors and proven strategies ensure you achieve your highest potential. 
  Sign up today and take the first step towards your success!
</p>
                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                          <span className="text-black">Exceptional results</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-black">Efficient preparation</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-black">Strategic approach</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tab Content - Curriculum Details */}
<div className={activeTabs[offeringIndex] === 2 ? "block" : "hidden"}>
  <div className="p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {offering.details.map((detail, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-gray-300 text-black rounded-md px-3 py-1 text-sm font-semibold">{detail.heading}</div>
          </div>
          <ul className="space-y-4">
            {detail.points.map((point, j) => (
              <li key={j} className="flex items-start bg-gray-50 p-3 rounded border-l-4 border-gray-500">
                <span className="text-gray-700 mt-0.5 mr-2">→</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    
    <div className="mt-8 bg-gray-100 p-6 rounded-lg border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-black">Comprehensive Methodology</h3>
      <p className="text-gray-500">
        Our curriculum is meticulously designed to address all aspects of test preparation. We combine content mastery, 
        strategic approaches, and extensive practice to ensure comprehensive preparation. Each component of our program 
        works in concert to maximize your potential and deliver exceptional results.
      </p>
    </div>
  </div>
</div>
                
                {/* Tab Content - Available Sessions */}
                <div className={activeTabs[offeringIndex] === 0 ? "block" : "hidden"}>
                  <div className="p-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {offering.sessions.map((session, i) => (
  <div 
    key={i} 
    className={`rounded-lg shadow-md overflow-hidden border transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      session.popularity === "Complete"
        ? "bg-gray-100 border-gray-200 opacity-80 cursor-not-allowed" // Styling for "Complete" sessions
        : "bg-white border-gray-200" // Default styling for other sessions
    }`}
  >
    {/* Card Header */}
    <div className={`py-3 px-4 border-b ${
      session.popularity === "Complete"
        ? "bg-gray-200 border-gray-300" // Header styling for "Complete" sessions
        : "bg-gray-100 border-gray-200" // Default header styling
    }`}>
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold text-black">{session.name}</h4>
        <div className={`text-xs py-1 px-2 rounded-full ${
          session.popularity === "Complete"
            ? "bg-red-100 text-red-800 border border-red-200" // Badge styling for "Complete"
            : "bg-black text-white" // Default badge styling
        }`}>
          {session.popularity}
        </div>
      </div>
    </div>

    {/* Card Body */}
    <div className={`p-5 ${
      session.popularity === "Complete"
        ? "opacity-80" // Slightly fade the content for "Complete" sessions
        : ""
    }`}>
      <div className="space-y-3 mb-6">
        <p className="flex items-center text-gray-700 text-sm">
          <svg className="w-4 h-4 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {session.dates}
        </p>
        <p className="flex items-center text-gray-700 text-sm">
          <svg className="w-4 h-4 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {session.schedule}
        </p>
        <p className="flex items-center text-gray-700 text-sm">
          <svg className="w-4 h-4 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          {session.spaces}
        </p>
        {session.targetExam && (
          <p className="flex items-center text-gray-700 text-sm font-semibold bg-yellow-50 p-2 rounded border-l-2 border-yellow-400">
            <svg className="w-4 h-4 mr-2 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {session.targetExam}
          </p>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-bold text-black">{session.price}</span>
            <span className="bg-gray-100 text-black text-xs px-2 py-1 rounded-sm">
              16 hours total
            </span>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button 
              onClick={() => handleCheckout(offering.title, session.name, session.price)}
              className={`${
                session.popularity === "Complete"
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed" // Disabled button for "Complete"
                  : "bg-green-600 text-white hover:bg-green-700" // Default button styling
              } text-xs px-3 py-2 rounded-md border transition duration-200 text-center font-medium shadow-sm transform hover:scale-105 hover:shadow-lg`}
              disabled={session.popularity === "Complete"}
            >
              {session.popularity === "Complete" ? "Fully Booked" : "Reserve Spot Now"}
            </button>
            <a 
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black text-xs px-3 py-2 rounded-md border border-gray-300 transition duration-200 hover:bg-gray-50 text-center font-medium shadow-sm transform hover:scale-105 hover:shadow-lg"
            >
              Free Consultation
            </a>
          </div>

          {/* Additional Buttons */}
          <button 
            onClick={() => setActiveTabFor(offeringIndex, 1)}
            className="bg-yellow-100 text-black text-xs px-3 py-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 text-center font-medium shadow-md hover:shadow-lg mt-2 transform hover:scale-105"
          >
            View Program Details
          </button>
          <button 
            onClick={() => handleCompetitorPricingClick(offering.title)}
            className="bg-red-400 text-black text-xs px-3 py-2 rounded-md transition duration-300 ease-in-out hover:bg-red-500 text-center font-medium shadow-md hover:shadow-lg mt-2 transform hover:scale-105"
          >
            Compare Competitor Pricing
          </button>
        </div>
      </div>
    </div>
  </div>
))}
                    </div>
                    
                    <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2 mr-4">
                          <svg className="w-6 h-6 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-yellow-800">Limited Availability</h3>
                          <p className="text-gray-700">
                            Our sessions fill up quickly due to limited class sizes designed to ensure personalized attention. 
                            We recommend securing your spot early to avoid disappointment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel - Redesigned */}
<div className="py-16 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-black via-gray-100 to-gray-400 mx-auto"></div>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">See how our students transformed their careers and achieved their goals.</p>
    </div>
    
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-black via-gray-100 to-gray-400"></div>
      
      {/* Card Content with Decorative Elements */}
      <div className="relative p-8 md:p-12">
        {/* Decorative Quotes */}
        <div className="absolute top-6 left-6 text-gray-100 opacity-30">
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        
        {/* Testimonials Wrapper */}
        <div className="relative z-10 min-h-[320px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center transition-all duration-700 ease-in-out ${
                activeTestimonial === index 
                  ? "opacity-100 translate-x-0 scale-100 z-20"
                  : index < activeTestimonial
                    ? "opacity-0 -translate-x-12 scale-95 z-10 pointer-events-none"
                    : "opacity-0 translate-x-12 scale-95 z-10 pointer-events-none"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {testimonial.score && (
                    <span className="text-sm font-medium text-black">{testimonial.score}</span>
                  )}
                </div>
                
                <p className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed italic max-w-2xl mx-auto font-light">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-black to-gray-400 flex items-center justify-center text-xl font-bold text-white shadow-md">
                    {testimonial.initials}
                  </div>
                  <div className="text-left ml-4">
                    <h4 className="font-semibold text-lg text-gray-900">{testimonial.author}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows - Redesigned */}
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4 md:px-2">
          <button 
            onClick={prevTestimonial}
            className="bg-white w-10 h-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-x-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 flex items-center justify-center text-black hover:text-black"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextTestimonial}
            className="bg-white w-10 h-10 rounded-full shadow-lg hover:shadow-xl transform hover:translate-x-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 flex items-center justify-center text-black hover:text-black"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Navigation Dots - Redesigned */}
      <div className="bg-gray-50 py-4 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 focus:outline-none ${
              activeTestimonial === index 
                ? "w-8 h-2 bg-gray-700 rounded-full" 
                : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
            }`}
            onClick={() => setActiveTestimonial(index)}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</div>        
        {/* Call to Action */}
        <div className="mt-20 mb-12 bg-gradient-to-r from-black  to-gray-600 rounded-2xl shadow-xl overflow-hidden">
  <div className="px-8 py-12 md:py-16 relative">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
    </div>
    
    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Last Chance to Boost Your SAT/ACT Score!</h2>
      <p className="text-gray-100 text-lg mb-8">
        Time is running out! Join our last-minute bootcamp and get the strategies you need to ace your upcoming SAT/ACT exam. Limited spots available—don't miss out!
      </p>
      <div className="flex flex-col max-w-3xl mx-auto">
        <div className="grid md:grid-cols-1 gap-6 mb-8">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-white border-opacity-20 text-left">
            <h3 className="text-white text-xl font-semibold mb-3 text-center">Have Questions?</h3>
            <p className="text-gray-100 mb-4 text-center">Don't wait—our last-minute bootcamps fill up fast!</p>
            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW" target="_blank" rel="noopener noreferrer" className="block w-full">
              <button className="w-full bg-transparent text-white border-2 border-white hover:bg-white hover:bg-opacity-10 font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center">
                <span>Book a Free Consultation</span>
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </a>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 text-center">
          100% satisfaction guarantee • Secure payment • Limited spots available
        </p>
      </div>
    </div>
  </div>
</div>
      </div>
      
      <footer className="bg-white dark:bg-white">
     <div className="px-4 pb-8 sm:px-6 lg:px-8">
       <div className="border-t border-gray-100 pt-8 dark:border-gray-200">
         <div className="items-center">
           <p className="text-xs text-center text-gray-500 dark:text-gray-400">
             © Company 2025 ARENA. All rights reserved.
           </p>
          
         </div>
       </div>
     </div>
   </footer>
  {/* Floating Action Button */}
<div className="fixed bottom-6 right-6 z-50 flex space-x-3">
  <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW" 
     target="_blank" 
     rel="noopener noreferrer"
     className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 text-white border border-transparent rounded-full shadow-lg p-4 transition-transform hover:scale-105 animate-gradient">
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </a>
</div>

<style jsx>{`
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
      background-color: #00bcd4; /* Teal */
    }
    25% {
      background-position: 50% 50%;
      background-color: #3f51b5; /* Indigo */
    }
    50% {
      background-position: 100% 50%;
      background-color: #673ab7; /* Deep Purple */
    }
    75% {
      background-position: 50% 50%;
      background-color: #9c27b0; /* Purple */
    }
    100% {
      background-position: 0% 50%;
      background-color: #e91e63; /* Pink */
    }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 6s ease infinite;
  }
`}</style>


{showCompetitorPricing && <CompetitorPricingModal />}
    </div>
  );
};

export default BootcampOfferings;