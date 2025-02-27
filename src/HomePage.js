import './App.css';
import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import Services from './Services';
import ContactUS from './ContactUs';
import Footer from './Footer';
import FAQs from './FAQs';
import AboutUs from './AboutUs'; // Import AboutUs component
import Webinars from './Webinars';

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
      <div id="webinars">
        <Webinars />
      </div>
      <div id="faq">
        <FAQs />
      </div>
      <div id="contact-us">
        <ContactUS />
      </div>
      
      <Footer />
    </div>
  );
}

export default HomePage;