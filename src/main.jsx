// App.jsx
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login onSwitchForm={switchForm} /> : <Registro onSwitchForm={switchForm} />}
    </div>
  );
}


createRoot(document.getElementById('root')).render(<App />);