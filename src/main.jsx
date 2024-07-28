
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './Componentes/App'; 



function Main() {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <BrowserRouter>
      <App onSwitchForm={switchForm} isLogin={isLogin} />
      
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
