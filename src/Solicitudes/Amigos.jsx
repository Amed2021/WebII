import  { useState } from 'react';
import '../CSS/Amigos.css';

export const Amigos = () => {
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
      <div>
        <p>Amigos</p>
 
      </div>
    </div>
  );
};
