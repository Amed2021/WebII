import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Styleconfiguraciones.css';

export function Configuraciones() {
  const [activeSection, setActiveSection] = useState('password');
  const [userData, setUserData] = useState({ name: '', email: '', date: '' });
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (activeSection === 'personal-info') {
      fetchUserData();
    }
  }, [activeSection]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    if (activeSection === 'block-contact') {
      fetchContacts();
    }
  }, [activeSection]);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  const handleReportSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const reportedUser = form.reportedUser.value;
    const reason = form.reason.value;
    const description = form.description.value;

    try {
      const response = await axios.post('/report-abuse', {
        reportedUser,
        reason,
        description,
      });
      if (response.status === 200) {
        alert('Reporte enviado exitosamente');
        form.reset();
      }
    } catch (error) {
      console.error('Error al enviar el reporte:', error);
      alert('Hubo un error al enviar el reporte. Por favor, intenta nuevamente.');
    }
  };

  const handleBlockContact = async (contactId) => {
    try {
      const response = await axios.post('/block-contact', { contactId });
      if (response.status === 200) {
        alert('Contacto bloqueado exitosamente');
        setContacts(contacts.filter(contact => contact._id !== contactId));
      }
    } catch (error) {
      console.error('Error al bloquear el contacto:', error);
      alert('Hubo un error al bloquear el contacto. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="configuraciones">
      <div className="sidebar">
        <button className="sidebar-button" onClick={() => handleButtonClick('personal-info')}>Datos personales</button>
        <button className="sidebar-button" onClick={() => handleButtonClick('password')}>Contraseña y seguridad</button>
        <button className="sidebar-button" onClick={() => handleButtonClick('profile-posts')}>Publicaciones y perfil</button>
        <button className="sidebar-button" onClick={() => handleButtonClick('block-contact')}>Bloquear contacto</button>
        <button className="sidebar-button" onClick={() => handleButtonClick('report-abuse')}>Denunciar abuso o infracción</button>
      </div>
      <div className="main-content">
        {activeSection === 'password' && (
          <div>
            <h2>Contraseña y seguridad</h2>
            <form>
              <label>
                Contraseña Antigua
                <input type="password" name="old-password" />
              </label>
              <label>
                Nueva contraseña
                <input type="password" name="new-password" />
              </label>
              <button type="submit">Cambiar</button>
            </form>
          </div>
        )}
        {activeSection === 'personal-info' && (
          <div>
            <h2>Datos personales</h2>
            <p><strong>Nombre:</strong> {userData.name}</p>
            <p><strong>Correo:</strong> {userData.email}</p>
            <p><strong>Fecha:</strong> {new Date(userData.date).toLocaleDateString()}</p>
          </div>
        )}
        {activeSection === 'profile-posts' && (
          <div>
            <h2>Publicaciones y perfil</h2>
            <p>Aquí se mostrarán las publicaciones y el perfil del usuario.</p>
          </div>
        )}
        {activeSection === 'block-contact' && (
          <div>
            <h2>Bloquear contacto</h2>
            <ul>
              {contacts.map(contact => (
                <li key={contact._id}>
                  {contact.name}
                  <button onClick={() => handleBlockContact(contact._id)}>Bloquear</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeSection === 'report-abuse' && (
          <div>
            <h2>Denunciar abuso o infracción</h2>
            <form onSubmit={handleReportSubmit}>
              <label>
                Usuario a reportar
                <input type="text" name="reportedUser" required />
              </label>
              <label>
                Motivo
                <select name="reason" required>
                  <option value="spam">Spam</option>
                  <option value="harassment">Acoso</option>
                  <option value="hate_speech">Discurso de odio</option>
                  <option value="other">Otro</option>
                </select>
              </label>
              <label>
                Descripción
                <textarea name="description" required></textarea>
              </label>
              <button type="submit">Enviar reporte</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Configuraciones;
