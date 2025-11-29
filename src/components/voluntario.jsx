// src/components/voluntario.jsx (VERSIÓN FINAL CON IMPRESIÓN Y MODAL)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Heart, Phone, Mail, MapPin, Briefcase, Calendar, Download, Save, X, Printer, Camera } from 'lucide-react'; 

// ===================================================
// 1. CONSTANTES DE COLOR Y URL DEL LOGO
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
    PASSPORT_HEADER_BG: '#EE3123', 
    ACTION_BLUE: '#263259', 
    AVAIL_TEXT: '#065F46',
    AVAIL_BG: '#ECFDF5',
    UNAVAIL_TEXT: '#9CA3AF',
    UNAVAIL_BG: '#F3F4F6',
    PASSPORT_TEXT_DARK: '#333333', 
    PASSPORT_LABEL_RED: '#DC2626', 
    PASSPORT_FIELD_BORDER: '#E5E7EB',
};

const TELETON_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Logo_Telet%C3%B3n_2025.svg';

// ===================================================
// 2. DATA SIMULADA BASE
// ===================================================

const dataVoluntariosSimuladaBase = [
    {
        id: 'V001', rut: '19.456.789-0', nombres: 'María González Pérez', email: 'maria.gonzalez@email.com', 
        telefono: '+52 555 1234 5678', telefonoEmergencia: '+52 555 8765 4321', 
        direccion: 'Av. Reforma 123, Col. Juárez, CP 06600', ciudad: 'Ciudad de México',
        region: 'Región Metropolitana', edad: 28, fechaNacimiento: '14 de Mayo de 1996',
        tipoVoluntario: 'Voluntario de Campaña', areaAsignada: 'Recaudación de Fondos',
        habilidades: ['Lenguaje de señas', 'Primeros auxilios', 'Animación y juegos'], 
        motivacion: 'Quiero contribuir a mejorar la calidad de vida de los niños y niñas y sus familias, ayudando en la causa de Teletón.',
        horarioPreferido: '16:00 - 20:00 hrs',
        diasDisponibles: ['Lunes', 'Miércoles', 'Viernes'], tallaCamisa: 'M',
        tipoSangre: 'O+', alergias: 'Ninguna', antiguedad: 3, estado: 'Activo'
    },
];

// ===================================================
// 3. NUEVO COMPONENTE: MODAL DE IMPRESIÓN
// ===================================================

const ModalImpresion = ({ isVisible, onClose, onConfirm }) => {
    if (!isVisible) return null;

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h3 style={styles.modalTitle}>Confirmar Impresión</h3>
                <p style={styles.modalText}>
                    ¿Deseas abrir la vista previa de impresión (PDF) para el Pasaporte Teletón?
                </p>
                <div style={styles.modalButtons}>
                    <button onClick={onClose} style={styles.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={onConfirm} style={styles.saveButton}>
                        <Printer size={16} style={{marginRight: '5px'}}/> Imprimir
                    </button>
                </div>
            </div>
        </div>
    );
};


// ---------------------------------------------------
// 4. COMPONENTE PASAPORTE DIGITAL (CON MODAL Y FOTO)
// ---------------------------------------------------

