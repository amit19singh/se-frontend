import React, { createContext, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserActionsContext = createContext();

export const useUserActions = () => useContext(UserActionsContext);

export const UserActionsProvider = ({ children }) => {
  const { token, logout, fetchUserDetails } = useAuth(); 


  // UPLOAD POSTS
  const handleUpload = useCallback(async (formData) => {
    console.log("INSIDE USERACTIONSCONTEXT: (token) ", token);
    if (!token) {
      console.error("Can't upload without a token");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user-posts/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Successfully Posted');
        window.location.reload();
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      alert('Error uploading: ' + error.message);
      console.error('Error uploading:', error);
    }
  }, [token]);

  // DELETE POSTS
  const handleDeletePost = useCallback(async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (!isConfirmed) {
      return; 
    }

    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/user-posts/delete/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to delete the post');
      }

      alert('Post deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting the post:', error);
      alert('Error deleting the post');
      return false; 
    }
  }, [token]);

  // LIKE POSTS
  const handleLikePost = async (postId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user-posts/like/${postId}`, { method: 'POST', 
      headers: { 
        'Authorization': `Bearer ${token}` 
        } 
      });
      if (response.status !== 200) {
        alert('Error liking the post');
        throw new Error('Failed to Like the post');
      }
      return response.ok;
  };


  // UNLIKE POSTS
  const handleUnlikePost = async (postId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user-posts/unlike/${postId}`, { method: 'POST', 
    headers: { 
      'Authorization': `Bearer ${token}` 
      } 
    });
    if (response.status !== 200) {
      alert('Error unliking the post');
      throw new Error('Failed to Unlike the post');
    }
      return response.ok;
  };


  // HANDLE SEARCH
  const handleSearch = useCallback(async (searchQuery, filters = {}) => { // Default filters to {} if not provided
      if (!token) {
        logout();
        return;
      }
    
      try {
        const safeFilters = filters || {};
        const filtersQuery = Object.entries(safeFilters)
          .filter(([_, value]) => value !== false && value !== '')
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
    
        // Append filters to the search query URL
        const hasFilters = filtersQuery.length > 0;
        const fullUrl = `${process.env.REACT_APP_BACKEND_URL}/search?query=${encodeURIComponent(searchQuery)}${hasFilters ? '&' + filtersQuery : ''}`;
    
        const response = await axios.get(fullUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (response.status === 200) {
          console.log("data userAuth:", response.data);
          return response.data;
        } else {
          throw new Error('Search failed');
        }
      } catch (error) {
        console.error('Error during search:', error);
        throw error;
      }
    }, [token, logout]);
  
  


  // ADD FRIENDS
  const handleAddFriend = useCallback(async (friendUsername) => {
    if (!token) {
      console.error("Can't perform action without authentication");
      return false;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/friends/request`, friendUsername, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'text/plain',
        },
      });

      if (response.status === 200) {
        console.log('Friend request sent!');
        return true; 
      } else {
        console.error('Failed to send friend request');
        return false; 
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      return false; 
    }
  }, [token]);


  // ACCEPT REQUESTS
  const handleAcceptRequest = useCallback(async (requestId) => {
    if (!token) {
      console.error("Can't perform action without authentication");
      return false;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/friends/accept/${requestId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Friend request accepted!');
        await fetchUserDetails(token);
        return true;
      } else {
        console.error('Failed to accept friend request');
        return false;
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
      return false;
    }
  }, [token, fetchUserDetails]);

  // REMOVE FRIENDS
  const handleRemoveFriend = useCallback(async (friendId) => {
    if (!token) {
      console.error("Can't perform action without authentication");
      return false;
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_URL}/api/friends/remove/${friendId}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Friend removed successfully');
        return true; 
      } else {
        console.error('Failed to remove friend');
        return false; 
      }
    } catch (error) {
      console.error('Error removing friend:', error);
      return false; 
    }
  }, [token]);

  
  // REJECT REQUESTS
  const handleRejectRequest = useCallback(async (requestId) => {
    if (!token) {
      console.error("Authentication required");
      return false;
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_URL}/api/friends/reject/${requestId}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'text/plain',
        },
      });

      if (response.status === 200) {
        console.log('Friend request rejected');
        return true;
      } else {
        console.error('Failed to reject friend request');
        return false;
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      return false;
    }
  }, [token]);

  // BLOCK USER
  const handleBlockUser = useCallback(async (userId) => {
    if (!token) {
      console.error("Authentication required to block a user");
      return false;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/friends/block/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('User blocked successfully');
        return true;
      } else {
        console.error('Failed to block user');
        return false;
      }
    } catch (error) {
      console.error('Error blocking user:', error);
      return false;
    }
  }, [token]);

  // UNBLOCK A USER
  const handleUnblockUser = useCallback(async (userId) => {
    if (!token) {
      console.error("Authentication required to unblock a user");
      return false;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/friends/unblock/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('User unblocked successfully');
        return true;
      } else {
        console.error('Failed to unblock user');
        return false;
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
      return false;
    }
  }, [token]);


  return (
    <UserActionsContext.Provider value={{ handleUpload, handleDeletePost, handleLikePost, handleUnlikePost, handleSearch,handleAddFriend, handleAcceptRequest, 
      handleRemoveFriend, handleRejectRequest, handleBlockUser, handleUnblockUser }}>
      {children}
    </UserActionsContext.Provider>
  );
};



