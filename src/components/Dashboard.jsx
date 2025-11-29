import React from 'react';

// URL del Logo de la Botathon (Teletón)
const LOGO_URL = 'https://evento.teleton.cl/assets/logo-BIA0jwll.webp';

// Paleta de Colores
const TELETON_RED = '#EE3123';        // Rojo sólido para el HEADER
const PRIMARY_BLUE_DARK = '#263259';  // Fondo dominante para las cards
const TELETON_WHITE = '#FFFFFF';      // Fondo del logo y página
const TELETON_DARK_TEXT = '#333333';  // Texto secundario
const TELETON_LIGHT_GREY = '#F8F8F8'; // Fondo general de la página/cards

const Dashboard = () => {
    
    // --- Datos de Ejemplo (Métricas RF-05) ---
    const totalVoluntarios = "47 545,0"; 
    
    // --- Definición de Estilos (Inline) ---
    const styles = {
        container: {
            backgroundColor: TELETON_WHITE,
            minHeight: '100vh',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        },
        // --- HEADER: Fondo Rojo Sólido (Se mantiene) ---
        header: {
            backgroundColor: TELETON_RED,
            color: TELETON_WHITE,
            padding: '10px 30px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: '65px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        headerContent: {
            display: 'flex',
            alignItems: 'center',
            maxWidth: '1200px',
            width: '100%',
        },
        logoWrapper: {
            backgroundColor: TELETON_WHITE, 
            padding: '5px',
            borderRadius: '5px',
            marginRight: '15px',
            display: 'flex',
            alignItems: 'center',
            height: '45px',
        },
        logo: {
            height: '45px',
        },
        appName: {
            fontSize: '1.8em',
            fontWeight: 700,
            color: TELETON_WHITE,
            marginLeft: '15px',
        },
        // --- FOOTER FIJO (NUEVO) ---
        fixedFooterLogo: {
            position: 'fixed', // Clave para que se mueva con la página
            bottom: '20px',
            left: '20px',
            zIndex: 1000, // Asegura que esté sobre otros elementos
        },
        fixedLogoImage: {
            height: '45px', // Mismo tamaño que el header
            backgroundColor: TELETON_WHITE, // Fondo blanco para el contorno
            padding: '5px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Sombra para que destaque
        },
        // --- Resto de Estilos (mantenidos) ---
        mainWrapper: {
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: TELETON_WHITE,
            minHeight: 'calc(100vh - 85px)', // Asegura espacio para el header
        },

        metricTotalCard: {
            backgroundColor: PRIMARY_BLUE_DARK,
            color: TELETON_WHITE,
            borderRadius: '10px',
            padding: '30px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            minHeight: '350px', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        metricTitle: {
            fontSize: '1.1em',
            fontWeight: 500,
            color: TELETON_WHITE,
            marginBottom: '10px',
        },
        metricValue: {
            fontSize: '3.5em',
            fontWeight: 700,
            color: TELETON_WHITE,
        },
        metricButton: {
            backgroundColor: TELETON_RED,
            color: TELETON_WHITE,
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginRight: '10px',
        },
        mapCard: {
            backgroundColor: TELETON_WHITE,
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            minHeight: '350px',
        },
        mapTitle: {
            color: TELETON_DARK_TEXT,
            fontSize: '1.4em',
            marginBottom: '10px',
        },
        chartCard: {
            backgroundColor: TELETON_WHITE,
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
        },
        chartTitle: {
            color: TELETON_DARK_TEXT,
            fontSize: '1.4em',
            marginBottom: '10px',
        },
        placeholderButton: {
             backgroundColor: TELETON_RED, 
             color: TELETON_WHITE, 
             padding: '12px 30px', 
             border: 'none', 
             borderRadius: '5px', 
             fontWeight: 'bold', 
             cursor: 'pointer', 
             fontSize: '1.1em' 
        }
    };
    
    // ... Componentes de Placeholders (omitidos por brevedad) ...

    return (
        <div style={styles.container}>
            {/* HEADER: Rojo Sólido */}
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.logoWrapper}>
                        <img src={LOGO_URL} alt="Logo Botathon" style={styles.logo} /> 
                    </div>
                    <span style={styles.appName}>CRM Voluntarios Teletón - Gestión 360°</span>
                </div>
            </header>
            
            <main style={styles.mainWrapper}>
                
                {/* 1. Métrica Total Histórica (RF-05) */}
                <section style={styles.topContainer}>
                    <div style={styles.metricTotalCard}>
                        <div>
                            <p style={styles.metricTitle}>Total Historical Volunteers</p>
                            <h2 style={styles.metricValue}>{totalVoluntarios}</h2>
                        </div>

                    </div>

                    {/* 2. Distribución Geográfica (Mapa de Calor) (RF-05) */}
                    <div style={styles.mapCard}>
                        <h3 style={styles.mapTitle}>Geographic Distribution</h3>
                        <div style={{ height: '300px', backgroundColor: TELETON_LIGHT_GREY, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>
                            <span>Aquí se integrará el Mapa de Calor de Chile (RF-05)</span>
                        </div>
                    </div>
                </section>

                {/* 3. Participación a lo largo del tiempo (RF-05) */}
                <div style={styles.chartCard}>
                    <h3 style={styles.chartTitle}>Volunteer Participation Over Time</h3>
                    <div style={{ height: '250px', backgroundColor: TELETON_LIGHT_GREY, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>
                        <span>Aquí se integrará el Gráfico de Línea (RF-05)</span>
                    </div>
                </div>

                {/* 4. Enlace al Buscador (RF-06) */}
                <section style={{ padding: '20px', backgroundColor: TELETON_LIGHT_GREY, borderRadius: '8px', border: `1px solid ${TELETON_LIGHT_GREY}`, marginTop: '20px' }}>
                    <p style={{ textAlign: 'center', color: TELETON_DARK_TEXT, fontWeight: 'bold' }}>
                        Acceso a la herramienta de Búsqueda Avanzada y Segmentación de Voluntarios (RF-06/RF-07).
                    </p>
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                         <button style={styles.placeholderButton}>
                            Abrir Buscador Inteligente
                        </button>
                    </div>
                </section>
            </main>
            <section className="dashboard-top-grid">
                <div style={styles.metricTotalCard}>
                    <div>
                        <p style={styles.metricTitle}>Total Historical Volunteers</p>
                        <h2 style={styles.metricValue}>{totalVoluntarios}</h2>
                    </div>
                </div>

                {/* 2. Distribución Geográfica (Mapa de Calor) (RF-05) */}
                <div style={styles.mapCard}>
                    <h3 style={styles.mapTitle}>Geographic Distribution</h3>
                    <div style={{ height: '300px', backgroundColor: TELETON_LIGHT_GREY, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>
                        <span>Aquí se integrará el Mapa de Calor de Chile (RF-05)</span>
                    </div>
                </div>
            </section>
            {/* LOGO FIJO INFERIOR IZQUIERDO (NUEVO) */}
            <footer style={styles.fixedFooterLogo}>
                <img src={LOGO_URL} alt="Logo Fijo" style={styles.fixedLogoImage} />
            </footer>
        </div>
    );
};

export default Dashboard;