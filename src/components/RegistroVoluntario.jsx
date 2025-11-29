import React, { useState } from 'react';
import { User, CheckCircle, Heart, ShieldAlert, AlertCircle, XCircle } from 'lucide-react';

const RegistroVoluntario = ({ onGuardar, baseDeDatos }) => { // Recibimos baseDeDatos
  
  // Estado del Formulario
  const [nuevoVoluntario, setNuevoVoluntario] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    region: '',
    edad: '',
    talla: 'M',
    contactoEmergencia: '',
    tipo: 'Campaña (27 Horas)',
    habilidad: 'Logística y Seguridad',
    disponibilidad: 'Fin de Semana Completo',
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

  // --- LÓGICA DE VALIDACIÓN ---
  const validarFormulario = () => {
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. Validaciones de Formato y Campos Vacíos
    if (!nuevoVoluntario.nombre.trim()) nuevosErrores.nombre = "El nombre completo es obligatorio.";
    else if (nuevoVoluntario.nombre.trim().length < 5) nuevosErrores.nombre = "Nombre muy corto.";

    if (!nuevoVoluntario.rut.trim()) nuevosErrores.rut = "El RUT es obligatorio.";
    else if (nuevoVoluntario.rut.length < 8) nuevosErrores.rut = "RUT incompleto.";

    if (!nuevoVoluntario.edad) nuevosErrores.edad = "Ingresa tu edad.";
    else if (Number(nuevoVoluntario.edad) < 18) nuevosErrores.edad = "Debes ser mayor de 18.";

    if (!nuevoVoluntario.region) nuevosErrores.region = "Debes seleccionar una región.";

    if (!nuevoVoluntario.email.trim()) nuevosErrores.email = "Correo obligatorio.";
    else if (!emailRegex.test(nuevoVoluntario.email)) nuevosErrores.email = "Formato inválido.";

    if (!nuevoVoluntario.telefono.trim()) nuevosErrores.telefono = "Teléfono obligatorio.";
    if (!nuevoVoluntario.contactoEmergencia.trim()) nuevosErrores.contactoEmergencia = "Contacto de emergencia obligatorio.";

    // 2. Validación de DUPLICADOS (Base de Datos)
    // Solo validamos duplicados si el formato del RUT/Email es correcto primero
    
    if (!nuevosErrores.rut && baseDeDatos) {
        const rutExiste = baseDeDatos.some(vol => vol.rut === nuevoVoluntario.rut);
        if (rutExiste) {
            nuevosErrores.rut = "Este RUT ya está registrado en el sistema.";
        }
    }

    if (!nuevosErrores.email && baseDeDatos) {
        // Comparamos emails en minúsculas para evitar errores (ej: GMAIL.COM vs gmail.com)
        const emailExiste = baseDeDatos.some(vol => vol.email && vol.email.toLowerCase() === nuevoVoluntario.email.toLowerCase());
        if (emailExiste) {
            nuevosErrores.email = "Este correo electrónico ya fue utilizado.";
        }
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresEncontrados = validarFormulario();

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      
      // Mensaje personalizado dependiendo del tipo de error
      let mensajeError = 'Por favor revisa los campos marcados en rojo.';
      if (erroresEncontrados.rut && erroresEncontrados.rut.includes('ya está registrado')) {
          mensajeError = 'El usuario ya existe. Verifica el RUT ingresado.';
      } else if (erroresEncontrados.email && erroresEncontrados.email.includes('ya fue utilizado')) {
          mensajeError = 'El correo ya está en uso por otro voluntario.';
      }

      setModal({
        show: true,
        type: 'error',
        title: 'No pudimos guardar',
        message: mensajeError
      });
    } else {
      setModal({
        show: true,
        type: 'success',
        title: '¡Ficha Validada!',
        message: `Excelente ${nuevoVoluntario.nombre}, tu postulación está lista. No hemos encontrado duplicados y los datos son correctos.`
      });
    }
  };

  const cerrarModal = () => {
    if (modal.type === 'success') {
      onGuardar(nuevoVoluntario);
    }
    setModal({ ...modal, show: false });
  };

  return (
    <div className="register-container fade-in">
        {/* MODAL POP UP */}
        {modal.show && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ borderColor: modal.type === 'success' ? '#15803D' : '#DC2626' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                {modal.type === 'success' ? <CheckCircle size={48} color="#15803D" /> : <XCircle size={48} color="#DC2626" />}
              </div>
              <h3 className="modal-title">{modal.title}</h3>
              <p className="modal-text">{modal.message}</p>
              <button 
                onClick={cerrarModal} 
                className="modal-btn"
                style={{ backgroundColor: modal.type === 'success' ? '#15803D' : '#DC2626' }}
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        <div className="search-box" style={{ borderLeft: '5px solid #2563EB' }}>
            <div className="register-header">
                <h2 className="register-title">
                    <User className="icon-blue" size={28} color="#2563EB"/>
                    Ficha de Postulación Voluntariado
                </h2>
                <p className="register-subtitle">Complete la ficha técnica para asignación de roles y logística.</p>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-section">
                    <h3 className="section-title">1. Información Personal y Logística</h3>
                    <div className="form-grid">
                        <div className="input-group full-width">
                            <label className="input-label">Nombre Completo</label>
                            <input name="nombre" value={nuevoVoluntario.nombre} onChange={handleInputChange} type="text" className={`input-field ${errores.nombre ? 'input-error' : ''}`} placeholder="Ej: Gabriela Soto Pérez" />
                            {errores.nombre && <span className="error-msg"><AlertCircle size={12}/> {errores.nombre}</span>}
                        </div>
                        
                        <div className="input-group">
                            <label className="input-label">RUT</label>
                            <input name="rut" value={nuevoVoluntario.rut} onChange={handleInputChange} type="text" className={`input-field ${errores.rut ? 'input-error' : ''}`} placeholder="Ej: 12.345.678-9" maxLength="12"/>
                            {errores.rut && <span className="error-msg"><AlertCircle size={12}/> {errores.rut}</span>}
                        </div>
                        
                        <div className="input-group" style={{ flexDirection: 'row', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label className="input-label">Edad</label>
                                <input name="edad" value={nuevoVoluntario.edad} onChange={handleInputChange} type="number" className={`input-field ${errores.edad ? 'input-error' : ''}`} style={{width: '100%'}} />
                                {errores.edad && <span className="error-msg"><AlertCircle size={12}/> {errores.edad}</span>}
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className="input-label">Talla Polera</label>
                                <select name="talla" value={nuevoVoluntario.talla} onChange={handleInputChange} className="input-field" style={{width: '100%'}}>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group full-width">
                            <label className="input-label">Región de Residencia</label>
                            <select name="region" value={nuevoVoluntario.region} onChange={handleInputChange} className={`input-field ${errores.region ? 'input-error' : ''}`}>
                                <option value="">Seleccione una región...</option>
                                <option value="Arica y Parinacota">Arica y Parinacota</option>
                                <option value="Tarapacá">Tarapacá</option>
                                <option value="Antofagasta">Antofagasta</option>
                                <option value="Atacama">Atacama</option>
                                <option value="Coquimbo">Coquimbo</option>
                                <option value="Valparaíso">Valparaíso</option>
                                <option value="Metropolitana">Metropolitana de Santiago</option>
                                <option value="O'Higgins">Libertador Gral. Bernardo O'Higgins</option>
                                <option value="Maule">Maule</option>
                                <option value="Ñuble">Ñuble</option>
                                <option value="Biobío">Biobío</option>
                                <option value="Araucanía">La Araucanía</option>
                                <option value="Los Ríos">Los Ríos</option>
                                <option value="Los Lagos">Los Lagos</option>
                                <option value="Aysén">Aysén del Gral. Carlos Ibáñez del Campo</option>
                                <option value="Magallanes">Magallanes y de la Antártica Chilena</option>
                            </select>
                            {errores.region && <span className="error-msg"><AlertCircle size={12}/> {errores.region}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="section-title">2. Contacto y Seguridad</h3>
                    <div className="form-grid">
                        <div className="input-group">
                            <label className="input-label">Correo Electrónico</label>
                            <input name="email" value={nuevoVoluntario.email} onChange={handleInputChange} type="email" className={`input-field ${errores.email ? 'input-error' : ''}`} placeholder="nombre@correo.com" />
                            {errores.email && <span className="error-msg"><AlertCircle size={12}/> {errores.email}</span>}
                        </div>
                        <div className="input-group">
                            <label className="input-label">Teléfono Móvil</label>
                            <input name="telefono" value={nuevoVoluntario.telefono} onChange={handleInputChange} type="tel" className={`input-field ${errores.telefono ? 'input-error' : ''}`} placeholder="+56 9 1234 5678" />
                            {errores.telefono && <span className="error-msg"><AlertCircle size={12}/> {errores.telefono}</span>}
                        </div>
                        <div className="input-group full-width" style={{ backgroundColor: '#FFF7ED', padding: '10px', borderRadius: '6px', border: '1px solid #FFEDD5' }}>
                            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <ShieldAlert size={16} color="#C2410C"/> Contacto de Emergencia
                            </label>
                            <input name="contactoEmergencia" value={nuevoVoluntario.contactoEmergencia} onChange={handleInputChange} type="text" className={`input-field ${errores.contactoEmergencia ? 'input-error' : ''}`} placeholder="Ej: Mamá - +56 9 8765 4321" />
                            {errores.contactoEmergencia && <span className="error-msg"><AlertCircle size={12}/> {errores.contactoEmergencia}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="section-title">3. Perfil Técnico</h3>
                    <div className="form-grid">
                        <div className="input-group full-width">
                            <label className="input-label">Tipo de Voluntariado</label>
                            <select name="tipo" value={nuevoVoluntario.tipo} onChange={handleInputChange} className="input-field" style={{ borderColor: '#2563EB', backgroundColor: '#EFF6FF' }}>
                                <option value="Campaña (27 Horas)">Voluntario de Campaña (Solo Evento 27 Horas)</option>
                                <option value="Permanente">Voluntario Permanente (Trabajo anual en Institutos)</option>
                                <option value="Profesional">Voluntario Profesional (Servicios Pro-bono)</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Habilidad / Área</label>
                            <select name="habilidad" value={nuevoVoluntario.habilidad} onChange={handleInputChange} className="input-field">
                                <optgroup label="Operaciones y Logística">
                                    <option value="Logística y Seguridad">Logística y Control de Accesos</option>
                                    <option value="Caja y Finanzas">Caja Auxiliar / Recaudación</option>
                                    <option value="Call Center">Telefonista / Call Center</option>
                                </optgroup>
                                <optgroup label="Atención y Salud">
                                    <option value="Accesibilidad">Accesibilidad y Traslado</option>
                                    <option value="Salud / Enfermería">Primeros Auxilios / Salud</option>
                                    <option value="Recreación">Recreación / Pintacaritas</option>
                                </optgroup>
                                <optgroup label="Soporte">
                                    <option value="Digital">Redes Sociales / Soporte Digital</option>
                                    <option value="Administrativo">Apoyo Administrativo</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Disponibilidad</label>
                            <select name="disponibilidad" value={nuevoVoluntario.disponibilidad} onChange={handleInputChange} className="input-field">
                                <option value="Fin de Semana Completo">Sábados y Domingos</option>
                                <option value="Sábados AM">Solo Sábados (Mañana)</option>
                                <option value="Días de Semana 18:00+">Días de semana (Horario Vespertino)</option>
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
                    {nuevoVoluntario.esExPaciente && (
                        <div className="special-message">Tu experiencia es inspiración. Tu ficha tendrá prioridad.</div>
                    )}
                </div>

                <button type="submit" className="btn-ver-ficha btn-save">
                    <CheckCircle size={20} /> Finalizar Postulación
                </button>
            </form>
        </div>
    </div>
  );
};

export default RegistroVoluntario;