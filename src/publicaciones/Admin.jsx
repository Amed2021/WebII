import { useState, useEffect } from 'react';
import '../CSS/Admin.css';
import { onFindByUserEmail, onFindAllReports, onDelete, onUpdate, onGetAllNews, onAddNews } from '../config/api';
import Swal from 'sweetalert2';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [reports, setReports] = useState([]);
  const [showAllReports, setShowAllReports] = useState(false);
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({
    author: 'Admin',
    photoUrl: '', 
    title: '',
    content: '',
    imageUrl: '',
  });
  const [showNews, setShowNews] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false); 

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

  useEffect(() => {
    // Cargar todas las noticias al mostrar la sección de noticias
    const loadNews = async () => {
      try {
        const allNews = await onGetAllNews();
        setNews(allNews);
      } catch (error) {
        console.error("Error al cargar las noticias:", error);
      }
    };

    if (showNews) {
      loadNews();
    }
  }, [showNews]);

  const handleSearchUser = async () => {
    if (email) {
      const profiles = await onFindByUserEmail(email); 
      if (profiles.length > 0) {
        setUserProfile(profiles[0]);
        setShowAllReports(false); 
        setShowNews(false);
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
      try {
        await onUpdate('perfiles', userProfile.id, { ...userProfile, isActive: false });
        Swal.fire('Usuario bloqueado', `El usuario ${userProfile.name} ha sido bloqueado`, 'success');
        setUserProfile({ ...userProfile, isActive: false });
      } catch (error) {
        Swal.fire('Error', `Hubo un problema al bloquear al usuario: ${error.message}`, 'error');
      }
    }
  };

  const handleUnblockUser = async () => {
    if (userProfile) {
      try {
        await onUpdate('perfiles', userProfile.id, { ...userProfile, isActive: true });
        Swal.fire('Usuario desbloqueado', `El usuario ${userProfile.name} ha sido desbloqueado`, 'success');
        setUserProfile({ ...userProfile, isActive: true });
      } catch (error) {
        Swal.fire('Error', `Hubo un problema al desbloquear al usuario: ${error.message}`, 'error');
      }
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
    setShowNews(false);
  };

  const handleShowUsers = () => {
    setShowAllReports(false);
    setUserProfile(null);
    setShowNews(false);
  };

  const handleShowNews = () => {
    setShowNews(true);
    setShowAllReports(false);
    setUserProfile(null);
  };

  const handleDeleteNews = async (newsId, newsIndex) => {
    try {
      await onDelete('news', newsId); 
      Swal.fire('Noticia eliminada', 'La noticia ha sido eliminada con éxito', 'success');
      // Remover la noticia de la vista
      setNews(news.filter((_, index) => index !== newsIndex));
    } catch (error) {
      Swal.fire('Error', `Hubo un problema al eliminar la noticia: ${error.message}`, 'error');
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await onAddNews(newNews);
      Swal.fire('Noticia agregada', 'La noticia se agregó correctamente', 'success');
      setNewNews({
        author: 'Admin',
        photoUrl: '',
        title: '',
        content: '',
        imageUrl: '',
      });
      setFormVisible(false); 
      const fetchedNews = await onGetAllNews();
      setNews(fetchedNews);
    } catch (error) {
      Swal.fire('Error', `Hubo un problema al agregar la noticia: ${error.message}`, 'error');
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <button className={`sidebar-button ${!showAllReports && !showNews && 'active'}`} onClick={handleShowUsers}>Usuarios</button>
        <button className="sidebar-button">Otros datos</button>
        <button className={`sidebar-button ${showNews && 'active'}`} onClick={handleShowNews}>Noticias</button>
        <button className={`sidebar-button ${showAllReports && 'active'}`} onClick={handleShowAllReports}>Denuncias</button>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Administración</h2>
        </div>
        {!showAllReports && !showNews && (
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
            {userProfile.isActive !== false ? (
              <button className="block-button" onClick={handleBlockUser}>
                Bloquear usuario
              </button>
            ) : (
              <button className="unblock-button" onClick={handleUnblockUser}>
                Desbloquear usuario
              </button>
            )}
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
        {showNews && (
          <div className="news-section">
            <h3>Noticias</h3>
            {!isFormVisible && (
              <button onClick={() => setFormVisible(true)} className="add-news-button">
                Agregar Noticia
              </button>
            )}
            {isFormVisible && (
              <form onSubmit={handleAddNews} className="news-form">
                <input
                  type="text"
                  name="title"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  placeholder="Título de la noticia"
                  required
                />
                <textarea
                  name="content"
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  placeholder="Contenido de la noticia"
                  required
                ></textarea>
                <input
                  type="text"
                  name="imageUrl"
                  value={newNews.imageUrl}
                  onChange={(e) => setNewNews({ ...newNews, imageUrl: e.target.value })}
                  placeholder="URL de la imagen"
                />
                <button type="submit">Agregar Noticia</button>
              </form>
            )}
            <div className="news-list">
              {news.length > 0 ? (
                <ul>
                  {news.map((item, index) => (
                    <li key={item.id} className="news-item">
                      <button
                        className="delete-news-button"
                        onClick={() => handleDeleteNews(item.id, index)}
                      >
                        Eliminar
                      </button>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="news-image" />}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay noticias registradas.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
