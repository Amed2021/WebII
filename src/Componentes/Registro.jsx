import React, { useState } from 'react';
import '../Registro.css'; 
import imagen4 from '../imagenes/imagen4.png';

function Registro({ onSwitchForm }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFechaNacimientoChange = (event) => {
    setFechaNacimiento(event.target.value);
  };

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
      setError('Debes tener al menos 18 años para registrarte');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length !== 8) {
      setError('La contraseña debe tener exactamente 8 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/Registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, fechaNacimiento }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario registrado con éxito');
        //  redirigir al usuario a otra página 
      } else {
        setError(data.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setError('Error al registrar el usuario.');
    }
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
          {error && <div className="error">{error}</div>}
          <div className='terminos'>
            <p>Al registrarte Aceptas los términos y condiciones</p>
          </div>
        </form>
      </div>
      <div className='registro-footer'>
        <p>¿Ya tienes una cuenta? <a href="#" onClick={onSwitchForm}>Inicia sesión</a></p>
      </div>
      <div className='registro-texto-abajo'>
        <p>Privacidad</p>
        <p>2024 Facechat from web II</p>
        <p>Normas y reglamento</p>
      </div>
    </div>
  );
}

export default Registro;
