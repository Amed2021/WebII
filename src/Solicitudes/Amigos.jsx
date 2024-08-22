import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { onFindByUserName } from '../config/api';
import '../CSS/Amigos.css';

export const Amigos = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const results = await onFindByUserName(searchTerm);
        console.log('Resultados de la búsqueda:', results);
        setSearchResults(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
        setSearchResults([]); // Limpia los resultados en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
<div className="amigos-container">
  <div className="search-container">
    <i className="material-icons search-icon">search</i>
    <input
      type="text"
      placeholder="Buscar personas..."
      className="search-input"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>

  <a
    href="#"
    className="volver-button"
    onClick={(e) => {
      e.preventDefault();
      if (onBack) onBack(); 
    }}
  >
    <i className="material-icons">arrow_back</i> Volver
  </a>

  {loading && <p>Cargando...</p>}
  <div className="results-container">
    {searchResults.length > 0 ? (
      <ul className="results-list">
        {searchResults.map((user) => (
          <li key={user.id} className="result-item">
            <p className="result-name">{user.name}</p>
          </li>
        ))}
      </ul>
    ) : (
      !loading && <p className="no-results">No se encontraron resultados</p>
    )}
  </div>
</div>
  );
};

Amigos.propTypes = {
  onBack: PropTypes.func.isRequired,
};
