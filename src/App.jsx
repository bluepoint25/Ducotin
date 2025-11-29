import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NavBar from './components/NavBar.jsx'; 
import Footer from './components/Footer.jsx'; 
import RegistroVoluntario from './components/RegistroVoluntario.jsx'; 
import BuscadorVoluntarios from './components/BuscadorVoluntarios.jsx';
import ComponenteVoluntarios from './components/voluntario.jsx'; 
import RecuperarPassword from './components/RecuperarPassword.jsx'; // <--- IMPORTACIÓN NUEVA
import './App.css'; 

const AppLayout = ({ isLoggedIn, onLogout }) => (
    <>
        <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} /> 
        <div className="main-container"> 
            <Outlet />
        </div>
        <Footer /> 
    </>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [voluntarios, setVoluntarios] = useState(() => {
    const guardados = localStorage.getItem('voluntariosData');
    return guardados ? JSON.parse(guardados) : [
      { 
        id: 'V001', nombre: 'Gabriela Soto Pérez', rut: '18.123.456-7', 
        email: 'gabriela.soto@mail.com', region: 'Metropolitana', edad: 35, 
        habilidad: 'Salud', estado: 'Activo', tipoVoluntariado: 'Permanente',
        genero: 'Femenino', fechaRegistro: '2024-03-15', antiguedad: 8, esExPaciente: true 
      },
      { 
        id: 'V002', nombre: 'Ricardo Palma Herrera', rut: '15.987.654-3', 
        email: 'ricardo.palma@mail.com', region: 'Valparaíso', edad: 42, 
        habilidad: 'Logística', estado: 'Pendiente', tipoVoluntariado: 'Campaña',
        genero: 'Masculino', fechaRegistro: '2024-11-20', antiguedad: 3, esExPaciente: false 
      },
      { 
        id: 'V003', nombre: 'Andrea Muñoz', rut: '12.345.678-9', 
        email: 'andrea.munoz@mail.com', region: 'Biobío', edad: 28, 
        habilidad: 'Recreación', estado: 'Inactivo', tipoVoluntariado: 'Campaña',
        genero: 'Femenino', fechaRegistro: '2024-11-28', antiguedad: 1, esExPaciente: false 
      },
    ];
  });

  const formatTexto = (txt) => txt ? String(txt).charAt(0).toUpperCase() + String(txt).slice(1).toLowerCase() : '';

  const handleRegistroVoluntario = (dataParaGuardar) => {
      const newId = `V${voluntarios.length + 1}`;
      const hoy = new Date().toISOString().split('T')[0];

      const voluntarioConId = {
          ...dataParaGuardar,
          id: newId,
          nombres: dataParaGuardar.nombres.split(' ').map(formatTexto).join(' '),
          apellidoPaterno: formatTexto(dataParaGuardar.apellidoPaterno),
          email: dataParaGuardar.email.toLowerCase(),
          tipoVoluntariado: dataParaGuardar.tipoVoluntariado || 'Campaña',
          estado: 'Activo',
          fechaRegistro: hoy
      };

      const nuevaLista = [...voluntarios, voluntarioConId];
      setVoluntarios(nuevaLista);
      localStorage.setItem('voluntariosData', JSON.stringify(nuevaLista));
      return newId; 
  };

  const handleCargaMasiva = (datosMasivos) => {
      const hoy = new Date().toISOString().split('T')[0];
      let contadorId = voluntarios.length + 1;

      const nuevosVoluntarios = datosMasivos.map(d => ({
          id: `V${contadorId++}`,
          nombre: `${d.nombres}`,
          rut: d.rut,
          email: d.email,
          region: d.region,
          habilidad: d.habilidad || 'General',
          estado: 'Activo',
          tipoVoluntariado: d.tipoVoluntariado || 'Campaña',
          genero: d.genero || 'No especificado', 
          fechaRegistro: hoy,
          antiguedad: 0
      }));

      const listaFinal = [...voluntarios, ...nuevosVoluntarios];
      setVoluntarios(listaFinal);
      localStorage.setItem('voluntariosData', JSON.stringify(listaFinal));
      console.log(`Cargados ${nuevosVoluntarios.length} registros masivos.`);
  };

  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
        
        {/* NUEVA RUTA: Recuperar Contraseña (Pública) */}
        <Route path="/recuperar" element={<RecuperarPassword />} />

        {/* Rutas Protegidas */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}><AppLayout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard voluntarios={voluntarios} />} />
            <Route path="/registro" element={
                <RegistroVoluntario 
                    onGuardar={handleRegistroVoluntario} 
                    onCargaMasiva={handleCargaMasiva} 
                    baseDeDatos={voluntarios}
                />
            } />
            <Route path="/buscador" element={<BuscadorVoluntarios datos={voluntarios}/>} />
            <Route path="/voluntario/:id" element={<ComponenteVoluntarios mockVoluntarios={voluntarios} />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '100px'}}>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;