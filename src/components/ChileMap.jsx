import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// [Importante] Necesitan un archivo GeoJSON del mapa de Chile. 
// Para el Botathon, pueden usar un enlace público o incluir el archivo
// directamente en /src/data/chile.json.
// Por ahora, usaremos un placeholder de URL.
const CHILE_TOPO_JSON = "/chile_regions.json"; // Reemplazar con su ruta GeoJSON de Chile

// Colores de Teletón
const TELETON_RED = '#EE3123';
const TELETON_LIGHT_GREY = '#F8F8F8';
const TELETON_DARK_TEXT = '#333333';

// ** Datos de Ejemplo (MOCK DATA) **
// Cuando el backend (PostgreSQL) esté listo, reemplazarán esto con datos reales.
const mockVolunteersByRegion = [
  { region: "Región Metropolitana", count: 4500 },
  { region: "Biobío", count: 1800 },
  { region: "Valparaíso", count: 1200 },
  { region: "Coquimbo", count: 700 },
  { region: "Tarapacá", count: 250 },
  // ... más regiones con sus conteos
];

// Función para obtener el color basado en la densidad
const getColorScale = (count) => {
  if (count > 4000) return TELETON_RED; // Rojo Intenso (Alta densidad)
  if (count > 1500) return "#fa8d8d";  // Rojo Medio
  if (count > 500) return "#fbd8d8";   // Rojo Claro
  return TELETON_LIGHT_GREY;           // Sin datos o muy baja densidad
};


const ChileMap = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1500, // Ajustar escala para Chile
          center: [-71, -35] // Ajustar centro
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={CHILE_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Buscamos el dato de voluntario por el nombre de la región
                const regionName = geo.properties.REGION_NAME; // Reemplazar con la propiedad real de su GeoJSON
                const regionData = mockVolunteersByRegion.find(
                  (d) => d.region === regionName
                );
                const fillColor = regionData ? getColorScale(regionData.count) : TELETON_LIGHT_GREY;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: fillColor,
                        stroke: TELETON_DARK_TEXT,
                        strokeWidth: 0.5,
                        outline: "none"
                      },
                      hover: {
                        fill: TELETON_RED,
                        outline: "none"
                      },
                      pressed: {
                        fill: TELETON_RED,
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default ChileMap;