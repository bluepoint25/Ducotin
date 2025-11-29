import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

// URL del Logo (Mismo que en Login)
const LOGO_URL = 'https://evento.teleton.cl/assets/logo-BIA0jwll.webp';
const LOGIN_BACKGROUND_IMAGE = 'https://www.teleton.cl/wp-content/uploads/2021/12/CSQ_2021_11_16_0031-scaled.jpg.webp';

// Colores
const TELETON_RED = '#EE3123';
const PRIMARY_BLUE_DARK = '#263259';
const TELETON_WHITE = '#FFFFFF';
const TELETON_LIGHT_GREY = '#F8F8F8';
const TELETON_DARK_BG = 'rgba(255, 255, 255, 0.95)';

const RecuperarPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de envío de correo
        if (email) {
            // Aquí iría la lógica real de backend (Firebase, API, etc.)
            setTimeout(() => {
                setEnviado(true);
            }, 1000);
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
        box: {
            backgroundColor: TELETON_DARK_BG,
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            width: '400px',
            textAlign: 'center',
            position: 'relative'
        },
        logoImage: { height: '50px', marginBottom: '20px' },
        title: { color: PRIMARY_BLUE_DARK, marginBottom: '10px', fontSize: '1.5em', fontWeight: 700 },
        text: { color: '#4B5563', marginBottom: '25px', fontSize: '0.95em', lineHeight: '1.5' },
        inputGroup: { marginBottom: '20px', textAlign: 'left' },
        label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '0.9rem' },
        input: {
            width: '100%',
            padding: '12px 15px',
            borderRadius: '5px',
            boxSizing: 'border-box',
            fontSize: '1em',
            backgroundColor: TELETON_WHITE,
            outline: 'none',
            border: '1px solid #D1D5DB'
        },
        button: {
            width: '100%',
            backgroundColor: TELETON_RED,
            color: TELETON_WHITE,
            padding: '12px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
        },
        backLink: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            marginTop: '20px',
            color: PRIMARY_BLUE_DARK,
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer'
        },
        successBox: {
            padding: '20px',
            backgroundColor: '#ECFDF5',
            borderRadius: '8px',
            color: '#065F46',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <img src={LOGO_URL} alt="Logo Teletón" style={styles.logoImage} />
                
                {!enviado ? (
                    <>
                        <h2 style={styles.title}>¿Olvidaste tu contraseña?</h2>
                        <p style={styles.text}>
                            No te preocupes. Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecerla.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    placeholder="ejemplo@teleton.cl" 
                                    style={styles.input} 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <button type="submit" style={styles.button}>
                                <Mail size={18} /> Enviar Instrucciones
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="fade-in">
                        <div style={styles.successBox}>
                            <CheckCircle size={48} color="#10B981" />
                            <h3 style={{margin:0, fontSize:'1.2em'}}>¡Correo Enviado!</h3>
                            <p style={{margin:0, fontSize:'0.9em', textAlign:'center'}}>
                                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Revisa tu bandeja de entrada.
                            </p>
                        </div>
                        <button onClick={() => navigate('/login')} style={{...styles.button, backgroundColor: PRIMARY_BLUE_DARK}}>
                            Volver al Inicio de Sesión
                        </button>
                    </div>
                )}

                {!enviado && (
                    <Link to="/login" style={styles.backLink}>
                        <ArrowLeft size={16} /> Volver al Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default RecuperarPassword;