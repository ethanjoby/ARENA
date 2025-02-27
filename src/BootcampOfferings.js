import React, { useState, useEffect } from "react";

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
        price: "$1,895",
        spaces: "Limited to 8 students",
        popularity: "High demand"
      },
      {
        name: "Fall Preparation",
        dates: "Aug 17 - Sept 13, 2025",
        schedule: "Mon-Thu, 4:00 PM - 8:00 PM",
        price: "$1,895",
        spaces: "Limited to 8 students",
        popularity: "Filling quickly"
      },
      {
        name: "Winter Break Intensive",
        dates: "Dec 15 - Jan 10, 2026",
        schedule: "Mon-Thu, 10:00 AM - 2:00 PM",
        price: "$1,895",
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
    score: "1530 SAT"
  },
  {
    quote: "The AP Calculus bootcamp was instrumental in helping me earn a 5 on the exam. The practice materials and instructor guidance were exceptional.",
    author: "Sarah L.",
    role: "AP Calculus Student",
    initials: "SL",
    score: "5 on AP Calc BC"
  },
  {
    quote: "I tried other prep programs before, but this bootcamp was truly transformative. The personalized approach made all the difference in my ACT score.",
    author: "James K.",
    role: "ACT Bootcamp Graduate",
    initials: "JK",
    score: "34 ACT"
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
      {/* Header with parallax-like effect */}
<div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.5),_transparent_70%)]"></div>
    <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(79,70,229,0.5),_transparent_70%)]"></div>
  </div>
  
  <div className="max-w-6xl mx-auto px-4 py-20 relative">
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Elevate Your Academic Performance
      </h1>
      <div className="w-20 h-1 bg-blue-400 mx-auto mb-8"></div>
      <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
        Our expertly designed bootcamps deliver exceptional results through personalized instruction, 
        proven methodologies, and a commitment to academic excellence.
      </p>
      <div className="mt-10 flex justify-center">
        <button className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition-colors duration-200 shadow-lg">
          Explore Programs
        </button>
      </div>
    </div>
  </div>
</div>

      {/* Statistics Section */}
<div className="py-12 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
      {statistics.map((stat, index) => (
        <div key={index} className="text-center p-4">
          <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
            <CounterAnimation target={stat.target} suffix={stat.suffix} />
          </div>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</div>

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
                                <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm shadow-md">
                                  Reserve Seat
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
                            We recommend securing your spot early to avoid disappointment. A $500 deposit is required to reserve your place, 
                            with the balance due two weeks before the program start date.
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

        {/* Testimonial Carousel */}
<div className="my-24">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-10">Student Success Stories</h2>
    <div className="relative bg-white rounded-2xl shadow-2xl p-10 overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      {/* Testimonials Wrapper with Fixed Height */}
      <div className="relative z-10 min-h-[300px] flex items-center justify-center">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 transition-all duration-700 transform ${
              activeTestimonial === index 
                ? "opacity-100 translate-y-0 scale-100 z-20"
                : "opacity-0 translate-y-5 scale-95 z-10 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <svg className="w-12 h-12 text-blue-300 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed italic max-w-2xl mx-auto">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-700 mr-4">
                  {testimonial.initials}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  <p className="text-blue-600 text-sm font-semibold mt-1">{testimonial.score}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-30">
  <button 
    onClick={prevTestimonial}
    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label="Previous testimonial"
  >
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  <button 
    onClick={nextTestimonial}
    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label="Next testimonial"
  >
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeTestimonial === index ? "bg-blue-600 w-5" : "bg-gray-300"
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
  
  <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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
  <button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition-colors duration-200 shadow-lg">
    Schedule a Consultation
  </button>
  <button className="bg-transparent text-white border-2 border-white hover:bg-white hover:bg-opacity-10 font-semibold py-3 px-8 rounded-md transition-colors duration-200">
    View All Programs
  </button>
</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-900 text-white">
  <div className="max-w-6xl mx-auto px-4 py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Academic Excellence</h3>
              <p className="text-gray-400 mb-6">
                Committed to helping students achieve their academic goals through exceptional instruction 
                and personalized learning experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Programs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Schedule</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Approach</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-4">Contact Information</h3>
              <p className="flex items-start mb-3">
                <svg className="w-5 h-5 mr-3 mt-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">123 Education Lane, Learning City, CA 90210</span>
              </p>
              <p className="flex items-start mb-3">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">contact@academicexcellence.edu</span>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">(555) 123-4567</span>
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Academic Excellence Bootcamps. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootcampOfferings;