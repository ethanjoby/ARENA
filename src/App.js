import './App.css';
import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import Services from './Services';
import GoogleFormEmbed from './GoogleFormEmbed';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
    <HeroSection/>
    <Services/>
    <Testimonials />
    <GoogleFormEmbed src="https://docs.google.com/forms/d/e/1FAIpQLSciJRfEmMTLYZY-JO_WyPwC_TPgECcYyKGSBWeuR1_F-Eyo_w/viewform?embedded=true" />
    <Footer/>
    </div>
  );
}

export default App;
