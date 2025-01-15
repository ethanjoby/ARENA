import './App.css';
import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import Services from './Services';
import GoogleFormEmbed from './GoogleFormEmbed';
import Footer from './Footer';
import Pricing from './Pricing';

function App() {
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
        <GoogleFormEmbed src="https://docs.google.com/forms/d/e/1FAIpQLSciJRfEmMTLYZY-JO_WyPwC_TPgECcYyKGSBWeuR1_F-Eyo_w/viewform?embedded=true" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
