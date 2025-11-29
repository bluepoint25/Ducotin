// src/components/voluntario.jsx (AJUSTE PARA COMPATIBILIDAD CON REDIRECCIÓN Y ESTILOS INLINE)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Heart, Phone, Mail, MapPin, Briefcase, Calendar, Download } from 'lucide-react';

// ===================================================
// 1. CONSTANTES DE COLOR
// ===================================================

const COLORS = {
    TELECTON_RED: '#DC2626',
    TELECTON_RED_DARK: '#B91C1C',
    BG_COLOR: '#F3F4F6',
    TEXT_MAIN: '#1F2937',
    TEXT_LIGHT: '#6B7280',
    WHITE: '#ffffff',
    CARD_BORDER: '#E5E7EB',
    SUCCESS_TEXT: '#166534',
    SUCCESS_BG: '#DCFCE7',
    DANGER_TEXT: '#DC2626',
    MOTIVATION_TEXT: '#9D174D',
    PASSPORT_HEADER_BG: '#EE3123', // Rojo sólido como el Dashboard
    ACTION_BLUE: '#263259', // Azul oscuro para el botón
    AVAIL_TEXT: '#065F46',
    AVAIL_BG: '#ECFDF5',
    UNAVAIL_TEXT: '#9CA3AF',
    UNAVAIL_BG: '#F3F4F6',
};

// ===================================================
// 2. DATA SIMULADA BASE (Estructura base para mapeo de datos)
// ===================================================

const dataVoluntariosSimuladaBase = [
    // Usamos el ejemplo de María González como estructura base
    {
        id: 'V001', rut: '19.456.789-0', nombres: 'María González Pérez', email: 'maria.gonzalez@email.com', 
        telefono: '+52 555 1234 5678', telefonoEmergencia: '+52 555 8765 4321', 
        direccion: 'Av. Reforma 123, Col. Juárez, CP 06600', ciudad: 'Ciudad de México',
        region: 'Región Metropolitana', edad: 28, fechaNacimiento: '14 de Mayo de 1996',
        tipoVoluntario: 'Voluntario de Campaña', areaAsignada: 'Recaudación de Fondos',
        habilidades: ['Comunicación', 'Trabajo en equipo', 'Organización de eventos', 'Redes sociales'],
        motivacion: 'Quiero contribuir a mejorar la calidad de vida de los niños y niñas y sus familias, ayudando en la causa de Teletón.',
        horarioPreferido: '16:00 - 20:00 hrs',
        diasDisponibles: ['Lunes', 'Miércoles', 'Viernes'], tallaCamisa: 'M',
        tipoSangre: 'O+', alergias: 'Ninguna', antiguedad: 3, estado: 'Activo'
    },
];

// ===================================================
// 3. FUNCIÓN DE EXPORTACIÓN (Simulada)
// ===================================================

function exportarPasaporteDigital(dataVoluntario) {
    const nombreArchivo = `Pasaporte_Teleton_${dataVoluntario.nombres.replace(/ /g, '_')}.png`;
    console.log(`\n✅ SIMULANDO EXPORTACIÓN DE PASAPORTE DIGITAL: ${nombreArchivo}`);
    alert(`Pasaporte Digital de ${dataVoluntario.nombres} exportado como PNG.`);
}


// ---------------------------------------------------
// 4. COMPONENTE PASAPORTE DIGITAL (Utiliza estilos inline)
// ---------------------------------------------------

