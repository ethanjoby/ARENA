import React from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg text-center mt-6 shadow-lg">
      <h3 className="text-lg font-bold mb-2">Time Left Until Next Bootcamp:</h3>
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <span className="text-2xl font-bold">{timeLeft.days}</span>
          <span className="block text-sm">Days</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold">{timeLeft.hours}</span>
          <span className="block text-sm">Hours</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          <span className="block text-sm">Minutes</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold">{timeLeft.seconds}</span>
          <span className="block text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default function HeroSectionSAT() {
  const nextExamDate = new Date("2025-05-10"); // Replace with the next SAT exam date

  return (
    <section className="flex items-center justify-center px-8 mt-16 py-12 min-h-[70vh]">
      <div className="flex flex-col md:flex-row items-stretch justify-between max-w-6xl w-full mx-auto gap-8">
        {/* Left Content - Flexible width */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gray-700 leading-tight">
            Ace the <span className="text-black">SAT/ACT & AP Exams</span> with Confidence
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Join our top-rated SAT/ACT & AP bootcamp to master strategies, boost your scores, and get expert guidance for success.
          </p>

          {/* Highlighted Guarantee Offer */}
          <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg text-center shadow-md">
            <h2 className="text-xl font-bold text-yellow-900">🎯 Guaranteed Target Score</h2>
            <p className="text-sm text-yellow-800">Miss it? Get <span className="font-semibold">10% Back!</span></p>
          </div>

          {/* Countdown Timer */}
          <CountdownTimer targetDate={nextExamDate} />

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
            alt="SAT & AP Dashboard Preview" 
            className="w-full h-full max-h-[500px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}