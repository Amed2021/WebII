
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';

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

ReactDOM.render(<App />, document.getElementById('root'));




