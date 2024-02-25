import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./CSS/register.css"; // Make sure the path is correct

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
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

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
    const age = calculateAge(user.birthday);
    if (age < 16) {
      setErrorMessage('You must be at least 16 years old to register.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, user);
      localStorage.setItem('token', response.data.token);
      alert("Please verify your account by clicking on the link sent to your email, and close this tab");
      navigate('/'); // Or navigate to the next page after successful registration
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      const message = error.response && error.response.data.message ? error.response.data.message : "An unexpected error occurred.";
      setErrorMessage(message);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h2>Register</h2>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Apply the className "register-input" to each input */}
        <input
          className="register-input"
          name="firstname"
          type="text"
          value={user.firstname}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          className="register-input"
          name="lastname"
          type="text"
          value={user.lastname}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          className="register-input"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="register-input"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          className="register-input"
          name="birthday"
          type="date"
          value={user.birthday}
          onChange={handleChange}
        />
        {/* Apply the className "register-select" to each select */}
        <select
          className="register-select"
          name="gender"
          value={user.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {/* Repeat for other select elements and the remaining input */}
        {/* ... */}
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
