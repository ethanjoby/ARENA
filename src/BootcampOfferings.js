import React, { useState, useEffect } from "react";
import NAVBAR2 from "./navbar2";
import HeroSectionSAT from "./HeroSectionSAT";

const bootcampOfferings = [
  {
    title: "SAT/ACT Intensive Bootcamp",
    icon: "📊",
    description: "Our comprehensive 4-week SAT/ACT prep program is designed to maximize your score with targeted strategies and personalized coaching.",
    highlights: [
      "Small group sessions (max 8 students)",
      "16 hours of live instruction per week",
      "Weekly practice tests with detailed analysis",
      "Personalized study plans for every student"
    ],
    details: [
      {
        heading: "Curriculum",
        points: [
          "Critical Reading: Passage analysis & question patterns",
          "Mathematics: Problem-solving approaches & content review",
          "Writing & Language: Grammar rules & essay structure",
          "Test-specific strategies & time management techniques"
        ]
      },
      {
        heading: "Results",
        points: [
          "Average score improvement: 150+ points (SAT) / 4+ points (ACT)",
          "93% of students exceed their target scores",
          "Comprehensive materials included",
          "Guaranteed results or free follow-up sessions"
        ]
      }
    ],
    sessions: [
      {
        name: "Summer Intensive",
        dates: "June 15 - July 12, 2025",
        schedule: "Mon-Thu, 9:00 AM - 1:00 PM",
        price: "$950",
        spaces: "Limited to 8 students",
        popularity: "High demand"
      },
      {
        name: "Fall Preparation",
        dates: "Aug 17 - Sept 13, 2025",
        schedule: "Mon-Thu, 4:00 PM - 8:00 PM",
        price: "$950",
        spaces: "Limited to 8 students",
        popularity: "Filling quickly"
      },
      {
        name: "Winter Preperation",
        dates: "Dec 15 - Jan 10, 2026",
        schedule: "Mon-Thu, 10:00 AM - 2:00 PM",
        price: "$950",
        spaces: "Limited to 8 students",
        popularity: "Early registration"
      }
    ]
  },
  {
    title: "AP Exam Preparation Bootcamp",
    icon: "🎓",
    description: "Comprehensive preparation for AP exams designed to strengthen your understanding of key concepts and develop effective test-taking strategies.",
    highlights: [
      "Subject-specific intensive review",
      "12 hours of focused instruction per AP subject",
      "Practice with authentic AP questions",
      "Expert instruction from experienced AP teachers"
    ],
    details: [
      {
        heading: "Subjects Offered",
        points: [
          "AP Biology, Chemistry, Physics",
          "AP Calculus AB/BC, Statistics",
          "AP English Language, English Literature",
          "AP US History, World History, European History"
        ]
      },
      {
        heading: "Program Benefits",
        points: [
          "Content mastery & gap identification",
          "Targeted strategies for free-response questions",
          "Complete review of course material",
          "AP-specific timing and exam strategies"
        ]
      }
    ],
    sessions: [
      {
        name: "Spring Break Intensive",
        dates: "March 21-28, 2025",
        schedule: "Daily, 9:00 AM - 1:00 PM",
        price: "$795 per subject",
        spaces: "Limited to 10 students per subject",
        popularity: "Popular choice"
      },
      {
        name: "April Weekend Workshops",
        dates: "April 5-26, 2025",
        schedule: "Saturdays & Sundays, 10:00 AM - 4:00 PM",
        price: "$795 per subject",
        spaces: "Limited to 10 students per subject",
        popularity: "Recommended"
      },
      {
        name: "Final Review Sessions",
        dates: "2 weeks before each AP exam",
        schedule: "3 days, 5:00 PM - 9:00 PM",
        price: "$495 per subject",
        spaces: "Limited to 10 students per subject",
        popularity: "Last minute prep"
      }
    ]
  }
];

// Statistics for animated counters
const statistics = [
  { label: "Average Score Improvement", target: 170, suffix: " points" },
  { label: "Student Satisfaction", target: 98, suffix: "%" }
];

