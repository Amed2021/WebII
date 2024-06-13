import React, { useState } from 'react';
import '../App.css';
import imagen from '../imagenes/image3.png';
import GoogleIcon from '../imagenes/google.png';
import FacebookIcon from '../imagenes/facebook.png';
import GithubIcon from '../imagenes/github.png';


function Login( { onSwitchForm } ) {
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
  const google = () => {
    window.open("URL_DE_AUTENTICACIÓN_DE_GOOGLE", "_self");
  };
  
  const facebook = () => {
    window.open("URL_DE_AUTENTICACIÓN_DE_FACEBOOK", "_self");
  };
  
  const github = () => {
    window.open("URL_DE_AUTENTICACIÓN_DE_GITHUB", "_self");
  };

  return (
    <div className='login-wrapper'>
      <div className='img-3d'>
        <img src={imagen} alt="image3" />
        
      </div>
      <div className="App">
        <div className="login-container">
          <h2>FACECHAT</h2>
          <form>
            <input type="text" value={username} placeholder='Usuario o correo' onChange={handleUsernameChange}/>
            <br />
            <input type="password" value={password} placeholder='Contraseña' onChange={handlePasswordChange}/>
            <br />
            <button type="submit" onClick={handleLogin}> Iniciar sesión</button>
            <p>OR</p>
            <div className="loginButton google" onClick={google}>
  <img src={GoogleIcon} alt="Google" className="icon" />
  Google
</div>
<div className="loginButton facebook" onClick={facebook}>
  <img src={FacebookIcon} alt="Facebook" className="icon" />
  Facebook
</div>
<div className="loginButton github" onClick={github}>
  <img src={GithubIcon} alt="Github" className="icon" />
  GitHub
</div>

          </form>
        </div>
      </div>
      <div className='contenedor'>
        <p>No tienes una cuenta? <a href="#" onClick={onSwitchForm} >Registrate</a></p>
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
