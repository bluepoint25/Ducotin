import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar hook de navegación
import { Search, MapPin, Mail, Phone, Calendar, Clock, Briefcase, Filter, Plus, User } from 'lucide-react';

const BuscadorVoluntarios = ({ datos }) => {
  const navigate = useNavigate(); // 2. Inicializar el hook
  const [busqueda, setBusqueda] = useState("");
  const [filtroRegion, setFiltroRegion] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroHabilidad, setFiltroHabilidad] = useState("");

  // 1. Cálculo de Métricas (Tiempo Real)
  const metricas = {
    total: datos.length,
    activos: datos.filter(d => d.estado === 'Activo').length,
    nuevos: datos.filter(d => d.antiguedad < 1).length,
    inactivos: datos.filter(d => d.estado !== 'Activo').length
  };

  // 2. Filtrado (Actualizado para incluir RUT)
  const voluntariosFiltrados = datos.filter((vol) => {
    const termino = busqueda.toLowerCase();
    
    // Ahora busca en Nombre, RUT o Email
    const textoMatch = 
      vol.nombre.toLowerCase().includes(termino) || 
      vol.rut.toLowerCase().includes(termino) || 
      vol.email?.toLowerCase().includes(termino);

    const regionMatch = filtroRegion ? vol.region === filtroRegion : true;
    const estadoMatch = filtroEstado ? vol.estado === filtroEstado : true;
    const habilidadMatch = filtroHabilidad ? vol.habilidad === filtroHabilidad : true;

    return textoMatch && regionMatch && estadoMatch && habilidadMatch;
  });

  // Helper: Iniciales para Avatar
  const getIniciales = (nombre) => {
    if (!nombre) return "VT";
    return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Helper: Color de Badge según Área
  const getAreaColorClass = (area) => {
    if (!area) return 'badge-gray';
    const a = area.toLowerCase();
    if (a.includes('salud') || a.includes('clínica')) return 'badge-green';
    if (a.includes('logística') || a.includes('operaciones')) return 'badge-orange';
    if (a.includes('recaudación') || a.includes('caja')) return 'badge-purple';
    if (a.includes('arte') || a.includes('recreación')) return 'badge-pink';
    return 'badge-blue';
  };

  return (
    <div className="dashboard-wrapper fade-in">
      
      {/* 1. HEADER + BOTÓN ACCIÓN */}
      <div className="dashboard-top-bar">
        <div>
            <h2 className="dashboard-heading">Sistema de Voluntarios Teletón</h2>
            <p className="dashboard-subheading">Gestión y seguimiento de talento humano</p>
        </div>
        {/* Botón con redirección */}
        <button 
            className="btn-action-primary"
            onClick={() => navigate('/registro')} 
        >
            <Plus size={18} /> Nuevo Voluntario
        </button>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS */}
      <div className="stats-grid">
        <div className="stat-card">
            <span className="stat-label">Total de Voluntarios</span>
            <span className="stat-number">{metricas.total}</span>
            <div className="stat-indicator blue"></div>
        </div>
        <div className="stat-card">
            <span className="stat-label">Activos</span>
            <span className="stat-number text-success">{metricas.activos}</span>
            <div className="stat-indicator green"></div>
        </div>
        <div className="stat-card">
            <span className="stat-label">Nuevos (mes)</span>
            <span className="stat-number text-primary">{metricas.nuevos}</span>
            <div className="stat-indicator light-blue"></div>
        </div>
        <div className="stat-card">
            <span className="stat-label">Inactivos / Pendientes</span>
            <span className="stat-number text-danger">{metricas.inactivos}</span>
            <div className="stat-indicator red"></div>
        </div>
      </div>

      {/* 3. BARRA DE FILTROS */}
      <div className="filters-container">
        <div className="filter-title-row">
            <Filter size={16} className="text-muted" />
            <span>Filtros de Búsqueda</span>
        </div>
        
        <div className="filters-controls">
            <div className="search-field-wrapper">
                <Search className="search-icon-input" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar por nombre, RUT o email..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="search-input-modern"
                />
            </div>
            
            <select className="filter-select-modern" value={filtroHabilidad} onChange={(e) => setFiltroHabilidad(e.target.value)}>
                <option value="">Todas las áreas</option>
                <option value="Salud">Salud</option>
                <option value="Logística">Logística</option>
                <option value="Recreación">Recreación</option>
                <option value="Administrativo">Administrativo</option>
            </select>

            <select className="filter-select-modern" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                <option value="">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Pendiente">Pendiente</option>
            </select>

            <select className="filter-select-modern" value={filtroRegion} onChange={(e) => setFiltroRegion(e.target.value)}>
                <option value="">Todas las regiones</option>
                <option value="Metropolitana">Metropolitana</option>
                <option value="Valparaíso">Valparaíso</option>
                <option value="Biobío">Biobío</option>
            </select>
        </div>
      </div>

      {/* 4. GRID DE TARJETAS */}
      <div className="cards-grid-layout">
        {voluntariosFiltrados.length > 0 ? (
            voluntariosFiltrados.map((vol) => (
            <div key={vol.id} className="profile-card">
                
                {/* Cabecera Tarjeta */}
                <div className="card-header-row">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {getIniciales(vol.nombre)}
                        </div>
                        <div className="profile-details">
                            <h4 className="profile-name">{vol.nombre}</h4>
                            <span className="profile-age">{vol.edad} años</span>
                        </div>
                    </div>
                    <span className={`status-pill ${vol.estado === 'Activo' ? 'status-active' : 'status-inactive'}`}>
                        {vol.estado}
                    </span>
                </div>

                {/* Info Contacto */}
                <div className="card-body-info">
                    <div className="info-line">
                        <Mail size={14} className="icon-muted"/>
                        <span>{vol.email || 'correo@teleton.cl'}</span>
                    </div>
                    <div className="info-line">
                        <Phone size={14} className="icon-muted"/>
                        <span>{vol.rut}</span> {/* Muestra RUT o Teléfono según prefieras */}
                    </div>
                    <div className="info-line">
                        <MapPin size={14} className="icon-muted"/>
                        <span>{vol.region}, {vol.comuna || 'Chile'}</span>
                    </div>
                </div>

                {/* Área y Disponibilidad */}
                <div className="card-tags-area">
                    <div className="tag-row">
                        <span className="tag-label"><Briefcase size={12}/> Área:</span>
                        <span className={`area-badge ${getAreaColorClass(vol.habilidad)}`}>{vol.habilidad || 'General'}</span>
                    </div>
                    <div className="tag-row mt-2">
                        <span className="tag-label"><Clock size={12}/> Disponibilidad:</span>
                        <div className="days-badges">
                            <span className="day-badge">Sab</span>
                            <span className="day-badge">Dom</span>
                        </div>
                    </div>
                </div>

                {/* Footer Tarjeta */}
                <div className="card-footer-modern">
                    <div className="footer-item">
                        <span className="footer-label">Experiencia</span>
                        <span className="footer-text">{vol.antiguedad} años</span>
                    </div>
                    <div className="footer-item right">
                        <span className="footer-label"><Calendar size={12}/> Registro</span>
                        <span className="footer-text">14/03/2024</span>
                    </div>
                </div>

            </div>
            ))
        ) : (
            <div className="empty-state">
                <div className="empty-icon"><User size={48} /></div>
                <h3>No se encontraron voluntarios</h3>
                <p>Intenta ajustar los filtros de búsqueda.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BuscadorVoluntarios;