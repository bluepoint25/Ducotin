import React, { useState } from 'react';

const ChileMap = () => {
  // Estado para el hover
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Configuración de estilo
  const seaColor = "#dbeafe";
  const strokeColor = "#64748b";
  const highlightColor = "#EE3123"; // Rojo Teletón

  // DATOS DE LAS REGIONES (Vectores simplificados para simular el mapa)
  // Nota: Son aproximaciones artísticas para dashboards, no cartografía exacta.
  const REGIONS = [
    { id: 'XV', name: 'Arica y Parinacota', vol: 320, path: "M220,20 L235,20 L240,30 L230,35 L225,30 L220,20 Z" },
    { id: 'I', name: 'Tarapacá', vol: 540, path: "M225,30 L230,35 L240,30 L245,35 L240,55 L230,50 L225,30 Z" },
    { id: 'II', name: 'Antofagasta', vol: 890, path: "M230,50 L240,55 L245,65 L230,80 L235,100 L220,100 L220,70 L230,50 Z" },
    { id: 'III', name: 'Atacama', vol: 450, path: "M220,100 L235,100 L230,130 L220,130 L215,115 L220,100 Z" },
    { id: 'IV', name: 'Coquimbo', vol: 720, path: "M220,130 L230,130 L225,160 L215,160 L215,140 L220,130 Z" },
    { id: 'V', name: 'Valparaíso', vol: 1500, path: "M215,160 L225,160 L220,185 L210,180 L215,160 Z" },
    { id: 'RM', name: 'Metropolitana', vol: 4500, path: "M220,185 L230,185 L228,205 L218,200 L220,185 Z" }, // RM encerrada
    { id: 'VI', name: 'O\'Higgins', vol: 980, path: "M210,180 L220,185 L218,200 L225,210 L215,220 L205,200 L210,180 Z" },
    { id: 'VII', name: 'Maule', vol: 850, path: "M215,220 L225,210 L220,240 L210,245 L205,230 L215,220 Z" },
    { id: 'XVI', name: 'Ñuble', vol: 620, path: "M210,245 L220,240 L218,260 L208,265 L210,245 Z" },
    { id: 'VIII', name: 'Biobío', vol: 1200, path: "M208,265 L218,260 L215,285 L200,290 L205,275 L208,265 Z" },
    { id: 'IX', name: 'Araucanía', vol: 950, path: "M200,290 L215,285 L212,315 L198,320 L200,290 Z" },
    { id: 'XIV', name: 'Los Ríos', vol: 580, path: "M198,320 L212,315 L210,340 L195,345 L198,320 Z" },
    { id: 'X', name: 'Los Lagos', vol: 800, path: "M195,345 L210,340 L205,380 L190,400 L185,380 L195,360 L185,350 L195,345 Z" },
    { id: 'XI', name: 'Aysén', vol: 320, path: "M190,400 L205,380 L200,450 L185,460 L180,430 L190,400 Z" },
    { id: 'XII', name: 'Magallanes', vol: 410, path: "M185,460 L200,450 L195,500 L180,530 L170,520 L175,490 L185,460 Z" }
  ];

  const handleMouseMove = (e, region) => {
    // Calcular posición relativa al SVG para el tooltip
    const svgRect = e.target.closest('svg').getBoundingClientRect();
    setMousePos({
      x: e.clientX - svgRect.left,
      y: e.clientY - svgRect.top
    });
    setHoveredRegion(region);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      overflow: 'hidden',
      backgroundColor: seaColor,
      borderRadius: '8px',
      border: '1px solid #bfdbfe',
      position: 'relative' // Necesario para el tooltip absoluto
    }}>
      
      {/* TOOLTIP FLOTANTE */}
      {hoveredRegion && (
        <div style={{
          position: 'absolute',
          left: mousePos.x + 15,
          top: mousePos.y - 20,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '8px 12px',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          zIndex: 10,
          pointerEvents: 'none',
          border: '1px solid #EE3123',
          minWidth: '120px'
        }}>
          <div style={{fontWeight: 'bold', fontSize: '0.8rem', color: '#1F2937'}}>{hoveredRegion.name}</div>
          <div style={{fontSize: '0.75rem', color: '#6B7280'}}>Voluntarios: <span style={{color: '#EE3123', fontWeight:'700'}}>{hoveredRegion.vol}</span></div>
        </div>
      )}

      <svg
        viewBox="0 0 400 600"
        style={{ height: '100%', maxWidth: '100%', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))' }}
        xmlns="http://www.w3.org/2000/svg"
        onMouseLeave={() => setHoveredRegion(null)}
      >
        <defs>
          {/* Filtro de Relieve (Terrain) */}
          <filter id="geo-relief-v2">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>

          {/* Gradiente Geográfico (Verde-Café-Blanco) */}
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Patrón de Mar */}
          <pattern id="seaPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <path d="M0 10 Q5 5 10 10 T20 10" fill="none" stroke="#93c5fd" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
        </defs>

        {/* Fondo Mar */}
        <rect width="100%" height="100%" fill="url(#seaPattern)" />

        {/* Títulos Decorativos */}
        <g opacity="0.5" pointerEvents="none">
            <text x="30" y="550" fontSize="30" fontWeight="900" fill="#1e3a8a" style={{letterSpacing: '5px'}}>CHILE</text>
            <text x="30" y="570" fontSize="10" fill="#1e3a8a">COBERTURA REGIONAL</text>
        </g>

        {/* GRUPO MAPA */}
        <g>
            {REGIONS.map((region) => (
                <g key={region.id}
                   onMouseMove={(e) => handleMouseMove(e, region)}
                   onMouseEnter={(e) => {
                       // Efecto Hover: Cambia a rojo y sube el borde
                       e.currentTarget.querySelector('.region-base').style.fill = "url(#landGradient)"; // Mantener textura o cambiar
                       e.currentTarget.querySelector('.region-overlay').style.fill = highlightColor;
                       e.currentTarget.querySelector('.region-overlay').style.opacity = "0.6";
                   }}
                   onMouseLeave={(e) => {
                       // Reset
                       e.currentTarget.querySelector('.region-overlay').style.fill = "transparent";
                       e.currentTarget.querySelector('.region-overlay').style.opacity = "0";
                   }}
                   style={{cursor: 'pointer'}}
                >
                    {/* 1. Capa Base (Tierra + Gradiente) */}
                    <path
                        className="region-base"
                        d={region.path}
                        fill="url(#landGradient)"
                        stroke="none"
                    />
                    
                    {/* 2. Capa Textura (Relieve) */}
                    <path
                        d={region.path}
                        fill="#a8a29e"
                        style={{ mixBlendMode: 'multiply', opacity: 0.5, pointerEvents: 'none' }}
                        filter="url(#geo-relief-v2)"
                    />

                    {/* 3. Borde Regional */}
                    <path
                        d={region.path}
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth="0.5"
                        style={{pointerEvents: 'none'}}
                    />

                    {/* 4. Capa Interactiva (Hover Overlay) */}
                    <path
                        className="region-overlay"
                        d={region.path}
                        fill="transparent"
                        style={{ transition: 'fill 0.2s ease, opacity 0.2s ease', opacity: 0 }}
                    />
                </g>
            ))}
        </g>

        {/* Santiago (Destacado fijo) */}
        <circle cx="224" cy="195" r="3" fill="#EE3123" stroke="white" strokeWidth="1" pointerEvents="none" />

      </svg>
    </div>
  );
};

export default ChileMap;