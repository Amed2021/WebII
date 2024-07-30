import React, { useState, useEffect } from 'react';

import { gapi } from 'gapi-script';

import { GoogleLogin } from 'react-google-login';
import GitHubLogin from 'react-github-login';

import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; 



import '../App.css';

import imagen from '../imagenes/image3.png';
import GoogleIcon from '../imagenes/google.png';
import GithubIcon from '../imagenes/github.png';

const clientID = '948578022378-ht25dltghdtmdu2qqdo9mfeltg4fq65m.apps.googleusercontent.com';
const githubClientId = 'Ov23liHsXcD6sZZ5xCAB';
const githubCallbackUrl = 'http://localhost:3000/callback';

function Login({ onSwitchForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: 'profile email'
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();


    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || 'Usuario Logueado',
       
      };
      setUser(user);
      setUser(userCredential.user);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    
    }
  };

  const onSuccessGoogle = (response) => {
    setUser(response.profileObj);
    setIsLoggedIn(true);
    console.log('Google login successful:', response);
    navigate('/home');
  };

  const onFailureGoogle = (response) => {
    console.log('Google login failed:', response);
  };

  const onSuccessGithub = (response) => {
    console.log('GitHub login successful:', response);
    setUser({
      name: response.profile.name,
      imageUrl: response.profile.avatar_url
    });
    setIsLoggedIn(true);
    
    window.location.href = '/home'; 
  };

  const onFailureGithub = (response) => {
    console.log('GitHub login failed:', response);
  };

  const handleNavigate = (path) => {
    navigate(path);
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
              <form onSubmit={handleLogin}>
                <input 
                  type="email" 
                  placeholder='Correo electrónico' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
                <br />
                <input 
                  type="password" 
                  placeholder='Contraseña' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <br />
                <button onClick={handleLogin} type="submit">Iniciar sesión</button>
                <p>OR</p>
                <div className="loginButton google">
                  <GoogleLogin
                    clientId={clientID}
                    onSuccess={onSuccessGoogle}
                    onFailure={onFailureGoogle}
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
              
                <div className="loginButton github">
                  <GitHubLogin
                    clientId={githubClientId}
                    onSuccess={onSuccessGithub}
                    onFailure={onFailureGithub}
                    buttonText={<>
                      <img src={GithubIcon} alt="Github" className="icon" />
                      <span>GitHub</span>
                    </>}
                    redirectUri={githubCallbackUrl}
                    className="github-button"
                    cssClass="github-button" 
                  />
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
      <p><a href="#" onClick={() => handleNavigate('/privacidad')}>Privacidad</a></p>
        <p>2024 Facechat from web II</p>
        <p><a href='#' onClick={() => handleNavigate('/normas')}> Normas y reglamento </a></p>
      </div>
    </div>
  );
}

export default Login;
