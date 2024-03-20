import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtpSuccess, verifyOtpFailure } from '../actions/authActions';
import 'typeface-roboto';


const VerifyTwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const userName = location.state?.username;

  const verifyOtp = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify2fa`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, otp }),
      });
      if (response.ok) {
        alert('2FA verification successful');
        dispatch(verifyOtpSuccess()); 
        navigate('/home'); 
      } else {
        alert('Invalid OTP. Please try again.');
        dispatch(verifyOtpFailure('Invalid OTP')); 
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      dispatch(verifyOtpFailure(error.message)); 
    }
  };
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
<<<<<<< HEAD
=======
      alignItems: 'center',
      marginTop: '20px',
>>>>>>> db898771d316229965b3eb3a28e0278f2c4f862d
      justifyContent: 'center', // Centers content vertically in the container
      alignItems: 'center', // Centers content horizontally in the container
      position: 'absolute', // Use absolute positioning
      top: '50%', // Position halfway down the parent
      left: '50%', // Position halfway across the parent
      transform: 'translate(-50%, -50%)', // This will center the container
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '80%', // You can adjust this as necessary
      boxSizing: 'border-box',
      fontFamily: '"Roboto", sans-serif', // Ensure the font family is applied
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '100%', // Make the input full width of the container
    },
    button: {
      marginTop: '10px',
      padding: '10px 20px',
      borderRadius: '5px',
<<<<<<< HEAD
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#0056b3',
      color: '#fff',
      fontWeight: 'bold',
=======
      border: '1px solid #ccc',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#f0f0f0',
      backgroundColor: '#0056b3',
      color: '#fff',
      fontWeight: 'bold',
    },
    image: {
      marginTop: '20px',
>>>>>>> db898771d316229965b3eb3a28e0278f2c4f862d
      textTransform: 'uppercase',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      width: '100%', // Make the button full width of the container
      fontFamily: '"Roboto", sans-serif',
    },
    title: {
      color: '#333',
      textAlign: 'center',
      margin: '10px 0',
      fontWeight: 'bold',
      fontFamily: '"Roboto", sans-serif',
    }
  };

//   return (
//     <div style={styles.container}>
//       <h2>Verify Two-Factor Authentication</h2>
//       <input
//         type="text"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         placeholder="Enter your OTP"
//       />
//       <button onClick={verifyOtp}>Verify</button>
//     </div>
//   );
// };
  return (
    <div style={styles.container}>
<<<<<<< HEAD
=======
      <h2>Verify Two-Factor Authentication</h2>
>>>>>>> db898771d316229965b3eb3a28e0278f2c4f862d
      <h2 style={styles.title}>Verify Two-Factor Authentication</h2>
      <input
        style={styles.input}
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter your OTP"
      />
<<<<<<< HEAD
=======
      <button onClick={verifyOtp}>Verify</button>
>>>>>>> db898771d316229965b3eb3a28e0278f2c4f862d
      <button
        style={styles.button}
        onClick={verifyOtp}
        className="buttonHoverEffect" // Apply the same hover effect as defined in the external CSS
      >
        Verify
      </button>
    </div>
  );
  };

export default VerifyTwoFactorAuth;
