import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import Essays from './Essays';
import ThankYouPage from "./ThankYouPage";
import ArenaSignUpForm from './ArenaSignUpForm';
import AboutUs from './AboutUs';
import Portal from './Portal';
import Webinars from './Webinars';
import BootcampOfferings from './BootcampOfferings';
import Checkout from './Checkout';

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
        <Route path="/portal" element={<Portal />} />
        <Route path="/bootcamp" element={<BootcampOfferings />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
