import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

var stompClient = null;

const ChatService = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("");
  const { user, logout, fetchUserDetails } = useAuth();
  const { username: userChat } = useParams();

  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  const receiverName = location.state?.receiverName;
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (receiverName) {
      setTab(receiverName);
      setUserData(prevState => ({
        ...prevState,
        receivername: receiverName,
      }));
    }
    
    const fetchDetailsAndSetState = async () => {
      if (!user && token) {
        await fetchUserDetails(token);
      } else if (!token) {
        handleLogout();
        return;
      }

      if (user) {
        setUserData(prevState => ({ ...prevState, username: user.username || '' }));
      }
      
    };

    const fetchChats = async () => {
      if (user && token) {
        await fetchChatHistory(userChat);
      }     
    };

    fetchDetailsAndSetState();
    fetchChats();
  }, [user, navigate, fetchUserDetails, receiverName]);

  useEffect(() => {
    if (userData.username && !stompClient) {
      connect();
    }
  }, [userData.username]); 

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const fetchChatHistory = async (userChat) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat/history/${userChat}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch chat history');
      const chatHistory = await response.json();

      console.log("chatHistory: ", chatHistory);
      
      // Assuming chatHistory is an array of chat messages
      setPrivateChats(prevChats => new Map(prevChats.set(userChat, chatHistory)));
    } catch (error) {
      console.error("Fetching chat history failed:", error);
      // Handle error (e.g., show error message)
    }
  };

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, () => onConnected(), onError);
  };

  const onConnected = () => {
    console.log("Connected to WebSocket");
    setUserData(prevState => ({ ...prevState, connected: true }));
    stompClient.subscribe(`/user/${userData.username}/private`, onPrivateMessage);
  };

  const sendPrivateMessage = () => {
    if (stompClient && userData.message.trim() !== '') {
      const chatMessage = {
        senderUsername: userData.username,
        receiverUsername: tab,
        message: userData.message,
        timestamp: new Date(),
        status: "SENT",
      };

      const updatedChats = new Map(privateChats);
      if (!updatedChats.has(tab)) {
        updatedChats.set(tab, []);
      }
      updatedChats.get(tab).push(chatMessage);
      setPrivateChats(updatedChats);

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' }); 
    }
  };

  
  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    setPrivateChats(prevChats => {
      const newChats = new Map(prevChats);
      const messages = newChats.get(payloadData.senderUsername) || [];
      messages.push(payloadData);
      newChats.set(payloadData.senderUsername, messages);
      return newChats;
    });
  };
  

  const onError = (err) => {
    console.error("WebSocket Error", err);
  };

    const handleMessageChange = (event) => {
    setUserData({ ...userData, message: event.target.value });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendPrivateMessage();
    }
  };


  return (
    <div className="container">
      <div className="chat-box">
        <div className="member-list">
          <ul>
            <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>
              Chatroom
            </li>
            {[...privateChats.keys()].map((name, index) => (
              <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>
                {name}
              </li>
            ))}
          </ul>
        </div>
          <div className="chat-content">
            <ul className="chat-messages">
              {privateChats.get(tab)?.map((chat, index) => (
                <li className={`message ${chat.senderUsername === userData.username && "self"}`} key={index}>
                  <div className="message-data">
                    {chat.senderUsername}: {chat.message}
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="send-message">
              <input
                type="text"
                className="input-message"
                placeholder="Enter the message"
                value={userData.message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyPress} // Moved here
              />
              <button 
                type="button" 
                className="send-button" 
                onClick={sendPrivateMessage}
              >
                Send
              </button>
            </div>


          </div>
      </div>
    </div>
  );
  
}  

export default ChatService;




