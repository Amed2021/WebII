import  { useEffect } from 'react';

import '../CSS/Sidenav.css';

import M from 'materialize-css';

const Sidenav = () => {
  useEffect(() => {
    // Initialize left sidenav
    const leftSidenav = document.querySelector('#left-sidenav');
    M.Sidenav.init(leftSidenav, { edge: 'left', draggable: false });
  }, []);

  return (
    <>
      <ul id="left-sidenav" className="sidenav">
        <li><a href="#!">Amigos</a></li>
        <li><a href="#!">Guardado</a></li>
        <li><a href="#!">Grupos</a></li>
        <li><a href="#!">Notificaciones</a></li>
        <li><a href="#!">Noticias</a></li>
        <li><a href="#!">Recuerdos</a></li>
        <li><a href="#!">Videos</a></li>
      </ul>
      <a href="#!" data-target="left-sidenav" className="sidenav-trigger">
        <i className="material-icons">menu</i>
      </a>
    </>
  );
};

export default Sidenav;
