import React, { useState, useEffect } from 'react';
import { Search, MapPin, Zap, Mail, Phone, Users, Calendar, BarChart2 } from 'lucide-react';

// ==========================================================
// 🚨 CONEXIÓN A API SPRING BOOT
// ==========================================================
const API_BASE_URL = 'http://localhost:8080/api/v1/voluntarios'; 

// --- Datos de configuración para los select (deberían venir de una BD o archivo de configuración) ---
const REGIONES = [
    { label: 'Todas las Regiones', value: '' },
    { label: 'Región Metropolitana', value: 'Región Metropolitana' },
    { label: 'Antofagasta', value: 'Antofagasta' },
    { label: 'Valparaíso', value: 'Valparaíso' },
    { label: 'Biobío', value: 'Biobío' },
    // ... agregar todas las regiones de Chile
];

const HABILIDADES = [
    { label: 'Todas las Habilidades', value: '' },
    { label: 'Lenguaje de Señas', value: 'Lenguaje de Señas' },
    { label: 'Primeros Auxilios', value: 'Primeros Auxilios' },
    { label: 'Programación', value: 'Programación' },
    { label: 'Logística', value: 'Logística' },
];

// --- Componente auxiliar para el Badge de Habilidad ---
const HabilidadBadge = ({ habilidad }) => {
    let style = { backgroundColor: '#F3F4F6', color: '#374151' };
    if (habilidad.includes('Señas')) style = { backgroundColor: '#FFEDD5', color: '#9A3412' };
    if (habilidad.includes('Auxilios')) style = { backgroundColor: '#DCFCE7', color: '#166534' };
    if (habilidad.includes('Programación')) style = { backgroundColor: '#EFF6FF', color: '#1E40AF' };

    return (
        <span className="area-badge" style={style}>
            {habilidad}
        </span>
    );
};

