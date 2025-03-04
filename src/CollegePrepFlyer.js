import React from "react";

const ProfessionalCollegePrepFlyer = () => {
  // More professional color scheme
  const primaryColor = "#1a365d"; // Dark blue
  const secondaryColor = "#2d3748"; // Dark slate
  const accentColor = "#4a5568"; // Slate
  
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="text-center p-8 md:p-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ARENA COLLEGE PREP</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Your Path to Top Universities</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Exclusive programs designed by high school seniors who have worked with professors at 
            <span className="font-bold"> Caltech, Stanford, and Ivy League institutions</span>
          </p>
        </div>
        
        {/* Introduction */}
        <div className="p-8 bg-gray-50 border-b border-gray-200">
          <p className="text-gray-700 text-lg max-w-4xl mx-auto">
            Dear Parents,
          </p>
          <p className="text-gray-700 text-lg max-w-4xl mx-auto mt-4">
            We're excited to share a comprehensive college preparation program to help students 
            navigate the application process, excel in standardized tests, and build competitive profiles 
            for top universities. Our program offers three key components:
          </p>
        </div>
        
        {/* Main Content */}
        <div className="p-8">
          {/* Section 1: Competition */}
          <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="bg-gray-800 text-white p-4">
              <h3 className="text-2xl font-bold">FREE Academic Team Competition</h3>
            </div>
            <div className="p-6 bg-white">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Win prizes up to <span className="font-bold">$300</span></span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Ideal practice for AP Exams and academic Olympiads</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Opportunities for Startup Internship Programs</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Team-based format to build collaboration skills</span>
                    </li>
                  </ul>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeVvTaI3v35E6zPmrixE7rUq322iW82EGPt3ngErKkxek5aww/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block px-6 py-2 bg-gray-800 text-white rounded font-semibold hover:bg-gray-700 transition-colors duration-300"
                  >
                    Register Now - FREE
                  </a>
                </div>
                <div className="md:w-1/3">
                  <div className="aspect-video rounded overflow-hidden border border-gray-200">
                    <img 
                      src="/api/placeholder/400/300" 
                      alt="Students in competition" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2: Webinars */}
          <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="bg-gray-800 text-white p-4">
              <h3 className="text-2xl font-bold">FREE College Prep Webinars</h3>
            </div>
            <div className="p-6 bg-white">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Learn directly from students who worked with Ivy League professors</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Insider tips on navigating the college application process</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Q&A sessions with successful applicants to top universities</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Interactive sessions on building standout college applications</span>
                    </li>
                  </ul>
                  <a 
                    href="https://www.arenacollegeprep.com/webinars"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block px-6 py-2 bg-gray-800 text-white rounded font-semibold hover:bg-gray-700 transition-colors duration-300"
                  >
                    Join Our Webinars - FREE
                  </a>
                </div>
                <div className="md:w-1/3">
                  <div className="aspect-video rounded overflow-hidden border border-gray-200">
                    <img 
                      src="/api/placeholder/400/300" 
                      alt="Webinar session" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 3: Bootcamps */}
          <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="bg-gray-800 text-white p-4">
              <h3 className="text-2xl font-bold">Intensive Exam Bootcamps</h3>
            </div>
            <div className="p-6 bg-white">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>SAT/ACT focused preparation with proven strategies</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>AP Exam intensive review sessions for multiple subjects</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>Small group sessions with personalized attention</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-gray-800 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>Practice tests and focused content review</span>
                    </li>
                  </ul>
                  <a 
                    href="https://www.arenacollegeprep.com/bootcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block px-6 py-2 bg-gray-800 text-white rounded font-semibold hover:bg-gray-700 transition-colors duration-300"
                  >
                    Learn About Bootcamps
                  </a>
                </div>
                <div className="md:w-1/3">
                  <div className="aspect-video rounded overflow-hidden border border-gray-200">
                    <img 
                      src="/api/placeholder/400/300" 
                      alt="Exam bootcamp session" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="p-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-10 h-10 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-lg italic mb-4 text-gray-700">
              "My daughter attended the SAT Bootcamp and improved her score by over 200 points! The mentorship from students who've been through the process recently was invaluable for her college applications."
            </p>
            <p className="font-semibold text-gray-800">- Parent of a High School Junior</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-8 bg-gray-800 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">Give Your Child The Edge They Need</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <a 
              href="https://www.arenacollegeprep.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-white text-gray-800 rounded font-bold transition-all duration-300 hover:bg-gray-100"
            >
              Exam Bootcamps
            </a>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeVvTaI3v35E6zPmrixE7rUq322iW82EGPt3ngErKkxek5aww/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-white text-gray-800 rounded font-bold transition-all duration-300 hover:bg-gray-100"
            >
              Free Competition
            </a>
            <a 
              href="https://www.arenacollegeprep.com/webinars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-white text-gray-800 rounded font-bold transition-all duration-300 hover:bg-gray-100"
            >
              Free Webinars
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCollegePrepFlyer;