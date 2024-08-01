import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/Navbar';
import Swal from 'sweetalert2';
import { useUser } from '../Contexto/UserContext'; 

function Perfil() {
  const { user, setUser } = useUser(); 
  const [profileImage, setProfileImage] = useState(user?.photoUrl || 'default-profile.png');
  const [userInfo, setUserInfo] = useState({
    nombre: user?.displayName || '',
    situacionSentimental: '',
    lugarDeTrabajo: '',
    provincia: '',
    biografia: '',
    estado: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [amigos, setAmigos] = useState([]); 
  const [publicaciones, setPublicaciones] = useState([]); 

  useEffect(() => {
    if (user) {
      setProfileImage(user.photoUrl || 'default-profile.png');
      setUserInfo(prevInfo => ({
        ...prevInfo,
        nombre: user.displayName || ''
      }));
    }
  }, [user]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSaveChanges = () => {
    Swal.fire({
      title: 'Éxito',
      text: 'Cambios Guardados',
      icon: 'success'
    });
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  return (
    <div style={styles.profilePage}>
      <div style={styles.profileHeader}>
        <div style={styles.profileImageContainer}>
          <img 
            src={profileImage} 
            alt="Foto de Perfil" 
            style={styles.profileImage}
          />
          <input type="file" onChange={handleImageChange} />
        </div>
        <div style={styles.profileInfo}>
          {isEditing ? (
            <div>
              <input 
                type="text" 
                name="nombre" 
                value={userInfo.nombre} 
                onChange={handleInputChange} 
                style={styles.infoInput}
              />
              <input 
                type="text" 
                name="situacionSentimental" 
                value={userInfo.situacionSentimental} 
                onChange={handleInputChange} 
                style={styles.infoInput}
              />
              <input 
                type="text" 
                name="lugarDeTrabajo" 
                value={userInfo.lugarDeTrabajo} 
                onChange={handleInputChange} 
                style={styles.infoInput}
              />
              <input 
                type="text" 
                name="provincia" 
                value={userInfo.provincia} 
                onChange={handleInputChange} 
                style={styles.infoInput}
              />
              <textarea 
                name="biografia" 
                value={userInfo.biografia} 
                onChange={handleInputChange} 
                style={styles.infoTextarea}
              />
              <button onClick={handleSaveChanges} style={styles.saveChangesButton}>Guardar Cambios</button>
            </div>
          ) : (
            <div>
              <h1>{userInfo.nombre}</h1>
              <p><strong>Situación Sentimental:</strong> {userInfo.situacionSentimental}</p>
              <p><strong>Lugar de Trabajo:</strong> {userInfo.lugarDeTrabajo}</p>
              <p><strong>Provincia:</strong> {userInfo.provincia}</p>
              <p><strong>Biografía:</strong> {userInfo.biografia}</p>
              <button onClick={handleEditProfile} style={styles.editProfileButton}>Editar Perfil</button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.profileActions}>
        <div style={styles.profileStatus}>
          <label>Estado:</label>
          <input 
            type="text" 
            name="estado" 
            value={userInfo.estado} 
            onChange={handleInputChange} 
            style={styles.statusInput}
          />
          <button onClick={handleSaveChanges} style={styles.updateStatusButton}>Actualizar Estado</button>
        </div>
        <div style={styles.profileButtons}>
          <button onClick={handleEditProfile} style={styles.editProfileButton}>Editar Perfil</button>
          <button style={styles.viewStoriesButton}>Ver Historias</button>
          <button style={styles.friendsButton}>Amigos ({amigos.length})</button>
          <button style={styles.photosButton}>Fotos</button>
        </div>
      </div>

      <div style={styles.profilePosts}>
        <h2>Publicaciones</h2>
        <ul>
          {publicaciones.map((publicacion, index) => (
            <li key={index}>{publicacion}</li>
          ))}
        </ul>
      </div>
      
      <Navbar />
    </div>
  );
}

const styles = {
  profilePage: {
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    marginBottom: '-99px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileImageContainer: {
    marginRight: '20px',
    position: 'relative',
  },
  profileImage: {
    width: '250px', // Aumenta el tamaño del recuadro de la foto
    height: '250px',
    objectFit: 'cover',
    border: '2px solid #ccc',
    borderRadius: '0 0 20px 0', 
  },
  profileInfo: {
    flex: 1,
  },
  infoInput: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
    width: '100%',
    marginBottom: '10px',
  },
  infoTextarea: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
    width: '100%',
    minHeight: '100px',
    marginBottom: '10px',
  },
  saveChangesButton: {
    backgroundColor: '#4cb5f9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    marginTop: '15px',
  },
  editProfileButton: {
    backgroundColor: '#4cb5f9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  profileActions: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  profileStatus: {
    marginBottom: '15px',
  },
  statusInput: {
    marginRight: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  updateStatusButton: {
    backgroundColor: '#4cb5f9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  profileButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px', // Añade espacio entre los botones
    marginBottom: '20px',
  },
  viewStoriesButton: {
    backgroundColor: '#4cb5f9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  friendsButton: {
    backgroundColor: '#d9d9d9',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  photosButton: {
    backgroundColor: '#d9d9d9',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
  },
  profilePosts: {
    marginTop: '20px',
  },
};

export default Perfil;