function PasaporteDigital({ voluntario }) {
    
    const [fotoURL, setFotoURL] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    
    const displayHabilidades = voluntario.habilidades ? 
        (Array.isArray(voluntario.habilidades) ? voluntario.habilidades : String(voluntario.habilidades).split(',').map(s => s.trim()))
        : [];
        
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoURL(reader.result);
                alert("Foto de perfil subida exitosamente (Simulado).");
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Función que dispara el diálogo de impresión del navegador
    const handlePrint = () => {
        setIsModalOpen(false); 
        
        // Esto le dice al navegador que inicie el diálogo de impresión.
        window.print();
    };

    return (
        <div style={styles.pasaporteContainer} id="pasaporte-imprimible">
            
            <ModalImpresion 
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handlePrint}
            />
            
            {/* ENCABEZADO CON LOGO MÁS GRANDE */}
            <div style={styles.pasaporteHeader}>
                <img src={TELETON_LOGO_URL} alt="Logo Teletón" style={styles.pasaporteHeaderLogo} />
                PASAPORTE TELETÓN
            </div>
            
            <div style={styles.pasaporteBody}> 
                
                <div style={styles.pasaporteGrid}>
                    {/* Sección de la Foto con Input de Archivo */}
                    <div style={styles.pasaportePhotoSection}>
                        <div style={{...styles.pasaportePhotoPlaceholder, backgroundImage: fotoURL ? `url(${fotoURL})` : 'none'}}>
                             {!fotoURL && "Foto del voluntario"}
                             
                            <input 
                                type="file" 
                                id={`photo-upload-${voluntario.id}`} 
                                accept="image/*" 
                                onChange={handleFileUpload} 
                                style={{ display: 'none' }} 
                            />
                            {/* Botón de subida visible */}
                            <label htmlFor={`photo-upload-${voluntario.id}`} style={styles.uploadPhotoButton}>
                                <Camera size={16} /> Subir Foto
                            </label>
                        </div>
                    </div>

                    {/* Sección de Datos Principales (Nombre / Región) */}
                    <div style={styles.pasaporteMainInfo}>
                        <div style={styles.pasaporteFieldBox}>
                            <p style={styles.pasaporteLabelRed}>NOMBRE</p>
                            <p style={styles.pasaporteValueClean}>{voluntario.nombres}</p>
                        </div>
                        
                        <div style={styles.pasaporteFieldBox}>
                            <p style={styles.pasaporteLabelRed}>REGIÓN</p>
                            <p style={styles.pasaporteValueClean}>{voluntario.region}</p>
                        </div>
                    </div>
                </div> 
                
                {/* Tipo de Voluntario */}
                <div style={styles.pasaporteFieldBoxWide}>
                    <p style={styles.pasaporteLabelRed}>TIPO DE VOLUNTARIO</p>
                    <p style={styles.pasaporteValueClean}>{voluntario.tipoVoluntario}</p>
                </div>

                {/* Habilidades (Lista de puntos) */}
                <div style={styles.pasaporteFieldBoxWide}>
                    <p style={styles.pasaporteLabelRed}>HABILIDADES</p>
                    <ul style={styles.pasaporteHabilidadesList}>
                        {displayHabilidades.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                
                {/* BOTÓN IMPRIMIR/EXPORTAR PDF (Clase "no-print" para excluirlo de la impresión) */}
                <div style={{ textAlign: 'center', marginTop: '30px' }} className="no-print">
                    <button 
                        onClick={() => setIsModalOpen(true)} // Abrir el modal
                        style={styles.printButton} 
                    >
                        <Printer size={18} /> Imprimir Pasaporte (PDF)
                    </button>
                </div>
            </div> 
        </div>
    );
}

// ---------------------------------------------------
// 5. COMPONENTE: Campo de Ficha (Soporte Edición) - Sin Cambios
// ---------------------------------------------------

const FichaCampo = ({ label, name, value, type = 'text', isEditing, onChange, children }) => {
    const displayValue = children || value || 'N/A';
    
    if (!isEditing) {
        return (
            <div style={styles.infoItem}>
                <span style={styles.infoLabel}>{label}</span>
                <span style={styles.infoValue}>{displayValue}</span>
            </div>
        );
    }

    return (
        <div style={styles.infoItem}>
            <label style={{ ...styles.infoLabel, marginBottom: '8px' }}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                style={styles.inputFieldEdit}
            />
        </div>
    );
};


// ---------------------------------------------------
// 6. COMPONENTE FICHA DE DETALLE (Modo Edición)
// ---------------------------------------------------

