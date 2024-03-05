import React from 'react';
import Post from './Post'; 

const PostList = ({ posts, handleDeletePost }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} post={post} handleDeletePost={handleDeletePost} />
      ))}
    </div>
  );
};

export default PostList;