function PasaporteDigital({ voluntario, onExportar }) {
    const iniciales = voluntario.nombres.split(' ').map(n => n[0]).join('').toUpperCase();
    
    return (
        <div style={styles.pasaporteContainer}>
            <div style={styles.pasaporteHeader}>
                PASAPORTE TELETÓN
            </div>
            
            <div style={styles.pasaporteData}>
                
                <div style={styles.pasaporteAvatar}>
                    {iniciales}
                </div>
                
                <div style={styles.pasaporteItem}>
                    <p style={styles.pasaporteLabel}>NOMBRE</p>
                    <p style={styles.pasaporteValue}>{voluntario.nombres}</p>
                </div>
                
                <div style={styles.pasaporteItem}>
                    <p style={styles.pasaporteLabel}>REGIÓN</p>
                    <p style={styles.pasaporteValue}>{voluntario.region}</p>
                </div>

                <div style={styles.pasaporteItem}>
                    <p style={styles.pasaporteLabel}>TIPO DE VOLUNTARIO</p>
                    <p style={styles.pasaporteValue}>{voluntario.tipoVoluntario}</p>
                </div>

                <div style={styles.pasaporteItem}>
                    <p style={styles.pasaporteLabel}>HABILIDADES</p>
                    <ul style={styles.pasaporteHabilidades}>
                        {voluntario.habilidades.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button 
                        onClick={() => onExportar(voluntario)} 
                        style={styles.exportButton} 
                    >
                        <Download size={18} /> Exportar Pasaporte
                    </button>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------
// 5. COMPONENTE FICHA DE DETALLE (Utiliza estilos inline)
// ---------------------------------------------------

function FichaDetalleVoluntario({ voluntario, onExportar }) {
    
    const iniciales = voluntario.nombres.split(' ').map(n => n[0]).join('').toUpperCase();
    
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const handleEdit = () => {
        alert("Simulación: Abriendo formulario de edición para actualizar datos. (Funcionalidad de edición avanzada no implementada en MVP)");
    };

    return (
        <div style={styles.fichaContainer}>
            
            {/* ENCABEZADO: Nombre, ID, Estado */}
            <div style={styles.fichaHeaderRow}>
                <div style={styles.nameAndStatus}>
                    <div style={styles.avatarLarge}>{iniciales}</div>
                    <div style={styles.fichaDetails}>
                        <h1 style={styles.fichaTitleName}>
                           {voluntario.nombres}
                        </h1>
                        <p style={styles.rutDetail}>VOL-{voluntario.id} | {voluntario.areaAsignada}</p>
                    </div>
                    {/* Antiguedad y Estado */}
                    <div style={styles.antiguedadStatusContainer}>
                        <div style={styles.antiguedadItem}>
                            <p style={styles.antiguedadValue}>{voluntario.antiguedad}</p>
                            <p style={styles.antiguedadLabel}>Años</p>
                        </div>
                         <div style={styles.antiguedadItem}>
                            <p style={styles.antiguedadValue}>3</p> {/* Valor simulado */}
                            <p style={styles.antiguedadLabel}>Teletones</p>
                        </div>
                        <span style={styles.statusPillActive}>
                            {voluntario.estado}
                        </span>
                    </div>
                </div>
                <div>
                     <button onClick={handleEdit} style={styles.editButton}>
                        ✏️ Editar Ficha
                    </button>
                </div>
            </div>
            
            {/* GRID PRINCIPAL: Datos vs Pasaporte */}
            <div style={styles.fichaGridLayout}>

                {/* COLUMNA IZQUIERDA: Tarjetas de Datos */}
                <div>
                    {/* TARJETA 1: Información Personal y Clínica */}
                    <div style={styles.dataCard}>
                        <div style={styles.cardTitleRow}>
                            <User size={20} color={COLORS.TELECTON_RED_DARK}/>
                            <h3 style={styles.cardTitle}>Información Personal</h3>
                        </div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Edad</span>
                                <span style={styles.infoValue}>{voluntario.edad} años</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Tipo de Sangre</span>
                                <span style={styles.infoValue}>{voluntario.tipoSangre}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Fecha de Nacimiento</span>
                                <span style={styles.infoValue}>{voluntario.fechaNacimiento}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Talla de Camisa</span>
                                <span style={styles.infoValue}>{voluntario.tallaCamisa}</span>
                            </div>
                             <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Alergias</span>
                                <span style={styles.infoValue}>{voluntario.alergias}</span>
                            </div>
                             <div style={{...styles.infoItem, gridColumn: 'span 2'}}>
                                <span style={styles.infoLabel}>Dirección</span>
                                <span style={styles.infoValue}><MapPin size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>{voluntario.direccion}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Ciudad</span>
                                <span style={styles.infoValue}>{voluntario.ciudad}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* TARJETA 2: Contacto y Emergencia */}
                    <div style={styles.dataCard}>
                        <div style={styles.cardTitleRow}>
                            <Phone size={20} color={COLORS.TELECTON_RED_DARK}/>
                            <h3 style={styles.cardTitle}>Contacto</h3>
                        </div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Email</span>
                                <span style={styles.infoValue}><Mail size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>{voluntario.email}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Teléfono Móvil</span>
                                <span style={styles.infoValue}><Phone size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>{voluntario.telefono}</span>
                            </div>
                             <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Teléfono de Emergencia</span>
                                <span style={{...styles.infoValue, color: COLORS.DANGER_TEXT}}>{voluntario.telefonoEmergencia}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* TARJETA 3: Habilidades y Motivación */}
                     <div style={styles.dataCard}>
                        <div style={styles.cardTitleRow}>
                            <Heart size={20} color={COLORS.TELECTON_RED_DARK}/>
                            <h3 style={styles.cardTitle}>Habilidades y Motivación</h3>
                        </div>
                        <div style={{...styles.infoItem, marginBottom: '15px'}}>
                            <span style={styles.infoLabel}>Habilidades Declaradas</span>
                            <div>
                                {voluntario.habilidades.map((skill, index) => (
                                    <span key={index} style={styles.skillBadge}>{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Motivación</span>
                            <span style={styles.infoValueMotivo}>
                                "{voluntario.motivacion}"
                            </span>
                        </div>
                    </div>
                    
                    {/* TARJETA 4: Área de Trabajo y Disponibilidad */}
                    <div style={styles.dataCard}>
                        <div style={styles.cardTitleRow}>
                            <Briefcase size={20} color={COLORS.TELECTON_RED_DARK}/>
                            <h3 style={styles.cardTitle}>Área de Trabajo</h3>
                        </div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Área Asignada</span>
                                <span style={styles.infoValue}>{voluntario.areaAsignada}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Horario Preferido</span>
                                <span style={styles.infoValue}><Calendar size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>{voluntario.horarioPreferido}</span>
                            </div>
                            <div style={{...styles.infoItem, gridColumn: 'span 2'}}>
                                <span style={styles.infoLabel}>Días Disponibles</span>
                                <div>
                                    {diasSemana.map(day => (
                                        <span 
                                            key={day} 
                                            style={voluntario.diasDisponibles.includes(day.substring(0,3) || day) ? styles.dayAvailable : styles.dayUnavailable}
                                        >
                                            {day.substring(0, 3)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* COLUMNA DERECHA: Pasaporte Digital */}
                <div>
                    <PasaporteDigital voluntario={voluntario} onExportar={onExportar} />
                </div>
            </div>
        </div>
    );
}


// ---------------------------------------------------
// 6. COMPONENTE PRINCIPAL 'ComponenteVoluntarios'
// ---------------------------------------------------

export default function ComponenteVoluntarios({ mockVoluntarios }) {
    const { id } = useParams(); // Obtener el ID de la URL
    
    // Buscar el voluntario en la lista de mockVoluntarios (incluye los recién registrados)
    let voluntarioData = mockVoluntarios.find(v => v.id === id); 

    // Si no se encuentra, usar una estructura por defecto (ej. el primer elemento o un mensaje de error)
    if (!voluntarioData) {
        // En un caso real esto sería un error 404. Aquí, usamos la base de María González (V001) como fallback.
        voluntarioData = mockVoluntarios.find(v => v.id === 'V001') || dataVoluntariosSimuladaBase[0]; 
    } 

    // Mapear los datos guardados simplificados a la estructura rica del componente de vista
    const voluntarioFinal = {
        ...dataVoluntariosSimuladaBase[0], // Usamos la estructura base para rellenar campos no registrados
        ...voluntarioData, // Sobrescribimos con los datos reales guardados
        id: voluntarioData.id,
        // El campo 'nombre' del registro es el nombre completo
        nombres: voluntarioData.nombre || voluntarioData.nombres, 
        rut: voluntarioData.rut,
        email: voluntarioData.email,
        region: voluntarioData.region,
        edad: voluntarioData.edad,
        areaAsignada: voluntarioData.habilidad || 'General',
        antiguedad: voluntarioData.antiguedad || 0,
        estado: voluntarioData.estado || 'Pendiente'
    };

    // Para evitar errores si el objeto final sigue siendo inválido, mostramos un fallback
    if (!voluntarioFinal || !voluntarioFinal.nombres) {
         return <div style={{textAlign: 'center', marginTop: '100px'}}>Cargando o Voluntario no encontrado...</div>;
    }
    
    return (
        <div id="caja-voluntarios-crm" style={{backgroundColor: COLORS.BG_COLOR, minHeight: '100vh', padding: '1px 0'}}>
            <FichaDetalleVoluntario 
                voluntario={voluntarioFinal} 
                onExportar={exportarPasaporteDigital}
            />
        </div>
    );
}


// ===================================================
// 7. ESTILOS INLINE COMPLETOS
// ===================================================

const styles = {
    // --- Layout General ---
    fichaContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 20px 40px 20px',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    fichaGridLayout: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Hace la grilla principal responsiva
        gap: '30px',
    },
    
    // --- Header Ficha (Nombre, Estado, Botones) ---
    fichaHeaderRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        padding: '15px 0',
        borderBottom: `2px solid ${COLORS.CARD_BORDER}`,
    },
    nameAndStatus: {
        display: 'flex',
        alignItems: 'center',
    },
    avatarLarge: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: COLORS.TELECTON_RED,
        color: COLORS.WHITE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8em',
        fontWeight: 'bold',
        marginRight: '15px',
    },
    fichaDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
    fichaTitleName: {
        fontSize: '2.5em',
        fontWeight: 800,
        color: COLORS.TEXT_MAIN,
        margin: '0',
        lineHeight: '1.2',
    },
    rutDetail: {
        fontSize: '0.85em',
        color: COLORS.TEXT_LIGHT,
        margin: '0',
    },
    antiguedadStatusContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px',
        gap: '20px',
        padding: '0 10px',
    },
    antiguedadItem: {
        textAlign: 'center',
        lineHeight: 1,
    },
    antiguedadValue: {
        fontSize: '1.5em',
        fontWeight: 700,
        color: COLORS.TELECTON_RED,
        margin: '0',
    },
    antiguedadLabel: {
        fontSize: '0.7em',
        color: COLORS.TEXT_LIGHT,
        margin: '0',
    },
    statusPillActive: {
        fontSize: '0.8em',
        padding: '5px 10px',
        borderRadius: '15px',
        fontWeight: '600',
        marginLeft: '10px',
        alignSelf: 'center',
        backgroundColor: COLORS.SUCCESS_BG, 
        color: COLORS.SUCCESS_TEXT, 
    },
    editButton: {
        backgroundColor: COLORS.ACTION_BLUE, 
        color: COLORS.WHITE,
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s',
    },

    // --- Tarjeta Base (Card) ---
    dataCard: {
        backgroundColor: COLORS.WHITE,
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${COLORS.CARD_BORDER}`,
        marginBottom: '20px',
        height: 'fit-content',
    },
    cardTitleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: COLORS.TELECTON_RED_DARK,
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${COLORS.CARD_BORDER}`,
    },
    cardTitle: {
        margin: '0',
        fontSize: '1.2em',
        fontWeight: '700',
    },

    // --- Grid Interno de Datos ---
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px 25px',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    infoLabel: {
        fontSize: '0.85em',
        color: COLORS.TEXT_LIGHT,
        fontWeight: '500',
        textTransform: 'uppercase',
        marginBottom: '4px',
    },
    infoValue: {
        fontSize: '1em',
        color: COLORS.TEXT_MAIN,
        fontWeight: '600',
    },
    infoValueMotivo: {
        fontStyle: 'italic',
        color: COLORS.MOTIVATION_TEXT,
        fontSize: '1em',
        marginTop: '5px',
    },

    // --- Badges de Habilidades y Días ---
    skillBadge: {
        backgroundColor: '#FEE2E2',
        color: COLORS.TELECTON_RED_DARK,
        padding: '5px 12px',
        borderRadius: '15px',
        fontSize: '0.85em',
        fontWeight: '600',
        display: 'inline-block',
        marginRight: '8px',
        marginBottom: '8px',
    },
    dayAvailable: {
        backgroundColor: COLORS.AVAIL_BG,
        color: COLORS.AVAIL_TEXT,
        padding: '3px 10px',
        borderRadius: '6px',
        fontSize: '0.8em',
        fontWeight: '500',
        marginRight: '5px',
        display: 'inline-block',
    },
    dayUnavailable: {
        backgroundColor: COLORS.UNAVAIL_BG,
        color: COLORS.UNAVAIL_TEXT,
        padding: '3px 10px',
        borderRadius: '6px',
        fontSize: '0.8em',
        marginRight: '5px',
        textDecoration: 'line-through',
        display: 'inline-block',
    },
    
    // --- Pasaporte (Columna Derecha) ---
    pasaporteContainer: {
        backgroundColor: COLORS.WHITE,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${COLORS.CARD_BORDER}`,
    },
    pasaporteHeader: {
        backgroundColor: COLORS.PASSPORT_HEADER_BG,
        color: COLORS.WHITE,
        textAlign: 'center',
        padding: '15px',
        fontSize: '1.2em',
        fontWeight: '700',
    },
    pasaporteData: {
        padding: '20px 30px',
    },
    pasaporteAvatar: {
        width: '100px',
        height: '100px',
        backgroundColor: COLORS.TELECTON_RED,
        color: COLORS.WHITE,
        fontSize: '2.5em',
        fontWeight: '800',
        borderRadius: '8px',
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    pasaporteItem: {
        marginBottom: '15px',
    },
    pasaporteLabel: {
        fontSize: '0.9em',
        color: COLORS.TEXT_LIGHT,
        marginBottom: '3px',
        margin: '0',
    },
    pasaporteValue: {
        fontSize: '1.1em',
        fontWeight: '700',
        color: COLORS.TEXT_MAIN,
        borderBottom: `2px solid ${COLORS.TELECTON_RED}`,
        paddingBottom: '5px',
        textTransform: 'uppercase',
        margin: '0',
    },
    pasaporteHabilidades: {
        listStyle: 'disc',
        paddingLeft: '20px',
        marginTop: '10px',
        fontWeight: '500',
        color: COLORS.TEXT_MAIN,
        margin: '10px 0 0 0',
    },
    exportButton: {
        backgroundColor: COLORS.ACTION_BLUE, 
        color: COLORS.WHITE,
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.9rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.2s',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        width: '100%',
        justifyContent: 'center',
    }
};