function FichaDetalleVoluntario({ voluntario }) {
    
    const [editData, setEditData] = useState(voluntario);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setEditData(voluntario);
        setIsEditing(false); 
    }, [voluntario]);

    const iniciales = editData.nombres.split(' ').map(n => n[0]).join('').toUpperCase();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        const finalValue = name === 'habilidades' ? value.split(',').map(s => s.trim()) : value;
        
        setEditData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSave = () => {
        console.log("✅ Datos Guardados (Simulado). Nuevo estado:", editData);
        
        Object.assign(voluntario, editData);
        
        alert(`Ficha de ${editData.nombres} actualizada y guardada.`);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData(voluntario); 
        setIsEditing(false);
    };

    const displayHabilidadesTexto = Array.isArray(editData.habilidades) 
        ? editData.habilidades.join(', ') 
        : editData.habilidades || '';


    return (
        <div style={styles.fichaContainer}>
            
            {/* ENCABEZADO: Nombre, ID, Estado y Botones de Acción */}
            <div style={styles.fichaHeaderRow}>
                <div style={styles.nameAndStatus}>
                    <div style={styles.avatarLarge}>{iniciales}</div>
                    <div style={styles.fichaDetails}>
                        <h1 style={styles.fichaTitleName}>
                           {editData.nombres}
                        </h1>
                        <p style={styles.rutDetail}>VOL-{editData.id} | {editData.areaAsignada}</p>
                    </div>
                    <div style={styles.antiguedadStatusContainer}>
                        <div style={styles.antiguedadItem}>
                            <p style={styles.antiguedadValue}>{editData.antiguedad}</p>
                            <p style={styles.antiguedadLabel}>Años</p>
                        </div>
                         <div style={styles.antiguedadItem}>
                            <p style={styles.antiguedadValue}>3</p>
                            <p style={styles.antiguedadLabel}>Teletones</p>
                        </div>
                        <span style={styles.statusPillActive}>
                            {editData.estado}
                        </span>
                    </div>
                </div>
                
                {/* BOTONES DE ACCIÓN */}
                <div>
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} style={styles.editButtonRed}>
                            <X size={16} /> Editar Ficha
                        </button>
                    ) : (
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button onClick={handleSave} style={styles.saveButton}>
                                <Save size={16} /> Guardar
                            </button>
                            <button onClick={handleCancel} style={styles.cancelButton}>
                                <X size={16} /> Cancelar
                            </button>
                        </div>
                    )}
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
                            <FichaCampo label="Edad" name="edad" value={editData.edad} type="number" isEditing={isEditing} onChange={handleChange} />
                            <FichaCampo label="Tipo de Sangre" name="tipoSangre" value={editData.tipoSangre} isEditing={isEditing} onChange={handleChange} />
                            <FichaCampo label="Fecha de Nacimiento" name="fechaNacimiento" value={editData.fechaNacimiento} isEditing={isEditing} onChange={handleChange} />
                            <FichaCampo label="Talla de Camisa" name="tallaCamisa" value={editData.tallaCamisa} isEditing={isEditing} onChange={handleChange} />
                            <FichaCampo label="Alergias" name="alergias" value={editData.alergias} isEditing={isEditing} onChange={handleChange} />
                             
                            <div style={{...styles.infoItem, gridColumn: 'span 2'}}>
                                <span style={styles.infoLabel}>Dirección</span>
                                {!isEditing ? (
                                    <span style={styles.infoValue}><MapPin size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>{editData.direccion}</span>
                                ) : (
                                    <input type="text" name="direccion" value={editData.direccion} onChange={handleChange} style={styles.inputFieldEdit} />
                                )}
                            </div>
                            <FichaCampo label="Ciudad" name="ciudad" value={editData.ciudad} isEditing={isEditing} onChange={handleChange} />
                        </div>
                    </div>
                    
                    {/* TARJETA 2: Contacto y Emergencia */}
                    <div style={styles.dataCard}>
                        <div style={styles.cardTitleRow}>
                            <Phone size={20} color={COLORS.TELECTON_RED_DARK}/>
                            <h3 style={styles.cardTitle}>Contacto</h3>
                        </div>
                        <div style={styles.infoGrid}>
                            <FichaCampo label="Email" name="email" value={editData.email} type="email" isEditing={isEditing} onChange={handleChange} >
                                <Mail size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>{editData.email}
                            </FichaCampo>
                            <FichaCampo label="Teléfono Móvil" name="telefono" value={editData.telefono} type="tel" isEditing={isEditing} onChange={handleChange} >
                                <Phone size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>{editData.telefono}
                            </FichaCampo>
                            <FichaCampo label="Teléfono de Emergencia" name="telefonoEmergencia" value={editData.telefonoEmergencia} type="tel" isEditing={isEditing} onChange={handleChange} >
                                <span style={{color: COLORS.DANGER_TEXT}}>{editData.telefonoEmergencia}</span>
                            </FichaCampo>
                        </div>
                    </div>
                    
                    {/* TARJETA 3: Habilidades y Motivación */}
                     <div style={styles.dataCard}>
                        <div style={styles.cardTitleRow}>
                            <Heart size={20} color={COLORS.TELECTON_RED_DARK}/>
                            <h3 style={styles.cardTitle}>Habilidades y Motivación</h3>
                        </div>
                        <div style={{...styles.infoItem, marginBottom: '15px'}}>
                            <span style={styles.infoLabel}>Habilidades Declaradas (Separadas por coma)</span>
                            {!isEditing ? (
                                <div>
                                    {(Array.isArray(editData.habilidades) ? editData.habilidades : displayHabilidadesTexto.split(',')).map((skill, index) => (
                                        <span key={index} style={styles.skillBadge}>{skill}</span>
                                    ))}
                                </div>
                            ) : (
                                <input 
                                    type="text" 
                                    name="habilidades" 
                                    value={displayHabilidadesTexto} 
                                    onChange={handleChange} 
                                    style={styles.inputFieldEdit} 
                                />
                            )}
                        </div>
                        <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Motivación</span>
                            {!isEditing ? (
                                <span style={styles.infoValueMotivo}>"{editData.motivacion}"</span>
                            ) : (
                                <textarea name="motivacion" value={editData.motivacion} onChange={handleChange} style={{...styles.inputFieldEdit, height: '80px'}} />
                            )}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Pasaporte Digital (Rediseñado) */}
                <div>
                    <PasaporteDigital voluntario={editData} />
                </div>
            </div>
        </div>
    );
}


