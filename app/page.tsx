import '@/components/Sections/src/App.css'; 
import Testimonials from '@/components/Sections/src/Testimonials'; 
import HeroSection from '@/components/Sections/src/HeroSection';
import Services from '@/components/Sections/src/Services';
import GoogleFormEmbed from '@/components/Sections/src/GoogleFormEmbed';
import Footer from '@/components/Sections/src/Footer';
import Pricing from '@/components/Sections/src/Pricing';

function App() {

  return (
    <div className="App">
    <HeroSection/>
    <Services/>
    <Testimonials />
    <Pricing/>
    <GoogleFormEmbed src="https://docs.google.com/forms/d/e/1FAIpQLSciJRfEmMTLYZY-JO_WyPwC_TPgECcYyKGSBWeuR1_F-Eyo_w/viewform?embedded=true" />
    <Footer/>
    </div>
  );
}

export default App;
