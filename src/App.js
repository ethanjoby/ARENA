import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import Essays from './Essays';
import ThankYouPage from "./ThankYouPage";
import ArenaSignUpForm from './ArenaSignUpForm';
import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import Services from './Services';
import Footer from './Footer';
import FAQs from './FAQs';
import AboutUs from './AboutUs';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/sign-up" element={<ArenaSignUpForm />} />
        <Route path="/essays" element={<Essays />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
