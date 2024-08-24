import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { gapi } from 'gapi-script';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import { useUser } from '../Contexto/UserContext';
import { onFindByUserId } from '../config/api';
import Lottie from 'lottie-react';
import animationData from  '../imagenes/drawkit-grape-animation-3-LOOP.json';

import '../css/App.css';
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

      const userProfile = await onFindByUserId('perfiles', user.uid);
      if (userProfile.length > 0) {
        const profile = userProfile[0];
        if (profile.isActive === false) {
          throw new Error('Tu cuenta ha sido bloqueada. Contacta al administrador.');
        }
        user.isAdmin = profile.isAdmin || false;
      }

      setUser(user);

      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoUrl: result.user.photoURL,
        };

        const userProfile = await onFindByUserId('perfiles', user.uid);
        if (userProfile.length > 0) {
          const profile = userProfile[0];
          if (profile.isActive === false) {
            throw new Error('Tu cuenta ha sido bloqueada. Contacta al administrador.');
          }
          user.isAdmin = profile.isAdmin || false;
        }

        setUser(user);

        if (user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
        alert(error.message || 'Error al iniciar sesión con Google.');
      });
  };

  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoUrl: result.user.photoURL,
        };

        const userProfile = await onFindByUserId('perfiles', user.uid);
        if (userProfile.length > 0) {
          const profile = userProfile[0];
          if (profile.isActive === false) {
            throw new Error('Tu cuenta ha sido bloqueada. Contacta al administrador.');
          }
          user.isAdmin = profile.isAdmin || false;
        }

        setUser(user);

        if (user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con GitHub:', error);
        alert(error.message || 'Error al iniciar sesión con GitHub.');
      });
  };

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <h2>FACECHAT</h2>
        <Lottie animationData={animationData} loop={true} className="lottie-animation" />
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder='Correo electrónico' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder='Contraseña' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Iniciar sesión</button>
          <div className='loginButton'>
            <button className="google-button" onClick={handleGoogleLogin}>
              <img src={GoogleIcon} alt="Google" className="icon" />
              Google
            </button>
          </div>
          <div className='loginButton'>
            <button className="github-button" onClick={handleGithubLogin}>
              <img src={GithubIcon} alt="Github" className="icon" />
              Github
            </button>
          </div>
          <div className='contenedor'>
            <p className='texto-abajo'>
              ¿No tienes una cuenta? <button onClick={() => onSwitchForm('register')}>Regístrate</button>
            </p>
          </div>
        </form>
      
      </div>
    </div>
     
  );
 
}

Login.propTypes = {
  onSwitchForm: PropTypes.func.isRequired,
};

export default Login;
