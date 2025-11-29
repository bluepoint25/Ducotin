// src/components/Login.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importamos Link

// URL del Logo de la Botathon
const LOGO_URL = 'https://evento.teleton.cl/assets/logo-BIA0jwll.webp';

// URL de la Imagen de Fondo Solicitada
const LOGIN_BACKGROUND_IMAGE = 'https://www.teleton.cl/wp-content/uploads/2021/12/CSQ_2021_11_16_0031-scaled.jpg.webp';

// Paleta de Colores
const TELETON_RED = '#EE3123';        
const PRIMARY_BLUE_DARK = '#263259';  
const TELETON_WHITE = '#FFFFFF';      
const TELETON_DARK_TEXT = '#333333';  
const TELETON_LIGHT_GREY = '#F8F8F8'; 
const TELETON_DARK_BG = 'rgba(255, 255, 255, 0.95)'; 

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (onLoginSuccess) {
            onLoginSuccess();
            navigate('/dashboard'); 
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${LOGIN_BACKGROUND_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        },
        loginBox: {
            backgroundColor: TELETON_DARK_BG,
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            width: '380px',
            textAlign: 'center',
        },
        logoImage: {
            height: '60px',
            marginBottom: '20px',
        },
        title: {
            color: PRIMARY_BLUE_DARK,
            marginBottom: '30px',
            fontSize: '2em',
            fontWeight: 700,
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            margin: '10px 0',
            border: `1px solid ${TELETON_LIGHT_GREY}`,
            borderRadius: '5px',
            boxSizing: 'border-box',
            fontSize: '1em',
            backgroundColor: TELETON_WHITE,
        },
        button: {
            width: '100%',
            backgroundColor: TELETON_RED,
            color: TELETON_WHITE,
            padding: '15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1em',
            fontWeight: 'bold',
            marginTop: '20px',
            transition: 'background-color 0.3s ease',
        },
        link: {
            color: PRIMARY_BLUE_DARK,
            fontSize: '0.9em',
            marginTop: '15px',
            display: 'block',
            textDecoration: 'none',
            fontWeight: '500',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                
                <img src={LOGO_URL} alt="Logo Teletón" style={styles.logoImage} />
                
                <h2 style={styles.title}>Acceso CRM Voluntarios</h2>

                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Usuario (RUT o Email)" 
                        style={styles.input} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        style={styles.input} 
                        required
                    />
                    
                    <button type="submit" style={styles.button}>
                        Ingresar al Dashboard
                    </button>
                </form>

                {/* Enlace funcional usando Link de React Router */}
                <Link to="/recuperar" style={styles.link}>
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>
        </div>
    );
};

export default Login;