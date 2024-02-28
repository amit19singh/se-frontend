import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


function FriendsList() {
    const location = useLocation();
    const { friends } = location.state || { friends: [] }; // Fallback to empty array if no state
  
    return (
      <div>
        <h2>Friends List</h2>
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>{friend.firstname} {friend.lastname} (@{friend.username})</li>
          ))}
        </ul>
      </div>
    );
  }
  
export default FriendsList;