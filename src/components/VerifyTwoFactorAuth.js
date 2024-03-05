import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtpSuccess, verifyOtpFailure } from '../actions/authActions';


const VerifyTwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

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
        dispatch(verifyOtpSuccess()); 
        navigate('/home'); 
      } else {
        alert('Invalid OTP. Please try again.');
        dispatch(verifyOtpFailure('Invalid OTP')); 
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      dispatch(verifyOtpFailure(error.message)); 
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
