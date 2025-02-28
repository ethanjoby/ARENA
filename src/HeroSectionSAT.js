export default function HeroSectionSAT() {
    return (
      <section className="flex items-center justify-center px-8 mt-16 py-12 min-h-[70vh]">

          <div className="flex flex-col md:flex-row items-stretch justify-between max-w-6xl w-full mx-auto gap-8">
            
            {/* Left Content - Flexible width */}
<div className="flex-1 flex flex-col justify-center">
  <h1 className="text-5xl font-bold text-gray-700 leading-tight">
    Ace the <span className="text-black">SAT/ACT & AP Exams</span> with Confidence
  </h1>
  <p className="text-gray-600 mt-4 text-lg">
    Join our top-rated SAT & AP bootcamp to master strategies, boost your scores, and get expert guidance for success.
  </p>

  {/* Highlighted Guarantee Offer */}
  <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg text-center shadow-md">
    <h2 className="text-xl font-bold text-yellow-900">🎯 Guaranteed Target Score</h2>
    <p className="text-sm text-yellow-800">Miss it? Get <span className="font-semibold">10% Back!</span></p>
  </div>

  {/* Stats + Download Section */}
  <div className="mt-4 bg-gray-50 p-4 rounded-lg flex flex-wrap md:flex-nowrap justify-between items-center gap-4 shadow-md">
    {/* Score Improvement Stat */}
    <div className="text-center flex-1">
      <h2 className="text-xl font-semibold text-black">98%</h2>
      <p className="text-sm text-gray-600">Score Improvement</p>
    </div>

    {/* Divider */}
    <div className="hidden md:block w-px bg-gray-300 h-8"></div>

    {/* Nationwide Ranking Stat */}
    <div className="text-center flex-1">
      <h2 className="text-xl font-semibold text-black">Top 0.01%</h2>
      <p className="text-sm text-gray-600">Test-Takers Nationwide</p>
    </div>
  </div>
</div>



    
            {/* Right Image - Matches left side height */}
            <div className="flex-1 flex justify-center items-center">
              <img 
                src="https://www.drivecms.com/uploads/mcelroytutoring.com/Screen%20Shot%202022-04-08%20at%209.37.25%20AM.png" 
                alt="SAT/ACT & AP Dashboard Preview" 
                className="w-full h-full max-h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>
      );
    }
    