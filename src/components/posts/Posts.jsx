import React, { useEffect, useState } from 'react';
import Post from "../post/Post";
import { useAuth } from '../../context/AuthContext';
import { useUserActions } from '../../context/UserActionsContext';

import { Link, useNavigate } from "react-router-dom";

import "./posts.scss";

const Posts = () => {

  const navigate = useNavigate;
  const [posts, setPosts] = useState([]);
  
  const { user, logout, fetchUserDetails } = useAuth();
  const { handleDeletePost, handleLikePost, handleUnlikePost } = useUserActions();

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
      }
    }; fetchDetailsAndSetState();
  }, [user, navigate, fetchUserDetails]);

  const handleLogout = () => {
    logout();
  };

  
  
  // LIKE POSTS
  const onLikePost = async (postId) => {
    console.log("Liked POSTID: ", postId);
    const success = await handleLikePost(postId);
    if (!success)
      console.log("ERROR WHILE LIKING. (INSIDE USERHOME)")
  };

  // UNLIKE POSTS
  const onUnlikePost = async (postId) => {
    console.log("Unliked POSTID: ", postId);
    const success = await handleUnlikePost(postId);
    if (!success)
      console.log("ERROR WHILE LIKING. (INSIDE USERHOME)")
  };

  // POST DELETES
  const onDeletePost = async (postId) => {
    const success = await handleDeletePost(postId);
    if (success) {
      setPosts(currentPosts => currentPosts.filter(post => post.postId !== postId));
    }
  };


  return <div className="posts">
    {posts.map(post=>(
      <Post post={post}
      key={post.postId}
      onLikePost={onLikePost}
      onUnlikePost={onUnlikePost}
      onDeletePost={onDeletePost}/>
    ))}
  </div>;
};

export default Posts;
