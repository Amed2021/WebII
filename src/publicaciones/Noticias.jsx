import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { onGetAllNews, onAddNews } from '../config/api';
import { useUser } from '../Contexto/UserContext';
import PropTypes from 'prop-types'; // Importar PropTypes
import '../css/Noticias.css';

export const Noticias = ({ onBack }) => { 
  const { user } = useUser(); // Obtener el usuario autenticado
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({
    author: '',
    photoUrl: '',
    title: '',
    content: '',
    imageUrl: '',
  });
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await onGetAllNews();
        setNews(fetchedNews);
      } catch (error) {
        console.error('Error al obtener las noticias:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar las noticias',
        });
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (user) {
      setNewNews((prevNews) => ({
        ...prevNews,
        author: user.displayName || 'Anónimo',
        photoUrl: user.photoURL || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setNewNews({
      ...newNews,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddNews(newNews);
      setNewNews({
        author: user.displayName || 'Anónimo', // Mantener el autor en cada nueva noticia
        photoUrl: user.photoURL || '',
        title: '',
        content: '',
        imageUrl: '',
      });
      setFormVisible(false);
      Swal.fire({
        icon: 'success',
        title: 'Noticia agregada',
        text: 'La noticia se agregó correctamente',
      });
      const fetchedNews = await onGetAllNews();
      setNews(fetchedNews);
    } catch (error) {
      console.error('Error al agregar la noticia:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al agregar la noticia',
      });
    }
  };

  return (
    <div className="news-section">
      {/* Botón Volver */}
      <div className="news-header">
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>
          <i className="material-icons">arrow_back</i> Volver
        </a>
        <h2>Noticias</h2>
      </div>

      {!isFormVisible && (
        <button onClick={() => setFormVisible(true)} className="add-news-button">
          Agregar Noticia
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="news-form">
          <input
            type="text"
            name="title"
            value={newNews.title}
            onChange={handleChange}
            placeholder="Título de la noticia"
            required
          />
          <textarea
            name="content"
            value={newNews.content}
            onChange={handleChange}
            placeholder="Contenido de la noticia"
            required
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            value={newNews.imageUrl}
            onChange={handleChange}
            placeholder="URL de la imagen"
          />
          <button type="submit">Agregar Noticia</button>
        </form>
      )}
      <div className="news-list">
        {news.map((item) => (
          <div className="news-item" key={item.id}>
            <div className="news-item-header">
              <img src={item.photoUrl} alt={item.author} className="avatar" />
              <div className="news-item-details">
                <h3>{item.author}</h3>
                <p>{item.title}</p>
              </div>
            </div>
            <p>{item.content}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="news-image" />}
          </div>
        ))}
      </div>
    </div>
  );
};

// Validación de props con PropTypes
Noticias.propTypes = {
  onBack: PropTypes.func.isRequired, // Validar que onBack sea una función requerida
};

export default Noticias;