// Testimonials
const testimonials = [
  {
    quote: "After attending the SAT bootcamp, my score improved by 210 points! The instructors identified my weak areas and gave me targeted strategies that made a huge difference.",
    author: "Michael T.",
    role: "SAT Bootcamp Graduate",
    initials: "MT",
    score: "1580 SAT",
    rating: 5
  },
  {
    quote: "The AP World History bootcamp was instrumental in helping me earn a 5 on the exam. The practice materials and instructor guidance were exceptional.",
    author: "Sarah L.",
    role: "AP World History Student",
    initials: "SL",
    score: "5 on AP World History",
    rating: 5
  },
  {
    quote: "I tried other prep programs before, but this bootcamp was truly transformative. The personalized approach made all the difference in my ACT score.",
    author: "James K.",
    role: "ACT Bootcamp Graduate",
    initials: "JK",
    score: "36 ACT",
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
    quote: "AP Biology seemed overwhelming until I joined the bootcamp. The practice exams and lab concept reviews made everything click. So grateful for my 5!",
    author: "Daniel W.",
    role: "AP Biology Student",
    initials: "DW",
    score: "5 on AP Biology",
    rating: 5
  },
  {
    quote: "My ACT score had plateaued at 29 despite months of studying. The bootcamp's targeted approach to the Science section finally pushed me over 30 points.",
    author: "Emma R.",
    role: "ACT Bootcamp Graduate",
    initials: "ER",
    score: "33 ACT",
    rating: 5
  },
  {
    quote: "The SAT Reading bootcamp transformed my approach to complex passages. My score improved from 32 to 38 (out of 40) in just six sessions!",
    author: "Jason T.",
    role: "SAT Reading Student",
    initials: "JT",
    score: "760 SAT Reading",
    rating: 5
  },
  {
    quote: "AP English Language seemed impossible until I took the bootcamp. The essay strategies and rhetorical analysis techniques were exactly what I needed for a 5.",
    author: "Priya S.",
    role: "AP English Language Student",
    initials: "PS",
    score: "5 on AP English Language",
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
    question: "How are your bootcamps different from other test prep programs?",
    answer: "Our bootcamps feature small group sizes (maximum 8-10 students), personalized study plans, and instructors who scored in the top 1% on the tests they teach. We focus on proven strategies and techniques rather than generic content review, resulting in significantly higher score improvements compared to traditional programs."
  },
  {
    question: "What if I can't attend all sessions?",
    answer: "While we recommend attending all sessions for maximum benefit, we record each session and make it available to enrolled students. We also offer one-on-one makeup sessions for an additional fee if needed."
  },
  {
    question: "Do you offer any guarantees?",
    answer: "Yes! For our SAT/ACT bootcamps, we guarantee a minimum score improvement of 100 points (SAT) or 3 points (ACT). If you don't achieve this improvement, you'll receive free follow-up sessions until you reach your goal."
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

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
    
    <NAVBAR2/>
    <HeroSectionSAT />
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Bootcamp Tabs */}
<div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
  {bootcampOfferings.map((offering, index) => (
    <button
      key={index}
      className={`py-4 px-4 md:px-6 text-lg font-semibold relative ${
        activeTab === index
          ? "text-blue-700"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={() => setActiveTab(index)}
    >
      <span className="mr-2">{offering.icon}</span>
      {offering.title}
      {activeTab === index && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700"></div>
      )}
    </button>
  ))}
</div>


        {/* Bootcamp Offerings */}
        <div className="space-y-24">
          {bootcampOfferings.map((offering, offeringIndex) => (
            <div 
              key={offeringIndex} 
              className={`transition-all duration-500 ${
                activeTab === offeringIndex ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-8 py-8 relative flex flex-col items-center text-center">
  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
  <div className="relative">
    <h2 className="text-3xl font-bold mb-3">{offering.title}</h2>
    <p className="text-blue-100 text-lg max-w-3xl">{offering.description}</p>
  </div>
</div>

                
                {/* Interior Navigation */}
                <div className="border-b border-gray-200 flex justify-center">
  <div className="flex w-full">
    {["Program Overview", "Curriculum Details", "Available Sessions"].map((tab, tabIndex) => (
      <button
        key={tabIndex}
        className={`py-6 px-8 w-full text-center font-medium text-lg relative focus:outline-none ${
          activeTabs[offeringIndex] === tabIndex
            ? "text-blue-700 bg-white"
            : "text-gray-500 hover:text-gray-700 bg-gray-50"
        }`}
        onClick={() => setActiveTabFor(offeringIndex, tabIndex)}
      >
        {tab}
        {activeTabs[offeringIndex] === tabIndex && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700"></div>
        )}
      </button>
    ))}
  </div>
</div>


                
                {/* Tab Content - Overview */}
                <div className={activeTabs[offeringIndex] === 0 ? "block" : "hidden"}>
                  <div className="p-8">
                    <div className="mb-10">
                      <h3 className="text-xl font-semibold mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Program Highlights
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {offering.highlights.map((highlight, i) => (
    <div key={i} className="bg-blue-50 p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="h-2 w-8 bg-blue-500 rounded-full mr-2"></div>
        <div className="h-2 w-2 bg-blue-700 rounded-full"></div>
      </div>
      <p className="text-gray-700">{highlight}</p>
    </div>
  ))}
</div>
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-semibold mb-4 text-blue-700">Why Choose This Program</h3>
                      <p className="text-gray-700 mb-4">
                        Our bootcamps are designed with precision to maximize your potential and ensure exceptional results.
                        With industry-leading methodologies and exceptional instructors, we've established a proven track record 
                        of helping students achieve remarkable score improvements and academic success.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                          <span className="text-gray-700">Exceptional results</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-gray-700">Efficient preparation</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-gray-700">Strategic approach</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tab Content - Curriculum Details */}
<div className={activeTabs[offeringIndex] === 1 ? "block" : "hidden"}>
  <div className="p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {offering.details.map((detail, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-700 rounded-md px-3 py-1 text-sm font-semibold">{detail.heading}</div>
          </div>
          <ul className="space-y-4">
            {detail.points.map((point, j) => (
              <li key={j} className="flex items-start bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                <span className="text-blue-700 mt-0.5 mr-2">→</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    
    <div className="mt-8 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
      <h3 className="text-lg font-semibold mb-4 text-indigo-700">Comprehensive Methodology</h3>
      <p className="text-gray-700">
        Our curriculum is meticulously designed to address all aspects of test preparation. We combine content mastery, 
        strategic approaches, and extensive practice to ensure comprehensive preparation. Each component of our program 
        works in concert to maximize your potential and deliver exceptional results.
      </p>
    </div>
  </div>
</div>
                
                {/* Tab Content - Available Sessions */}
                <div className={activeTabs[offeringIndex] === 2 ? "block" : "hidden"}>
                  <div className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {offering.sessions.map((session, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">                        
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-3 px-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                              <h4 className="text-lg font-bold text-blue-800">{session.name}</h4>
                              <div className="bg-blue-700 text-white text-xs py-1 px-2 rounded-full">
                                {session.popularity}
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-5">
                            <div className="space-y-3 mb-6">
                              <p className="flex items-center text-gray-700 text-sm">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {session.dates}
                              </p>
                              <p className="flex items-center text-gray-700 text-sm">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {session.schedule}
                              </p>
                              <p className="flex items-center text-gray-700 text-sm">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                {session.spaces}
                              </p>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-100">
                
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-700">{session.price}</span>
                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW" target="_blank" rel="noopener noreferrer">
      <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm shadow-md">
        Reserve Seat
      </button>
    </a>
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
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">See how our students transformed their careers and achieved their goals.</p>
    </div>
    
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
      
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
                    <span className="text-sm font-medium text-blue-600">{testimonial.score}</span>
                  )}
                </div>
                
                <p className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed italic max-w-2xl mx-auto font-light">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-md">
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
            className="bg-white w-10 h-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-x-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center text-blue-600 hover:text-blue-700"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextTestimonial}
            className="bg-white w-10 h-10 rounded-full shadow-lg hover:shadow-xl transform hover:translate-x-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center text-blue-600 hover:text-blue-700"
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
                ? "w-8 h-2 bg-blue-600 rounded-full" 
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



       {/* FAQ Section */}
<div className="my-20">
  <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
  
  <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    {faqData.map((faq, index) => (
      <div key={index} className="border-b border-gray-100 last:border-b-0">
        <button
          className="w-full px-6 py-5 text-left focus:outline-none"
          onClick={() => toggleFaq(index)}
        >
          <div className="flex justify-between items-center">
            <h3 className={`font-semibold text-base md:text-lg ${activeFaq === index ? "text-blue-700" : "text-gray-700"}`}>
              {faq.question}
            </h3>
            <svg
              className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform duration-300 ${
                activeFaq === index ? "transform rotate-180 text-blue-700" : "text-gray-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            activeFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-5 text-gray-600">
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
              {faq.answer}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        
        {/* Call to Action */}
        <div className="mt-20 mb-12 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12 md:py-16 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Elevate Your Academic Performance?</h2>
              <p className="text-blue-100 text-lg mb-8">
                Join our transformative bootcamps and experience the difference personalized instruction 
                and proven strategies can make in your academic journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW" target="_blank" rel="noopener noreferrer">
  <button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition-colors duration-200 shadow-lg">
    Schedule a Consultation
  </button>
</a>
<a href="/"  rel="noopener noreferrer">
  <button className="bg-transparent text-white border-2 border-white hover:bg-white hover:bg-opacity-10 font-semibold py-3 px-8 rounded-md transition-colors duration-200">
    View All Programs
  </button>
</a>
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
    </div>
  );
};

export default BootcampOfferings;