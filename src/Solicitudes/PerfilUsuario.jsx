
// src/components/PerfilUsuario.jsx
import React from 'react';
import { sendFriendRequest } from '../config/friendshipUtils'; 
import Swal from 'sweetalert2';

const PerfilUsuario = ({ toUserId, userId }) => {
  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(toUserId, userId);
      Swal.fire('Solicitud Enviada', 'La solicitud de amistad ha sido enviada.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al enviar la solicitud.', 'error');
    }
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <button onClick={handleSendRequest}>Enviar Solicitud de Amistad</button>
    </div>
  );
};

export default PerfilUsuario;


