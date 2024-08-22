import  { useEffect } from 'react';
import M from 'materialize-css';
import '../CSS/Sidebar.css';

function Sidebar() {
  useEffect(() => {
    const rightSidenav = document.querySelector('#right-sidenav');
    M.Sidenav.init(rightSidenav, { edge: 'right', draggable: false });
  }, []);

  const friends = [
    { name: 'Diego Rojas R', src: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png' },
    { name: 'Angel UQ', src: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png' },
    { name: 'Allan S', src: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png' },
    { name: 'Arian Alvarado', src: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png' },
    { name: 'Amed P', src: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png' },
  ];

  return (
    <div className="side-icon">
      <ul id="right-sidenav" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src='https://wallpapers.com/images/hd/sunset-sky-in-seattle-jem310tpwjjjxc7l.jpg' alt="Office Background" />
            </div>
            <a href="#user">
              <img className="circle" src='https://cdn-icons-png.flaticon.com/512/9187/9187604.png' alt="User" />
            </a>
            <a href="#name">
              <span className="white-text name">John Doe</span>
            </a>
            <a href="#email">
              <span className="white-text email">jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <a href="#!">
            <i className="material-icons">group</i>Amigos
          </a>
        </li>
        <li><div className="divider"></div></li>
        {friends.map((friend, index) => (
          <li key={index}>
            <img className="circle-friend" src={friend.src} />
            <a href="#!" className="FriendNames">{friend.name}</a>
          </li>
        ))}
      </ul>
      <a href="#" data-target="right-sidenav" className="sidenav-trigger">
        <i className="material-icons small ">group</i>
      </a>
    </div>
  );
}

export default Sidebar;