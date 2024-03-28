import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatList.scss'; // Assuming you are using SCSS

const ChatList = () => {
  // const [chats, setChats] = useState(new Map());
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token: ', token);
    const fetchChats = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat/history/all`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('response: ', response);
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        console.log('data: ', data);
        // setChats(new Map(data.map(chat => [chat.username, chat.messages])));
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const handleChatSelect = (username) => {
    navigate(`/chat-service/${username}`);
  };

  return (
    <div className="chat-list">
      <h1>All Chats</h1>
      {/* {Array.from(chats.entries()).map(([username, messages]) => ( */}
      {chats.map(username => (
        <div key={username} className="chat-preview" onClick={() => handleChatSelect(username)}>
          <div className="username">{username}</div>
          {/* <div className="last-message">{messages[messages.length - 1]?.message || "No messages"}</div> */}
        </div>
      ))}
    </div>
  );
};

export default ChatList;

