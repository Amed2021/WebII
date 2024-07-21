import React from 'react';
import './App.css';
import Navbar from './Componentes/Navbar';
import Sidebar from './Componentes/Sidebar'; 
import Stories from './Componentes/Stories';

function Home() {
  return (
    <div>
      <Sidebar />
      <Stories />
      <Navbar />
    </div>
  );
}

export default Home;
