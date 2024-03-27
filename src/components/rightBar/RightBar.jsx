import "./rightBar.scss";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import ChatComponent from '../chat/ChatComponent';
import ChatService from "../chat/chatService";

const RightBar = () => {

  // const [message, setMessage] = useState(''); // For input field
  // const [chatLog, setChatLog] = useState([]); // To display messages
  // const [peerConnection, setPeerConnection] = useState(null);
  // const { token, logout, fetchUserDetails } = useAuth(); 


  // useEffect(() => {
  //   const pc = new RTCPeerConnection({
  //     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }], // Using Google's public STUN server
  //   });
  
  //   // ICE Candidate Event
  //   pc.onicecandidate = (event) => {
  //     if (event.candidate) {
  //       sendIceCandidate(event.candidate);
  //     }
  //   };
  
  //   setPeerConnection(pc);
  // }, []);


  // const sendOffer = async (offer) =>  {
  //   console.log("INSIDE CreateOffer, token: (token) ", token);
  //   if (!token) {
  //     console.error("Can't upload without a token");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/offer`, offer, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       alert('offer sent');
  //     } else {
  //       throw new Error('Couldn"t sent offer');
  //     }
  //   } catch (error) {
  //     alert('Error sending offer: ' + error.message);
  //     console.error('Error sending offer:', error);
  //   }
  // }

  // const createOffer = async () => {
  //   const offer = await peerConnection.createOffer();
  //   await peerConnection.setLocalDescription(offer);
  //   sendOffer(offer); // Implement this function to send the offer via WebSocket or REST API

    
  // };
  
  // const setRemoteDescription = async (description) => {
  //   await peerConnection.setRemoteDescription(new RTCSessionDescription(description));
  // };
  


  // // Function to handle sending messages (update as needed for your WebRTC logic)
  // const sendMessage = () => {
  //   // Placeholder: Add your WebRTC send message logic here
  //   console.log("Message to send:", message);
  //   setChatLog([...chatLog, message]); // Add message to chat log for display
  //   setMessage(''); // Reset input field
  // };



  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simple chat interface */}
      {/* <div className="chatSection">
        <div className="chatLog">
          {chatLog.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div> */}
      
      {/* <ChatService /> */}

    </div>
  );
};

export default RightBar;
