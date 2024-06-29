import React, { useState } from 'react';
import '../Registro.css'; 
import imagen4 from '../imagenes/imagen4.png';


function Registro({ onSwitchForm }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

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
  const handleFechaNacimientoChange = (event) =>{
    setFechaNacimiento(event.target.value);
  }

  const handleRegister = () => {
    console.log('Register button clicked');
  };

  return (
    <div className='registro-wrapper'>
      <div className='img-4'>
        <img src={imagen4} alt="img4" />
      </div>
      <div className="registro-container">
        <h2>FACECHAT</h2>
        <form>
          <input type="email" value={email} placeholder='Correo electrónico' onChange={handleEmailChange} />
          <br />
          <input type="text" value={username} placeholder='Nombre de usuario' onChange={handleUsernameChange} />
          <br />
          <input type="password" value={password} placeholder='Contraseña' onChange={handlePasswordChange} />
          <br />
          <input type="password" value={confirmPassword} placeholder='Confirmar contraseña' onChange={handleConfirmPasswordChange} />
          <br />
          <input type="date" value={fechaNacimiento} onChange={handleFechaNacimientoChange} />
          <br />
        
          <button type="submit" onClick={handleRegister}>Registrarse
          </button>
          <div className='terminos'>
          <p>Al registrarte Aceptas los terminos y condiciones </p>
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