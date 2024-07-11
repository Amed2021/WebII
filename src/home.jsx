import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navbar from './Componentes/Navbar';
import Sidebar from './Componentes/Sidebar';
import Stories from './Componentes/Stories'


function Home() {

    

  return (
    <div>
    <Sidebar/>
    <Stories/>
    <Navbar/>
    </div>
  );
}

ReactDOM.render(<Home />, document.getElementById('root'));
