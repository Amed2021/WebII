import  { useEffect, useState } from 'react';
import M from 'materialize-css';
import '../CSS/Sidenav.css';
import { Amigos } from '../Solicitudes/Amigos';


const Sidenav = () => {
  const [isSidenavVisible, setSidenavVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, { edge: 'left', draggable: false });
  }, []);

  const handleMenuClick = (option) => {
    console.log(`Selected option: ${option}`); 
    setSelectedOption(option);
    setSidenavVisible(false); 
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Amigos':
        return <Amigos />;
 
    }
  };

  return (
    <div className="sidenav-container">
      <ul
        id="left-sidenav"
        className={`sidenav ${isSidenavVisible ? '' : 'sidenav-hidden'}`}
      >
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Amigos'); }}><i className="material-icons">group</i> Amigos</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Guardado'); }}><i className="material-icons">bookmark</i> Guardado</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Grupos'); }}><i className="material-icons">people</i> Grupos</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Notificaciones'); }}><i className="material-icons">notifications</i> Notificaciones</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Noticias'); }}><i className="material-icons">article</i> Noticias</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Recuerdos'); }}><i className="material-icons">photo_album</i> Recuerdos</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Videos'); }}><i className="material-icons">videocam</i> Videos</a></li>
      </ul>
      <div
        className={`content-container ${isSidenavVisible ? '' : 'full-width'}`}
      >
        {renderContent()}
        {!isSidenavVisible && (
          <a
            href="#!"
            className="sidenav-trigger"
            onClick={() => setSidenavVisible(true)}
          >
            <i className="material-icons">menu</i>
          </a>
        )}
      </div>
    </div>
  );
};

export default Sidenav;
