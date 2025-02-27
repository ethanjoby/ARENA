export default function HeroSectionSAT() {
    return (
        <section className="flex items-center justify-center min-h-screen px-8 py-16">
          <div className="flex flex-col md:flex-row items-stretch justify-between max-w-6xl w-full mx-auto gap-8">
            
            {/* Left Content - Flexible width */}
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Ace the <span className="text-blue-600">SAT & AP Exams</span> with Confidence
              </h1>
              <p className="text-gray-600 mt-4 text-lg">
                Join our top-rated SAT & AP bootcamp to master test strategies, boost your scores, and get expert guidance for your success.
              </p>
    
              {/* Stats + Download Section */}
              <div className="mt-6 bg-gray-100 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">15+</h2>
                  <p className="text-gray-600">Students Trained</p>
                </div>
    
                <div className="text-center">
                  <h2 className="text-2xl font-bold">98%</h2>
                  <p className="text-gray-600">Score Improvement</p>
                </div>
    
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Top 1%</h2>
                  <p className="text-gray-600">Instructors Nationwide</p>
                </div>
    
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Start Your Journey
                </button>
              </div>
    
           
            </div>
    
            {/* Right Image - Matches left side height */}
            <div className="flex-1 flex justify-center items-center">
              <img 
                src="https://www.drivecms.com/uploads/mcelroytutoring.com/Screen%20Shot%202022-04-08%20at%209.37.25%20AM.png" 
                alt="SAT & AP Dashboard Preview" 
                className="w-full h-full max-h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>
      );
    }
    