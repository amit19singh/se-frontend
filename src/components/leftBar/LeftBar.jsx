import "./leftBar.scss";

import Friends from "../../assets/user.png";
import Groups from "../../assets/group.png";
import Market from "../../assets/marketplace.png";
import Watch from "../../assets/video.png";
import Memories from "../../assets/stopwatch.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/console.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/video-lesson.png";
import Courses from "../../assets/learning.png";
import Fund from "../../assets/donate.png";

import { useAuth } from '../../context/AuthContext'; 
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const LeftBar = () => {
  
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePicUrl] = useState('');
  const navigate = useNavigate();

  const { user, logout, fetchUserDetails } = useAuth();

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
        setProfilePicUrl(user.profilePicUrlDisplay || '');
      }
    }; fetchDetailsAndSetState();
  }, [user, navigate, fetchUserDetails]);

  // LOGOUT
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // console.log("LEFT BAR USER: ", user);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={profilePic}
              alt=""
            />
            <span>{userName}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
