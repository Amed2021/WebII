import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Navbar.css';
import Chat from '../Chats/Chat'; 
import Historias from '../publicaciones/Historias'; 
import Publicar from '../publicaciones/Publicar'; 

function Navbar() {
  const [showChat, setShowChat] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPost, setShowPost] = useState(false);
  
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  const handleChatClick = () => {
    setShowChat(!showChat);
    setShowHistory(false); 
    setShowPost(false); 
  };

  const handleHistoryClick = () => {
    setShowHistory(!showHistory);
    setShowChat(false); 
    setShowPost(false); 
  };

  const handlePostClick = () => {
    setShowPost(!showPost);
    setShowChat(false); 
    setShowHistory(false); 
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <ul className="hide-on-med-and-down center-icons">
            <li><Link to="/home" className="MenuIcons"><i className="material-icons medium">home</i></Link></li>
            <li><button className="MenuIcons" onClick={handleChatClick}><i className="material-icons medium">chat</i></button></li>
            <li><button className="MenuIcons" onClick={handleHistoryClick}><i className="material-icons medium">history</i></button></li>
            <li><button className="MenuIcons" onClick={handlePostClick}><i className="material-icons medium">control_point</i></button></li>
            <li><a onClick={handleProfileClick} className="MenuIcons"><i className="material-icons medium">person</i></a></li>
            <li><Link to="/settings" className="MenuIcons"><i className="material-icons medium">settings</i></Link></li>
          </ul>
        </div>
      </nav>
      {showChat && <Chat />}
      {showHistory && <Historias />}
      {showPost && <Publicar />}
    </div>
  );
}

export default Navbar;
