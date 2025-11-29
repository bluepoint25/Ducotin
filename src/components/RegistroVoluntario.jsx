import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORTAR useNavigate
import { User, CheckCircle, Heart, AlertCircle, XCircle, MapPin, BookOpen, Activity } from 'lucide-react';

// Listado basado en Codigo.Instituto.csv
const INSTITUTOS_TELETON = [
  "Instituto Arica", "Instituto Iquique", "Instituto Antofagasta", "Instituto Calama", 
  "Instituto Atacama", "Instituto Coquimbo", "Instituto Valparaíso", "Instituto Santiago", 
  "Instituto Talca", "Instituto Concepción", "Instituto Temuco", "Instituto Valdivia", 
  "Instituto Puerto Montt", "Instituto Aysén", "Instituto Coyhaique"
];

const RegistroVoluntario = ({ onGuardar, baseDeDatos }) => {
    
    const navigate = useNavigate(); // <--- 2. INICIALIZAR EL HOOK DE NAVEGACIÓN
    
    // Estado Expandido según Ficha.Persona.csv
    const [nuevoVoluntario, setNuevoVoluntario] = useState({
        rut: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        genero: '',
        estadoCivil: '',
        
        // Contacto y Ubicación
        region: '',
        comuna: '',
        direccion: '',
        email: '',
        telefono: '',
        instituto: '', // Asignación de centro
        
        // Perfil
        nivelEducacional: '',
        ocupacion: '',
        tipoVoluntariado: 'Campaña',
        
        // Logística y Salud
        tallaPolera: 'M',
        enfermedades: '', // Nuevo: Info médica vital
        medicamentos: '',
        contactoEmergenciaNombre: '',
        contactoEmergenciaTelefono: '',
        
        esExPaciente: false
    });

    const [errores, setErrores] = useState({});
    const [modal, setModal] = useState({ show: false, type: 'success', title: '', message: '' });

    const formatearRutInput = (rutRaw) => {
        let valor = rutRaw.replace(/\./g, '').replace(/-/g, '');
        if (valor.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
            valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
        } else if (valor.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
            valor = valor.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
        }
        return valor;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let valorFinal = type === 'checkbox' ? checked : value;

        if (name === 'rut') {
            valorFinal = formatearRutInput(value);
        }

        setNuevoVoluntario(prev => ({ ...prev, [name]: valorFinal }));

        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: null }));
        }
    };

    const calcularEdad = (fecha) => {
        const hoy = new Date();
        const nacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    };

    // --- VALIDACIÓN ROBUSTA (sin cambios) ---
    const validarFormulario = () => {
        const nuevosErrores = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 1. Identificación
        if (!nuevoVoluntario.nombres.trim()) nuevosErrores.nombres = "Nombres obligatorios.";
        if (!nuevoVoluntario.apellidoPaterno.trim()) nuevosErrores.apellidoPaterno = "Apellido Paterno obligatorio.";
        if (!nuevoVoluntario.rut.trim() || nuevoVoluntario.rut.length < 8) nuevosErrores.rut = "RUT inválido.";
        
        if (!nuevoVoluntario.fechaNacimiento) {
            nuevosErrores.fechaNacimiento = "Fecha requerida.";
        } else {
            const edad = calcularEdad(nuevoVoluntario.fechaNacimiento);
            if (edad < 18) nuevosErrores.fechaNacimiento = `Debes ser mayor de 18 años (Tienes ${edad}).`;
        }

        // 2. Ubicación
        if (!nuevoVoluntario.region) nuevosErrores.region = "Seleccione Región.";
        if (!nuevoVoluntario.instituto) nuevosErrores.instituto = "Seleccione Instituto de preferencia.";
        if (!nuevoVoluntario.direccion.trim()) nuevosErrores.direccion = "Dirección requerida.";

        // 3. Contacto
        if (!nuevoVoluntario.email.trim() || !emailRegex.test(nuevoVoluntario.email)) nuevosErrores.email = "Email inválido.";
        if (!nuevoVoluntario.telefono.trim()) nuevosErrores.telefono = "Teléfono requerido.";
        
        // 4. Seguridad
        if (!nuevoVoluntario.contactoEmergenciaNombre.trim()) nuevosErrores.contactoEmergenciaNombre = "Contacto emergencia requerido.";
        if (!nuevoVoluntario.contactoEmergenciaTelefono.trim()) nuevosErrores.contactoEmergenciaTelefono = "Teléfono emergencia requerido.";

        // 5. Duplicados
        if (!nuevosErrores.rut && baseDeDatos) {
            if (baseDeDatos.some(vol => vol.rut === nuevoVoluntario.rut)) nuevosErrores.rut = "RUT ya registrado.";
        }
        if (!nuevosErrores.email && baseDeDatos) {
            if (baseDeDatos.some(vol => vol.email?.toLowerCase() === nuevoVoluntario.email.toLowerCase())) nuevosErrores.email = "Email ya registrado.";
        }

        return nuevosErrores;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresEncontrados = validarFormulario();

        if (Object.keys(erroresEncontrados).length > 0) {
            setErrores(erroresEncontrados);
            setModal({
                show: true, type: 'error', title: 'Datos Incompletos',
                message: 'Por favor corrija los campos marcados en rojo antes de continuar.'
            });
        } else {
            setModal({
                show: true, type: 'success', title: '¡Registro Exitoso!',
                message: `Bienvenido/a ${nuevoVoluntario.nombres}. Tu ficha ha sido creada y asociada al ${nuevoVoluntario.instituto}.`
            });
        }
    };

    // <--- 3. MODIFICAR la función cerrarModal para redireccionar
    const cerrarModal = () => {
        if (modal.type === 'success') {
            // Combinar nombres para la vista simple de la tabla (compatibilidad con Dashboard existente)
            const dataParaGuardar = {
                ...nuevoVoluntario,
                nombre: `${nuevoVoluntario.nombres} ${nuevoVoluntario.apellidoPaterno}`,
                edad: calcularEdad(nuevoVoluntario.fechaNacimiento),
                // Valores por defecto para compatibilidad con la tabla simple
                habilidad: 'General', 
                estado: 'Pendiente',
                antiguedad: 0
            };
            
            // Llama a onGuardar (en App.jsx) y captura el ID retornado
            const newVoluntarioId = onGuardar(dataParaGuardar); 

            // Redirige a la ficha con el ID del voluntario recién creado
            navigate(`/voluntario/${newVoluntarioId}`);
        }
        setModal({ ...modal, show: false });
    };

    return (
        <div className="register-container fade-in">
            {/* MODAL */}
            {modal.show && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ borderColor: modal.type === 'success' ? '#15803D' : '#DC2626' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                            {modal.type === 'success' ? <CheckCircle size={48} color="#15803D" /> : <XCircle size={48} color="#DC2626" />}
                        </div>
                        <h3 className="modal-title">{modal.title}</h3>
                        <p className="modal-text">{modal.message}</p>
                        <button onClick={cerrarModal} className="modal-btn" style={{ backgroundColor: modal.type === 'success' ? '#15803D' : '#DC2626' }}>
                            Aceptar
                        </button>
                    </div>
                </div>
            )}

            <div className="search-box" style={{ borderLeft: '5px solid #2563EB' }}>
                <div className="register-header">
                    <h2 className="register-title"><User className="icon-blue" size={28} color="#2563EB"/> Ficha Única de Voluntario</h2>
                    <p className="register-subtitle">Formulario oficial de ingreso según normativa vigente.</p>
                </div>
                
                <form onSubmit={handleSubmit} noValidate>
                    
                    {/* 1. IDENTIFICACIÓN PERSONAL */}
                    <div className="form-section">
                        <h3 className="section-title">1. Identificación Personal</h3>
                        <div className="form-grid">
                            <div className="input-group">
                                <label className="input-label">RUT</label>
                                <input name="rut" value={nuevoVoluntario.rut} onChange={handleInputChange} className={`input-field ${errores.rut ? 'input-error' : ''}`} placeholder="12.345.678-9" maxLength="12"/>
                                {errores.rut && <span className="error-msg"><AlertCircle size={12}/> {errores.rut}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Nombres</label>
                                <input name="nombres" value={nuevoVoluntario.nombres} onChange={handleInputChange} className={`input-field ${errores.nombres ? 'input-error' : ''}`} />
                                {errores.nombres && <span className="error-msg"><AlertCircle size={12}/> {errores.nombres}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Apellido Paterno</label>
                                <input name="apellidoPaterno" value={nuevoVoluntario.apellidoPaterno} onChange={handleInputChange} className={`input-field ${errores.apellidoPaterno ? 'input-error' : ''}`} />
                                {errores.apellidoPaterno && <span className="error-msg"><AlertCircle size={12}/> {errores.apellidoPaterno}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Apellido Materno</label>
                                <input name="apellidoMaterno" value={nuevoVoluntario.apellidoMaterno} onChange={handleInputChange} className="input-field" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Fecha Nacimiento</label>
                                <input type="date" name="fechaNacimiento" value={nuevoVoluntario.fechaNacimiento} onChange={handleInputChange} className={`input-field ${errores.fechaNacimiento ? 'input-error' : ''}`} />
                                {errores.fechaNacimiento && <span className="error-msg"><AlertCircle size={12}/> {errores.fechaNacimiento}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Género</label>
                                <select name="genero" value={nuevoVoluntario.genero} onChange={handleInputChange} className="input-field">
                                    <option value="">Seleccione...</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="No Binario">No Binario</option>
                                    <option value="Prefiero no decir">Prefiero no decir</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 2. UBICACIÓN Y CONTACTO */}
                    <div className="form-section">
                        <h3 className="section-title"><MapPin size={18} style={{marginRight: '5px'}}/> Ubicación y Contacto</h3>
                        <div className="form-grid">
                            <div className="input-group">
                                <label className="input-label">Región</label>
                                <select name="region" value={nuevoVoluntario.region} onChange={handleInputChange} className={`input-field ${errores.region ? 'input-error' : ''}`}>
                                    <option value="">Seleccione...</option>
                                    <option value="Metropolitana">Metropolitana</option>
                                    <option value="Valparaíso">Valparaíso</option>
                                    <option value="Biobío">Biobío</option>
                                    <option value="Antofagasta">Antofagasta</option>
                                    <option value="Coquimbo">Coquimbo</option>
                                    <option value="Araucanía">Araucanía</option>
                                    <option value="Los Lagos">Los Lagos</option>
                                    {/* Agrega más regiones si es necesario */}
                                </select>
                                {errores.region && <span className="error-msg"><AlertCircle size={12}/> {errores.region}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Comuna</label>
                                <input name="comuna" value={nuevoVoluntario.comuna} onChange={handleInputChange} className="input-field" placeholder="Ej: Providencia" />
                            </div>
                            <div className="input-group full-width">
                                <label className="input-label">Dirección Particular</label>
                                <input name="direccion" value={nuevoVoluntario.direccion} onChange={handleInputChange} className={`input-field ${errores.direccion ? 'input-error' : ''}`} placeholder="Calle, Número, Depto" />
                                {errores.direccion && <span className="error-msg"><AlertCircle size={12}/> {errores.direccion}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Email</label>
                                <input type="email" name="email" value={nuevoVoluntario.email} onChange={handleInputChange} className={`input-field ${errores.email ? 'input-error' : ''}`} />
                                {errores.email && <span className="error-msg"><AlertCircle size={12}/> {errores.email}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Teléfono Móvil</label>
                                <input type="tel" name="telefono" value={nuevoVoluntario.telefono} onChange={handleInputChange} className={`input-field ${errores.telefono ? 'input-error' : ''}`} />
                                {errores.telefono && <span className="error-msg"><AlertCircle size={12}/> {errores.telefono}</span>}
                            </div>
                        </div>
                    </div>

                    {/* 3. PERFIL Y ASIGNACIÓN */}
                    <div className="form-section">
                        <h3 className="section-title"><BookOpen size={18} style={{marginRight: '5px'}}/> Perfil y Asignación</h3>
                        <div className="form-grid">
                            <div className="input-group full-width">
                                <label className="input-label">Instituto Teletón de Preferencia</label>
                                <select name="instituto" value={nuevoVoluntario.instituto} onChange={handleInputChange} className={`input-field ${errores.instituto ? 'input-error' : ''}`}>
                                    <option value="">Seleccione el centro más cercano...</option>
                                    {INSTITUTOS_TELETON.map((inst, idx) => (
                                        <option key={idx} value={inst}>{inst}</option>
                                    ))}
                                </select>
                                <span className="input-helper">Sede principal donde realizarás tu voluntariado.</span>
                                {errores.instituto && <span className="error-msg"><AlertCircle size={12}/> {errores.instituto}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Nivel Educacional</label>
                                <select name="nivelEducacional" value={nuevoVoluntario.nivelEducacional} onChange={handleInputChange} className="input-field">
                                    <option value="Media Completa">Media Completa</option>
                                    <option value="Técnica Incompleta">Técnica Incompleta</option>
                                    <option value="Técnica Completa">Técnica Completa</option>
                                    <option value="Universitaria Incompleta">Universitaria Incompleta</option>
                                    <option value="Universitaria Completa">Universitaria Completa</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Ocupación / Carrera</label>
                                <input name="ocupacion" value={nuevoVoluntario.ocupacion} onChange={handleInputChange} className="input-field" placeholder="Ej: Estudiante de Enfermería" />
                            </div>
                        </div>
                    </div>

                    {/* 4. SALUD Y SEGURIDAD */}
                    <div className="form-section">
                        <h3 className="section-title"><Activity size={18} style={{marginRight: '5px'}}/> Salud y Seguridad</h3>
                        <div className="form-grid">
                            <div className="input-group">
                                <label className="input-label">Nombre Contacto Emergencia</label>
                                <input name="contactoEmergenciaNombre" value={nuevoVoluntario.contactoEmergenciaNombre} onChange={handleInputChange} className={`input-field ${errores.contactoEmergenciaNombre ? 'input-error' : ''}`} />
                               {errores.contactoEmergenciaNombre && <span className="error-msg"><AlertCircle size={12}/> {errores.contactoEmergenciaNombre}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Teléfono Emergencia</label>
                                <input name="contactoEmergenciaTelefono" value={nuevoVoluntario.contactoEmergenciaTelefono} onChange={handleInputChange} className={`input-field ${errores.contactoEmergenciaTelefono ? 'input-error' : ''}`} placeholder="+56 9..." />
                               {errores.contactoEmergenciaTelefono && <span className="error-msg"><AlertCircle size={12}/> {errores.contactoEmergenciaTelefono}</span>}
                            </div>
                            <div className="input-group">
                                <label className="input-label">Enfermedades / Alergias</label>
                                <input name="enfermedades" value={nuevoVoluntario.enfermedades} onChange={handleInputChange} className="input-field" placeholder="Ninguna o especificar..." />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Talla de Polera</label>
                                <select name="tallaPolera" value={nuevoVoluntario.tallaPolera} onChange={handleInputChange} className="input-field">
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="special-checkbox-wrapper">
                        <label className="special-label">
                            <input type="checkbox" name="esExPaciente" checked={nuevoVoluntario.esExPaciente} onChange={handleInputChange} className="checkbox-input" />
                            <div><span style={{display: 'block'}}>¿Fue paciente de Teletón anteriormente?</span></div>
                            {nuevoVoluntario.esExPaciente && <Heart size={20} fill="#DC2626" color="#DC2626" />}
                        </label>
                    </div>

                    <button type="submit" className="btn-ver-ficha btn-save">
                        <CheckCircle size={20} /> Guardar Ficha Oficial
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistroVoluntario;