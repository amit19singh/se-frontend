import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserActions } from './UserActionsContext';
import { useAuth } from './AuthContext';


function FriendsList() {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const { handleRemoveFriend, handleBlockUser} = useUserActions();
    const { user, logout, fetchUserDetails } = useAuth();

    const token = localStorage.getItem('token');

    useEffect(() => {
      const fetchDetailsAndSetState = async () => {
        const token = localStorage.getItem('token');
        if (!user && token) {
          await fetchUserDetails(token); 
        } else if (!token) {
          handleLogout();
          return; 
        }
      }

      if (user && user.friends) {
          setFriends(user.friends);
      }
      fetchDetailsAndSetState();
    }, [user]);
    
    const handleLogout = () => {
      logout();
      navigate('/');
    };

    // REMOVE FRIENDS
    const removeFriend = async (friendId) => {
      console.log("HERE:", friendId);
      const success = await handleRemoveFriend(friendId);
      if (success) {
        alert('Friend removed successfully');
        setFriends(currentFriends => currentFriends.filter(friend => friend.id !== friendId));
        fetchUserDetails(token);
      } else {
        alert('Failed to remove friend');
      }
    };

    // BLOCK USER
    const blockUser = async (userId) => {
      const success = await handleBlockUser(userId);
      if (success) {
        alert('User blocked successfully');
        fetchUserDetails(token);
      } else {
        alert('Failed to block user');
      }
    };

    return (
      <div>
        <h2>Friends List</h2>
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>
              {friend.firstname} {friend.lastname} (@{friend.username})
              <button onClick={() => removeFriend(friend.id)}>Remove Friend</button>
              <button onClick={() => blockUser(friend.id)}>Block</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
export default FriendsList;