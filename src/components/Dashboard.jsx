import React, { useState, useEffect } from 'react'; // <--- AGREGADO: Hooks de React para API
import { 
    LineChart, Line, BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell 
} from 'recharts';
import { User, Users } from 'lucide-react';
import Calendario from './Calendario'; 
import ChileMap from './ChileMap'; // <--- Integración del Mapa SVG

// ==========================================================
// 🚨 CONEXIÓN A API SPRING BOOT
// Ajusta el HOST y el PUERTO según donde esté corriendo tu API
// ==========================================================
const API_BASE_URL = 'http://localhost:8080/api/v1/voluntarios'; 

// --- PALETA DE COLORES TELETÓN ---
const COLORS = {
    RED: '#EE3123',
    RED_DARK: '#B91C1C',
    BLUE_DARK: '#263259',
    WHITE: '#FFFFFF',
    BG_GREY: '#F3F4F6',
    TEXT_MAIN: '#1F2937',
    TEXT_LIGHT: '#6B7280',
    SUCCESS: '#10B981',
    FEMALE_PINK: '#F472B6',
    GRAY_HEADER: '#E5E7EB'
};

// --- DATOS SIMULADOS (MOCK DATA) --- (Se mantienen para gráficos no conectados al API)
const dataSegmentacion = [
    { year: '2020', voluntarios: 400, campana: 240 },
    { year: '2021', voluntarios: 300, campana: 139 },
    { year: '2022', voluntarios: 500, campana: 600 },
    { year: '2023', voluntarios: 280, campana: 390 },
    { year: '2024', voluntarios: 590, campana: 480 },
];

const dataCrecimiento = [
    { month: 'Ene', valor: 20 }, { month: 'Feb', valor: 30 }, { month: 'Mar', valor: 35 },
    { month: 'Abr', valor: 30 }, { month: 'May', valor: 50 }, { month: 'Jun', valor: 52 },
    { month: 'Jul', valor: 36 }, { month: 'Ago', valor: 25 }, { month: 'Sep', valor: 30 },
    { month: 'Oct', valor: 56 }, { month: 'Nov', valor: 57 }, { month: 'Dic', valor: 55 },
];

const dataRetencion = [
    { quarter: 'Q1', nuevos: 20, recurrentes: 50 },
    { quarter: 'Q2', nuevos: 35, recurrentes: 51 },
    { quarter: 'Q3', nuevos: 50, recurrentes: 62 },
    { quarter: 'Q4', nuevos: 53, recurrentes: 70 },
];

