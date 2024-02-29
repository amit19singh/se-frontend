import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './CSS/RegisterPage.module.css';

const RegisterPage = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',    
    email: '',
    password: '',
    birthday: '',
    gender: '',
    securityQuestion1: 'What is your favorite color?',
    securityAnswer1: '',
    securityQuestion2: 'What is the name of your first pet?',
    securityAnswer2: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(user.password)) {
      setErrorMessage('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one symbol.');
      return;
    }

    if (user.password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const age = calculateAge(user.birthday);
    if (age < 16) {
      setErrorMessage('You must be at least 16 years old to register.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, user);
      localStorage.setItem('token', response.data.token);
      console.log("response: " + response)
      alert("Please verify your account by clicking on the link sent to your email, and close this tab");
    } catch (error) {
      console.error('Registration error:', error.response.data);
      const errorMessage = error.response && error.response.data ? error.response.data : "An unexpected error occurred.";
      if (errorMessage == "Email already in use. Please use a different email.")
        alert("Email already in use. Please use a different email.");
      else 
        setErrorMessage("An unexpected error occurred during registration" );
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="firstname"
          type="text"
          value={user.firstname}
          onChange={handleChange}
          placeholder="First Name"
          className={styles.input}
        />
        <input
          name="lastname"
          type="text"
          value={user.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          className={styles.input}
        />
        <input
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          className={styles.input}
        />
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={styles.input}
        />
        <input
          name="birthday"
          type="date"
          value={user.birthday}
          onChange={handleChange}
          className={styles.input}
        />
        <select
          name="gender"
          value={user.gender}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <select
          name="securityQuestion1"
          value={user.securityQuestion1}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="What is your favorite color?">What is your favorite color?</option>
          <option value="What is the name of your first pet?">What is the name of your first pet?</option>
          <option value="What is your favorite video game?">What is your favorite video game?</option>
          <option value="Where were you born?">Where were you born?</option>
        </select>
        <input
          name="securityAnswer1"
          type="text"
          value={user.securityAnswer1}
          onChange={handleChange}
          placeholder="Security Answer 1"
          className={styles.input}
        />
        <select
          name="securityQuestion2"
          value={user.securityQuestion2}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="What is your favorite color?">What is your favorite color?</option>
          <option value="What is the name of your first pet?">What is the name of your first pet?</option>
          <option value="What is your favorite video game?">What is your favorite video game?</option>
          <option value="Where were you born?">Where were you born?</option>
        </select>
        <input
          name="securityAnswer2"
          type="text"
          value={user.securityAnswer2}
          onChange={handleChange}
          placeholder="Security Answer 2"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
