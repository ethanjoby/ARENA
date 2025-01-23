import './App.css';
import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import Services from './Services';
import Footer from './Footer';
import FAQs from './FAQs'

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
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="faq">
        <FAQs/>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;