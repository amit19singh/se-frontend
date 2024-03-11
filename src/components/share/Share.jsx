import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useAuth } from '../../components/AuthContext'; 
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { useUserActions } from '../../components/UserActionsContext';

const Share = () => {

  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePicUrl] = useState('');

  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [posts, setPosts] = useState([]);

  const { user, logout, fetchUserDetails } = useAuth();
  const { handleUpload, handleDeletePost } = useUserActions();
  


  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // POST UPLOADS
  const handleFileChange = (event) => {
    console.log("HERE1: ");
    const { name, files } = event.target;
    if (name === 'image') {
      setImage(files[0]);
    } else if (name === 'video') {
      setVideo(files[0]);
    }
  };

  const onUpload = async () => {
    console.log("HERE2: ");
    const formData = new FormData();
    formData.append('caption', 'caption');
    formData.append('post', postText);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);
    await handleUpload(formData);

  };

  // POST DELETES
  const onDeletePost = async (postId) => {
    const success = await handleDeletePost(postId);
    if (success) {
      setPosts(currentPosts => currentPosts.filter(post => post.postId !== postId));
    }
  };


  return (
  <div className="share">
  <div className="container">
    <div className="top">
      <img src={profilePic} alt="" />
      <input 
        placeholder={`What's on your mind ${userName}?`}
        value={postText} 
        onChange={(e) => setPostText(e.target.value)} 
      />
    </div>
    <hr />
    <div className="bottom">
      <div className="left">
        <input 
          type="file" 
          id="file-image" 
          name="image"
          style={{display:"none"}} 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        <label htmlFor="file-image">
          <div className="item">
            <img src={Image} alt="" />
            <span>Add Image</span>
          </div>
        </label>
        <input 
          type="file" 
          id="file-video" 
          name="video"
          style={{display:"none"}} 
          accept="video/*" 
          onChange={handleFileChange} 
        />
        <label htmlFor="file-video">
          <div className="item">
            <img src={Image} alt="" /> {/* Consider replacing this with a video icon */}
            <span>Add Video</span>
          </div>
        </label>
        <div className="item">
          <img src={Map} alt="" />
          <span>Add Place</span>
        </div>
        <div className="item">
          <img src={Friend} alt="" />
          <span>Tag Friends</span>
        </div>
      </div>
      <div className="right">
        <button onClick={onUpload}>Share</button>
      </div>
    </div>
  </div>
</div>


  );
};

export default Share;
