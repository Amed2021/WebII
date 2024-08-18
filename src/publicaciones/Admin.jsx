import { useState } from 'react';
import '../CSS/Admin.css';
import { onFindByUserEmail, onUpdate } from '../config/api';
import Swal from 'sweetalert2';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  const handleSearchUser = async () => {
    if (email) {
      const profiles = await onFindByUserEmail('perfiles', email);
      if (profiles.length > 0) {
        setUserProfile(profiles[0]);
      } else {
        Swal.fire('No encontrado', 'Usuario no encontrado', 'error');
        setUserProfile(null);
      }
    } else {
      Swal.fire('Error', 'Por favor, ingresa un correo electrónico válido', 'error');
    }
  };

  const handleBlockUser = async () => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, isActive: false };
      await onUpdate('perfiles', userProfile.id, updatedProfile);
      Swal.fire('Bloqueado', 'El usuario ha sido bloqueado', 'success');
      setUserProfile(updatedProfile); // Actualizar el perfil localmente
    }
  };

  const handleUnblockUser = async () => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, isActive: true };
      await onUpdate('perfiles', userProfile.id, updatedProfile);
      Swal.fire('Desbloqueado', 'El usuario ha sido desbloqueado', 'success');
      setUserProfile(updatedProfile); // Actualizar el perfil localmente
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <button className="sidebar-button active">Usuarios</button>
        <button className="sidebar-button">Otros datos</button>
        <button className="sidebar-button">Agregar noticias</button>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Administración de Usuarios</h2>
        </div>
        <div className="search-section">
          <input 
            type="email" 
            placeholder="Buscar usuario por correo electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button onClick={handleSearchUser}>Buscar</button>
        </div>
        {userProfile && (
          <div className="user-details">
            <h3>Detalles del Usuario</h3>
            <p><strong>Nombre:</strong> {userProfile.name}</p>
            <p><strong>Correo electrónico:</strong> {userProfile.email}</p>
            <p><strong>Estado:</strong> {userProfile.isActive !== false ? 'Activo' : 'Bloqueado'}</p>
            <button 
              onClick={userProfile.isActive !== false ? handleBlockUser : handleUnblockUser} 
              className={userProfile.isActive !== false ? "block-button" : "unblock-button"}>
              {userProfile.isActive !== false ? 'Bloquear usuario' : 'Desbloquear usuario'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
