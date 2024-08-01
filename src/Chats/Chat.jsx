import React from 'react';

const Chat = () => {
 
  const chatStyles = {
    position: 'absolute', 
    top: '700px', 
    right: '1440px', 
    width: '300px',
    backgroundColor: '#fff', 
    border: '1px solid #ccc', 
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
    padding: '15px',
    zIndex: 1000, 
    BorderRadius: '40px'
  };

  const headerStyles = {
    margin: '0 0 10px 0',
    fontSize: '18px',
    textAlign: 'center',
  };

  const listStyles = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };

  const listItemStyles = {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  };

  const listItemHoverStyles = {
    backgroundColor: '#f5f5f5',
  };

  return (
    <div style={chatStyles}>
      <h2 style={headerStyles}>Chats</h2>
      <ul style={listStyles}>
        <li style={listItemStyles}>Chat 1</li>
        <li style={listItemStyles}>Chat 2</li>
        <li style={listItemStyles}>Chat 3</li>
       
      </ul>
    </div>
  );
};

export default Chat;
