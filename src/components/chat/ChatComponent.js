// import React, { useState, useEffect } from 'react';
// import { ChatService } from './ChatService';

// const ChatComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     ChatService.connect(() => {
//       console.log("WebSocket Connected");
//       ChatService.sendMessage({ content: 'Hello!' });
//     });
    
//     ChatService.onMessage((msg) => {
//       setMessages(prevMessages => [...prevMessages, msg]);
//     });

//     return () => {
//       // chatService.disconnect();
//     };
//   }, []);

//   const handleSendMessage = () => {
//     ChatService.sendMessage({ content: message });
//     setMessage('');
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg.content}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={e => setMessage(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatComponent;
