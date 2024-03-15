import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import "./LandingPage.scss";


const LandingPage = () => {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login, user } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(credentials => ({ ...credentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials); 
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  useEffect(() => {
    if (user) {
      if (user.twoFactorEnabled) {
        navigate('/verify2FA', { state: { username: credentials.usernameOrEmail } });
      } else {
        navigate('/home');
      }
    }
  }, [user, credentials.usernameOrEmail, navigate]);


return (
  <div className="login">
    <div className="card">
      <div className="left">
      <h1>Welcome to Anti-Facebook</h1>
      <p>This is a great place to start your journey with us.</p>
        <span>Don't have an account?</span>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
      <div className="right">
      
        <h1>Login</h1>
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
          <div className="google-login">
          <button id="google-login" type='button' onClick={() => window.location.href='http://localhost:8080/oauth2/authorization/google'}>Login with Google</button>
          </div>

      <Link to='/UsernameSubmissionComponent'>
        <h6>Forgot Password?</h6>
      </Link>
      </form>
      </div>
    </div>
  </div>
);
};


export default LandingPage;



