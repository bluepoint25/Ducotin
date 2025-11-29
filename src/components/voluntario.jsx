// src/components/voluntario.jsx (TODOS LOS DATOS EDITABLES - FINAL)

import React, { useState, useEffect } from 'react';

// ===================================================
// 1. DATA SIMULADA (Ahora con campos consolidados para edición)
// ===================================================

const dataVoluntariosSimulada = [
    {
        id: 'V001',
        nombre: 'Gabriela Soto Pérez',
        correo: 'gabriela.soto@mail.com', 
        telefono: '+56 9 8765 4321',      
        region: 'Metropolitana',          
        tipoVoluntario: 'Permanente', 
        disponibilidad: 'Fines de Semana / Tardes',
        horasVoluntariado: 120,
        capacitacionesCompletadas: 5,
        medioPreferido: 'Correo', 
        // Datos convertidos a texto para edición multilínea:
        habilidadesTexto: 'Lenguaje de Señas (Avanzado)\nPrimeros Auxilios\nPedagogía',
        experienciaTexto: 'Campaña Teletón 2023 (Rol: Apoyo Médico)\nCampaña Teletón 2020 (Rol: Logística)',
    },
    {
        id: 'V002',
        nombre: 'Ricardo Palma Herrera',
        correo: 'ricardo.palma@mail.com',
        telefono: '+56 9 1234 5678',
        region: 'Valparaíso',
        tipoVoluntario: 'Campaña', 
        disponibilidad: 'Noviembre (Todo el mes)',
        horasVoluntariado: 60,
        capacitacionesCompletadas: 2,
        medioPreferido: 'Teléfono/WhatsApp', 
        habilidadesTexto: 'Música (Guitarra)\nTeatro',
        experienciaTexto: 'Campaña Teletón 2024 (Rol: Presentador)\nCampaña Teletón 2023 (Rol: Animador)',
    },
];

// ===================================================
// 2. FUNCIÓN DE EXPORTACIÓN (Simulada)
// ===================================================

function exportarPasaporteDigital(dataVoluntario) {
    const nombreArchivo = `Pasaporte_Teleton_${dataVoluntario.nombre.replace(/ /g, '_')}.png`;
    console.log(`\n✅ SIMULANDO EXPORTACIÓN: ${nombreArchivo}`);
}


// ---------------------------------------------------
// 3. COMPONENTE PASAPORTE DIGITAL (No editable)
// ---------------------------------------------------

function PasaporteDigital({ voluntario, onExportar }) {
    // Usamos el estado actualizado
    const esPermanente = voluntario.tipoVoluntario === 'Permanente';
    const tipoColor = esPermanente ? '#007bff' : 'red'; 

    return (
        <div style={{ ...pasaporteStyle, maxWidth: 'none' }}>
            
            <div id="pasaporte-digital" style={pasaporteInnerStyle}>
                <div style={headerStyle}>
                    <h4 style={{ color: 'white', margin: 0 }}>PASAPORTE TELETÓN</h4>
                </div>
                
                <section style={pasaporteSectionStyle}>
                    <p><strong>Nombre:</strong> {voluntario.nombre}</p>
                    <p><strong>Región:</strong> {voluntario.region}</p>
                    <h5 style={{ color: tipoColor, margin: '10px 0 0' }}>
                        {voluntario.tipoVoluntario.toUpperCase()}
                    </h5>
                    <p style={{ fontSize: '0.8em', margin: '5px 0' }}>
                        *Válido para segmentación RPA
                    </p>
                </section>
                
                <div style={pasaporteFooterStyle}>
                     <button 
                        onClick={() => onExportar(voluntario)} 
                        style={exportButtonStyle}
                    >
                        💾 Exportar Pasaporte (PNG)
                    </button>
                </div>
            </div>
        </div>
    );
}


// ---------------------------------------------------
// 4. COMPONENTE AYUDANTE: CAMPO DE FICHA
// ---------------------------------------------------