const Dashboard = ({ voluntarios = [] }) => {

    // --- ESTADOS PARA LA API ---
    // Inicializamos con 0 y objeto vacío para evitar errores de null
    const [metricas, setMetricas] = useState({ totalVoluntarios: 0, distribucionGeografica: {} });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    // Desestructuración de los datos que vienen de Spring Boot
    const { totalVoluntarios, distribucionGeografica } = metricas; 


    /**
     * Hook para cargar las métricas del dashboard desde el endpoint /metricas (RF-05)
     */
    useEffect(() => {
        async function obtenerMetricas() {
            try {
                // Llama al endpoint GET /api/v1/voluntarios/metricas
                const response = await fetch(`${API_BASE_URL}/metricas`); 
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                // Data esperada: { totalVoluntarios: N, distribucionGeografica: {Region: Count} }
                setMetricas(data); 
                
            } catch (err) {
                console.error("Fallo la carga de métricas:", err);
                setError("No fue posible conectar con la API o hubo un error en el servidor. Verifique que la API esté corriendo en el puerto 8080.");
                
            } finally {
                setCargando(false); 
            }
        }

        obtenerMetricas();
    }, []); 

    // --- CÁLCULOS DINÁMICOS (Basados en el Prop 'voluntarios') ---
    // NOTA: Estas métricas seguirán mostrando 0 si no se pasan datos al prop 'voluntarios'.
    const countActivos = voluntarios.filter(v => v.estado === 'Activo').length;
    const countPermanentes = voluntarios.filter(v => v.tipoVoluntariado === 'Permanente').length;
    const countCampana = voluntarios.filter(v => v.tipoVoluntariado === 'Campaña').length;
    const countExVoluntarios = voluntarios.filter(v => v.estado === 'Inactivo' || v.estado === 'Baja').length;

    const countMujeres = voluntarios.filter(v => v.genero === 'Femenino' || v.genero === 'Mujer').length;
    const countHombres = voluntarios.filter(v => v.genero === 'Masculino' || v.genero === 'Hombre').length;
    
    const dataGeneroDinamic = [
        { name: 'Mujeres', value: countMujeres, color: COLORS.FEMALE_PINK },
        { name: 'Hombres', value: countHombres, color: '#7f1d1d' } // Mismo color que usas en el código
    ];

    // Últimos inscritos (Invertimos para ver los más nuevos primero)
    const ultimosInscritosDinamic = [...voluntarios].reverse().slice(0, 5).map(v => ({
        id: v.id,
        nombre: v.nombre,
        tipo: v.tipoVoluntariado,
        fecha: v.fechaRegistro || 'N/A', 
        avatar: v.nombre.charAt(0).toUpperCase()
    }));

    // --- ESTILOS --- (Se mantienen como los tenías)
    const s = {
        container: {
            backgroundColor: COLORS.BG_GREY,
            minHeight: '100vh',
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            padding: '30px 40px',
        },
        mainContent: {
            maxWidth: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px', 
        },
        // --- LAYOUT DE GRID SUPERIOR (Con Mapa) ---
        gridRowTop: {
            display: 'grid',
            // Dist | Mapa | TOTAL VOLUNTARIOS
            gridTemplateColumns: '1.8fr 1fr 1.2fr', 
            gap: '25px', 
            alignItems: 'stretch', 
        },
        // --- LAYOUT DE GRID INFERIOR ---
        gridRowBottom: {
            display: 'grid',
            // Eventos | Lista | Género | Contadores
            gridTemplateColumns: '0.8fr 1.5fr 1fr 1fr', 
            gap: '25px', 
            alignItems: 'stretch', 
        },
        
        // --- TARJETA BASE ---
        card: {
            backgroundColor: COLORS.WHITE,
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.06)',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            minHeight: '450px', 
        },
        cardHeader: {
            backgroundColor: '#FF6B6B',
            backgroundImage: `linear-gradient(to right, ${COLORS.RED}, #FF8E8E)`,
            color: COLORS.WHITE,
            padding: '15px 20px',
            fontSize: '0.9rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '0.5px',
        },
        cardBody: {
            padding: '20px', 
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
        },
        
        // --- ESTILOS INTERNOS ---
        distribucionWrapper: { display: 'flex', gap: '20px', height: '100%' },
        subChartContainer: { flex: 1, display: 'flex', flexDirection: 'column', height: '100%' },
        subHeader: { backgroundColor: COLORS.GRAY_HEADER, color: COLORS.TEXT_MAIN, padding: '8px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: '700', textAlign: 'center', marginBottom: '15px', textTransform: 'uppercase' },
        avatar: { width: '36px', height: '36px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover', backgroundColor: COLORS.BLUE_DARK, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' },
        statsGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '10px', height: '100%' },
        statBox: { padding: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%', minHeight: '80px' },
        statNumber: { fontSize: '1.8rem', fontWeight: '800', color: '#111827', lineHeight: '1.2', marginTop: '5px', marginBottom: '5px' },
        statLabel: { fontSize: '0.7rem', color: '#4B5563', fontWeight: '600', textTransform: 'capitalize', marginBottom: '4px' },
        statSub: { fontSize: '0.65rem', fontWeight: '600', marginTop: 'auto' }
    };


    // ==========================================================
    // RENDERIZADO DE ESTADO (Loading/Error)
    // ==========================================================
    if (cargando) {
        return (
            <div style={{...s.container, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
                <User size={40} color={COLORS.RED_DARK} style={{marginBottom: '10px'}}/>
                <div style={{color: COLORS.TEXT_MAIN, fontWeight: '600'}}>Cargando métricas de la API...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{...s.container, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
                <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: COLORS.RED_DARK, marginBottom: '10px'}}>
                    ⚠️ Error de Conexión
                </div>
                <div style={{color: COLORS.TEXT_MAIN, maxWidth: '400px', textAlign: 'center'}}>
                    {error}
                </div>
            </div>
        );
    }
    
    // ==========================================================
    // RENDERIZADO PRINCIPAL
    // ==========================================================
    return (
        <div style={s.container}>
            <div style={s.mainContent}>
                
                {/* ================= FILA SUPERIOR ================= */}
                <div style={s.gridRowTop}>
                    
                    {/* 1. DISTRIBUCIÓN DE DATOS SIMULADOS */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>DISTRIBUCIÓN DE VOLUNTARIO</div>
                        <div style={s.cardBody}>
                            <div style={s.distribucionWrapper}>
                                <div style={s.subChartContainer}>
                                    <div style={s.subHeader}>SEGMENTACIÓN (Simulado)</div>
                                    <div style={{flex: 1, minHeight: '250px'}}> 
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={dataSegmentacion}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                                <XAxis dataKey="year" fontSize={10} axisLine={false} tickLine={false} />
                                                <Tooltip contentStyle={{fontSize:'12px'}}/>
                                                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                                                <Line type="monotone" dataKey="voluntarios" stroke={COLORS.RED} strokeWidth={2} dot={{r:3}} />
                                                <Line type="monotone" dataKey="campana" stroke={COLORS.BLUE_DARK} strokeWidth={2} dot={{r:3}} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div style={s.subChartContainer}>
                                    <div style={s.subHeader}>CRECIMIENTO (Simulado)</div>
                                    <div style={{flex: 1, minHeight: '250px'}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={dataCrecimiento}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                                <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
                                                <Tooltip contentStyle={{fontSize:'12px'}} cursor={{fill: 'transparent'}} />
                                                <Bar dataKey="valor" fill="#991B1B" radius={[2, 2, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. MAPA DE CHILE (Integrado con distribucionGeografica) */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>COBERTURA NACIONAL</div>
                        <div style={{...s.cardBody, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <div style={{width: '100%', height: '100%', minHeight: '300px'}}>
                                {/* Pasamos los datos geográficos de la API al mapa */}
                                <ChileMap distribucion={distribucionGeografica} /> 
                            </div>
                        </div>
                    </div>

                    {/* 3. KPI TOTAL VOLUNTARIOS (Integrado con totalVoluntarios) */}
                    <div style={{...s.card, minHeight: '100%'}}>
                        <div style={{...s.cardHeader, backgroundColor: COLORS.BLUE_DARK, backgroundImage: 'none'}}>
                            TOTAL VOLUNTARIOS (API)
                        </div>
                        <div style={{...s.cardBody, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                            <Users size={80} color={COLORS.RED_DARK} strokeWidth={1.5} />
                            <p style={{fontSize: '5rem', fontWeight: '900', color: COLORS.RED_DARK, margin: '10px 0'}}>
                                {totalVoluntarios.toLocaleString('es-CL')} 
                            </p>
                            <p style={{fontSize: '1rem', color: COLORS.TEXT_LIGHT}}>
                                (Voluntarios históricos registrados por el Bot)
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= FILA INFERIOR ================= */}
                <div style={s.gridRowBottom}>
                    
                    {/* 4. EVENTOS */}
                    <div style={{...s.card, minHeight: '400px'}}>
                        <div style={s.cardHeader}>EVENTOS</div>
                        <div style={{...s.cardBody, gap: '10px'}}>
                            <div style={{display:'flex', flexDirection:'column', gap:'10px', width: '100%', height: '100%'}}>
                                <div style={{flex:1}}><Calendario etiqueta="Teletón" /></div>
                                <div style={{flex:1}}><Calendario etiqueta="Cierre" diasExtra={1} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 5. LISTA VOLUNTARIOS (Dinámica - se basa en el prop 'voluntarios') */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>ÚLTIMOS INSCRITOS</div>
                        <div style={{...s.cardBody, padding: '0', overflowY: 'auto'}}> 
                            <div style={{padding: '20px', height: '100%', backgroundColor: '#7f1d1d'}}> 
                                <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', color:'white', fontWeight:'bold', marginBottom:'15px', paddingLeft:'5px', fontSize:'0.8rem'}}>
                                    <span>Nombre</span>
                                    <span>Tipo</span>
                                    <span>Fecha</span>
                                </div>
                                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                                    {ultimosInscritosDinamic.map((v, i) => (
                                        <div key={v.id} style={{display:'grid', gridTemplateColumns: '2fr 1fr 1fr', alignItems:'center', color:'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px'}}>
                                            <div style={{display:'flex', alignItems:'center'}}>
                                                <div style={{...s.avatar, width:'28px', height:'28px', fontSize:'0.7rem'}}>{v.avatar}</div>
                                                <span style={{fontSize:'0.8rem', fontWeight:'500'}}>{v.nombre.split(' ')[0]} {v.nombre.split(' ')[1]?.charAt(0)}.</span>
                                            </div>
                                            <span style={{fontSize:'0.75rem', opacity:0.9}}>{v.tipo}</span>
                                            <span style={{fontSize:'0.75rem', opacity:0.9}}>{v.fecha}</span>
                                        </div>
                                    ))}
                                    {ultimosInscritosDinamic.length === 0 && <div style={{color:'white', textAlign:'center', fontSize:'0.8rem'}}>Sin datos</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. GÉNERO (Dinámico - se basa en el prop 'voluntarios') */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>GÉNERO</div>
                        <div style={{...s.cardBody, justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{width:'100%', height:'200px'}}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={dataGeneroDinamic} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={0} dataKey="value">
                                            {dataGeneroDinamic.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{display:'flex', flexDirection:'column', gap:'5px', width:'100%', paddingLeft:'10px'}}>
                                <div style={{display:'flex', alignItems:'center', gap:'5px', fontSize:'0.8rem', color:'#374151'}}>
                                    <span style={{width:10, height:10, borderRadius:'50%', backgroundColor: COLORS.FEMALE_PINK}}></span> Mujeres ({countMujeres})
                                </div>
                                <div style={{display:'flex', alignItems:'center', gap:'5px', fontSize:'0.8rem', color:'#374151'}}>
                                    <span style={{width:10, height:10, borderRadius:'50%', backgroundColor: '#7f1d1d'}}></span> Hombres ({countHombres})
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. CONTADORES (Dinámicos - se basa en el prop 'voluntarios') */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>KPIs (Basado en Prop)</div>
                        <div style={s.cardBody}>
                            <div style={s.statsGrid}>
                                <div style={{...s.statBox, backgroundColor: '#DCFCE7'}}> 
                                    <span style={s.statLabel}>Activos</span>
                                    <span style={s.statNumber}>{countActivos}</span>
                                </div>
                                <div style={{...s.statBox, backgroundColor: '#FEF9C3'}}> 
                                    <span style={s.statLabel}>Perm.</span>
                                    <span style={s.statNumber}>{countPermanentes}</span>
                                </div>
                                <div style={{...s.statBox, backgroundColor: '#EFF6FF'}}> 
                                    <span style={s.statLabel}>Campaña</span>
                                    <span style={s.statNumber}>{countCampana}</span>
                                </div>
                                <div style={{...s.statBox, backgroundColor: '#FEE2E2'}}> 
                                    <span style={s.statLabel}>Bajas</span>
                                    <span style={s.statNumber}>{countExVoluntarios}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;