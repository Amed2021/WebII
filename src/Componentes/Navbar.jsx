import React, { useState, useEffect } from 'react';


import '../Navbar.css';



function Navbar() {
 

  return (
    

    <nav>
  <div class="nav-wrapper">
    <ul class="hide-on-med-and-down center-icons">
      <li><a href="sass.html" className="MenuIcons" ><i class="material-icons medium">home</i></a></li>
      <li><a href="badges.html" className="MenuIcons"><i class="material-icons medium">chat</i></a></li>
      <li><a href="collapsible.html" className="MenuIcons"><i class="material-icons medium">history</i></a></li>
      <li><a href="mobile.html" className="MenuIcons"><i class="material-icons medium">control_point</i></a></li>
      <li><a href="collapsible.html" className="MenuIcons"><i class="material-icons medium">person</i></a></li>
      <li><a href="mobile.html" className="MenuIcons"><i class="material-icons medium">settings</i></a></li>
    </ul>
  </div>
</nav>



  );
}

export default Navbar;
