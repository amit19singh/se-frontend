import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string'; 

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = queryString.parse(location.search); 

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, {
        token,
        newPassword
      });
  
      if (response.status === 200) {
        alert('Your password has been reset successfully.');
        navigate('/login'); 
      } else {
        console.error('Unexpected response:', response);
        alert('Failed to reset password due to an unexpected error. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Reset password error:', error.response.data);
        const errorMessage = error.response.data.message || 'Failed to reset password. Please try again.';
        alert(errorMessage);
      } else if (error.request) {
        console.error("No response was received", error.request);
        alert('No response from the server. Please check your network connection.');
      } else {
        console.error('Error', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  
  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
