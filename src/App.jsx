import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar'; 
import Footer from './components/Footer'; 
import RegistroVoluntario from './components/RegistroVoluntario'; 
import BuscadorVoluntarios from './components/BuscadorVoluntarios';
import ComponenteVoluntarios from './components/voluntario'; 
import './App.css'; 

/**
 * Componente de Layout que incluye NavBar y Footer para rutas protegidas.
 */
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

  // 1. ESTADO DE VOLUNTARIOS CON PERSISTENCIA Y DATOS COMPLETOS
  const [voluntarios, setVoluntarios] = useState(() => {
    const guardados = localStorage.getItem('voluntariosData');

    return guardados ? JSON.parse(guardados) : [
      { 
        id: 'V001', 
        nombre: 'Gabriela Soto Pérez', 
        rut: '18.123.456-7', 
        email: 'gabriela.soto@mail.com', 
        region: 'Metropolitana', 
        edad: 35, 
        habilidad: 'Salud', 
        estado: 'Activo',             
        tipoVoluntariado: 'Permanente',
        genero: 'Femenino',           // NUEVO: Para el gráfico de género
        fechaRegistro: '2024-03-15',  // NUEVO: Para la lista de últimos
        antiguedad: 8, 
        esExPaciente: true 
      },
      { 
        id: 'V002', 
        nombre: 'Ricardo Palma Herrera', 
        rut: '15.987.654-3', 
        email: 'ricardo.palma@mail.com', 
        region: 'Valparaíso', 
        edad: 42, 
        habilidad: 'Logística', 
        estado: 'Pendiente', 
        tipoVoluntariado: 'Campaña',  
        genero: 'Masculino',          // NUEVO
        fechaRegistro: '2024-11-20',  // NUEVO
        antiguedad: 3, 
        esExPaciente: false 
      },
      { 
        id: 'V003', 
        nombre: 'Andrea Muñoz', 
        rut: '12.345.678-9', 
        email: 'andrea.munoz@mail.com', 
        region: 'Biobío', 
        edad: 28, 
        habilidad: 'Recreación', 
        estado: 'Inactivo',           
        tipoVoluntariado: 'Campaña', 
        genero: 'Femenino',           // NUEVO
        fechaRegistro: '2024-11-28',  // NUEVO
        antiguedad: 1, 
        esExPaciente: false 
      },
    ];
  });

  // 2. FUNCIÓN PARA REGISTRAR NUEVOS VOLUNTARIOS
  const handleRegistroVoluntario = (dataParaGuardar) => {
      const newId = `V${voluntarios.length + 1}`;
      const hoy = new Date().toISOString().split('T')[0];

      // --- ESTANDARIZACIÓN DE DATOS (BO-043) ---
      // Convertimos textos a Formato Título o Mayúsculas para mantener orden en la BD
      const formatTexto = (txt) => txt ? txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase() : '';
      
      const voluntarioConId = {
          ...dataParaGuardar,
          id: newId,
          // Forzamos formato estándar
          nombres: dataParaGuardar.nombres.split(' ').map(formatTexto).join(' '),
          apellidoPaterno: formatTexto(dataParaGuardar.apellidoPaterno),
          apellidoMaterno: formatTexto(dataParaGuardar.apellidoMaterno),
          email: dataParaGuardar.email.toLowerCase(), // Email siempre minúscula
          tipoVoluntariado: dataParaGuardar.tipoVoluntariado || 'Campaña',
          estado: 'Activo',
          fechaRegistro: hoy
      };

      const nuevaLista = [...voluntarios, voluntarioConId];
      setVoluntarios(nuevaLista);
      localStorage.setItem('voluntariosData', JSON.stringify(nuevaLista));
      
      return newId; 
  };

  return (
    <Router>
      <Routes>
        <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />} 
        />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}><AppLayout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard voluntarios={voluntarios} />} />
            <Route path="/registro" element={<RegistroVoluntario onGuardar={handleRegistroVoluntario} baseDeDatos={voluntarios}/>} />
            <Route path="/buscador" element={<BuscadorVoluntarios datos={voluntarios}/>} />
            <Route path="/voluntario/:id" element={<ComponenteVoluntarios mockVoluntarios={voluntarios} />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '100px'}}>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;