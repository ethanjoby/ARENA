import './App.css';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from './AdminPage';

function App() {
  return (
    
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
