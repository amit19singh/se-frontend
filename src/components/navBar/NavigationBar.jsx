import "./NavigationBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useAuth } from '../../context/AuthContext'; 
import { useUserActions } from '../../context/UserActionsContext';
import { useDarkMode } from '../../context/DarkModeContext';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  
  const { user, logout, fetchUserDetails, token } = useAuth();
  const { handleSearch, handleAcceptRequest, handleRejectRequest } = useUserActions();
  const { toggle, darkMode } = useDarkMode();

  const navigate = useNavigate();
  
  const [userName, setUserName] = useState('');
  const [isTwoFactorEnabled, setisTwoFactorEnabled] = useState('');
  const [profilePic, setProfilePicUrl] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestsPending, setFriendRequestsPending] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [settingsSubmenuVisible, setSettingsSubmenuVisible] = useState(false);

  // Filter dropdown state
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ livesIn: '', mutualFriends: false, hashtag: '', topic: ''});
  const [mutualFriendsChecked, setMutualFriendsChecked] = useState(false);



  useEffect(() => {
    const fetchDetailsAndSetState = async () => {
      const token = localStorage.getItem('token');
      if (!user && token) {
        await fetchUserDetails(token); 
      } else if (!token) {
        handleLogout();
        return; 
      }

      if (user) {
        setUserName(user.username || '');
        setisTwoFactorEnabled(user.twoFactorEnabled || false);
        setProfilePicUrl(user.profilePicUrlDisplay || '');
        setisTwoFactorEnabled(user.twoFactorEnabled || false);
        setFriendRequests(user.friendRequestsPending || []);
        setFriends(user.friends || []);
        setIsPublic(user.profilePublic || false);
      }
    }; fetchDetailsAndSetState();
  }, [user, navigate, fetchUserDetails]);

  const handleLogout = () => {
    logout();
  };



  const handleFilterChange = (filterName, value) => {
    if (filterName === 'mutualFriends') {
      setMutualFriendsChecked(value);
    }
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setSettingsSubmenuVisible(false); 
  };

  
  const toggleSettingsSubmenu = (e) => {
    e.stopPropagation();
    setSettingsSubmenuVisible(!settingsSubmenuVisible);
  };


  // SEARCH
  const onSearch = async () => {
    try {
      const filtersQuery = Object.entries(selectedFilters)
        .filter(([_, value]) => value !== false && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
  
      const searchUrl = `/search-results?query=${encodeURIComponent(searchQuery)}&${filtersQuery}`;
  
      const results = await handleSearch(searchQuery, selectedFilters); 
      navigate(searchUrl, { state: { results: results } });
    } catch (error) {
      alert('Search failed: ' + error.message);
    }
  };

  const toggleProfilePrivacy = async () => {
    console.log("isPublic: ", isPublic);
    const newPrivacySetting = !isPublic;
    console.log("newPrivacySetting: ", newPrivacySetting);

    try {
        console.log("trying");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateProfileVisibility`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ isProfilePublic: newPrivacySetting })
        });

        if (response.ok) {
          console.log("newPrivacySetting1: ", newPrivacySetting);
            setIsPublic(newPrivacySetting);
        } else {
            console.error('Failed to update profile visibility');
            const errorMessage = await response.text();
            console.error(errorMessage);
        }
      } catch (error) {
          console.error('An error occurred:', error);
      }
  };

  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        onSearch(); 
    }
  };

  const handleNavigateHome = () => {
    navigate('/home');
  };

  const handleCheckRequests = () => {
    navigate('/friend-requests');
  }

  // ACCEPT FRIENDS REQUEST
  const acceptRequest = async (requestId) => {
    const success = await handleAcceptRequest(requestId);
    if (success) {
      alert('Friend request accepted!');
    } else {
      alert('Failed to accept friend request.');
    }
  };

  // REJECT FRIENDS REQUEST
  const rejectRequest = async (requestId) => {
    const success = await handleRejectRequest(requestId);
    if (success) {
      alert('Friend request rejected');
      setFriendRequestsPending(currentRequests => currentRequests.filter(request => request.id !== requestId));
    } else {
      alert('Failed to reject friend request');
    }
  };

  const toggleFilterDropdown = () => {
    console.log("Filter button clicked!");
    setFilterDropdownVisible(!filterDropdownVisible);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Anti Facebook</span>
        </Link>
        <div onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
          <HomeOutlinedIcon />
        </div>

        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        
        
        {/* SEARCH */}
        {/* SEARCH */}
        <div className="search">
          <SearchOutlinedIcon onClick={onSearch}/>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(false)}
            onKeyDown={handleKeyDown}/>
          {/* Filter button */}
          <button onClick={toggleFilterDropdown}>Filters</button>
          {/* Filter dropdown */}
          {/* Filter dropdown */}
          {filterDropdownVisible && (
            <div className="filter-dropdown" style={{ display: 'block' }}> 
              <div>
                <input
                  type="text"
                  placeholder="Lives In"
                  value={selectedFilters.livesIn} 
                  onChange={(e) => handleFilterChange('livesIn', e.target.value)}
                />
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleFilterChange('mutualFriends', e.target.checked)}
                    checked={mutualFriendsChecked} 
                  />
                  Mutual Friends

                </label>
              </div>
              {/* Hashtag filter */}
              <div>
                <input type="text" placeholder="#hashtag" onChange={(e) => handleFilterChange('hashtag', e.target.value)} />
              </div>
              {/* Topic filter */}
              <div>
                <input type="text" placeholder="Topic" onChange={(e) => handleFilterChange('topic', e.target.value)} />
              </div>
            </div>
          )}

        </div>


      </div>
      <div className="right">

      <div className="friend-requests">
        <button onClick={toggleDropdown}>
          <PersonOutlinedIcon />
        </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              {friendRequests.length > 0 ? (
                friendRequests.map((request) => (
                  <div key={request.id}>
                    <p><strong onClick={() => navigate(`/user/${request.username}`)}>{request.username}</strong> wants to be friends.</p>
                    <button className="accept" onClick={() => acceptRequest(request.id)}>Accept</button>
                    <button className="reject" onClick={() => rejectRequest(request.id)}>Reject</button>
                  </div>
                ))
              ) : (
                <p className="no-requests">No new requests</p>
              )}
            </div>
          )}
      </div>




        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            // src={profilePic}
            src={profilePic ? profilePic : "https://robohash.org/mail@ashallendesign.co.uk"}
            alt=""
          />

      <div className="navbar">
      <div className="right">
        <div className="user" onClick={toggleDropdown}>
          <span>{userName}</span>
          {dropdownVisible && (
            <div className="dropdown">
              <ul>
                <li onClick={() =>  navigate('/friends', { state: { friends: friends } })}>View Friends</li>
                <li onClick={toggleSettingsSubmenu}>Settings
                  {settingsSubmenuVisible && (
                    <ul className="submenu">
                      <li onClick={() => navigate('/edit-profile')}>Edit Profile</li>
                      <li onClick={() => navigate('/2FA', { state: { username: userName , 
                                                isTwoFactorEnabled: isTwoFactorEnabled} })}>2 Factor Authentication</li>
                      <li onClick={() => navigate('/blocked-users')}>Blocked Users</li>
                      <li onClick={toggleProfilePrivacy}>{isPublic ? 'Make Profile Private': 'Make Profile Public' }</li>
                      <li onClick={() => navigate('/delete-account')}>Delete Account</li>
                    </ul>
                  )}
                </li>
                <li>Terms of Service</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>

        </div>
      </div>
    </div>
  );
};

export default NavBar;