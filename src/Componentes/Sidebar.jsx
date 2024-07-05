import React, {useEffect } from 'react';


import '../App.css';



function Sidebar() {
 
    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems);
          });
      
          // Or with jQuery
          $(document).ready(function(){
            $('.sidenav').sidenav();
          });
        }, []);
  return (
    

    <div>
    <ul id="slide-out" className="sidenav">
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
          <i className="material-icons">cloud</i>First Link With Icon
        </a>
      </li>
      <li><a href="#!">Second Link</a></li>
      <li><div className="divider"></div></li>
      <li><a className="subheader">Subheader</a></li>
      <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>
    <a href="#" data-target="slide-out" className="sidenav-trigger">
      <i className="material-icons">menu</i>
    </a>
  </div>


  );
}

export default Sidebar;
