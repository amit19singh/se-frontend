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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/register" element={<RegisterPage />} />
 
          <Route path="/account_verified" element={
            <ProtectedRoute sequentialAccessRequired={true} redirectTo="/">
              <AccountVerified />
            </ProtectedRoute>
          } />
          <Route path="/verification-failure" element={
            <ProtectedRoute sequentialAccessRequired={true} redirectTo="/">
            <VerificationFailure />
            </ProtectedRoute>
          } />
          
          <Route path="/home" element={<UserHome />} />

          <Route path="/UsernameSubmissionComponent" element={
              <ProtectedRoute requireAuth={true}>
                <UsernameSubmissionComponent />
              </ProtectedRoute>
            } />

          <Route path="/ResetPasswordComponent" element={
              <ProtectedRoute requireAuth={true}>
               <ResetPasswordComponent />
              </ProtectedRoute>
            } />

          <Route path="/ResetPasswordPage" element={
              <ProtectedRoute requireAuth={true}>
                <ResetPasswordPage />
              </ProtectedRoute>
            } />
          
          <Route path="/2FA" element={
              <ProtectedRoute requireAuth={true}>
                <TwoFactorAuth />
              </ProtectedRoute>
            } />

          <Route path="/verify2FA" element={
              <ProtectedRoute requireAuth={true}>
                <VerifyTwoFactorAuth />
              </ProtectedRoute>
            } />
          
          <Route path="/edit-profile" element={
              <ProtectedRoute requireAuth={true}>
                <EditProfile />
              </ProtectedRoute>
            } />
          
          <Route path="/friends" element={<FriendsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
