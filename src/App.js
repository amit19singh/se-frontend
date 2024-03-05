import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import AccountVerified from './components/AccountVerified';
import UserHome from './components/UserHome';
import VerificationFailure from './components/VerificationFailure';
import ResetPasswordPage from './components/ResetPasswordPage';
import ResetPasswordComponent from './components/ResetPasswordComponent';
import UsernameSubmissionComponent from './components/UsernameSubmissionComponent';
import TwoFactorAuth from './components/TwoFactorAuth';
import VerifyTwoFactorAuth from './components/VerifyTwoFactorAuth';
import EditProfile from './components/EditProfile';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account_verified" element={<AccountVerified />} />
          <Route path="/verification-failure" element={<VerificationFailure />} />
          
          <Route path="/home" element={<UserHome />} />

          <Route path="/UsernameSubmissionComponent" element={<UsernameSubmissionComponent />} />
          <Route path="/ResetPasswordComponent" element={<ResetPasswordComponent />} />
          <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
          
          <Route path="/2FA" element={<TwoFactorAuth />} />
          <Route path="/verify2FA" element={<VerifyTwoFactorAuth />} />
          
          <Route path="/edit-profile" element={<EditProfile />} />
          
          <Route path="/friends" element={<FriendsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
