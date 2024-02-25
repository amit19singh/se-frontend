import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./CSS/login.css"; // Ensure this CSS file contains the necessary styles

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState(''); // To store login errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, credentials);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);
        // ... additional success logic
      } else {
        setError('Login failed. Please try again.'); // Set error message
      }
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Login with Google</h2>
        <a className="google-login-link" href={`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`}>Login with Google</a>
        <h2>Or use your account</h2>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-input"
          name="usernameOrEmail"
          type="text"
          value={credentials.usernameOrEmail}
          onChange={handleChange}
          placeholder="Username or Email"
        />
        <input
          className="login-input"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="login-button" type="submit">Login</button>
        {error && <p className="login-error">{error}</p>} {/* Display error message */}
      </form>
      <p className="forgot-password" onClick={() => navigate('/UsernameSubmissionComponent')}>Forgot Password?</p>
    </div>
  );
};

export default LoginPage;
