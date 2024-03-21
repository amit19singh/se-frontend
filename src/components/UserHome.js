import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Profile from '../components/profile/userProfile';
import Share from './share/Share';
import './UserHome.scss';

const UserHome = () => {
  const { user, logout, fetchUserDetails } = useAuth();
  
  const [userName, setUserName] = useState('');
  const { user, logout, fetchUserDetails } = useAuth();
  const navigate = useNavigate();

<<<<<<< HEAD
=======

  // PAGE INIT
>>>>>>> 3ba4cffd9ee26fcf03f5c08a78fa15d46943104a
  useEffect(() => {
    const fetchDetailsAndSetState = async () => {
      const token = localStorage.getItem('token');
      console.log("token", token);
      if (!user && token) {
        await fetchUserDetails(token);
      } else if (!token) {
        handleLogout();
        return;
      }

      if (user) {
        setUserName(user.username || '');
      }
    };

    fetchDetailsAndSetState();
  }, [user, navigate, fetchUserDetails]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  console.log("USER: ", user);

  return (
    <div className="user-home">
      <h2>Welcome to AntiFacebook, {userName || 'User'}!</h2>

      <div className="profile-container">
        <Profile />
      </div>

      <div className="share-container">
        <Share />
      </div>
    </div>
  );
};

export default UserHome;
