import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Mail, Phone, Calendar, Clock, Briefcase, Filter, Plus, User, Stethoscope } from 'lucide-react';

const BuscadorVoluntarios = ({ datos }) => {
  const navigate = useNavigate();
  
  // --- ESTADOS DE BÚSQUEDA ---
  const [busquedaEspecialidad, setBusquedaEspecialidad] = useState(""); // Principal: Especialidad
  const [busquedaNombre, setBusquedaNombre] = useState("");           // Secundario: Nombre/RUT
  const [filtroRegion, setFiltroRegion] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  // 1. Cálculo de Métricas (Tiempo Real)
  const metricas = {
    total: datos.length,
    activos: datos.filter(d => d.estado === 'Activo').length,
    nuevos: datos.filter(d => d.antiguedad < 1).length,
    inactivos: datos.filter(d => d.estado !== 'Activo').length
  };

  // 2. Filtrado Avanzado
  const voluntariosFiltrados = datos.filter((vol) => {
    const termEspecialidad = busquedaEspecialidad.toLowerCase();
    const termNombre = busquedaNombre.toLowerCase();
    
    // Filtro 1: Especialidad (Principal)
    const matchEspecialidad = vol.habilidad.toLowerCase().includes(termEspecialidad);

    // Filtro 2: Nombre, RUT o Email (Secundario)
    const matchNombre = 
      vol.nombre.toLowerCase().includes(termNombre) || 
      vol.rut.toLowerCase().includes(termNombre) || 
      vol.email?.toLowerCase().includes(termNombre);

    // Filtros de Selección
    const matchRegion = filtroRegion ? vol.region === filtroRegion : true;
    const matchEstado = filtroEstado ? vol.estado === filtroEstado : true;

    return matchEspecialidad && matchNombre && matchRegion && matchEstado;
  });

  // Helpers Visuales
  const getIniciales = (nombre) => {
    if (!nombre) return "VT";
    return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

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
            <h2 className="dashboard-heading">Buscador de Voluntarios</h2>
            <p className="dashboard-subheading">Localiza talento por especialidad y datos personales</p>
        </div>
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

      {/* 3. BARRA DE FILTROS REESTRUCTURADA */}
      <div className="filters-container">
        <div className="filter-title-row">
            <Filter size={16} className="text-muted" />
            <span>Panel de Búsqueda Avanzada</span>
        </div>
        
        <div className="filters-controls" style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
            
            {/* INPUT 1: BÚSQUEDA POR ESPECIALIDAD (PRINCIPAL) */}
            <div className="search-field-wrapper" style={{flex: 2, minWidth: '250px'}}>
                <Briefcase className="search-icon-input" size={18} color="#DC2626" />
                <input 
                    type="text" 
                    placeholder="Especialidad (ej: Salud, Logística)..." 
                    value={busquedaEspecialidad}
                    onChange={(e) => setBusquedaEspecialidad(e.target.value)}
                    className="search-input-modern"
                    style={{borderColor: '#DC2626', backgroundColor: '#FEF2F2'}} // Destacado sutil en rojo
                />
            </div>

            {/* INPUT 2: BÚSQUEDA POR NOMBRE/RUT (SECUNDARIO) */}
            <div className="search-field-wrapper" style={{flex: 2, minWidth: '250px'}}>
                <User className="search-icon-input" size={18} />
                <input 
                    type="text" 
                    placeholder="Nombre, RUT o Email..." 
                    value={busquedaNombre}
                    onChange={(e) => setBusquedaNombre(e.target.value)}
                    className="search-input-modern"
                />
            </div>
            
            {/* SELECTORES EXISTENTES */}
            <select className="filter-select-modern" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={{flex: 1}}>
                <option value="">Estado: Todos</option>
                <option value="Activo">Activo</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Inactivo">Inactivo</option>
            </select>

            <select className="filter-select-modern" value={filtroRegion} onChange={(e) => setFiltroRegion(e.target.value)} style={{flex: 1}}>
                <option value="">Región: Todas</option>
                <option value="Metropolitana">Metropolitana</option>
                <option value="Valparaíso">Valparaíso</option>
                <option value="Biobío">Biobío</option>
                <option value="Antofagasta">Antofagasta</option>
                <option value="Araucanía">Araucanía</option>
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
                        <span>{vol.rut}</span> 
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
                <div className="empty-icon"><Search size={48} /></div>
                <h3>No se encontraron resultados</h3>
                <p>Intenta cambiar la especialidad o el nombre.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BuscadorVoluntarios;