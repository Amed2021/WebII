

import { useEffect, useState } from 'react';
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
    console.log(`Rendering content for: ${selectedOption}`);
    switch (selectedOption) {
      case 'Amigos':
        return <Amigos />;
      
      default:
        return <div>Selecciona una opción del menú.</div>;
    }
  };

  return (
    <div className="sidenav-container">
      <ul
        id="left-sidenav"
        className={`sidenav ${isSidenavVisible ? '' : 'sidenav-hidden'}`}
      >
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('Amigos'); }}><i className="material-icons">group</i> Amigos</a></li>
       
      </ul>
      <div className={`content-container ${isSidenavVisible ? '' : 'full-width'}`}>
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

