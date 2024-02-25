import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import UserHome from './components/UserHome';
import VerifyAccount from './components/VerifyAccount';
import VerificationFailure from './components/VerificationFailure';
import ResetPasswordPage from './components/ResetPasswordPage';
import ResetPasswordComponent from './components/ResetPasswordComponent';
import UsernameSubmissionComponent from './components/UsernameSubmissionComponent';
import TwoFactorAuth from './components/TwoFactorAuth';
import VerifyTwoFactorAuth from './components/VerifyTwoFactorAuth';
import EditProfile from './components/EditProfile';

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
          <Route path="/verification-failure" element={<VerificationFailure />} />
          <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
          <Route path="/ResetPasswordComponent" element={<ResetPasswordComponent />} />
          <Route path="/UsernameSubmissionComponent" element={<UsernameSubmissionComponent />} />
          <Route path="/2FA" element={<TwoFactorAuth />} />
          <Route path="/verify2FA" element={<VerifyTwoFactorAuth />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
