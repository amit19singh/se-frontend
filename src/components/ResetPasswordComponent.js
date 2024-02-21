import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, email, securityQuestion1, securityQuestion2 } = location.state || {};

  const [answers, setAnswers] = useState({
    username: username, // Pre-fill the username from the passed state
    email: email,
    answer1: '',
    answer2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/password-reset-security-check?email=${encodeURIComponent(answers.email)}&answer1=${encodeURIComponent(answers.answer1)}&answer2=${encodeURIComponent(answers.answer2)}`);
      console.log('Security answers verified:', response.data);
      alert('An email has been sent to your registered Email.');
      // navigate('/password-reset-request', { state: { email: answers.username, temporaryVerificationToken: response.data.temporaryVerificationToken } });
    } catch (error) {
      alert('Error verifying security answers. Please try again.')
      console.error('Error verifying security answers:', error.response ? error.response.data : error.message);
    }
};

  return (
    <div>
      <h2>Reset Password for {username}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{securityQuestion1}</label>
          <input
            name="answer1"
            type="text"
            value={answers.answer1}
            onChange={handleChange}
            placeholder="Answer 1"
            required
          />
        </div>
        <div>
          <label>{securityQuestion2}</label>
          <input
            name="answer2"
            type="text"
            value={answers.answer2}
            onChange={handleChange}
            placeholder="Answer 2"
            required
          />
        </div>
        <button type="submit">Verify Answers</button>
      </form>
    </div>
  );
};

export default ResetPasswordComponent;
