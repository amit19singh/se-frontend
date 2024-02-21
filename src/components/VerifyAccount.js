import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log("something");
    console.log(location);

    if (token) {
      console.log("token: " + token)
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/verify?token=${token}`)
        .then(response => {
          // Redirect to home page after successful verification
          setTimeout(() => navigate('/home'), 30000); // 30 seconds delay
        })
        .catch(error => {
          console.error('Verification error:', error);
          // Handle verification failure
        });
    }
  }, [location, navigate]);

  return <div>Verifying your account...
    <p>If you are not redirected in 30 seconds, <a href="/home">click here</a> to go to the home page.</p>
  </div>;
};

export default VerifyAccount;


