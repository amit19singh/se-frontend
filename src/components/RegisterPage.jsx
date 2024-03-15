import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerSuccess, registerFailure } from '../actions/authActions'; 
import axios from 'axios';
import { Link } from "react-router-dom";
import "./RegisterPage.scss";
import styles from './CSS/RegisterPage.module.css';
import { Padding } from '@mui/icons-material';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordComplex, setIsPasswordComplex] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    if (name === "password" || name === "confirmPassword") {
      if (name === "password" && !validatePasswordComplexity(value)) {
        setIsPasswordComplex(false);
        setPasswordError('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one symbol.');
      } else {
        setIsPasswordComplex(true);
        setPasswordError('');
      }
  
      const otherValue = name === "password" ? confirmPassword : user.password;
      if (value !== otherValue) {
        setDoPasswordsMatch(false);
      } else {
        setDoPasswordsMatch(true);
      }
    }
  };
  

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const validatePasswordComplexity = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordComplex || !doPasswordsMatch) {
    alert("Please correct the highlighted errors before submitting.");
    return;
  }

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
      if (response.status === 200 || response.status === 201) { 
        console.log("Registration successful", response.data);
        localStorage.setItem('token', response.data.token);
  
        dispatch(registerSuccess(response.data.user));
        
        alert("Please verify your account by clicking on the link sent to your email.");
        navigate('/');
      } else {
        console.error('Registration failed: Unexpected response');
        dispatch(registerFailure('Unexpected response'));
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      const message = error.response && error.response.data && error.response.data.message ? error.response.data.message : "An unexpected error occurred.";
    setErrorMessage(message); 
      dispatch(registerFailure(errorMessage));
    }
  };
  

return (
  <div className="register">
    <div className="card">
      <div className="right">
        <h1>Anti Facebook</h1>
        <span>Do you have an account?</span>
        <Link to="/">
          <button>Login</button>
        </Link>
      </div>

      <div className="left">
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {!isPasswordComplex && <p className={styles.errorMessage}>{passwordError}</p>}
        {!doPasswordsMatch && <p className={styles.errorMessage}>Passwords do not match.</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="firstname"
            type="text"
            value={user.firstname}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            name="lastname"
            type="text"
            value={user.lastname}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <input
            name="birthday"
            type="date"
            value={user.birthday}
            onChange={handleChange}
          />
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
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
          />
          <select
            name="securityQuestion2"
            value={user.securityQuestion2}
            onChange={handleChange}
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
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  </div>
);
};



export default RegisterPage;