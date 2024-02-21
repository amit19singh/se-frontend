import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsernameSubmissionComponent = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const checkUserAndFetchQuestions = async (username) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/check-user`, {
        params: { username }
      });
      if (response.data.usernameExists) {
        navigate('/ResetPasswordComponent', { 
          state: { 
            username,
            email: response.data.email,
            securityQuestion1: response.data.SecurityQuestion1,
            securityQuestion2: response.data.SecurityQuestion2
          } 
        });
      } else {
        alert('Username does not exist.');
      }
    } catch (error) {
      console.error('Error checking user and fetching questions:', error);
      alert('Failed to check username and fetch security questions. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUserAndFetchQuestions(username);
  };

  return (
    <div>
      <h2>Enter Username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default UsernameSubmissionComponent;
