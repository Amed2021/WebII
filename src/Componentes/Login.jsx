import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import { useUser } from '../Contexto/UserContext';

import '../css/App.css';
import imagen from '../imagenes/image3.png';
import GoogleIcon from '../imagenes/google.png';
import GithubIcon from '../imagenes/github.png';

const clientID = '948578022378-ht25dltghdtmdu2qqdo9mfeltg4fq65m.apps.googleusercontent.com';

function Login({ onSwitchForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

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
      setUser(user); // Actualiza el contexto de usuario
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        const user = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoUrl: result.user.photoURL,
        };
        setUser(user); // Actualiza el contexto de usuario
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  };

  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        const user = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoUrl: result.user.photoURL,
        };
        setUser(user); // Actualiza el contexto de usuario
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con GitHub:', error);
      });
  };

  return (
    <div className='login-wrapper'>
      <div className='img-3d'>
        <img src={imagen} alt="image3" />
      </div>
      <div className="App">
        <div className="login-container">
          <h2>FACECHAT</h2>
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
            <button type="submit">Iniciar sesión</button>
            <p>OR</p>
            <div className="loginButton google">
              <button
                onClick={handleGoogleLogin}
                cookiePolicy={'single_host_origin'}
              >
                <div>
                  <img src={GoogleIcon} alt="Google" className="icon" />
                  Google
                </div>
              </button>
            </div>
            <div className="loginButton github">
              <button
                onClick={handleGithubLogin}
                className="github-button"
                cssClass="github-button" 
              >
                <img src={GithubIcon} alt="Github" className="icon" />
                <span>GitHub</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='contenedor'>
        <p>No tienes una cuenta? <a href="#" onClick={onSwitchForm}>Registrate</a></p>
      </div>
      <div className='texto-abajo'>
        <p><a href="#" onClick={() => navigate('/privacidad')}>Privacidad</a></p>
        <p>2024 Facechat from web II</p>
        <p><a href='#' onClick={() => navigate('/normas')}> Normas y reglamento </a></p>
      </div>
    </div>
  );
}

export default Login;
