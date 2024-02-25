import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(credentials => ({ ...credentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, credentials);
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.accessToken);
        
        const userDetailResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userDetail`, {
          headers: {
            'Authorization': `Bearer ${response.data.accessToken}`,
          },
        });
        if (userDetailResponse.status === 200) {
          console.log(`2FA: ${userDetailResponse.data.twoFactorEnabled}`);
          if (userDetailResponse.data.twoFactorEnabled) {
            navigate('/verify2FA', { state: { username: credentials.usernameOrEmail } });
          } else {
            navigate('/home');
          }
        }
      } else {
        console.error('Login failed: Unexpected response');
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <a href="http://localhost:8080/oauth2/authorization/google">Login with Google</a>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="usernameOrEmail"
          type="text"
          value={credentials.usernameOrEmail}
          onChange={handleChange}
          placeholder="Username or Email"
        />
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <p onClick={() => navigate('/UsernameSubmissionComponent')} style={{cursor: 'pointer', color: 'blue'}}>Forgot Password?</p>
    </div>
  );
};

export default LoginPage;




