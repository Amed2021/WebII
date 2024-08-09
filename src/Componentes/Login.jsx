import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    signInWithPopup(auth, provider)
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
    signInWithPopup(auth, provider)
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
              <button onClick={handleGoogleLogin} className="google-button">
                <div>
                  <img src={GoogleIcon} alt="Google" className="icon" />
                  Google
                </div>
              </button>
            </div>
            <div className="loginButton github">
              <button onClick={handleGithubLogin} className="github-button">
                <img src={GithubIcon} alt="Github" className="icon" />
                <span>GitHub</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='contenedor'>
        <p>No tienes una cuenta? <button onClick={onSwitchForm} style={{background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Registrate</button></p>
      </div>
      <div className='texto-abajo'>
        <p><button onClick={() => navigate('/privacidad')} style={{background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Privacidad</button></p>
        <p>2024 Facechat from web II</p>
        <p><button onClick={() => navigate('/normas')} style={{background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Normas y reglamento</button></p>
      </div>
    </div>
  );
}

Login.propTypes = {
  onSwitchForm: PropTypes.func.isRequired,
};

export default Login;
