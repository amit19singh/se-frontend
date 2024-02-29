import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


function FriendsList() {
    const location = useLocation();
    const { friends } = location.state || { friends: [] };
  
    return (
      <div>
        <h2>Friends List</h2>
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>
              {friend.firstname} {friend.lastname} (@{friend.username})
              {/* <button onClick={() => onRemoveFriend(friend.id)}>Remove Friend</button>
              <button onClick={() => onBlockUser(friend.id)}>Block</button> */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
export default FriendsList;