import './App.css';
import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import Services from './Services';
import Footer from './Footer';
import Pricing from './Pricing';
import ArenaSignUpForm from './ArenaSignUpForm';

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
      <div id="pricing">
        <Pricing />
      </div>
      <div id="register">
        <ArenaSignUpForm/>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;