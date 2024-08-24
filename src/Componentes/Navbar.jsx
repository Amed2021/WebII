import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import Chat from '../Chats/Chat'; 
import Historias from '../publicaciones/Historias'; 
import Configuraciones  from '../publicaciones/Configuraciones';

function Navbar() {
  const [showChat, setShowChat] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  const handleChatClick = () => {
    setShowChat(!showChat);
    setShowHistory(false); 
    setShowConfig(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(!showHistory);
    setShowChat(false); 
    setShowConfig(false);
  };

  const handlePostClick = () => {
    navigate('/nuevo-post');
  };

  const configuraciones = async () => {
        try {
            navigate("/configuraciones"); 
        } catch (error) {
            console.error("Error durante el registro:", error.message);
            alert("Error durante el inicio de sesión: " + error.message);
        }
  };

  return (
    <div className="nav-wrapper">
      <nav>
        <div >
          <ul className="hide-on-med-and-down center-icons">
            <li><Link to="/home" className="MenuIcons"><i className="material-icons medium">home</i></Link></li>
            <li><button className="MenuIcons" onClick={handleChatClick}><i className="material-icons medium">chat</i></button></li>
            <li><button className="MenuIcons" onClick={handleHistoryClick}><i className="material-icons medium">history</i></button></li>
            <li><button className="MenuIcons" onClick={handlePostClick}><i className="material-icons medium">control_point</i></button></li>
            <li><a onClick={handleProfileClick} className="MenuIcons"><i className="material-icons medium">person</i></a></li>
            <li><a className="MenuIcons" onClick={configuraciones}><i className="material-icons medium">settings</i></a></li>
          </ul>
        </div>
      </nav>
      {showChat && <Chat />}
      {showHistory && <Historias />}
      {showConfig && <Configuraciones />}
    </div>
  );
}

export default Navbar;