// ---------------------------------------------------
// 7. COMPONENTE PRINCIPAL 'ComponenteVoluntarios'
// ---------------------------------------------------

export default function ComponenteVoluntarios({ mockVoluntarios }) {
    const { id } = useParams();
    
    let voluntarioData = mockVoluntarios.find(v => v.id === id); 

    if (!voluntarioData) {
        voluntarioData = mockVoluntarios.find(v => v.id === 'V001') || dataVoluntariosSimuladaBase[0]; 
    } 

    const voluntarioFinal = {
        ...dataVoluntariosSimuladaBase[0], 
        ...voluntarioData,
        id: voluntarioData.id,
        nombres: voluntarioData.nombre || voluntarioData.nombres, 
        rut: voluntarioData.rut,
        email: voluntarioData.email,
        region: voluntarioData.region,
        edad: voluntarioData.edad,
        areaAsignada: voluntarioData.habilidad || 'General',
        antiguedad: voluntarioData.antiguedad || 0,
        estado: voluntarioData.estado || 'Pendiente',
        tipoVoluntario: voluntarioData.tipoVoluntario || dataVoluntariosSimuladaBase[0].tipoVoluntario
    };

    if (!voluntarioFinal || !voluntarioFinal.nombres) {
         return <div style={{textAlign: 'center', marginTop: '100px'}}>Cargando o Voluntario no encontrado...</div>;
    }
    
    return (
        <div id="caja-voluntarios-crm" style={{backgroundColor: COLORS.BG_COLOR, minHeight: '100vh', padding: '1px 0'}}>
            <FichaDetalleVoluntario 
                voluntario={voluntarioFinal} 
            />
        </div>
    );
}


