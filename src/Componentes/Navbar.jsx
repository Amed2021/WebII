import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <ul className="hide-on-med-and-down center-icons">
            <li><Link to="/home" className="MenuIcons"><i className="material-icons medium">home</i></Link></li>
            <li><Link to="/chat" className="MenuIcons"><i className="material-icons medium">chat</i></Link></li>
            <li><Link to="/history" className="MenuIcons"><i className="material-icons medium">history</i></Link></li>
            <li><Link to="/create" className="MenuIcons"><i className="material-icons medium">control_point</i></Link></li>
            <li><a onClick={handleProfileClick} className="MenuIcons"><i className="material-icons medium">person</i></a></li>
            <li><Link to="/settings" className="MenuIcons"><i className="material-icons medium">settings</i></Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
