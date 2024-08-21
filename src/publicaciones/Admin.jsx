import { useState, useEffect } from 'react';
import '../CSS/Admin.css';
import { onFindByUserEmail, onFindAllReports, onDelete } from '../config/api';
import Swal from 'sweetalert2';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [reports, setReports] = useState([]);
  const [showAllReports, setShowAllReports] = useState(false);

  useEffect(() => {
    // Cargar todas las denuncias al cargar el componente
    const loadReports = async () => {
      try {
        const allReports = await onFindAllReports();
        setReports(allReports);
      } catch (error) {
        console.error("Error al cargar las denuncias:", error);
      }
    };

    if (showAllReports) {
      loadReports();
    }
  }, [showAllReports]);

  const handleSearchUser = async () => {
    if (email) {
      const profiles = await onFindByUserEmail(email); 
      if (profiles.length > 0) {
        setUserProfile(profiles[0]);
        setShowAllReports(false); 
      } else {
        Swal.fire('No encontrado', 'Usuario no encontrado', 'error');
        setUserProfile(null);
      }
    } else {
      Swal.fire('Error', 'Por favor, ingresa un correo electrónico válido', 'error');
    }
  };

  const handleMarkAsDone = async (reportId, reportIndex) => {
    try {
      await onDelete('reports', reportId); 
      Swal.fire('Listo', 'La denuncia ha sido eliminada', 'success');
      // Remover la denuncia de la vista
      setReports(reports.filter((_, index) => index !== reportIndex));
    } catch (error) {
      Swal.fire('Error', `Hubo un problema al eliminar la denuncia: ${error.message}`, 'error');
    }
  };

  const handleShowAllReports = () => {
    setShowAllReports(true);
    setUserProfile(null);
  };

  const handleShowUsers = () => {
    setShowAllReports(false);
    setUserProfile(null);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <button className={`sidebar-button ${!showAllReports && 'active'}`} onClick={handleShowUsers}>Usuarios</button>
        <button className="sidebar-button">Otros datos</button>
        <button className="sidebar-button">Agregar noticias</button>
        <button className={`sidebar-button ${showAllReports && 'active'}`} onClick={handleShowAllReports}>Denuncias</button>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Administración de Usuarios</h2>
        </div>
        {!showAllReports && (
          <div className="search-section">
            <input 
              type="email" 
              placeholder="Buscar usuario por correo electrónico" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleSearchUser}>Buscar</button>
          </div>
        )}
        {userProfile && (
          <div className="user-details">
            <h3>Detalles del Usuario</h3>
            <p><strong>Nombre:</strong> {userProfile.name}</p>
            <p><strong>Correo electrónico:</strong> {userProfile.email}</p>
            <p><strong>Estado:</strong> {userProfile.isActive !== false ? 'Activo' : 'Bloqueado'}</p>
          </div>
        )}
        {showAllReports && (
          <div className="all-reports">
            <h3>Denuncias realizadas</h3>
            <div className="reports-section">
              {reports.length > 0 ? (
                <ul>
                  {reports.map((report, index) => (
                    <li key={report.id} className="report-item">
                      <button
                        className="block-user-button"
                        onClick={() => handleMarkAsDone(report.id, index)}
                      >
                        Listo
                      </button>
                      <p><strong>Usuario reportado:</strong> {report.reportedUser}</p>
                      <p><strong>Correo electrónico:</strong> {report.reportedUserEmail}</p>
                      <p><strong>Motivo:</strong> {report.reason}</p>
                      <p><strong>Descripción:</strong> {report.description}</p>
                      <p><strong>Fecha:</strong> {new Date(report.reportDate).toLocaleString()}</p>
                      <hr />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay denuncias registradas.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
