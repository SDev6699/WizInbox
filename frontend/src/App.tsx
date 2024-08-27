import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
