import React, { useState, useEffect } from 'react';

// Colores Teletón (Mismos que en tu Dashboard para consistencia)
const COLORS = {
    RED: '#EE3123',
    TEXT_MAIN: '#1F2937',
    TEXT_LIGHT: '#6B7280',
    BG_CARD: '#FEE2E2', // Fondo rojizo claro
};

const Calendario = ({ etiqueta, diasExtra = 0 }) => {
    const [fecha, setFecha] = useState(new Date());

    useEffect(() => {
        // Obtenemos la fecha de hoy
        const hoy = new Date();
        
        // Si diasExtra es mayor a 0, sumamos días (ej: para mostrar "mañana")
        if (diasExtra > 0) {
            hoy.setDate(hoy.getDate() + diasExtra);
        }
        
        setFecha(hoy);
    }, [diasExtra]);

    // Formateo de datos
    const anio = fecha.getFullYear();
    // Obtener mes en español (ej: "Noviembre")
    const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
    const mesCapitalizado = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    const diaNumero = fecha.getDate();

    // Estilos internos
    const styles = {
        card: {
            backgroundColor: COLORS.BG_CARD,
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
            border: `1px solid ${COLORS.RED}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',     // Ocupar toda la altura disponible del padre
            minHeight: '100px', // Altura mínima base
            boxSizing: 'border-box'
        },
        yearMonth: {
            fontSize: '0.8rem', 
            color: COLORS.RED, 
            fontWeight: 'bold',
            textTransform: 'capitalize',
            lineHeight: '1.2'
        },
        day: {
            fontSize: '2.5rem',
            fontWeight: '800',
            color: COLORS.TEXT_MAIN,
            lineHeight: '1',
            margin: '5px 0'
        },
        label: {
            fontSize: '0.75rem', 
            color: COLORS.TEXT_LIGHT,
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.yearMonth}>
                {anio} {mesCapitalizado}
            </div>
            <div style={styles.day}>
                {diaNumero}
            </div>
            <div style={styles.label}>
                {etiqueta}
            </div>
        </div>
    );
};

export default Calendario;