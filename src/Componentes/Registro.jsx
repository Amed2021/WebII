
import React, { useState } from 'react';
import '../css/Registro.css';
import imagen4 from '../imagenes/imagen4.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Registro = ({ onSwitchForm }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handleFechaNacimientoChange = (event) => setFechaNacimiento(event.target.value);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

  

    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      Swal.fire({
        title: 'Error',
        text: 'Debes tener al menos 18 años para registrarte',
        icon: 'error'
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error'
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: 'Éxito',
        text: 'Usuario registrado con éxito',
        icon: 'success'
      });
      
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setFechaNacimiento('');
      
      // Navegar al login después de registro exitoso
      navigate('/');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      Swal.fire({
        title: 'Error',
        text: `Error al registrar el usuario: ${error.message}`,
        icon: 'error'
      });
    }
  };


  const handleNavigate = (path) => {
    navigate(path);
  };

  
  return (
    <div className='registro-wrapper'>
      <div className='img-4'>
        <img src={imagen4} alt="img4" />
      </div>
      <div className="registro-container">
        <h2>FACECHAT</h2>
        <form onSubmit={handleRegister}>
          <input type="email" value={email} placeholder='Correo electrónico' onChange={handleEmailChange} required />
          <br />
          <input type="text" value={username} placeholder='Nombre de usuario' onChange={handleUsernameChange} required />
          <br />
          <input type="password" value={password} placeholder='Contraseña' onChange={handlePasswordChange} required />
          <br />
          <input type="password" value={confirmPassword} placeholder='Confirmar contraseña' onChange={handleConfirmPasswordChange} required />
          <br />
          <input type="date" value={fechaNacimiento} onChange={handleFechaNacimientoChange} required />
          <br />
          <button type="submit">Registrarse</button>
          <div className='terminos'>
            <p>Al registrarte aceptas los términos y condiciones</p>
          </div>
        </form>
        <div className='registro-footer'>
        <p>Tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchForm(); }}>Inicia sesión</a></p>
        </div>
        <div className='registro-texto-abajo'>
        <p><a href="#" onClick={() => handleNavigate('/privacidad')}>Privacidad</a></p>
          <p>2024 Facechat from web II</p>
          <p><a href='#' onClick={() => handleNavigate('/normas')}> Normas y reglamento </a></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
