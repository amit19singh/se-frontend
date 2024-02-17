import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Example function to fetch user data (adjust based on your actual data fetching logic)
  useEffect(() => {
    const fetchUserData = async () => {
      // Assuming you store the user's token in localStorage and have an endpoint to fetch user details
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/'); // Redirect to login if no token found
        return;
      }

      try {
        // Replace with your actual fetch URL and include headers as necessary
        const response = await fetch('/api/user/details', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserName(data.name); // Adjust based on the actual response structure
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error (e.g., redirect to login or show a message)
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to Your Dashboard, {userName || 'User'}!</h2>
      <p>This is your personalized user home page. From here, you can:</p>
      <ul>
        <li>View your profile</li>
        <li>Access your settings</li>
        <li>Explore available features</li>
      </ul>
      <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      <button onClick={() => navigate('/settings')}>Settings</button>
      {/* Add more navigation buttons or links as needed */}
    </div>
  );
};

export default UserHome;
