import React from 'react';

const Post = ({ post, handleDeletePost }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      marginBottom: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>{post.caption}</h3>
      <p>{post.post}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', height: 'auto' }} />}
      {post.videoUrl && <video controls><source src={post.videoUrl} type="video/mp4" /></video>}
      {post.createdAt && <div>Posted on: {new Date(post.createdAt).toLocaleString()}</div>}
      <button onClick={() => handleDeletePost(post.postId)}>Delete</button>
    </div>
  );
};

export default Post;
