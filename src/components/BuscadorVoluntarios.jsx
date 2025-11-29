import React, { useState } from 'react';
import { Search, User, MapPin, FileText, Star, Activity, Package, Palette, Heart } from 'lucide-react';

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
      case 'Salud': return <Activity size={24} color="#2563EB" />;
      case 'Logística': return <Package size={24} color="#EA580C" />;
      case 'Teatro': case 'Arte': return <Palette size={24} color="#9333EA" />;
      default: return <User size={24} color="#4B5563" />;
    }
  };

  return (
    <>
      <div className="search-box">
        <h2 className="search-title">
            <Search className="icon-red" size={20} color="#DC2626"/>
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
                        <Star size={10} fill="#B45309" stroke="none" /> Veterano
                        </span>
                    )}
                    {vol.esExPaciente && (
                        <span className="badge-paciente" style={{ marginLeft: '5px', backgroundColor: '#E0E7FF', color: '#4338CA', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid #C7D2FE' }}>
                        <Heart size={10} fill="#4338CA" stroke="none" style={{display: 'inline', marginRight: '3px'}}/> Corazón Teletón
                        </span>
                    )}
                    </h4>
                    <p className="info-detail"><User size={14} /> {vol.rut} | {vol.edad} años</p>
                    <p className="info-detail"><MapPin size={14} /> {vol.region}</p>
                </div>
                </div>
                <div className="card-right">
                    <div className="info-detail"><strong>Habilidad:</strong> {vol.habilidad}</div>
                    <span className={`status-badge ${vol.estado === 'Activo' ? 'status-active' : 'status-pending'}`}>{vol.estado}</span>
                    <div className="actions">
                        <button className="btn-ver-ficha"><FileText size={16} /> Ver Ficha</button>
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