// App.jsx
import React from 'react';
import Login from './src/Componentes/Login';
import './App.css'


function App() {
  return (
    <div>
      <h1>My App</h1>
      <Login />
    </div>
  );
}

export default App;





/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Componentes/Login'
import './App.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
*/