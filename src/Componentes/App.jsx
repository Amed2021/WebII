
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Componentes/Login';
import Home from '../home';
import Registro from './Registro';  
import Normas from '../Facechat/Normas';
import  Privacidad  from '../Facechat/Privacidad';

function App({ onSwitchForm, isLogin }) {
  return (
    <Routes>
   <Route path="/" element={isLogin ? <Login onSwitchForm={onSwitchForm} /> : <Registro onSwitchForm={onSwitchForm} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registro" element={isLogin ? <Registro onSwitchForm={onSwitchForm} /> : <Login onSwitchForm={onSwitchForm} />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/normas" element={<Normas />} />

    </Routes>
  );
}

export default App;
