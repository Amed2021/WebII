
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from '../Home';
import Registro from './Registro';  

function App({ onSwitchForm, isLogin }) {
  return (
    <Routes>
   <Route path="/" element={isLogin ? <Login onSwitchForm={onSwitchForm} /> : <Registro onSwitchForm={onSwitchForm} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registro" element={isLogin ? <Registro onSwitchForm={onSwitchForm} /> : <Login onSwitchForm={onSwitchForm} />} />
    </Routes>
  );
}

export default App;
