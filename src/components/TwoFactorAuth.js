import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [otp, setOtp] = useState('');
  
  const userName = location.state?.username;
  const is2FAEnabled = location.state?.isTwoFactorEnabled;
  // console.log(`username: ${userName}`);
  // console.log(`is2FAEnabled: ${is2FAEnabled}`);

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
        // Optionally, update local state or context to reflect the change
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


  return (
    <div>
      <h2>Setup Two-Factor Authentication</h2>
      {!isQRCodeGenerated ? (
        <button onClick={handleEnable2FA}>Generate QR Code</button>
      ) : (
        <div>
          <p>Scan this QR code with your 2FA app:</p>
          <img src={qrCodeUrl} alt="QR Code" />
          <button onClick={proceedToVerifyOTP}>I've Scanned the QR Code</button>
        </div>
      )}
      {is2FAEnabled && (
        <button onClick={disable2FA}>Disable 2FA</button>
      )}
    </div>
  );
};

//   return (
//     <div>
//       {!is2FAEnabled && (
//         <button onClick={handleEnable2FA}>Enable 2FA</button>
//       )}
//       {qrCodeUrl && (
//         <div>
//           <p>Scan this QR code with your 2FA app:</p>
//           <img src={qrCodeUrl} alt="QR Code" />
//         </div>
//       )}
//     </div>
//   );
// };

export default TwoFactorAuth;
