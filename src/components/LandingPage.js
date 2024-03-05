import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import styles from './CSS/LandingPage.module.css'; 


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
    <div className={styles.container}>
      <h1>Welcome to Anti-Facebook</h1>
      <p>This is a great place to start your journey with us.</p>
      
      <h2 className={styles.title}>Login with Google</h2>
      <a href="http://localhost:8080/oauth2/authorization/google" className={styles.oauthLink}>Login with Google</a>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="usernameOrEmail"
          type="text"
          value={credentials.usernameOrEmail}
          onChange={handleChange}
          placeholder="Username or Email"
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <p onClick={() => navigate('/UsernameSubmissionComponent')} className={styles.link}>Forgot Password?</p>
      <br></br>
      <p onClick={() => navigate('/register')} className={styles.link}>Register</p>
    </div>
  );
};

export default LandingPage;




