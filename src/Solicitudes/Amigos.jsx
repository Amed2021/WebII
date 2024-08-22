import PropTypes from 'prop-types';
import { useState } from 'react';
import '../CSS/Amigos.css';

export const Amigos = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
    </div>
  );
};

Amigos.propTypes = {
  onBack: PropTypes.func.isRequired,
};