// ===================================================
// 8. ESTILOS INLINE (ACTUALIZADOS PARA EL PASAPORTE)
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
    },
    
    // --- Header Ficha y Botones ---
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
    
    // --- ESTILOS DE BOTONES DE ACCIÓN ---
    editButtonRed: {
        padding: '10px 20px',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: COLORS.TELECTON_RED, 
        color: COLORS.WHITE,
    },
    saveButton: {
        padding: '10px 15px',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: COLORS.ACTION_BLUE, 
        color: COLORS.WHITE,
    },
    cancelButton: {
        padding: '10px 15px',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: COLORS.TEXT_LIGHT, 
        color: COLORS.WHITE,
    },

    // --- Modal Styles ---
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
    },
    modalContent: {
        backgroundColor: COLORS.WHITE,
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        width: '350px',
        textAlign: 'center',
    },
    modalTitle: {
        fontSize: '1.4em',
        color: COLORS.ACTION_BLUE,
        marginBottom: '15px',
    },
    modalText: {
        fontSize: '1em',
        color: COLORS.TEXT_MAIN,
        marginBottom: '25px',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-around',
    },

    // --- Campos y Edición ---
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
    inputFieldEdit: {
        padding: '8px',
        border: `1px solid ${COLORS.CARD_BORDER}`,
        borderRadius: '4px',
        fontSize: '1em',
        color: COLORS.TEXT_MAIN,
        boxSizing: 'border-box',
        width: '100%',
        marginTop: '2px',
    },
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

    // --- PASAPORTE (ESTILOS ACTUALIZADOS) ---
    pasaporteContainer: {
        backgroundColor: COLORS.WHITE,
        borderRadius: '15px', 
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${COLORS.CARD_BORDER}`,
        maxWidth: '400px',
        margin: '0 auto', 
    },
    pasaporteHeader: {
        backgroundColor: COLORS.PASSPORT_HEADER_BG,
        color: COLORS.WHITE,
        display: 'flex',
        alignItems: 'center',
        padding: '15px 25px',
        fontSize: '1.4em',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        gap: '15px',
    },
    pasaporteHeaderLogo: {
        height: '45px', 
        width: 'auto',
        filter: 'brightness(0) invert(1)',
    },
    pasaporteBody: {
        padding: '25px',
    },
    pasaporteGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px',
    },
    pasaportePhotoSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px',
    },
    pasaportePhotoPlaceholder: {
        width: '120px',
        height: '140px',
        backgroundColor: COLORS.BG_COLOR,
        border: `1px solid ${COLORS.CARD_BORDER}`,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.TEXT_LIGHT,
        fontSize: '0.85em',
        textAlign: 'center',
        padding: '10px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    uploadPhotoButton: {
        position: 'absolute',
        bottom: '0',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: COLORS.WHITE,
        padding: '5px 0',
        fontSize: '0.7em',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
    },
    pasaporteMainInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    pasaporteFieldBox: {
        border: `1px solid ${COLORS.PASSPORT_FIELD_BORDER}`,
        borderRadius: '8px',
        padding: '12px 15px',
    },
    pasaporteFieldBoxWide: {
        border: `1px solid ${COLORS.PASSPORT_FIELD_BORDER}`,
        borderRadius: '8px',
        padding: '12px 15px',
        marginBottom: '15px',
    },
    pasaporteLabelRed: {
        fontSize: '0.75em',
        color: COLORS.PASSPORT_LABEL_RED,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: '5px',
        margin: '0',
    },
    pasaporteValueClean: {
        fontSize: '1em',
        fontWeight: '600',
        color: COLORS.PASSPORT_TEXT_DARK,
        margin: '0',
        lineHeight: '1.3',
    },
    pasaporteHabilidadesList: {
        listStyle: 'disc',
        paddingLeft: '20px',
        marginTop: '8px',
        fontWeight: '500',
        color: COLORS.PASSPORT_TEXT_DARK,
        margin: '0',
    },
    // BOTÓN IMPRIMIR/PDF
    printButton: {
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