const FichaCampo = ({ label, name, value, type = 'text', onChange, error, isEditing, options, height = '34px' }) => {
    
    // Si no está editando, muestra solo el valor
    if (!isEditing) {
        // Mostrar como lista si es textarea/multilínea
        const displayValue = type === 'textarea' ? (
            <ul style={{ paddingLeft: '20px', margin: '0 0 5px 0' }}>
                {String(value).split('\n').map((line, i) => (
                    line.trim() ? <li key={i}>{line}</li> : null
                ))}
            </ul>
        ) : (
            <p style={{ margin: '0 0 5px 0', fontWeight: 'normal' }}>{value}</p>
        );
        
        return (
            <div style={formGroupStyle}>
                <label><strong>{label}:</strong></label>
                {displayValue}
            </div>
        );
    }
    
    // Si está editando, muestra el input/select/textarea
    const inputProps = {
        name,
        value,
        onChange,
        style: { ...inputStyle, height, borderColor: error ? 'red' : '#ccc' },
    };
    
    let inputElement;

    if (options) {
        inputElement = (
            <select {...inputProps}>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        );
    } else if (type === 'textarea') {
        inputElement = <textarea {...inputProps} style={{...inputProps.style, height: '100px'}} />;
    } else {
        inputElement = <input type={type} {...inputProps} />;
    }

    return (
        <div style={formGroupStyle}>
            <label><strong>{label}:</strong></label>
            {inputElement}
            {error && <p style={errorStyle}>{error}</p>}
        </div>
    );
};


// ---------------------------------------------------
// 5. COMPONENTE FICHA DE DETALLE (Modo Ver/Editar)
// ---------------------------------------------------

function FichaDetalleVoluntario({ voluntario, onExportar }) {
    
    // Inicializa el estado con todos los campos del voluntario (incluyendo los de texto multilínea)
    const [fichaData, setFichaData] = useState(voluntario);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        setFichaData(voluntario);
        setErrors({});
        setIsEditing(false);
    }, [voluntario]);

    // Función de validación
    const validate = () => {
        const newErrors = {};
        
        // Validación de Campos de Texto Obligatorios
        ['nombre', 'correo', 'telefono', 'region', 'disponibilidad'].forEach(field => {
            if (!fichaData[field] || String(fichaData[field]).trim() === '') {
                newErrors[field] = 'Este campo es obligatorio.';
            }
        });
        
        // Validación de Números
        if (fichaData.horasVoluntariado < 0 || isNaN(fichaData.horasVoluntariado)) {
            newErrors.horasVoluntariado = 'Debe ser un número positivo.';
        }
        if (fichaData.capacitacionesCompletadas < 0 || isNaN(fichaData.capacitacionesCompletadas)) {
            newErrors.capacitacionesCompletadas = 'Debe ser un número positivo.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFichaData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => {
                const { [name]: removed, ...rest } = prev;
                return rest;
            });
        }
    };

    const handleSave = () => {
        if (validate()) {
            console.log("✅ Ficha Guardada. Datos actualizados listos para consolidación:", fichaData);
            alert(`Ficha de ${fichaData.nombre} actualizada y guardada.`);
            setIsEditing(false); // Salir del modo edición al guardar
        } else {
            console.log("❌ Error de validación. No se puede guardar.");
            alert("Error: Revisa todos los campos obligatorios.");
        }
    };

    const handleEdit = () => {
        setIsEditing(true); // Entrar en modo edición
    };
    
    if (!voluntario) return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>No hay voluntarios para mostrar.</p>
        </div>
    );

    return (
        <div style={fichaDetalleStyle}>
            <h1 style={titleNameStyle}>
                FICHA 360°: {fichaData.nombre}
            </h1>
            
            {/* Botones de Control de Edición (Arriba) */}
            <div style={{textAlign: 'right', marginBottom: '20px'}}>
                {!isEditing ? (
                    <button onClick={handleEdit} style={editButtonStyle}>
                        ✏️ EDITAR FICHA
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(false)} style={cancelButtonStyle}>
                        ❌ CANCELAR EDICIÓN
                    </button>
                )}
            </div>

            <div style={fichaGridStyle}>

                {/* COLUMNA IZQUIERDA: DATOS EDITABLES / EN VISTA */}
                <div>
                    <h3 style={sectionTitleStyle}>1. Datos Personales y Contacto</h3>
                    
                    <FichaCampo label="Nombre Completo" name="nombre" value={fichaData.nombre} onChange={handleChange} error={errors.nombre} isEditing={isEditing} />
                    <FichaCampo label="Correo Electrónico" name="correo" value={fichaData.correo} type="email" onChange={handleChange} error={errors.correo} isEditing={isEditing} />
                    <FichaCampo label="Teléfono" name="telefono" value={fichaData.telefono} type="tel" onChange={handleChange} error={errors.telefono} isEditing={isEditing} />
                    <FichaCampo label="Región" name="region" value={fichaData.region} onChange={handleChange} error={errors.region} isEditing={isEditing} />

                    <h3 style={sectionTitleStyle}>2. Disponibilidad y Métricas</h3>
                    
                    <FichaCampo label="Tipo Voluntario" name="tipoVoluntario" value={fichaData.tipoVoluntario} onChange={handleChange} isEditing={isEditing} options={['Permanente', 'Campaña']} />
                    <FichaCampo label="Horarios de Disponibilidad" name="disponibilidad" value={fichaData.disponibilidad} type="textarea" onChange={handleChange} error={errors.disponibilidad} isEditing={isEditing} />
                    <FichaCampo label="Horas de Voluntariado" name="horasVoluntariado" value={fichaData.horasVoluntariado} type="number" onChange={handleChange} error={errors.horasVoluntariado} isEditing={isEditing} />
                    <FichaCampo label="Capacitaciones Completadas" name="capacitacionesCompletadas" value={fichaData.capacitacionesCompletadas} type="number" onChange={handleChange} error={errors.capacitacionesCompletadas} isEditing={isEditing} />
                    <FichaCampo label="MEDIO PREFERIDO" name="medioPreferido" value={fichaData.medioPreferido} onChange={handleChange} isEditing={isEditing} options={['Correo', 'Teléfono/WhatsApp']} />
                    
                    {/* 3. HABILIDADES (AHORA EDITABLE) */}
                    <h3 style={sectionTitleStyle}>3. Habilidades (Editables)</h3>
                    <FichaCampo label="Lista de Habilidades" name="habilidadesTexto" value={fichaData.habilidadesTexto} type="textarea" onChange={handleChange} isEditing={isEditing} />

                    {/* 4. HISTORIAL DE PARTICIPACIÓN (AHORA EDITABLE) */}
                    <h3 style={sectionTitleStyle}>4. Historial de Participación (Editable)</h3>
                    <FichaCampo label="Historial de Campañas" name="experienciaTexto" value={fichaData.experienciaTexto} type="textarea" onChange={handleChange} isEditing={isEditing} />
                
                    {/* Botón Guardar Abajo y Rojo, solo visible en modo edición */}
                    {isEditing && (
                        <div style={{marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px'}}>
                             <button onClick={handleSave} style={redSaveButtonStyle}>
                                🚨 GUARDAR CAMBIOS FINALES
                            </button>
                        </div>
                    )}
                </div>

                {/* COLUMNA DERECHA: PASAPORTE DIGITAL (IMAGEN) */}
                <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>Pasaporte Digital (Visual)</h3>
                    <PasaporteDigital voluntario={fichaData} onExportar={onExportar} />
                </div>
            </div>
        </div>
    );
}


