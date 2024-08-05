import { Routes, Route } from 'react-router-dom';
import Login from '../Componentes/Login';
import Home from '../home';
import Registro from './Registro';  
import Normas from '../Facechat/Normas';
import Privacidad from '../Facechat/Privacidad';
import Perfil from '../publicaciones/Perfil';
import Configuraciones from '../publicaciones/Configuraciones';
import { useUser } from '../Contexto/UserContext';


function App({ onSwitchForm, isLogin }) {
  const { user } = useUser();
  return (
    <Routes>
      <Route path="/" element={isLogin ? <Login onSwitchForm={onSwitchForm} /> : <Registro onSwitchForm={onSwitchForm} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registro" element={isLogin ? <Registro onSwitchForm={onSwitchForm} /> : <Login onSwitchForm={onSwitchForm} />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/normas" element={<Normas />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/configuraciones" element={<Configuraciones />} />
    </Routes>
  );
}

export default App;
