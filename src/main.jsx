
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './Componentes/App'; 
import { UserProvider } from './Contexto/UserContext'; 



function Main() {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <BrowserRouter>
     <UserProvider> 
      <App onSwitchForm={switchForm} isLogin={isLogin} />
      </UserProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
