// src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// URL del Logo de la Botathon (Teletón)
const LOGO_URL = 'https://evento.teleton.cl/assets/logo-BIA0jwll.webp';

// Paleta de Colores
const TELETON_RED = '#EE3123';        
const TELETON_WHITE = '#FFFFFF';      

const NavBar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    // Estilo del contenedor principal (Barra Roja)
    const headerStyle = {
        backgroundColor: TELETON_RED,
        width: '100%',             // Ocupar todo el ancho
        height: '80px',            // Un poco más alto para presencia
        display: 'flex',
        alignItems: 'center',      // Centrado vertical
        justifyContent: 'space-between', // Separa Logo (Izq) de Botones (Der)
        padding: '0 40px',         // Espacio a los costados
        boxSizing: 'border-box',   // Para que el padding no rompa el ancho
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Sombra en la barra
        position: 'fixed',         // Fijo arriba (opcional, si quieres que baje con scroll quita esto)
        top: 0,
        left: 0,
        zIndex: 1000,
    };

    // Contenedor del Logo + Título
    const leftSectionStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    };

    const logoWrapperStyle = {
        backgroundColor: TELETON_WHITE, 
        padding: '5px 10px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    };

    const logoStyle = {
        height: '45px',
        width: 'auto'
    };
    
    // Contenedor de los Botones (Alineados a la derecha)
    const rightSectionStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px' // Espacio entre botones
    };
    
    // --- RENDERIZADO SI NO ESTÁ LOGUEADO (Solo Logo) ---
    if (!isLoggedIn) {
        return (
            <div style={headerStyle}>
                <div style={leftSectionStyle}>
                    <div style={logoWrapperStyle}>
                        <img src={LOGO_URL} alt="Logo Teletón" style={logoStyle} /> 
                    </div>
                    <span style={{ fontSize: '1.5em', fontWeight: 800, color: TELETON_WHITE, letterSpacing: '1px' }}>
                        CRM VOLUNTARIOS
                    </span>
                </div>
            </div>
        );
    }

    // --- RENDERIZADO NORMAL (Con Botones) ---
    return (
        <>
            {/* Espaciador para que el contenido no quede oculto bajo la barra fija */}
            <div style={{ height: '80px' }}></div>

            <nav style={headerStyle}>
                {/* IZQUIERDA: Logo y Título */}
                <div style={leftSectionStyle}>
                    <div style={logoWrapperStyle}>
                        <img src={LOGO_URL} alt="Logo Teletón" style={logoStyle} /> 
                    </div>
                    <span style={{ fontSize: '1.6em', fontWeight: 800, color: TELETON_WHITE, textTransform: 'uppercase' }}>
                        CRM
                    </span>
                </div>
                
                {/* DERECHA: Botones de Navegación con clase 3D */}
                <div style={rightSectionStyle}>
                    <Link to="/dashboard" className="nav-btn-3d">
                        Dashboard
                    </Link>
                    
                    <Link to="/registro" className="nav-btn-3d">
                        Registro Voluntario
                    </Link>
                    
                    <Link to="/buscador" className="nav-btn-3d">
                        Buscador Avanzado
                    </Link>
                    
                    {/* Botón Salir (Añadimos clase extra para diferenciar color si quieres) */}
                    <button onClick={handleLogout} className="nav-btn-3d btn-logout" style={{marginLeft: '15px'}}>
                        Salir
                    </button>
                </div>
            </nav>
        </>
    );
};

export default NavBar;