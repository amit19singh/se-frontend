import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const [userName, setUserName] = useState('');
  const [isTwoFactorEnabled, setisTwoFactorEnabled] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/'); // Redirect to login if no token found
        return;
      }
  
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userDetail`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserName(data.username);
        setisTwoFactorEnabled(data.twoFactorEnabled);
        console.log(`2FA: ${data.twoFactorEnabled}`);
        if (isTwoFactorEnabled) {
          navigate('/verify2FA', { state: { username: userName } });
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [navigate]);
  
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to the login page or home page
    navigate('/login');
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to Your Dashboard, {userName || 'User'}!</h2>
      <p>This is your personalized user home page. From here, you can:</p>
      <ul>
        <li>View your profile</li>
        <li>Access your settings</li>
        <li>Explore available features</li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      <button onClick={() => navigate('/settings')}>Settings</button>
      <button onClick={() => navigate('/2FA', { state: { username: userName , isTwoFactorEnabled: isTwoFactorEnabled} })}>2 Factor Authentication</button> 

    </div>
  );
};

export default UserHome;
