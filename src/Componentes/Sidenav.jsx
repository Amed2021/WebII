import  { useEffect, useState } from 'react';
import M from 'materialize-css';
import '../CSS/Sidenav.css';
import { Amigos } from '../Solicitudes/Amigos';


const Sidenav = () => {
  const [isSidenavVisible, setSidenavVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    console.log(isSidenavVisible)
    const elems = document.querySelectorAll('#left-sidenav');
    M.Sidenav.init(elems, { edge: 'left', draggable: false });
  }, []);

  const handleMenuClick = (option) => {
    console.log(`Selected option: ${option}`); 
    setSelectedOption(option);
    setSidenavVisible(true); 
    console.log(isSidenavVisible)
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
       className="sidenav"
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
        className={`Content-Container ${isSidenavVisible ? '' : 'full-width'}`}
      >
        {renderContent()}
        {!isSidenavVisible && (
          <a
            href="#!"
            data-target="left-sidenav"
            className="sideNav-trigger"
            onClick={() => setSidenavVisible(false)}
          >
            <i className="material-icons small">menu</i>
          </a>
        )}
      </div>
    </div>
  );
};

export default Sidenav;
