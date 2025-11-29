// src/components/Footer.jsx
import React from 'react';

const LOGO_URL = 'https://evento.teleton.cl/assets/logo-BIA0jwll.webp';

const TELETON_WHITE = '#FFFFFF';
const TELETON_DARK_TEXT = '#333333';

const Footer = () => {
    
    const footerBarStyle = {
        backgroundColor: TELETON_WHITE, 
        color: TELETON_DARK_TEXT,
        padding: '10px 20px',
        textAlign: 'center',
        fontSize: '0.8em',
        borderTop: '1px solid #ddd',
        width: '100%',
        boxSizing: 'border-box',
        // Estilo fijo en la parte inferior de la ventana, sobre la barra de scroll.
        position: 'fixed', 
        bottom: 0, 
        left: 0,
        zIndex: 9999, // Asegura que esté sobre otros contenidos
    };
    
    // La clase 'logo-corner' de index.css se usa para el logo flotante.
    return (
        <>
            {/* Logo Fijo (Usa estilo de index.css) */}
            <div className="logo-corner" title="Fundación Teletón">
                <img src={LOGO_URL} alt="Logo Teletón" style={{ width: '100%', height: 'auto' }} />
            </div>

            {/* Barra de Copyright */}
            <div style={footerBarStyle}>
                © 2025 Botathon Duoc UC & Fundación Teletón. Desarrollado con Blue Prism RPA.
            </div>
        </>
    );
};

export default Footer;