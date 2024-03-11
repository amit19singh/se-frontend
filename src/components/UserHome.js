import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useUserActions } from './UserActionsContext';
import { likePost, unlikePost } from '../actions/postActions';


import Navbar from './navBar/Navbar';
import LeftBar from './leftBar/LeftBar';
import RightBar from './rightBar/RightBar';
import Share from './share/Share';

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

  // POST UPLOADS
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name === 'image') {
      setImage(files[0]);
    } else if (name === 'video') {
      setVideo(files[0]);
    }
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
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

  // LIKE POSTS
  const onLikePost = async (postId) => {
    console.log("POSTID: ", postId);
    const success = await handleLikePost(postId);
    if (!success)
      console.log("ERROR WHILE LIKING. (INSIDE USERHOME)")
  };

  // UNLIKE POSTS
  const onUnlikePost = async (postId) => {
    console.log("POSTID: ", postId);
    const success = await handleUnlikePost(postId);
    if (!success)
      console.log("ERROR WHILE LIKING. (INSIDE USERHOME)")
  };


  // SEARCH  
    const onSearch = async () => {
      try {
        const results = await handleSearch(searchQuery);
        setSearchResults(results);
      } catch (error) {
        alert('Search failed: ' + error.message);
        setSearchResults([]); 
      }
    };


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
    // <h1>Hello</h1>
    

    
    
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



    {posts.map((post, index) => (
      <div key={index} style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>{post.post}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '10px' }} />
        )}
        {post.videoUrl && (
          <video controls style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '10px' }}>
            <source src={post.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {post.createdAt && (
          <div style={{ color: '#777', fontSize: '0.8rem', marginTop: '10px' }}>
            Posted on: {new Date(post.createdAt).toLocaleString()}
          </div>
        )}
        <button onClick={() => onLikePost(post.postId)}>Like</button>
        <button onClick={() => onUnlikePost(post.postId)}>Unlike</button>
        <button onClick={() => onDeletePost(post.postId)}>Delete</button>

      </div>
    ))}
  </div>
  </div>
  </div>
);
};

export default UserHome;

