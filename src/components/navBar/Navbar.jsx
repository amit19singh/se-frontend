import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../components/AuthContext'; 
import { useUserActions } from '../../components/UserActionsContext';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  
  const { user, logout, fetchUserDetails } = useAuth();
  const { handleSearch } = useUserActions();
  
  const [userName, setUserName] = useState('');
  const [isTwoFactorEnabled, setisTwoFactorEnabled] = useState('');
  const [profilePic, setProfilePicUrl] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);

  
  const navigate = useNavigate();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [settingsSubmenuVisible, setSettingsSubmenuVisible] = useState(false);

  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setSettingsSubmenuVisible(false); 
  };

  
  const toggleSettingsSubmenu = (e) => {
    e.stopPropagation();
    setSettingsSubmenuVisible(!settingsSubmenuVisible);
  };

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
      }
    }; fetchDetailsAndSetState();
  }, [user, navigate, fetchUserDetails]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  // SEARCH  
  const onSearch = async () => {
    try {
      const results = await handleSearch(searchQuery);
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      alert('Search failed: ' + error.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        onSearch(); 
    }
};
  
  // console.log("USER in NAVBAR:", user);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Anti Facebook</span>
        </Link>
        <HomeOutlinedIcon />
        {/* {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )} */}
        <GridViewOutlinedIcon />
        
        
        {/* SEARCH */}
        <div className="search">
          <SearchOutlinedIcon onClick={onSearch}/>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(false)}
            onKeyDown={handleKeyDown}/>

         <div>

         {searchResults.length > 0 && showDropdown && (
          <div className="dropdown">
            {searchResults.map((user, index) => (
              <div key={index} className="dropdown-item">
                <p>{user.firstname} {user.lastname} (@{user.username})</p>
                <button onClick={() => navigate(`/user/${user.username}`)}>View Profile</button>
                {user.requestSent === "PENDING" && <button disabled>Pending</button>}
                {user.requestSent === "ACCEPTED" && <button disabled>Friends</button>}
              </div>
            ))}
          </div>
        )}
        </div>
        

        </div>

      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src={profilePic}
            alt=""
          />

      <div className="navbar">
      <div className="right">
        <div className="user" onClick={toggleDropdown}>
          <span>{userName}</span>
          {dropdownVisible && (
            <div className="dropdown">
              <ul>
                <li>View Friends</li>
                <li onClick={toggleSettingsSubmenu}>Settings
                  {settingsSubmenuVisible && (
                    <ul className="submenu">
                      <li onClick={() => navigate('/edit-profile')}>Edit Profile</li>
                      <li onClick={() => navigate('/2FA', { state: { username: userName , 
                                                isTwoFactorEnabled: isTwoFactorEnabled} })}>2 Factor Auth</li>
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

export default Navbar;
