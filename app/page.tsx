import '@/components/src/App.css'; 
import Testimonials from '@/components/src/Testimonials'; 
import HeroSection from '@/components/src/HeroSection';
import Services from '@/components/src/Services';
import GoogleFormEmbed from '@/components/src/GoogleFormEmbed';
import Footer from '@/components/src/Footer';
import Pricing from '@/components/src/Pricing';

function App() {

  return (
    <div className="App">
    <HeroSection/>
    <Services/>
    <Testimonials />
    <Pricing/>
    <Footer/>
    </div>
  );
}

export default App;
