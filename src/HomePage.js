import './App.css';
import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import Services from './Services';
import Footer from './Footer';
import FAQs from './FAQs';
import AboutUs from './AboutUs'; // Import AboutUs component

function HomePage() {
  return (
    <div className="App">
      {/* Set each section with an ID for linking */}
      <div id="hero">
        <HeroSection />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="about-us">
        <AboutUs /> {/* Add AboutUs section */}
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="faq">
        <FAQs />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;