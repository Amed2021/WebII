import { useEffect, useState } from 'react';
import '../CSS/Admin.css';

const Admin = () => {
  const [admins, setAdmins] = useState([]);

  // Simulación de datos hasta que la base de datos esté disponible
  useEffect(() => {
    setAdmins([
      { id: 1, email: 'Diego2_rojas@gmail.com', name: 'Juan Diego R.', denuncias: 3 },
      { id: 2, email: 'Allan20@gmail.com', name: 'Allan S.', denuncias: 1 },
      { id: 3, email: 'Angel_48q@gmail.com', name: 'Angel UQ.', denuncias: 1 },
      { id: 4, email: 'Diego2_rojas@gmail.com', name: 'Juan Diego R.', denuncias: 0 },
      { id: 5, email: 'Alvarado777arian@gmail.com', name: 'Arian Alvarado', denuncias: 0 },
    ]);
  }, []);

  return (
    <div className="App">
      <div className="sidebar">
        <button className="sidebar-button active">Users</button>
        <button className="sidebar-button">Otros datos</button>
        <button className="sidebar-button">Agregar noticias</button>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Admin</h2>
        </div>
        <div className="admin-list">
          {admins.map((admin) => (
            <div key={admin.id} className="admin-item">
              <span>{admin.email}</span>
              <span>{admin.name}</span>
              <span>{admin.denuncias}</span>
              <button className="block-button">Bloquear user</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
