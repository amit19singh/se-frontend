import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserActions } from '../context/UserActionsContext';
import { likePost, unlikePost } from '../actions/postActions';

import Share from './share/Share';
import Posts from './posts/Posts';

const UserHome = () => {
  const [userName, setUserName] = useState('');
  const [isTwoFactorEnabled, setisTwoFactorEnabled] = useState('');
  const [caption, setCaption] = useState('');
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestsPending, setFriendRequestsPending] = useState([]);
  const [friends, setFriends] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user, logout, fetchUserDetails } = useAuth();
  const { handleUpload, handleDeletePost, handleLikePost, handleUnlikePost, handleSearch, handleAddFriend, handleAcceptRequest, handleRemoveFriend, 
    handleRejectRequest, handleBlockUser, handleUnblockUser } = useUserActions();
  


  // PAGE INIT
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
        setPosts(user.posts || []);
        setUserName(user.username || '');
        setisTwoFactorEnabled(user.twoFactorEnabled || false);
        setFriendRequests(user.friendRequestsPending || []);
        setFriends(user.friends || []);
      }
    };
  
    fetchDetailsAndSetState();
  }, [user, navigate, fetchUserDetails]);
  

// LOGOUT
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  console.log("USER: ", user);

    // ADD FRIEND
    const onAddFriend = async (addFriendUsername) => {
      const success = await handleAddFriend(addFriendUsername);
  
      if (success) {
        alert('Friend request sent successfully!');
      } else {
        alert('Failed to send friend request.');
      }
    };


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


    // REMOVE FRIENDS
    const removeFriend = async (friendId) => {
      const success = await handleRemoveFriend(friendId);
      if (success) {
        alert('Friend removed successfully');
        setFriends(currentFriends => currentFriends.filter(friend => friend.id !== friendId));
      } else {
        alert('Failed to remove friend');
      }
    };

    // BLOCK USER
    const blockUser = async (userId) => {
      const success = await handleBlockUser(userId);
      if (success) {
        alert('User blocked successfully');
      } else {
        alert('Failed to block user');
      }
    };


    // UNBLOCK USER
    const unblockUser = async (userId) => {
      const success = await handleUnblockUser(userId);
      if (success) {
        alert('User unblocked successfully');
      } else {
        alert('Failed to unblock user');
      }
    };



  return (
      <div style={{ padding: '20px' }}>
        <h2>Welcome to Your Dashboard, {userName || 'User'}!</h2>
        <p>This is your personalized user home page. From here, you can:</p>
        <ul>
          <li>View your profile</li>
          <li>Access your settings</li>
          <li>Explore available features</li>
        </ul>

        <Share />
        {/* <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        <button onClick={() => navigate('/settings')}>Settings</button>
        <button onClick={() => navigate('/2FA', { state: { username: userName , 
                                                  isTwoFactorEnabled: isTwoFactorEnabled} })}>2 Factor Authentication</button> 
        <button onClick={() => navigate('/friends', { state: { friends: friends } })}>View Friends</button> */}
      

        <div style={{ padding: '20px' }}>

      </div>
      <div>
      <div style={{ maxWidth: '500px', margin: 'auto' }}>


  {/* ACCEPT/REJECT REQUESTS */}
    {/* <div>
      <h3>Friend Requests</h3>
      {friendRequests.map((request) => (
          <div key={request.id}>
              <p>{request.username} wants to be friends.</p>
              <button onClick={() => acceptRequest(request.id)}>Accept</button>
              <button onClick={() => rejectRequest(request.id)}>Reject</button>
          </div>
      ))}
  </div> */}

    <Posts />
  </div>
  </div>
  </div>
);
};

export default UserHome;

