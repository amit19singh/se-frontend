import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Current URL:", location.pathname + location.search); // Log the full URL for debugging
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    console.log("Extracted token:", token); // Confirm the extracted token
  
    if (!token) {
      console.error('No token provided');
      return;
    }
  
    // Make a request to the backend to verify the token
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/verify?token=${token}`)
      .then(response => {
        console.log(response.data); // Log success message from backend
        // Here, handle the successful verification, e.g., display a success message or redirect
      })
      .catch(error => {
        console.error('Verification error:', error.response ? error.response.data : 'Unknown error');
        // Here, handle the failed verification, e.g., display an error message
      });
  }, [navigate, location.search]);
  

  return <div>Verifying your account...</div>;
};

export default VerifyAccount;
