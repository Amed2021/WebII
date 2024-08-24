import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import "../css/Perfil.css";
import "../css/PerfilUsuario.css";
import Navbar from '../Componentes/Navbar';
import Sidenav from '../Componentes/Sidenav';  
import Sidebar from '../Componentes/Sidebar';  
import { useUser } from '../Contexto/UserContext'; 
import { onSendFriendRequest, onCancelFriendRequest, checkFriendRequestExists } from '../config/api';
import defaultProfile from '../imagenes/default-profile.png';
import useUserProfile from '../publicaciones/useUserProfile';

function PerfilUsuario() {
  const { userId } = useParams();
  const { user } = useUser(); 
  const { profile, loading, error } = useUserProfile(userId);
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  useEffect(() => {
    if (user && profile) {
      setFriendRequestSent(profile.friendRequestsSent?.includes(user.id) || false);
    }
  }, [user, profile]);
  
  useEffect(() => {
    console.log('User:', user);
    console.log('Profile:', profile);
  }, [user, profile]);

  const handleSendFriendRequest = async () => {
    if (!user || !user.id || !profile?.userId) {
      console.error('User or profile IDs are missing');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la solicitud de amistad debido a un problema con los IDs',
      });
      return;
    }
  
    if (friendRequestSent) {
      Swal.fire({
        icon: 'info',
        title: 'Solicitud Enviada',
        text: `Ya has enviado una solicitud de amistad a ${profile.name}`,
      });
      return;
    }
  
    try {
      console.log('Checking if request exists...');
      const requestExists = await checkFriendRequestExists(user.id, profile.userId);
      console.log('Request exists:', requestExists);
  
      if (requestExists) {
        Swal.fire({
          icon: 'info',
          title: 'Solicitud Existente',
          text: `Ya existe una solicitud de amistad con ${profile.name}`,
        });
        return;
      }
  
      console.log('Sending friend request...');
      await onSendFriendRequest({ from: user.id, to: profile.userId });
      setFriendRequestSent(true);
      Swal.fire({
        icon: 'success',
        title: 'Solicitud Enviada',
        text: `Solicitud de amistad enviada a ${profile.name}`,
      });
    } catch (error) {
      console.error('Error sending friend request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la solicitud de amistad',
      });
    }
  };

  const handleCancelFriendRequest = async () => {
    if (!friendRequestSent) {
      Swal.fire({
        icon: 'info',
        title: 'No hay Solicitud',
        text: `No has enviado una solicitud de amistad a ${profile.name}`,
      });
      return;
    }

    try {
      await onCancelFriendRequest(user.id, profile.userId);
      setFriendRequestSent(false);
      Swal.fire({
        icon: 'success',
        title: 'Solicitud Cancelada',
        text: `Solicitud de amistad cancelada a ${profile.name}`,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cancelar la solicitud de amistad',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="profilePage">
      <Navbar />
      <Sidenav />
      <Sidebar />
      <div className="profileContent">
        <div className="profileHeader">
          <div className="profileImageContainer">
            <img 
              src={profile.photoUrl || defaultProfile} 
              alt="Foto de Perfil" 
              className="profileImage"
            />
          </div>
          <div className="profileInfo">
            <h1>{profile.name}</h1>
            <p><b>Información</b></p>
            <p><strong>Situación Sentimental:</strong> {profile.relationship}</p>
            <p><strong>Lugar de Trabajo:</strong> {profile.workplace}</p>
            <p><strong>Dirección:</strong> {profile.address}</p>
            <p><strong>Biografía:</strong> {profile.bio}</p>
          </div>
        </div>

        <div className="profileActions">
          <button 
            onClick={handleSendFriendRequest} 
            className="sendFriendRequestButton"
            disabled={friendRequestSent}
          >
            {friendRequestSent ? 'Solicitud Enviada' : 'Enviar Solicitud de Amistad'}
          </button>
          {friendRequestSent && (
            <button 
              onClick={handleCancelFriendRequest} 
              className="cancelFriendRequestButton"
            >
              Cancelar Solicitud
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilUsuario;
