import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth(); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      console.log("Token found in URL HERE:", token);
      loginWithToken(token);
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [navigate, loginWithToken]);

  return <div>Processing your login...</div>;
};

export default OAuthRedirectHandler;
