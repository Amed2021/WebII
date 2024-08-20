import React from 'react';
import '../src/CSS/App.css';
import Navbar from './Componentes/Navbar';
import Sidebar from './Componentes/Sidebar'; 
import Stories from './Componentes/Stories';
import Feed from './Componentes/Feed'; 
import Sidenav from './Componentes/Sidenav'; 

function Home() {
  return (
    <div>
      <Sidenav />
      <Sidebar />
      <Stories />
      <Feed/>
      <Navbar />
    </div>
  );
}

export default Home;
