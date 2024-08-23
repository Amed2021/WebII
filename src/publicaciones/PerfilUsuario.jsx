import { useState, useEffect, useMemo, useCallback } from 'react';
import Swal from 'sweetalert2'; 
import "../CSS/Perfil.css";
import "../CSS/PerfilUsuario.css";
import Navbar from '../Componentes/Navbar';
import Sidenav from '../Componentes/Sidenav';  
import Sidebar from '../Componentes/Sidebar';  
import { useUser } from '../Contexto/UserContext'; 
import { onFindById, onSendFriendRequest, onCancelFriendRequest, checkFriendRequestExists } from '../config/api';

import defaultProfile from '../imagenes/default-profile.png';
import { useNavigate, useParams } from 'react-router-dom';

function PerfilUsuario() {
  const { user } = useUser(); 
  const navigate = useNavigate();
  const { userId } = useParams(); 

  const initialData = useMemo(() => ({
    id: '',
    userId: '',
    name: '',
    photoUrl: defaultProfile,
    relationship: '',
    workplace: '',
    address: '',
    bio: '',
    friendRequestSent: false,
    friendRequestReceived: false,
  }), []);

  const [profile, setProfile] = useState(initialData);

  const fetchUserProfile = useCallback(async (userId) => {
    console.log('Fetching profile for userId:', userId);
    try {
      const userData = await onFindById('perfiles', userId);
      console.log('User data fetched:', userData);
      if (!userData) {
        console.error('Error: No se encontró el perfil del usuario');
        return;
      }
      setProfile({
        ...userData,
        photoUrl: userData?.photoUrl || defaultProfile,
        friendRequestSent: userData?.friendRequestsSent?.includes(user.id) || false,
        friendRequestReceived: userData?.friendRequestsReceived?.includes(user.id) || false,
        userId: userData.userId
      });
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  }, [user.id]);

  useEffect(() => {

  
    console.log('userId desde useParams:', userId);
  
    if (user && userId) {
      fetchUserProfile(userId);
    } else {
      navigate('/');
    }
  }, [user, userId, navigate, fetchUserProfile]);

  const handleSendFriendRequest = async () => {
    console.log('Usuario actual (user):', user);
    console.log('Perfil actual (profile):', profile);
  
    if (!user || !profile) {
      console.error('Error: Los datos de usuario o perfil no están disponibles');
      return;
    }
  
    if (!user.id || !profile.userId) {
      console.error('Error: Uno de los IDs es inválido o indefinido');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la solicitud de amistad debido a un problema con los IDs',
      });
      return;
    }
  
    if (profile.friendRequestSent) {
      Swal.fire({
        icon: 'info',
        title: 'Solicitud Enviada',
        text: `Ya has enviado una solicitud de amistad a ${profile.name}`,
      });
      return;
    }
  
    try {
      const requestExists = await checkFriendRequestExists(user.id, profile.userId);
      if (requestExists) {
        Swal.fire({
          icon: 'info',
          title: 'Solicitud Existente',
          text: `Ya existe una solicitud de amistad con ${profile.name}`,
        });
        return;
      }
  
      await onSendFriendRequest({ from: user.id, to: profile.userId });
      setProfile((prevProfile) => ({
        ...prevProfile,
        friendRequestSent: true,
      }));
      Swal.fire({
        icon: 'success',
        title: 'Solicitud Enviada',
        text: `Solicitud de amistad enviada a ${profile.name}`,
      });
    } catch (error) {
      console.error("Error al enviar la solicitud de amistad:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la solicitud de amistad',
      });
    }
  };

  const handleCancelFriendRequest = async () => {
    if (!profile.friendRequestSent) {
      Swal.fire({
        icon: 'info',
        title: 'No hay Solicitud',
        text: `No has enviado una solicitud de amistad a ${profile.name}`,
      });
      return;
    }
    try {
      // Suponiendo que `onCancelFriendRequest` maneje la cancelación correctamente.
      await onCancelFriendRequest(`${user.id}_${profile.userId}`);
      setProfile((prevProfile) => ({
        ...prevProfile,
        friendRequestSent: false,
      }));
      Swal.fire({
        icon: 'success',
        title: 'Solicitud Cancelada',
        text: `Solicitud de amistad cancelada a ${profile.name}`,
      });
    } catch (error) {
      console.error("Error al cancelar la solicitud de amistad:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cancelar la solicitud de amistad',
      });
    }
  };

  return (
    <div className="profilePage">
      <Navbar />
      <Sidenav />
      <Sidebar />
      <div className="profileContent">
        <div className="profileHeader">
          <div className="profileImageContainer">
            <img 
              src={profile.photoUrl} 
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
            disabled={profile.friendRequestSent}
          >
            {profile.friendRequestSent ? 'Solicitud Enviada' : 'Enviar Solicitud de Amistad'}
          </button>
          {profile.friendRequestSent && (
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
