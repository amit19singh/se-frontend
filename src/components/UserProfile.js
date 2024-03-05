import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userName }) => {
        const [userName, setUserName] = useState('');
        
        return (
          <div>
            <h2>Welcome to Your Dashboard, {userName || 'User'}!</h2>
            <p>This is your personalized user home page. From here, you can:</p>
            <ul>
              <li>View your profile</li>
              <li>Access your settings</li>
              <li>Explore available features</li>
            </ul>
          </div>
        );
      };
      