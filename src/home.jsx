import React from 'react';
import '../src/css/App.css';
import Navbar from './Componentes/Navbar';
import Sidebar from './Componentes/Sidebar'; 
import Stories from './Componentes/Stories';
import Sidenav from './Componentes/Sidenav'; 

function Home() {
  return (
    <div>
      <Sidenav />
      <Sidebar />
      <Stories />
      <Navbar />
    </div>
  );
}

export default Home;
