import  { useEffect } from 'react';

import '../CSS/Sidenav.css';

const Sidenav = () => {
  useEffect(() => {
    // Initialize Materialize Sidenav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {
      edge: 'left',
      draggable: true,
    });
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
