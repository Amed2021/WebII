import { useState, useEffect } from 'react';
import "../CSS/Perfil.css";

import Navbar from '../Componentes/Navbar';
import Swal from 'sweetalert2';
import { useUser } from '../Contexto/UserContext'; 
import { onFindByUserId, onInsert, onUpdate } from '../config/api';
import defaultProfile from '../imagenes/default-profile.png';
import sendIcon from '../imagenes/send-icon.png';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const { user, setUser } = useUser(); 
  const navigate = useNavigate();

  const initialData = {
    id: '', // Solo Firebase ID, no confundir con el ID de usuario
    userId: user?.uid || '',
    name: user?.displayName || '',
    photoUrl: user?.photoUrl || '',
    relationship: '',
    workplace: '',
    address: '',
    bio: '',
    status: ''
  };

  const [profile, setProfile] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [amigos, setAmigos] = useState([]); 
  const [publicaciones, setPublicaciones] = useState([]);

  async function fetchData(user) {
    return await onFindByUserId('perfiles', user.uid);
  }

  useEffect( () => {
    if (user) {
      fetchData(user).then((data) => {
        let dbProfile = data[0] || undefined;

        // Crear perfil si no existe
        if (!dbProfile) {
          dbProfile = {
            id: '',
            userId: user.uid,
            name: user.displayName,
            photoUrl: user.photoUrl,
            relationship: '',
            workplace: '',
            address: '',
            bio: '',
            status: ''
          };

          onInsert('perfiles', dbProfile);

          // Es necesario volver a traer la data para obtener el ID del documento en Firestore
          fetchData(user).then((data) => {
            dbProfile = data[0] || undefined;
          });
        }

        setProfile({
          id: dbProfile.id,
          userId: dbProfile.userId || user.uid,
          name: dbProfile.name || dbProfile.displayName || '',
          photoUrl: dbProfile.photoUrl || user.photoUrl || defaultProfile,
          relationship: dbProfile.relationship || '',
          workplace: dbProfile.workplace || '',
          address: dbProfile.address || '',
          bio: dbProfile.bio || '',
          status: ''
        });
      });
    } else {
      // Redirect home
      navigate('/');
    }
  }, [user]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        const imageSrcString = reader.result;
        let newProfile = {...profile, photoUrl: imageSrcString}
        setProfile(newProfile);
        await onUpdate('perfiles', profile.id, newProfile);
      };
  
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSaveChanges = async () => {
    console.log(profile);
    await onUpdate('perfiles', profile.id, profile);
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
    <>
      <div className="profilePage">
        <div className="profileHeader">
          <div className="profileImageContainer">
            <img 
              src={profile.photoUrl} 
              alt="Foto de Perfil" 
              className="profileImage"
            />
            <label htmlFor="file-upload" className="custom-file-upload">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_119_161)">
                <path d="M12.5 15.8334C14.341 15.8334 15.8334 14.341 15.8334 12.5C15.8334 10.6591 14.341 9.16669 12.5 9.16669C10.6591 9.16669 9.16669 10.6591 9.16669 12.5C9.16669 14.341 10.6591 15.8334 12.5 15.8334Z" fill="black"/>
                <path d="M9.37498 2.08331L7.46873 4.16665H4.16665C3.02081 4.16665 2.08331 5.10415 2.08331 6.24998V18.75C2.08331 19.8958 3.02081 20.8333 4.16665 20.8333H20.8333C21.9791 20.8333 22.9166 19.8958 22.9166 18.75V6.24998C22.9166 5.10415 21.9791 4.16665 20.8333 4.16665H17.5312L15.625 2.08331H9.37498ZM12.5 17.7083C9.62498 17.7083 7.29165 15.375 7.29165 12.5C7.29165 9.62498 9.62498 7.29165 12.5 7.29165C15.375 7.29165 17.7083 9.62498 17.7083 12.5C17.7083 15.375 15.375 17.7083 12.5 17.7083Z" fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_119_161">
                  <rect width="25" height="25" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            </label>
            <input id="file-upload" type="file" onChange={handleImageChange} />
          </div>
          <div className="profileInfo">
            {isEditing ? (
              <div>
                <input 
                  type="text" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleInputChange} 
                  className="infoInput"
                />
                <input 
                  type="text" 
                  name="relationship" 
                  value={profile.relationship} 
                  onChange={handleInputChange} 
                  className="infoInput"
                />
                <input 
                  type="text" 
                  name="workplace" 
                  value={profile.workplace} 
                  onChange={handleInputChange} 
                  className="infoInput"
                />
                <input 
                  type="text" 
                  name="address" 
                  value={profile.address} 
                  onChange={handleInputChange} 
                  className="infoInput"
                />
                <textarea 
                  name="bio" 
                  value={profile.bio} 
                  onChange={handleInputChange} 
                  className="infoTextarea"
                />
                <button onClick={handleSaveChanges} className="saveChangesButton">Guardar Cambios</button>
              </div>
            ) : (
              <div>
                <h1>{profile.name}</h1>
                <p><b>Información</b></p>
                <p><strong>Situación Sentimental:</strong> {profile.relationship}</p>
                <p><strong>Lugar de Trabajo:</strong> {profile.workplace}</p>
                <p><strong>Dirección:</strong> {profile.address}</p>
                <p><strong>Biografía:</strong> {profile.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div className="profileActions">
          <div className="profileStatus">
            <label>Estado:</label>
            <input 
              type="text" 
              name="status" 
              value={profile.status}
              placeholder="Como te sientes?"
              onChange={handleInputChange} 
              className="statusInput"
            />
            <button onClick={handleSaveChanges} className="updateStatusButton">
              <img src={sendIcon}></img>
            </button>
            <div className="statusAdjacentButtons">
              <button onClick={handleEditProfile} className="editProfileButton">Editar Perfil</button>
              <button className="viewStoriesButton">Ver Historias</button>
            </div>
          </div>
          <div className="profileButtons">
            <button className="friendsButton">Amigos ({amigos.length})</button>
            <button className="photosButton">Fotos</button>
          </div>
        </div>

        <div className="profilePosts">
          <p><b>Publicaciones</b></p>
          <ul>
            {publicaciones.map((publicacion, index) => (
              <li key={index}>{publicacion}</li>
            ))}
          </ul>
        </div>
        
        <Navbar />
      </div>
    </>
  );
}

export default Perfil;