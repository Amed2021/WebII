import { useState, useEffect } from 'react';
import '../css/Stories.css';
import Swal from 'sweetalert2';
import { ReadAllStories } from '../config/post.js';
import { useUser } from '../Contexto/UserContext';
import { useNavigate } from 'react-router-dom';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const { user } = useUser();
  const [currentStory, setCurrentStory] = useState(null);

  const navigate = useNavigate();

  const verifyLogin = () => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tu sesión ha expirado, por favor inicia sesión nuevamente',
      });
      navigate('/');
    }
  }

  useEffect(() => {
    verifyLogin();

    const fetchStories = async () => {
      try {
        let fetchedStories = await ReadAllStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error('Error al obtener las historias:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar las historias',
        });
      }
    }

    fetchStories();
  }, [user, navigate]);

  const openStory = (story) => {
    setCurrentStory(story);
  };

  const closeStory = () => {
    setCurrentStory(null);
  };

  const nextStory = () => {
    const currentIndex = stories.findIndex(story => story.id === currentStory.id);
    const nextIndex = (currentIndex + 1) % stories.length;
    setCurrentStory(stories[nextIndex]);
  };

  const prevStory = () => {
    const currentIndex = stories.findIndex(story => story.id === currentStory.id);
    const prevIndex = (currentIndex - 1 + stories.length) % stories.length;
    setCurrentStory(stories[prevIndex]);
  };

  return (
    <div className="stories-container">
      <div className="stories-row">
        {stories.length > 0 ? (
          stories.map(story => (
            <div key={story.id} onClick={() => openStory(story)} className="story-card">
              <img src={story.image} alt={story.authorName} className="story-image" />
              <p className="story-name">{story.authorName}</p>
            </div>
          ))
        ) : (
          <p className="no-stories">No hay historias disponibles</p>
        )}
      </div>

      {currentStory && (
        <div className="story-modal">
          <div className="story-content">
            <img src={currentStory.image} alt={currentStory.name} className="modal-story-image" />
            <p>{currentStory.name}</p>
            <div className="story-navigation">
              <button onClick={prevStory} className="btn-nav">
                <span>&#9664;</span> {/* Icono de flecha izquierda */}
              </button>
              <button onClick={nextStory} className="btn-nav">
                <span>&#9654;</span> {/* Icono de flecha derecha */}
              </button>
            </div>
            <button onClick={closeStory} className="btn-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
