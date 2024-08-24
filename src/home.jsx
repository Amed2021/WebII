
import '../src/css/App.css';
import Navbar from './Componentes/Navbar';
import Sidebar from './Componentes/Sidebar'; 
import Stories from './Componentes/Stories';
import Feed from './Componentes/Feed'; 
import Sidenav from './Componentes/Sidenav'; 

function Home() {
  return (
    <div className="home">
      <Sidenav />
      <Sidebar />
      <div className="content-container">
        <Stories />
        <Feed selfPosts={false} />
      </div>
      <Navbar />
    </div>
  );
}

export default Home;
