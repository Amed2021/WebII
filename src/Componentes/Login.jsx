import React, { useState } from 'react';
import '../App.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('Login button clicked');
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2>FACECHAT</h2>
        <form>
         
          <input type="text" value={username} placeholder='Usuario o correo' onChange={handleUsernameChange} />
          <br />
        
          <input type="password" value={password} placeholder='Contraseña' onChange={handlePasswordChange} />
          <br />
          <button onClick={handleLogin}>Iniciar sesión</button>
          <p>OR</p>
          <button>G</button>
          <button>Github</button>
        </form>
      </div>

      <div className='contenedor'>
        <p>No tienes una cuenta? <a href="#">Registrate</a></p>
      </div>

      <div className='texto-abajo'>
        <p>Privacidad</p>
        <p>2024 Facechat from web II</p>
        <p>Normas y reglamento</p>
      </div>
    </div>
  );
}

export default Login;
