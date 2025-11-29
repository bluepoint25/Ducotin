// src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// URL del Logo de la Botathon (Teletón)
const LOGO_URL = 'https://evento.teleton.cl/assets/logo-BIA0jwll.webp';

// Paleta de Colores
const TELETON_RED = '#EE3123';        
const PRIMARY_BLUE_DARK = '#263259';  
const TELETON_WHITE = '#FFFFFF';      

const NavBar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    
    // --- Estilos Inline para la Navbar ---
    const navItemStyle = {
        padding: '0 15px',
        color: TELETON_WHITE,
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'opacity 0.2s',
    };
    
    const logoutButtonStyle = {
        backgroundColor: PRIMARY_BLUE_DARK,
        color: TELETON_WHITE,
        border: 'none',
        borderRadius: '4px',
        padding: '8px 15px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginLeft: '20px',
        transition: 'background-color 0.2s',
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    // Estilos basados en el header de Dashboard.jsx
    const headerStyle = {
        backgroundColor: TELETON_RED,
        color: TELETON_WHITE,
        padding: '10px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '65px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        width: '100%',
    };

    const logoWrapperStyle = {
        backgroundColor: TELETON_WHITE, 
        padding: '5px',
        borderRadius: '5px',
        marginRight: '15px',
        display: 'flex',
        alignItems: 'center',
        height: '45px',
    };

    const logoStyle = {
        height: '45px',
    };
    
    const linkContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1, 
        marginLeft: '20px',
    };
    
    // Si no está logeado, solo muestra el branding (para la página de Login)
    if (!isLoggedIn) {
        return (
            <div style={headerStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={logoWrapperStyle}>
                        <img src={LOGO_URL} alt="Logo Teletón" style={logoStyle} /> 
                    </div>
                    <span style={{ fontSize: '1.4em', fontWeight: 700, color: TELETON_WHITE }}>CRM Voluntarios</span>
                </div>
            </div>
        );
    }

    // Si está logeado, muestra la navegación completa
    return (
        <nav style={headerStyle}>
            {/* Branding */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={logoWrapperStyle}>
                    <img src={LOGO_URL} alt="Logo Teletón" style={logoStyle} /> 
                </div>
                <span style={{ fontSize: '1.4em', fontWeight: 700, color: TELETON_WHITE }}>CRM</span>
            </div>
            
            {/* Links de Navegación */}
            <div style={linkContainerStyle}>
                <Link to="/dashboard" style={navItemStyle}>Dashboard</Link>
                <Link to="/registro" style={navItemStyle}>Registro Voluntario</Link>
                <Link to="/buscador" style={navItemStyle}>Buscador Avanzado</Link>
            </div>
            
            {/* Botón de Logout */}
            <button onClick={handleLogout} style={logoutButtonStyle}>
                Salir
            </button>
        </nav>
    );
};

export default NavBar;