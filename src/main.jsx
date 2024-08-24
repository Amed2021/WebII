// src/Main.jsx
import { useState } from 'react';
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
    <UserProvider>
      <BrowserRouter>
        <App onSwitchForm={switchForm} isLogin={isLogin} />
      </BrowserRouter>
    </UserProvider>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