export default function BuscadorVoluntarios() {
    // 1. Estados de la búsqueda
    const [voluntarios, setVoluntarios] = useState([]);
    const [filtros, setFiltros] = useState({ region: '', habilidad: '' });
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [tiempoRespuesta, setTiempoRespuesta] = useState(null);

    // 2. Manejador de cambios en los filtros
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    // 3. Hook para ejecutar la búsqueda al cambiar los filtros
    useEffect(() => {
        const buscarVoluntarios = async () => {
            setCargando(true);
            setError(null);
            setTiempoRespuesta(null);

            // Construir la Query String con los filtros activos
            const params = new URLSearchParams();
            if (filtros.region) params.append('region', filtros.region);
            if (filtros.habilidad) params.append('habilidad', filtros.habilidad);

            // URL del endpoint: /api/v1/voluntarios/buscar?region=...&habilidad=...
            const url = `${API_BASE_URL}/buscar?${params.toString()}`;

            const startTime = performance.now(); // Inicio para medir RNF-08

            try {
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error("Fallo la búsqueda en la API.");
                }

                const data = await response.json();
                setVoluntarios(data);
                
            } catch (err) {
                console.error("Error en la búsqueda:", err);
                setError("Ocurrió un error al buscar voluntarios. Intente de nuevo.");
            } finally {
                const endTime = performance.now();
                setTiempoRespuesta((endTime - startTime).toFixed(2)); // Medición de tiempo (RNF-08)
                setCargando(false);
            }
        };

        // NOTA: Se podría implementar un 'debounce' (retraso) aquí para evitar llamadas excesivas
        buscarVoluntarios();
    }, [filtros]); // Se ejecuta cada vez que 'filtros' cambia

    // --- Funciones auxiliares de display ---
    const getAvatarText = (name) => name ? name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().substring(0, 2) : 'NV';
    const getStatusClass = (estado) => estado === 'Activo' ? 'status-active' : 'status-inactive';
    const getRutFormatted = (rut) => rut ? rut.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4') : 'N/A';
    
    // ==========================================================
    // Renderizado del componente
    // ==========================================================
    return (
        <div className="main-container"> 
            
            <div className="dashboard-top-bar">
                <div>
                    <h2 className="dashboard-heading">Búsqueda y Segmentación (RF-06, RF-07)</h2>
                    <p className="dashboard-subheading">Encuentre y segmente voluntarios por región y habilidades.</p>
                </div>
            </div>

            {/* --- 1. Contenedor de Filtros --- */}
            <div className="filters-container">
                <div className="filter-title-row">
                    <Search size={18} /> Filtros de Búsqueda
                </div>
                <div className="filters-controls">
                    
                    {/* Filtro por Región */}
                    <div className="search-field-wrapper" style={{ flex: 1 }}>
                        <select 
                            name="region"
                            value={filtros.region}
                            onChange={handleFiltroChange}
                            className="filter-select-modern"
                        >
                            {REGIONES.map(r => (
                                <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por Habilidad */}
                    <div className="search-field-wrapper" style={{ flex: 1 }}>
                        <select 
                            name="habilidad"
                            value={filtros.habilidad}
                            onChange={handleFiltroChange}
                            className="filter-select-modern"
                        >
                            {HABILIDADES.map(h => (
                                <option key={h.value} value={h.value}>{h.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* --- 2. Indicador de Resultados y Tiempo --- */}
            <div style={{marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <p className="results-count">
                    {cargando ? 'Buscando...' : `${voluntarios.length} resultados encontrados.`}
                </p>
                {tiempoRespuesta && (
                    <p className="results-count">
                        <BarChart2 size={14} style={{display: 'inline', marginRight: '5px'}}/> 
                        Tiempo de Respuesta: {tiempoRespuesta} ms 
                        {/* RNF-08: Menos de 10 segundos (10000ms) */}
                        <span style={{color: tiempoRespuesta < 10000 ? '#10B981' : '#F59E0B', fontWeight: 'bold'}}>
                            ({tiempoRespuesta < 10000 ? 'OK' : 'Lento'})
                        </span>
                    </p>
                )}
            </div>

            {/* --- 3. Grid de Resultados --- */}
            <div className="cards-grid-layout">
                {cargando && 
                    <div className="empty-state" style={{gridColumn: '1 / -1'}}>Cargando perfiles...</div>
                }
                
                {error && 
                    <div className="empty-state" style={{gridColumn: '1 / -1', color: '#991B1B', border: '2px dashed #FCA5A5'}}>
                        {error}
                    </div>
                }

                {!cargando && voluntarios.length === 0 && !error && (
                    <div className="empty-state">
                        <div className="empty-icon"><Users size={32} /></div>
                        <p>No se encontraron voluntarios con los filtros seleccionados.</p>
                    </div>
                )}

                {voluntarios.map(v => (
                    // La tarjeta usa la data del modelo Voluntario.java
                    <div key={v.rut} className="profile-card fade-in"> 
                        
                        <div className="card-header-row">
                            <div className="profile-info">
                                <div className="profile-avatar">{getAvatarText(v.nombreCompleto)}</div>
                                <div className="profile-details">
                                    <h4 className="profile-name">{v.nombreCompleto}</h4>
                                    <p className="profile-age">{v.ocupacion || 'Ocupación Desconocida'}</p>
                                </div>
                            </div>
                            <span className={getStatusClass(v.estadoVoluntario) + " status-pill"}>
                                {v.estadoVoluntario || 'Pendiente'}
                            </span>
                        </div>
                        
                        {/* --- Cuerpo de la Tarjeta --- */}
                        <div className="card-body-info">
                            <div className="info-line">
                                <Mail size={16} className="icon-muted" /> {v.email || 'N/A'}
                            </div>
                            <div className="info-line">
                                <Phone size={16} className="icon-muted" /> {v.telefono || 'N/A'}
                            </div>
                            <div className="info-line">
                                <MapPin size={16} className="icon-muted" /> {v.region || 'Sin Región'} ({v.instituto || 'N/A'})
                            </div>
                            <div className="info-line">
                                <Users size={16} className="icon-muted" /> RUT: {getRutFormatted(v.rut)}
                            </div>
                        </div>

                        {/* --- Habilidades y Scores --- */}
                        <div className="card-tags-area">
                            <div className="tag-row">
                                <Zap size={16} className="icon-muted" />
                                <span className="tag-label">Habilidades:</span>
                                {/* Muestra las habilidades separadas por coma */}
                                {v.habilidades && v.habilidades.split(',').map((h, i) => (
                                    <HabilidadBadge key={i} habilidad={h.trim()} />
                                ))}
                                {!v.habilidades && <span className="tag-label">No registradas</span>}
                            </div>
                            
                            <div className="tag-row mt-2">
                                <BarChart2 size={16} className="icon-muted" />
                                <span className="tag-label">Score de Riesgo:</span>
                                <span className="footer-text" style={{color: v.scoreRiesgoDesercion > 0.8 ? '#DC2626' : v.scoreRiesgoDesercion > 0.5 ? '#F59E0B' : '#10B981'}}>
                                    {v.scoreRiesgoDesercion !== null ? (v.scoreRiesgoDesercion * 100).toFixed(0) + '%' : 'N/A'}
                                </span>
                            </div>
                        </div>

                        {/* --- Footer Historial --- */}
                        <div className="card-footer-modern">
                            <div className="footer-item">
                                <span className="footer-label"><Calendar size={12}/> Campañas Históricas</span>
                                <span className="footer-text">{v.historialCampanias ? v.historialCampanias.split(',').length : 0}</span>
                            </div>
                            <div className="footer-item right">
                                <button className="btn-action-primary" style={{padding: '5px 12px', fontSize: '0.9rem'}}>
                                    Ver Ficha
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}