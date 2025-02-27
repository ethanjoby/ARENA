export default function HeroSectionSAT() {
    return (
      <section className="flex items-center justify-center min-h-screen px-8 py-16 ">
        {/* Left Content - Flexible width */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Master the <span className="text-blue-600">SAT</span> with Confidence
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Join our top-rated SAT bootcamp and boost your score with expert guidance, real test strategies, and personalized practice.
          </p>
  
          {/* Stats + Download Section */}
          <div className="mt-6 bg-gray-100 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
            <div className="text-center">
              <h2 className="text-2xl font-bold">10,000+</h2>
              <p className="text-gray-600">Students Helped</p>
            </div>
  
            <div className="text-center">
              <h2 className="text-2xl font-bold">95%</h2>
              <p className="text-gray-600">Score Improvement</p>
            </div>
  
            <div className="text-center">
              <h2 className="text-2xl font-bold">#1</h2>
              <p className="text-gray-600">Ranked SAT Prep</p>
            </div>
  
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>
  
          <p className="text-sm text-gray-500 mt-4">
            By enrolling, you agree to our <a href="#" className="text-blue-600">terms</a> and <a href="#" className="text-blue-600">privacy policy</a>.
          </p>
        </div>
  
        {/* Right Image - Scales to match height of the left */}
        <div className="flex-1 flex justify-center items-center">
          <img 
            src="https://www.drivecms.com/uploads/mcelroytutoring.com/Screen%20Shot%202022-04-08%20at%209.37.25%20AM.png" 
            alt="SAT Dashboard Preview" 
            className="w-full h-full max-h-[500px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>
    );
  }
  
  