
import React, { useState, useEffect } from 'react';
import { handleFriendRequest, Requests } from '../config/friendshipUtils'; 
import Swal from 'sweetalert2';

const Solicitud = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const fetchedRequests = await Requests();
      setRequests(fetchedRequests);
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await handleFriendRequest(requestId, true, userId);
      Swal.fire('Amistad Aceptada', 'Ahora son amigos.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al aceptar la solicitud.', 'error');
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await handleFriendRequest(requestId, false, userId);
      Swal.fire('Solicitud Rechazada', 'La solicitud ha sido rechazada.', 'info');
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al rechazar la solicitud.', 'error');
    }
  };

  return (
    <div>
      <h2>Solicitudes de Amistad</h2>
      {requests.map(request => (
        <div key={request.id}>
          <p>Solicitud de {request.fromUserId}</p>
          <button onClick={() => handleAccept(request.id)}>Aceptar</button>
          <button onClick={() => handleDecline(request.id)}>Rechazar</button>
        </div>
      ))}
    </div>
  );
};

export default Solicitud;
