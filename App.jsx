// App.jsx
import React, { useState } from 'react';
import Login from './src/Componentes/Login';
import Registro from './src/Componentes/Registro';

function App() {
const  [isLogin, setIsLogin] = useState(true);

const switchForm = () => {
  setIsLogin(!isLogin);
};
return(
  <div>
    {isLogin ? <Login onSwitchForm={switchForm} /> : <Registro onSwitchForm={switchForm}/>}
  </div>
);
}

export default App;





