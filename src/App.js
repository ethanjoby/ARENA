import './App.css';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from './AdminPage';
import Essays from './Essays';

import ArenaSignUpForm from './ArenaSignUpForm';

function App() {
  return (
    
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/sign-up" element={<ArenaSignUpForm />} />
        <Route path="/essays" element={<Essays />} />

      </Routes>
    </Router>
  );
}

export default App;
