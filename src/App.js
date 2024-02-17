import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import UserHome from './components/UserHome';
import VerifyAccount from './components/VerifyAccount';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