// ---------------------------------------------------
// 6. COMPONENTE PRINCIPAL 'ComponenteVoluntarios'
// ---------------------------------------------------

export default function ComponenteVoluntarios() {
    const voluntarioFijo = dataVoluntariosSimulada[1]; 

    useEffect(() => {
        console.log("Ficha cargada: Implementado modo Ver/Editar y todos los campos son editables.");
    }, []);
    
    return (
        <div id="caja-voluntarios-crm" style={containerPureViewStyle}>
            <FichaDetalleVoluntario 
                voluntario={voluntarioFijo} 
                onExportar={exportarPasaporteDigital}
            />
        </div>
    );
}

// ===================================================
// 7. ESTILOS BÁSICOS (Ajustados)
// ===================================================
// ... (Los estilos se mantienen igual) ...

const containerPureViewStyle = {
    fontFamily: 'Arial, sans-serif',
};

const titleNameStyle = {
    borderBottom: '3px solid #ff0000', 
    paddingBottom: '15px',
    marginBottom: '20px',
    color: '#333',
    fontSize: '2em', 
    textAlign: 'center', 
};

const fichaDetalleStyle = {
    padding: '0 20px',
};

const fichaGridStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr', 
    gap: '40px',
    marginTop: '20px',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
};

const sectionTitleStyle = {
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
    marginTop: '25px',
    color: '#007bff',
};

const formGroupStyle = {
    marginBottom: '10px',
    marginTop: '10px',
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    marginBottom: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
};

const errorStyle = {
    color: 'red',
    fontSize: '0.8em',
    margin: '0',
    marginTop: '-5px',
    marginBottom: '5px',
};

const baseButtonStyle = {
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    border: 'none',
};

const editButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#007bff', // Azul Teletón
    color: 'white',
};

const cancelButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#555', // Gris para cancelar
    color: 'white',
};

const redSaveButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#ff0000', // ¡ROJO SOLICITADO!
    color: 'white',
    width: '100%',
    fontSize: '1.1em',
};

const pasaporteStyle = {
    borderRadius: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
};

const pasaporteInnerStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    border: '2px solid #ff0000',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const pasaporteSectionStyle = {
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#fff',
};

const pasaporteFooterStyle = {
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
    borderTop: '1px solid #ddd',
};

const headerStyle = {
    backgroundColor: 'red', 
    padding: '10px',
    textAlign: 'center',
};

const exportButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#007bff', 
    color: 'white',
};