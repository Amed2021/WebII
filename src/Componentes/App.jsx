import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Login from '../Componentes/Login';
import Registro from './Registro';
import Home from '../home';
import Privacidad from '../Facechat/Privacidad';
import Normas from '../Facechat/Normas';
import Perfil from '../publicaciones/Perfil';
import Configuraciones from '../publicaciones/Configuraciones';
import Admin from '../publicaciones/Admin';
import PerfilUsuario from '../publicaciones/PerfilUsuario';
import NuevoPost from '../publicaciones/NuevoPost';

function App({ onSwitchForm, isLogin }) {
  console.log('App props:', { onSwitchForm, isLogin });
  return (
    <Routes>
      <Route path="/" element={isLogin ? <Login onSwitchForm={onSwitchForm} /> : <Registro onSwitchForm={onSwitchForm} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/normas" element={<Normas />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/configuraciones" element={<Configuraciones />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/perfilusuario/:userId" element={<PerfilUsuario />} />
      <Route path="/nuevo-post" element={<NuevoPost />} />
    </Routes>
  );
}

App.propTypes = {
  onSwitchForm: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default App;
