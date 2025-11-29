// src/components/NavBar.jsx (Diseño Moderno estilo DreamHost + Menú Hamburguesa)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react'; // Iconos para el menú

// URL del Logo de la Botathon (Teletón)
const LOGO_URL = 'https://evento.teleton.cl/assets/logo-BIA0jwll.webp';

// Paleta de Colores de Teletón
const TELETON_RED = '#EE3123';        
const PRIMARY_BLUE_DARK = '#f51111ff';  // Azul Oscuro (Usado como fondo principal)
const TELETON_WHITE = '#FFFFFF';      
const LINK_HOVER_COLOR = '#007bff';   // Azul Corporativo para hover

// Datos del voluntario de ejemplo para el enlace de ficha (V001)
const EXAMPLE_VOLUNTEER_ID = 'V001'; 


// ===================================================
// 1. ESTILOS INLINE (Moviendo el diseño al componente)
// ===================================================

const styles = {
    // --- Estilos de la Barra Fija ---
    header: {
        backgroundColor: PRIMARY_BLUE_DARK,
        width: '100%',
        height: '60px', // Un poco más bajo que antes
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    logoWrapper: {
        backgroundColor: TELETON_WHITE, 
        padding: '3px 8px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        height: '35px',
        width: 'auto'
    },
    appName: {
        fontSize: '1.2em',
        fontWeight: 600,
        color: TELETON_WHITE,
        textTransform: 'uppercase',
    },
    
    // --- Estilos de Enlaces de Navegación (Desktop) ---
    navLinksDesktop: {
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
    },
    navLink: {
        color: TELETON_WHITE,
        fontSize: '0.95rem',
        fontWeight: 500,
        textDecoration: 'none',
        padding: '5px 0',
        transition: 'color 0.2s',
    },
    // El hover se maneja con la clase CSS externa o mediante lógica JS si fuera necesario, 
    // pero confiaremos en que el CSS global maneje los efectos básicos de <a> y <button>
    
    // --- Estilos del Botón de Salir (Derecha) ---
    logoutButton: {
        backgroundColor: TELETON_RED,
        color: TELETON_WHITE,
        padding: '8px 15px',
        borderRadius: '5px',
        border: 'none',
        fontWeight: 700,
        cursor: 'pointer',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.2s',
    },
    
    // --- Menú Hamburguesa (Mobile) ---
    hamburgerIcon: {
        display: 'none', // Oculto por defecto en desktop
        cursor: 'pointer',
        color: TELETON_WHITE,
        zIndex: 1001,
    },
    mobileMenu: {
        position: 'fixed',
        top: '60px', // Debajo del header
        right: '0',
        width: '250px',
        height: 'calc(100vh - 60px)',
        backgroundColor: PRIMARY_BLUE_DARK,
        boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-out',
        transform: 'translateX(100%)', // Oculto por defecto
    },
    mobileMenuOpen: {
        transform: 'translateX(0)',
    },
    mobileLink: {
        color: TELETON_WHITE,
        padding: '12px 30px',
        textDecoration: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'background-color 0.2s',
    },
    mobileLinkHover: { // Clase que debería ser manejada en index.css o de forma programática si fuera necesario
        backgroundColor: TELETON_RED,
    }
};


// ===================================================
// 2. COMPONENTE PRINCIPAL
// ===================================================

const NavBar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú hamburguesa

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };
    
    // Función para manejar el clic en el ícono de hamburguesa
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    // Lista de enlaces de navegación
    const navItems = [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/registro", label: "Registro" },
        { path: "/buscador", label: "Buscador Avanzado" },
        // Enlace a la ficha de ejemplo para demostración
        { path: `/voluntario/${EXAMPLE_VOLUNTEER_ID}`, label: "Ficha Voluntario" }, 
    ];


    // --- MEDIA QUERY SIMULADA: En React debemos usar `window.innerWidth` o CSS Modules/Global CSS
    // Para simplificar, confiaremos en que el CSS global manejará el cambio a mobile, 
    // pero forzaremos la lógica del menú aquí.
    
    const navLinksStyle = isMenuOpen 
        ? { ...styles.mobileMenu, ...styles.mobileMenuOpen } 
        : styles.mobileMenu;

    // --- RENDERIZADO SI NO ESTÁ LOGUEADO (Solo Logo) ---
    if (!isLoggedIn) {
        return (
            <div style={styles.header}>
                <div style={styles.leftSection}>
                    <div style={styles.logoWrapper}>
                        <img src={LOGO_URL} alt="Logo Teletón" style={styles.logo} /> 
                    </div>
                    <span style={styles.appName}>CRM VOLUNTARIOS</span>
                </div>
                <span style={{color: TELETON_WHITE, fontSize: '0.95rem'}}>Iniciar Sesión</span>
            </div>
        );
    }

    // --- RENDERIZADO NORMAL (Logueado - Desktop/Mobile) ---
    return (
        <>
            {/* Espaciador para el contenido bajo la barra fija */}
            <div style={{ height: '60px' }}></div> 

            <nav style={styles.header}>
                {/* IZQUIERDA: Logo y Título */}
                <div style={styles.leftSection}>
                    <div style={styles.logoWrapper}>
                        <img src={LOGO_URL} alt="Logo Teletón" style={styles.logo} /> 
                    </div>
                    {/* Quitamos el span del nombre de la app para imitar el diseño de DreamHost más fielmente */}
                    {/* <span style={styles.appName}>CRM</span> */}
                </div>
                
                {/* CENTRO: Enlaces de Navegación (Solo Desktop) */}
                <div className="desktop-nav-links" style={styles.navLinksDesktop}>
                    {navItems.map((item, index) => (
                        <Link key={index} to={item.path} style={styles.navLink} className="nav-link-hover">
                            {item.label}
                        </Link>
                    ))}
                </div>
                
                {/* DERECHA: Botón Salir */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <button onClick={handleLogout} style={styles.logoutButton}>
                        <LogOut size={16} /> Salir
                    </button>
                    
                    {/* Icono Hamburguesa (Solo Mobile) */}
                    <div onClick={toggleMenu} className="mobile-menu-icon" style={styles.hamburgerIcon}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </div>
                </div>
            </nav>
            
            {/* Menú Lateral (Mobile) */}
            <div style={navLinksStyle}>
                {navItems.map((item, index) => (
                    <Link key={index} to={item.path} style={styles.mobileLink} className="mobile-link-hover" onClick={() => setIsMenuOpen(false)}>
                        {item.label}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default NavBar;