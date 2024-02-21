import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyTwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  
  // Assuming the username is passed via location state for continuity, adjust as needed
  const userName = location.state?.username;

  const verifyOtp = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify2fa`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, otp }),
      });
      if (response.ok) {
        alert('2FA verification successful');
        // Navigate to the dashboard or next page as needed
        navigate('/home');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      <h2>Verify Two-Factor Authentication</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter your OTP"
      />
      <button onClick={verifyOtp}>Verify</button>
    </div>
  );
};

export default VerifyTwoFactorAuth;
