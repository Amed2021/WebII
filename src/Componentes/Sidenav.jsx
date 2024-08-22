import { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import '../CSS/Sidenav.css';
import { Amigos } from '../Solicitudes/Amigos';
import { Grupo } from '../publicaciones/Grupo';
import { Guardado } from '../publicaciones/Guardado';
import { Noticias } from '../publicaciones/Noticias';
import { Videos } from '../publicaciones/Videos';
import { Notificaciones } from '../publicaciones/Notificaciones';
import { Recuerdos } from '../publicaciones/Recuerdos';

const Sidenav = () => {
  const [isSidenavVisible, setSidenavVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const sidenavRef = useRef(null);

  useEffect(() => {
    const elems = document.querySelectorAll('#left-sidenav');
    M.Sidenav.init(elems, { edge: 'left', draggable: false });

    const handleClickOutside = (event) => {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        setSidenavVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log('Selected option:', selectedOption);
  }, [selectedOption]);

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  const handleBackClick = () => {
    console.log('Volver clicked');
    setSelectedOption('');
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Amigos':
        return <Amigos onBack={handleBackClick} />;
      case 'Grupo':
        return <Grupo />;
      case 'Guardado':
        return <Guardado />;
      case 'Noticias':
        return <Noticias />;
      case 'Videos':
        return <Videos />;
      case 'Notificaciones':
        return <Notificaciones />;
      case 'Recuerdos':
        return <Recuerdos />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`sidenav-container ${isSidenavVisible ? 'sidenav-visible' : 'sidenav-hidden'}`} ref={sidenavRef}>
        <div className="sidenav-header">
          <h1>FACECHAT</h1>
        </div>
        <ul id="left-sidenav" className="sideNav">
          {selectedOption === '' ? (
            <>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Amigos'); }}>
                  <i className="material-icons">group</i> Amigos
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Guardado'); }}>
                  <i className="material-icons">bookmark</i> Guardado
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Grupo'); }}>
                  <i className="material-icons">people</i> Grupos
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Notificaciones'); }}>
                  <i className="material-icons">notifications</i> Notificaciones
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Noticias'); }}>
                  <i className="material-icons">article</i> Noticias
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Recuerdos'); }}>
                  <i className="material-icons">photo_album</i> Recuerdos
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Videos'); }}>
                  <i className="material-icons">videocam</i> Videos
                </a>
              </li>
            </>
          ) : (
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); handleBackClick(); }}>
                <i className="material-icons">arrow_back</i> Volver
              </a>
            </li>
          )}
        </ul>
        <div className={`Content-Container ${selectedOption ? 'show-content' : 'hide-content'}`}>
          {renderContent()}
        </div>
        <div className="sidenav-footer">
          © 2024 Facechat from web II
        </div>
      </div>
      <a
        href="#!"
        className={`sideNav-trigger ${isSidenavVisible ? 'sideNav-trigger-hidden' : 'sideNav-trigger-visible'}`}
        onClick={() => setSidenavVisible(!isSidenavVisible)}
      >
        <i className="material-icons small">menu</i>
      </a>
    </>
  );
};

export default Sidenav;
