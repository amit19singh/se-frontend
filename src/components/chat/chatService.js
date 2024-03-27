import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

var stompClient = null;

const ChatService = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("");
  const { user, logout, fetchUserDetails } = useAuth();
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  const receiverName = location.state?.receiverName;

  useEffect(() => {
    if (receiverName) {
      setTab(receiverName);
      setUserData(prevState => ({
        ...prevState,
        receivername: receiverName,
      }));
    }
    
    const fetchDetailsAndSetState = async () => {
      const token = localStorage.getItem('token');
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

    fetchDetailsAndSetState();
  }, [user, navigate, fetchUserDetails, receiverName]);

  useEffect(() => {
    if (userData.username && !stompClient) {
      connect();
    }
  }, [userData.username]); // Depend on userData.username to ensure connection is attempted after username is set

  const handleLogout = () => {
    logout();
    navigate('/');
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

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "username": value });
  }

  const registerUser = () => {
    connect();
  }


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
                // Removed the disabled condition from here to allow typing at any time
              />
              <button type="button" className="send-button" onClick={sendPrivateMessage}>
                Send
              </button>
            </div>

          </div>
      </div>
      {!userData.connected && (
        <div className="register">
          <input
            type="text"
            placeholder="Enter your username"
            value={userData.username}
            onChange={handleUsername}
          />
          <button type="button" onClick={registerUser}>
            Connect
          </button>
        </div>
      )}
    </div>
  );
  
}  

export default ChatService;




