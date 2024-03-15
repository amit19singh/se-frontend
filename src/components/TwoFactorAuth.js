import { Style } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  
  const userName = location.state?.username;
  const is2FAEnabled = location.state?.isTwoFactorEnabled;

  const handleEnable2FA = async () => {
    if (is2FAEnabled) {
      alert('Two-Factor Authentication is already enabled.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/setup2fa`, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName }),
      });
      const qrCodeDataUrl = await response.text();
      setQrCodeUrl(qrCodeDataUrl);
      setIsQRCodeGenerated(true);
      console.log(`data: ${qrCodeDataUrl}`);
    } catch (error) {
      console.error('Error enabling 2FA:', error);
    }
  };

  const disable2FA = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/disable2fa`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName }),
      });

      if (response.ok) {
        alert('2FA disabled successfully.');
        navigate('/home'); // UserHome
      } else {
        alert('Failed to disable 2FA. Please try again.');
      }
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      alert('An error occurred while disabling 2FA.');
    }
  };

  const proceedToVerifyOTP = () => {
    navigate('/verify2FA', { state: { username: userName } });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
    },
    button: {
      marginTop: '10px',
      padding: '10px 20px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
    },
    image: {
      marginTop: '20px',
    },
    title: {
      color: '#333',
    }
  };


  return (
    <div style={styles.container}>
      <h2>Setup Two-Factor Authentication</h2>
      {!isQRCodeGenerated ? (
        <button onClick={handleEnable2FA}>Generate QR Code</button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <p style={{ margin: '10px 0' }}>Scan this QR code with your 2FA app:</p>
  <img src={qrCodeUrl} alt="QR Code" style={{ maxWidth: '100%', margin: '10px 0' }} />
  <button onClick={proceedToVerifyOTP} style={{ margin: '10px 0' }}>I've Scanned the QR Code</button>
</div>

      )}
      {is2FAEnabled && (
        <button onClick={disable2FA}>Disable 2FA</button>
      )}
    </div>
  );
};


export default TwoFactorAuth;
