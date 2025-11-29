import React, { useState } from 'react';
// Importación de lucide-react ELIMINADA

const BuscadorVoluntarios = ({ datos }) => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("nombre");

  // Lógica de Filtrado
  const voluntariosFiltrados = datos.filter((vol) => {
    const termino = busqueda.toLowerCase();
    return filtroTipo === "nombre" 
      ? vol.nombre.toLowerCase().includes(termino)
      : vol.rut.includes(termino);
  });

  const getIconoHabilidad = (habilidad) => {
    switch(habilidad) {
      // Iconos de habilidad reemplazados por emojis con estilo de 24px
      case 'Salud': return <span style={{fontSize: '24px'}} role="img" aria-label="health">⚕️</span>;
      case 'Logística': return <span style={{fontSize: '24px'}} role="img" aria-label="package">📦</span>;
      case 'Teatro': case 'Arte': return <span style={{fontSize: '24px'}} role="img" aria-label="palette">🎨</span>;
      default: return <span style={{fontSize: '24px'}} role="img" aria-label="user">👤</span>;
    }
  };

  return (
    <>
      <div className="search-box">
        <h2 className="search-title">
            {/* Icono Search reemplazado por emoji */}
            <span className="icon-red" style={{fontSize: '20px', color: '#DC2626', marginRight: '8px'}} role="img" aria-label="search">🔍</span>
            Buscador Inteligente
        </h2>
        
        <div className="search-inputs">
            <select 
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="input-field select-type"
            >
            <option value="nombre">Buscar por Nombre</option>
            <option value="rut">Buscar por RUT</option>
            </select>

            <input
            type="text"
            placeholder={filtroTipo === "nombre" ? "Ingrese nombre..." : "Ingrese RUT..."}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-field input-text"
            />
        </div>
      </div>

      <div className="results-list">
        <h3 className="results-count">Resultados encontrados: {voluntariosFiltrados.length}</h3>
        {voluntariosFiltrados.length > 0 ? (
            voluntariosFiltrados.map((vol) => (
            <div key={vol.id} className="volunteer-card">
                <div className="card-left">
                <div className="icon-wrapper">{getIconoHabilidad(vol.habilidad)}</div>
                <div>
                    <h4 className="info-name">
                    {vol.nombre}
                    {vol.antiguedad >= 5 && (
                        <span className="badge-veterano">
                        {/* Icono Star reemplazado por emoji */}
                        <span role="img" aria-label="star" style={{marginRight: '3px'}}>⭐</span> Veterano
                        </span>
                    )}
                    {vol.esExPaciente && (
                        <span className="badge-paciente" style={{ marginLeft: '5px', backgroundColor: '#E0E7FF', color: '#4338CA', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid #C7D2FE' }}>
                        {/* Icono Heart reemplazado por emoji */}
                        <span role="img" aria-label="heart" style={{display: 'inline', marginRight: '3px'}}>❤️</span> Corazón Teletón
                        </span>
                    )}
                    </h4>
                    {/* Iconos User y MapPin reemplazados por emojis */}
                    <p className="info-detail"><span role="img" aria-label="user" style={{marginRight: '5px'}}>👤</span> {vol.rut} | {vol.edad} años</p>
                    <p className="info-detail"><span role="img" aria-label="map" style={{marginRight: '5px'}}>📍</span> {vol.region}</p>
                </div>
                </div>
                <div className="card-right">
                    <div className="info-detail"><strong>Habilidad:</strong> {vol.habilidad}</div>
                    <span className={`status-badge ${vol.estado === 'Activo' ? 'status-active' : 'status-pending'}`}>{vol.estado}</span>
                    <div className="actions">
                        <button className="btn-ver-ficha">📜 Ver Ficha</button> {/* Icono FileText reemplazado por emoji */}
                    </div>
                </div>
            </div>
            ))
        ) : (
            <div style={{textAlign: 'center', padding: '2rem', color: '#999', border: '2px dashed #ddd', borderRadius: '8px'}}>No se encontraron voluntarios.</div>
        )}
      </div>
    </>
  );
};

export default BuscadorVoluntarios;