import React, { useState, useEffect } from 'react';

export default function DirectMessaging() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages data from the database
    // Update the messages state using setMessages
  }, []);

  const fetchedMessages = [
    // Fetched messages from the database
  ];

  const manuallyCreatedMessages = [
    {
      id: 1,
      sender: 'John',
      content: 'Hey, how are you?',
    },
    {
      id: 2,
      sender: 'Jane',
      content: 'I\'m good! How about you?',
    },
    // Add more messages here...
  ];

  const allMessages = [...fetchedMessages, ...manuallyCreatedMessages];

  const currentUser = 'John'; // Assuming the current user is 'John'
  
  return (
    <div className="direct-messaging">
      <div className="message-list">
        {allMessages.map((message) => (
          <div
            key={message.id}
            className={`message-${message.sender === currentUser ? 'sent' : 'received'}`}
          >
            <div>{message.content}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input type="text" placeholder="Type your message" />
        <button>Send</button>
      </div>
    </div>
  );
}
