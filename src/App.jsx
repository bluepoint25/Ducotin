// src/App.jsx (CONTENIDO ACTUALIZADO)
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Importado pero no usado directamente en la nueva estructura, pero se mantiene para claridad.
import NavBar from './components/NavBar'; 
import Footer from './components/Footer'; 
import RegistroVoluntario from './components/RegistroVoluntario'; 
import BuscadorVoluntarios from './components/BuscadorVoluntarios';
import ComponenteVoluntarios from './components/voluntario'; 
import './App.css'; // Mantenemos el import CSS

// --- Datos Simulados de Base de Datos ---
// Nota: En una aplicación real, esta data vendría de un API o Redux. 
// Aquí se usa para simular el flujo de registro/búsqueda.
const mockVoluntarios = [
    { id: 'V001', nombre: 'Gabriela Soto Pérez', rut: '18.123.456-7', email: 'gabriela.soto@mail.com', region: 'Metropolitana', edad: 35, habilidad: 'Salud', estado: 'Activo', antiguedad: 8, esExPaciente: true },
    { id: 'V002', nombre: 'Ricardo Palma Herrera', rut: '15.987.654-3', email: 'ricardo.palma@mail.com', region: 'Valparaíso', edad: 42, habilidad: 'Logística', estado: 'Pendiente', antiguedad: 3, esExPaciente: false },
];

/**
 * Componente de Layout que incluye NavBar y Footer para rutas protegidas.
 * Las rutas anidadas se renderizan en <Outlet />.
 */
const AppLayout = ({ isLoggedIn, onLogout }) => (
    <>
        <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} /> 
        
        {/* Usamos 'main-container' de index.css para centrar y añadir margen */}
        <div className="main-container"> 
            <Outlet />
        </div>
        
        <Footer /> 
    </>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleRegistroVoluntario = (nuevoVoluntario) => {
      // Simula la adición a la base de datos de voluntarios
      mockVoluntarios.push({
          id: `V${mockVoluntarios.length + 1}`,
          ...nuevoVoluntario,
          edad: parseInt(nuevoVoluntario.edad),
          antiguedad: 0,
          estado: 'Pendiente'
      });
      console.log('Nuevo voluntario registrado (simulado):', nuevoVoluntario);
  };

  return (
    <Router>
      <Routes>
        {/* 1. Ruta de Login (NO protegida) */}
        <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />} 
        />
        
        {/* 2. Layout para Rutas Protegidas */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}><AppLayout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} /></ProtectedRoute>}>
            
            {/* Rutas Anidadas y Protegidas */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/registro" element={<RegistroVoluntario onGuardar={handleRegistroVoluntario} baseDeDatos={mockVoluntarios}/>} />
            <Route path="/buscador" element={<BuscadorVoluntarios datos={mockVoluntarios}/>} />
            
            {/* Ruta para ver la ficha de un voluntario (Ejemplo de ruta dinámica) */}
            <Route path="/voluntario/:id" element={<ComponenteVoluntarios />} />
            
            {/* Ruta por defecto que redirige al dashboard si está logeado */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
        </Route>
        
        {/* 3. Manejo de rutas no encontradas (404) */}
        <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '100px'}}>404 - Página no encontrada</h1>} />

      </Routes>
    </Router>
  );
}

export default App;