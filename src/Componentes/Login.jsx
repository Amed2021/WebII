import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';

import '../App.css';
import imagen from '../imagenes/image3.png';
import GoogleIcon from '../imagenes/google.png';
import FacebookIcon from '../imagenes/facebook.png';
import GithubIcon from '../imagenes/github.png';

const clientID = '10768739818-1o1a42j9gmstffm0f895s5qqdn85dh4i.apps.googleusercontent.com';



function Login({ onSwitchForm }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: 'profile email'
       
      });
      
    }
    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = (response) => {
    setUser(response.profileObj);
    setIsLoggedIn(true);
    console.log('Login successful:', response);
  };

  const onFailure = (response) => {
    console.log('Login failed:', response);
  };

  const handleLogout = () => {
    setUser({});
    setIsLoggedIn(false);
  };

  return (
    <div className='login-wrapper'>
      <div className='img-3d'>
        <img src={imagen} alt="image3" />
      </div>
      <div className="App">
        <div className="login-container">
          <h2>FACECHAT</h2>
          {!isLoggedIn ? (
            <>
              <form>
                <input type="text" placeholder='Usuario o correo' />
                <br />
                <input type="password" placeholder='Contraseña' />
                <br />
                <button type="submit">Iniciar sesión</button>
                <p>OR</p>
                <div className="loginButton google">
                  <GoogleLogin
                    clientId={clientID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    buttonText="Continue with Google"
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                      <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <img src={GoogleIcon} alt="Google" className="icon" />
                        Google
                      </div>
                    )}
                  />
                </div>
                <div className="loginButton facebook" onClick={() => window.open("URL_DE_AUTENTICACIÓN_DE_FACEBOOK", "_self")}>
                  <img src={FacebookIcon} alt="Facebook" className="icon" />
                  Facebook
                </div>
                <div className="loginButton github" onClick={() => window.open("URL_DE_AUTENTICACIÓN_DE_GITHUB", "_self")}>
                  <img src={GithubIcon} alt="Github" className="icon" />
                  GitHub
                </div>
              </form>
            </>
          ) : (
            <div className="profile">
              <img src={user.imageUrl} alt={user.name} />
              <h3>{user.name}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      <div className='contenedor'>
        <p>No tienes una cuenta? <a href="#" onClick={onSwitchForm}>Registrate</a></p>
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
