import React, { useState } from 'react';
import './App.css'; 

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
          <label>Usuario o correo</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <br />
          <label>Contraseña</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          <br />
          <button onClick={handleLogin}>Iniciar sesión</button>
          <p>OR</p>
          <button>G</button>
          <button>Github</button>
          <p>No tienes una cuenta? <a href="#">Registrate</a></p>
          <p>privacidad</p>
          <p>2024 Facechat from web II</p>
          <p>Normas y reglamento</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
