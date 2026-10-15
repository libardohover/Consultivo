import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Upload, 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Printer, 
  Download,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { TODOS_LOS_87_MUNICIPIOS, PROVINCIAS_SANTANDER } from '../data/santanderTerritory';
import { CategoriaOrganizacion } from '../types';

interface FormularioRegistroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrganizacionRegistrada?: (org: any) => void;
}

export const FormularioRegistroModal: React.FC<FormularioRegistroModalProps> = ({
  isOpen,
  onClose,
  onOrganizacionRegistrada
}) => {
  const [pasoActual, setPasoActual] = useState<'formulario' | 'exito'>('formulario');
  const [radicadoGenerado, setRadicadoGenerado] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    // A. Identificación
    nombre: '',
    sigla: '',
    categoria: 'Organización de Base' as CategoriaOrganizacion,
    fechaConstitucion: '',
    descripcion: '',

    // B. Ubicación
    departamento: 'Santander',
    provincia: 'Mares',
    municipio: 'Barrancabermeja',
    zona: 'Urbana',
    direccionSede: '',
    municipiosActuacion: 'Barrancabermeja',

    // C. Situación registral
    tieneRpunMinInterior: false,
    numeroResolucion: '',
    fechaResolucion: '',
    estadoTramite: 'Sin registro declarado',

    // D. Actividad organizativa
    objetivos: '',
    poblacionAtendida: '',
    lineasTrabajo: [] as string[],
    lineaPersonalizada: '',
    necesidadesFortalecimiento: '',

    // E. Contacto
    responsableAutorizado: '',
    documentoIdentidad: '',
    cargoRepresentante: '',
    correo: '',
    telefono: '',
    preferenciaComunicacion: 'Correo electrónico y WhatsApp',

    // F. Documentos
    nombreArchivoEstatutos: '',
    nombreArchivoActa: '',

    // G. Autorizaciones (Habeas Data)
    aceptaPrivacidad: false,
    declaraVeracidad: false,
    autorizaPublicacionDirectorio: true,
    autorizaContactoInstitucional: true
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  // Cargar borrador local si existe
  useEffect(() => {
    const borradorGuardado = localStorage.getItem('borrador_registro_narp_santander');
    if (borradorGuardado && pasoActual === 'formulario') {
      try {
        const parsed = JSON.parse(borradorGuardado);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Error al recuperar borrador', e);
      }
    }
  }, [pasoActual]);

  // Guardar borrador automáticamente al escribir
  const handleInputChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem('borrador_registro_narp_santander', JSON.stringify(updated));
    if (errores[field]) {
      setErrores(prev => ({ ...prev, [field]: '' }));
    }
  };

  const lineasDisponibles = [
    'Derechos humanos y defensa étnica',
    'Etnoeducación y Cátedra Afrocolombiana',
    'Salud intercultural y prevención de anemia falciforme',
    'Desarrollo agropecuario y pesca artesanal',
    'Protección de cuencas, ciénagas y medio ambiente',
    'Música tradicional, tambora y danza',
    'Gastronomía y saberes culinarios',
    'Peinados ancestrales y memoria viva',
    'Liderazgo de mujeres y prevención de violencias',
    'Juventud, tecnología y robótica comunitaria'
  ];

  const toggleLinea = (linea: string) => {
    const exists = formData.lineasTrabajo.includes(linea);
    const updated = exists 
      ? formData.lineasTrabajo.filter(l => l !== linea)
      : [...formData.lineasTrabajo, linea];
    handleInputChange('lineasTrabajo', updated);
  };

  const validarFormulario = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.nombre.trim()) errs.nombre = 'El nombre de la organización es obligatorio';
    if (!formData.categoria) errs.categoria = 'Seleccione una categoría organizativa';
    if (!formData.municipio) errs.municipio = 'Seleccione el municipio de Santander';
    if (!formData.responsableAutorizado.trim()) errs.responsableAutorizado = 'Indique la persona representante autorizada';
    if (!formData.correo.trim() || !formData.correo.includes('@')) errs.correo = 'Indique un correo institucional válido';
    if (!formData.telefono.trim()) errs.telefono = 'Indique un teléfono de contacto';
    if (!formData.aceptaPrivacidad) errs.aceptaPrivacidad = 'Debe aceptar los términos de Habeas Data y protección de datos';
    if (!formData.declaraVeracidad) errs.declaraVeracidad = 'Debe declarar bajo gravedad de juramento la veracidad de los datos';

    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) {
      alert('Por favor complete los campos obligatorios señalados en rojo.');
      return;
    }

    const rad = `RAD-2026-NARP-${Math.floor(1000 + Math.random() * 9000)}`;
    setRadicadoGenerado(rad);

    const nuevaOrganizacion = {
      id: `org-nueva-${Date.now()}`,
      nombre: formData.nombre,
      sigla: formData.sigla || formData.nombre.slice(0, 10).toUpperCase(),
      municipio: formData.municipio,
      provincia: formData.provincia,
      categoria: formData.categoria,
      estadoMinInterior: formData.tieneRpunMinInterior ? 'Reportado, pendiente de verificación' : 'Sin registro declarado',
      estadoInscripcion: 'Solicitud recibida',
      numeroResolucion: formData.tieneRpunMinInterior ? formData.numeroResolucion : undefined,
      fechaResolucion: formData.tieneRpunMinInterior ? formData.fechaResolucion : undefined,
      delegadoElectoral: formData.responsableAutorizado,
      coordenadasAproximadas: { lat: 7.0653, lng: -73.8547 },
      contactoInstitucional: {
        correo: formData.correo,
        telefono: formData.telefono,
        direccionSede: formData.direccionSede
      },
      descripcion: formData.descripcion || 'Organización inscrita voluntariamente en el ecosistema departamental.',
      lineasAccion: formData.lineasTrabajo.length > 0 ? formData.lineasTrabajo : ['Participación comunitaria'],
      fechaRegistro: new Date().toISOString().slice(0, 10),
      fuenteDocumental: `Formulario de Inscripción Voluntaria • Radicado ${rad}`
    };

    if (onOrganizacionRegistrada) {
      onOrganizacionRegistrada(nuevaOrganizacion);
    }

    localStorage.removeItem('borrador_registro_narp_santander');
    setPasoActual('exito');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-amber-600/40 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Cabecera del modal */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Inscripción de Organización NARP en Santander
              </h2>
              <p className="text-xs text-amber-200/80">
                Directorio Departamental Incluyente • Registro Voluntario (Ruta /organizaciones/registro)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido según el paso */}
        {pasoActual === 'formulario' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[80vh] overflow-y-auto text-stone-200 text-xs">
            
            {/* Aviso introductorio */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Inscripción libre, gratuita y sin barreras:</strong>
                  La inscripción en esta plataforma departamental acoge a <strong>todas las formas organizativas</strong>, tengan o no Registro Público Único Nacional ante el Ministerio del Interior. Esta inscripción facilita la vinculación a proyectos, convocatorias, mapeo territorial y formación técnica.
                </div>
              </div>
            </div>

            {/* SECCIÓN A: IDENTIFICACIÓN */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-stone-800 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <span>A. Identificación de la Organización</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Nombre Completo de la Organización *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Asociación Afrodescendiente del Magdalena Medio"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                  {errores.nombre && <p className="text-rose-400 text-[10px] mt-1">{errores.nombre}</p>}
                </div>

                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Sigla o Acrónimo (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. ASOMAG-AFRO"
                    value={formData.sigla}
                    onChange={(e) => handleInputChange('sigla', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Categoría Organizativa *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => handleInputChange('categoria', e.target.value as CategoriaOrganizacion)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Consejo Comunitario">1. Consejo Comunitario (Tierras Colectivas - Dec. 1745/95)</option>
                    <option value="Organización de Base">2. Organización de Base</option>
                    <option value="Formas y Expresiones Organizativas">3. Formas y Expresiones Organizativas</option>
                    <option value="Asociación Afrodescendiente">4. Asociación Afrodescendiente</option>
                    <option value="Corporación">5. Corporación</option>
                    <option value="Fundación">6. Fundación</option>
                    <option value="Colectivo Cultural">7. Colectivo Cultural / Tambora / Danza</option>
                    <option value="Red de Mujeres Afro">8. Red de Mujeres Afrodescendientes</option>
                    <option value="Organización Juvenil">9. Organización Juvenil Afro</option>
                    <option value="Asociación Productiva">10. Asociación Productiva / Pesquera / Cacao</option>
                    <option value="Organización Comunitaria Rural">11. Organización Comunitaria Rural</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Fecha Declarada de Creación o Constitución
                  </label>
                  <input
                    type="date"
                    value={formData.fechaConstitucion}
                    onChange={(e) => handleInputChange('fechaConstitucion', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-300 mb-1">
                  Resumen o Misión de la Organización
                </label>
                <textarea
                  rows={2}
                  placeholder="Describa brevemente la labor comunitaria, trayectoria y población que representa..."
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* SECCIÓN B: UBICACIÓN */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-stone-800 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>B. Ubicación Territorial en Santander</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Departamento
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Santander"
                    className="w-full bg-stone-950/60 border border-stone-800 rounded-lg p-2.5 text-stone-400 font-bold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Provincia Oficial *
                  </label>
                  <select
                    value={formData.provincia}
                    onChange={(e) => handleInputChange('provincia', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  >
                    {PROVINCIAS_SANTANDER.map((p) => (
                      <option key={p.nombre} value={p.nombre}>
                        Provincia de {p.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Municipio de Sede (87 de Santander) *
                  </label>
                  <select
                    value={formData.municipio}
                    onChange={(e) => handleInputChange('municipio', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  >
                    {TODOS_LOS_87_MUNICIPIOS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Zona Territorial
                  </label>
                  <div className="flex gap-4 p-2 bg-stone-950 border border-stone-800 rounded-lg">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="zona"
                        value="Urbana"
                        checked={formData.zona === 'Urbana'}
                        onChange={(e) => handleInputChange('zona', e.target.value)}
                      />
                      <span>Urbana (Cabecera / Barrio)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="zona"
                        value="Rural"
                        checked={formData.zona === 'Rural'}
                        onChange={(e) => handleInputChange('zona', e.target.value)}
                      />
                      <span>Rural (Corregimiento / Vereda / Ciénaga)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Dirección Institucional Publicable (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Carrera 15 # 48-22 o Sector Ribereño"
                    value={formData.direccionSede}
                    onChange={(e) => handleInputChange('direccionSede', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-stone-400">
                    No publique viviendas familiares privadas por protección de seguridad.
                  </span>
                </div>
              </div>
            </div>

            {/* SECCIÓN C: SITUACIÓN REGISTRAL */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-stone-800 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>C. Situación Registral (Ministerio del Interior)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer font-medium text-stone-200">
                  <input
                    type="checkbox"
                    checked={formData.tieneRpunMinInterior}
                    onChange={(e) => handleInputChange('tieneRpunMinInterior', e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                  <span>
                    ¿Cuenta actualmente con Registro Público Único Nacional (RPUN) ante el Ministerio del Interior (Decreto 1640 de 2020)?
                  </span>
                </label>

                {formData.tieneRpunMinInterior ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-stone-800">
                    <div>
                      <label className="block font-medium text-stone-300 mb-1">
                        Número de Resolución MinInterior
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. RES-MIN-2021-0941"
                        value={formData.numeroResolucion}
                        onChange={(e) => handleInputChange('numeroResolucion', e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-300 mb-1">
                        Fecha de la Resolución
                      </label>
                      <input
                        type="date"
                        value={formData.fechaResolucion}
                        onChange={(e) => handleInputChange('fechaResolucion', e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-stone-400 italic">
                    * El registro ante el Ministerio del Interior NO es obligatorio para inscribirse en esta plataforma. Se registrará en estado: <strong>"Sin registro declarado / En proceso de fortalecimiento"</strong>.
                  </p>
                )}
              </div>
            </div>

            {/* SECCIÓN D: ACTIVIDAD ORGANIZATIVA */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-stone-800 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <span>D. Actividad Organizativa y Líneas de Trabajo</span>
              </div>

              <div>
                <label className="block font-medium text-stone-300 mb-2">
                  Seleccione las líneas de acción de su organización:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lineasDisponibles.map((linea) => {
                    const isSelected = formData.lineasTrabajo.includes(linea);
                    return (
                      <button
                        type="button"
                        key={linea}
                        onClick={() => toggleLinea(linea)}
                        className={`text-left p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-medium'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <span className="text-[11px]">{linea}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECCIÓN E: CONTACTO INSTITUCIONAL */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-stone-800 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>E. Representante Autorizado y Contacto Institucional</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Nombre del Representante Autorizado *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Marlene Palacios"
                    value={formData.responsableAutorizado}
                    onChange={(e) => handleInputChange('responsableAutorizado', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                  {errores.responsableAutorizado && <p className="text-rose-400 text-[10px] mt-1">{errores.responsableAutorizado}</p>}
                </div>

                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Correo Electrónico Institucional *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contacto@organizacion.org.co"
                    value={formData.correo}
                    onChange={(e) => handleInputChange('correo', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                  {errores.correo && <p className="text-rose-400 text-[10px] mt-1">{errores.correo}</p>}
                </div>

                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Teléfono Institucional *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(607) 622-4412 o 310..."
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                  {errores.telefono && <p className="text-rose-400 text-[10px] mt-1">{errores.telefono}</p>}
                </div>
              </div>
            </div>

            {/* SECCIÓN F: DOCUMENTOS DE SOPORTE */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-stone-800 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <Upload className="w-4 h-4" />
                <span>F. Documentos de Soporte (Carga en PDF)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-dashed border-stone-700 bg-stone-950/60 text-center hover:border-amber-500 transition-colors">
                  <FileText className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
                  <span className="block font-medium text-stone-200 text-xs">
                    Acta de Asamblea o Constitución
                  </span>
                  <span className="text-[10px] text-stone-400 block mb-2">Formato PDF (Máx. 10MB)</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="text-[10px] text-stone-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:bg-stone-800 file:text-amber-300 hover:file:bg-stone-700 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleInputChange('nombreArchivoActa', e.target.files[0].name);
                      }
                    }}
                  />
                  {formData.nombreArchivoActa && (
                    <p className="text-emerald-400 text-[10px] mt-1">✓ {formData.nombreArchivoActa}</p>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-dashed border-stone-700 bg-stone-950/60 text-center hover:border-amber-500 transition-colors">
                  <FileText className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
                  <span className="block font-medium text-stone-200 text-xs">
                    Estatutos o Documento de Designación
                  </span>
                  <span className="text-[10px] text-stone-400 block mb-2">Formato PDF (Máx. 10MB)</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="text-[10px] text-stone-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:bg-stone-800 file:text-amber-300 hover:file:bg-stone-700 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleInputChange('nombreArchivoEstatutos', e.target.files[0].name);
                      }
                    }}
                  />
                  {formData.nombreArchivoEstatutos && (
                    <p className="text-emerald-400 text-[10px] mt-1">✓ {formData.nombreArchivoEstatutos}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECCIÓN G: AUTORIZACIONES Y HABEAS DATA */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-stone-800 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>G. Habeas Data y Autorizaciones (Ley 1581 de 2012)</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.aceptaPrivacidad}
                    onChange={(e) => handleInputChange('aceptaPrivacidad', e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded mt-0.5"
                  />
                  <span className="text-[11px] text-stone-300">
                    <strong>Tratamiento de Datos Sensibles (Ley 1581 de 2012):</strong> Autorizo de manera previa, libre e informada el tratamiento de los datos de contacto suministrados exclusivamente para los fines de articulación, observatorio y gobernanza de la Comisión Consultiva Departamental de Comunidades NARP de Santander. *
                  </span>
                </label>
                {errores.aceptaPrivacidad && <p className="text-rose-400 text-[10px]">{errores.aceptaPrivacidad}</p>}

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.declaraVeracidad}
                    onChange={(e) => handleInputChange('declaraVeracidad', e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded mt-0.5"
                  />
                  <span className="text-[11px] text-stone-300">
                    <strong>Declaración de Veracidad:</strong> Declaro que la información aportada es fidedigna y que actúo con la debida representación estatutaria de la organización comunitaria. *
                  </span>
                </label>
                {errores.declaraVeracidad && <p className="text-rose-400 text-[10px]">{errores.declaraVeracidad}</p>}

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autorizaPublicacionDirectorio}
                    onChange={(e) => handleInputChange('autorizaPublicacionDirectorio', e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded mt-0.5"
                  />
                  <span className="text-[11px] text-stone-400">
                    Autorizo la publicación de los datos institucionales (Nombre, Sigla, Municipio, Líneas de acción) en el directorio público y mapa territorial de la plataforma. (Los datos privados no serán divulgados).
                  </span>
                </label>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Radicar Inscripción en Santander
              </button>
            </div>
          </form>
        ) : (
          /* VISTA DE ÉXITO Y COMPROBANTE */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-white">
                ¡Inscripción Radicada Exitosamente!
              </h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Su solicitud ha sido registrada en el sistema de la Comisión Consultiva Departamental de Santander.
              </p>
            </div>

            {/* Ficha de Comprobante */}
            <div className="max-w-md mx-auto bg-stone-950 p-5 rounded-xl border border-amber-500/40 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="text-stone-400 font-sans">N.º Radicado Oficial:</span>
                <span className="font-bold text-amber-400 text-sm">{radicadoGenerado}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400 font-sans">Organización:</span>
                <span className="font-semibold text-right">{formData.nombre}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400 font-sans">Municipio / Sede:</span>
                <span>{formData.municipio}, Santander</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400 font-sans">Estado Inicial:</span>
                <span className="text-amber-400 font-sans font-bold">Solicitud recibida (En revisión)</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400 font-sans">Fecha y Hora:</span>
                <span>{new Date().toLocaleString('es-CO')}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 max-w-sm mx-auto">
              Se ha enviado confirmación a <strong>{formData.correo}</strong>. La Secretaría Técnica revisará la documentación aportada en un plazo máximo de 10 días hábiles.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-stone-800 text-stone-200 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Imprimir Comprobante</span>
              </button>

              <button
                onClick={() => {
                  setPasoActual('formulario');
                  onClose();
                }}
                className="px-6 py-2 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
              >
                Finalizar y Cerrar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
