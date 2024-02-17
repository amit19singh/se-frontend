import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

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
      navigate('/verify-account');
      console.log('User registered:', response.data);
      // Redirect to login page or display success message
    } catch (error) {
      console.error('Registration error:', error.response.data);
      // Handle errors, e.g., show error message to the user
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
          name="birthday"
          type="date"
          value={user.birthday}
          onChange={handleChange}
          placeholder="Birthday"
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
        {/* Security Questions */}
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
  );
};

export default RegisterPage;
