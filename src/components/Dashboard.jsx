import React from 'react';
import { 
    LineChart, Line, BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell 
} from 'recharts';
import { User, Users } from 'lucide-react';
import Calendario from './Calendario'; 

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

// --- DATOS SIMULADOS ---
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

const dataGenero = [
    { name: 'Mujeres', value: 65 },
    { name: 'Hombres', value: 35 }
];

const ultimosInscritos = [
    { id: 1, nombre: 'Ana Martínez López', tipo: 'Permanente', fecha: '28 Nov 2025', avatar: 'AM' },
    { id: 2, nombre: 'Carlos Silva', tipo: 'De Campaña', fecha: '27 Nov 2025', avatar: 'CS' },
    { id: 3, nombre: 'Beatriz Riquelme', tipo: 'De Campaña', fecha: '26 Nov 2025', avatar: 'BR' },
    { id: 4, nombre: 'Jorge Muñoz', tipo: 'Permanente', fecha: '25 Nov 2025', avatar: 'JM' },
    { id: 5, nombre: 'Luisa Tapia', tipo: 'De Campaña', fecha: '24 Nov 2025', avatar: 'LT' },
];

const Dashboard = ({ voluntarios = [] }) => {

    // --- CÁLCULOS DINÁMICOS ---
    const countActivos = voluntarios.filter(v => v.estado === 'Activo').length;
    const countPermanentes = voluntarios.filter(v => v.tipoVoluntariado === 'Permanente').length;
    const countCampana = voluntarios.filter(v => v.tipoVoluntariado === 'Campaña').length;
    const countExVoluntarios = voluntarios.filter(v => v.estado === 'Inactivo' || v.estado === 'Baja').length;

    const s = {
        container: {
            backgroundColor: COLORS.BG_GREY,
            minHeight: '100vh',
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            padding: '30px 40px',
        },
        mainContent: {
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px', // Más espacio entre filas
        },
        // --- LAYOUT DE GRID (FILAS) ---
        gridRow: {
            display: 'grid',
            gridTemplateColumns: '2fr 1.2fr 0.9fr', 
            gap: '25px', // Más espacio entre columnas
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
            // AUMENTADO SIGNIFICATIVAMENTE:
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
            padding: '20px', // Más padding interno
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        
        // --- ESTILOS INTERNOS ---
        distribucionWrapper: {
            display: 'flex',
            gap: '20px',
            height: '100%',
        },
        subChartContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        subHeader: {
            backgroundColor: COLORS.GRAY_HEADER,
            color: COLORS.TEXT_MAIN,
            padding: '8px',
            borderRadius: '15px',
            fontSize: '0.75rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '15px',
            textTransform: 'uppercase',
        },
        
        // Avatar
        avatar: {
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            marginRight: '12px',
            objectFit: 'cover',
            backgroundColor: COLORS.BLUE_DARK,
            color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem'
        },

        // Contadores
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            height: '100%',
        },
        statBox: {
            padding: '15px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
            minHeight: '130px' // Más altura para cada contador
        },
        statNumber: {
            fontSize: '2rem', // Números grandes
            fontWeight: '800',
            color: '#111827',
            lineHeight: '1.2',
            marginTop: '8px',
            marginBottom: '8px'
        },
        statLabel: {
            fontSize: '0.75rem',
            color: '#4B5563',
            fontWeight: '600',
            textTransform: 'capitalize',
            marginBottom: '4px'
        },
        statSub: {
            fontSize: '0.7rem', 
            fontWeight: '600',
            marginTop: 'auto'
        }
    };

    return (
        <div style={s.container}>
            <div style={s.mainContent}>
                
                {/* ================= FILA SUPERIOR ================= */}
                <div style={s.gridRow}>
                    
                    {/* 1. DISTRIBUCIÓN (Doble Gráfico) */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>DISTRIBUCIÓN DE VOLUNTARIO</div>
                        <div style={s.cardBody}>
                            <div style={s.distribucionWrapper}>
                                {/* Gráfico Izquierda */}
                                <div style={s.subChartContainer}>
                                    <div style={s.subHeader}>SEGMENTACIÓN POR TIPO</div>
                                    <div style={{flex: 1, minHeight: '250px'}}> {/* Altura mínima explícita para gráfico */}
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={dataSegmentacion} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                                <XAxis dataKey="year" fontSize={11} axisLine={false} tickLine={false} dy={10} />
                                                <Tooltip contentStyle={{fontSize:'12px'}}/>
                                                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                                <Line type="monotone" dataKey="voluntarios" stroke={COLORS.RED} strokeWidth={2} dot={{r:3}} name="Voluntarios" />
                                                <Line type="monotone" dataKey="campana" stroke={COLORS.BLUE_DARK} strokeWidth={2} dot={{r:3}} name="Campaña" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                {/* Gráfico Derecha */}
                                <div style={s.subChartContainer}>
                                    <div style={s.subHeader}>CRECIMIENTO MENSUAL</div>
                                    <div style={{flex: 1, minHeight: '250px'}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={dataCrecimiento} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                                <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                                                <Tooltip contentStyle={{fontSize:'12px'}} cursor={{fill: 'transparent'}} />
                                                <Bar dataKey="valor" fill="#991B1B" radius={[2, 2, 0, 0]} name="Altas" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. REVENUE / RETENCIÓN */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>REVENUE INCREASE FROM EXISTING CUSTOMERS</div>
                        <div style={s.cardBody}>
                            <div style={{flex: 1, minHeight: '280px'}}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={dataRetencion} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee"/>
                                        <XAxis dataKey="quarter" fontSize={12} axisLine={false} tickLine={false} dy={10}/>
                                        <Tooltip contentStyle={{fontSize:'12px'}}/>
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', top: 0 }}/>
                                        <Line type="monotone" dataKey="nuevos" name="Referral" stroke="#F59E0B" strokeWidth={3} dot={{r:4}} />
                                        <Line type="monotone" dataKey="recurrentes" name="Direct Lead" stroke="#854d0e" strokeWidth={3} dot={{r:4}} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* 3. EVENTOS (Calendarios) */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>EVENTOS TELETÓN</div>
                        <div style={{...s.cardBody, gap: '15px', justifyContent: 'flex-start'}}>
                            <div style={{display:'flex', gap:'10px', width: '100%', height: '160px'}}>
                                <div style={{flex:1}}><Calendario etiqueta="Teletón" /></div>
                                <div style={{flex:1}}><Calendario etiqueta="Teletón" diasExtra={1} /></div>
                            </div>
                            <div style={{
                                backgroundColor: '#FF8E8E', 
                                color: 'white', 
                                padding: '20px', 
                                borderRadius: '10px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                gap: '15px',
                                marginTop: 'auto',
                                width: '100%',
                                boxSizing: 'border-box',
                                minHeight: '100px'
                            }}>
                                <Users size={32} />
                                <div style={{textAlign:'left', lineHeight:'1.1'}}>
                                    <div style={{fontWeight:'800', fontSize:'1.1rem'}}>Gran Teletón</div>
                                    <div style={{fontSize:'0.9rem'}}>Cadena nacional</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= FILA INFERIOR ================= */}
                <div style={s.gridRow}>
                    
                    {/* 4. LISTA VOLUNTARIOS */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>ULTIMOS VOLUNTARIOS INSCRITOS</div>
                        <div style={{...s.cardBody, padding: '0', overflowY: 'auto'}}> 
                            <div style={{padding: '25px', height: '100%', backgroundColor: '#7f1d1d', minHeight: '350px'}}> 
                                <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', color:'white', fontWeight:'bold', marginBottom:'20px', paddingLeft:'10px', fontSize:'0.95rem'}}>
                                    <span>Nombre</span>
                                    <span>Tipo</span>
                                    <span>Fecha inscripcion</span>
                                </div>
                                
                                <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                                    {ultimosInscritos.map((v, i) => (
                                        <div key={v.id} style={{display:'grid', gridTemplateColumns: '2fr 1fr 1fr', alignItems:'center', color:'white'}}>
                                            <div style={{display:'flex', alignItems:'center'}}>
                                                <div style={{...s.avatar, border: '2px solid rgba(255,255,255,0.3)'}}>{v.avatar}</div>
                                                <span style={{fontSize:'0.9rem', fontWeight:'500'}}>{v.nombre}</span>
                                            </div>
                                            <span style={{fontSize:'0.85rem', opacity:0.9}}>{v.tipo}</span>
                                            <span style={{fontSize:'0.85rem', opacity:0.9}}>{v.fecha}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. GÉNERO (Dona) */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>ESTATUS GÉNERO</div>
                        <div style={{...s.cardBody, justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                            <div style={{width:'100%', height:'280px', flex: 1}}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={dataGenero}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80} 
                                            outerRadius={110}
                                            paddingAngle={0}
                                            dataKey="value"
                                        >
                                            <Cell fill={COLORS.FEMALE_PINK} /> 
                                            <Cell fill="#7f1d1d" /> 
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{display:'flex', gap:'25px', paddingBottom: '10px'}}>
                                <div style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.85rem', fontWeight:'bold', color:'#374151'}}>
                                    <span style={{width:12, height:12, borderRadius:'50%', backgroundColor: COLORS.FEMALE_PINK, display:'inline-block'}}></span>
                                    Mujeres Voluntarias
                                </div>
                                <div style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.85rem', fontWeight:'bold', color:'#374151'}}>
                                    <span style={{width:12, height:12, borderRadius:'50%', backgroundColor: '#7f1d1d', display:'inline-block'}}></span>
                                    Hombres Voluntarios
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. CONTADORES (KPIs) */}
                    <div style={s.card}>
                        <div style={s.cardHeader}>CONTADOR VOLUNTARIOS TELETÓN</div>
                        <div style={s.cardBody}>
                            <div style={s.statsGrid}>
                                
                                {/* Activos */}
                                <div style={{...s.statBox, backgroundColor: '#DCFCE7'}}> 
                                    <span style={s.statLabel}>Voluntarios Activos</span>
                                    <span style={s.statNumber}>{countActivos}</span>
                                    <span style={{...s.statSub, color: COLORS.SUCCESS}}>+18% +3.0k</span>
                                </div>

                                {/* Permanentes */}
                                <div style={{...s.statBox, backgroundColor: '#FEF9C3'}}> 
                                    <span style={s.statLabel}>Permanentes</span>
                                    <span style={s.statNumber}>{countPermanentes}</span>
                                    <span style={{...s.statSub, color: COLORS.SUCCESS}}>+18% +2.8k</span>
                                </div>

                                {/* Campaña */}
                                <div style={{...s.statBox, backgroundColor: '#EFF6FF'}}> 
                                    <span style={s.statLabel}>De Campaña</span>
                                    <span style={s.statNumber}>{countCampana}</span>
                                    <span style={{...s.statSub, color: COLORS.SUCCESS}}>+18% +7.8k</span>
                                </div>

                                {/* Ex Voluntarios */}
                                <div style={{...s.statBox, backgroundColor: '#FEE2E2'}}> 
                                    <span style={s.statLabel}>Ex voluntarios</span>
                                    <span style={s.statNumber}>{countExVoluntarios}</span>
                                    <span style={{...s.statSub, color: '#DC2626'}}>+18% +1.2k</span>
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