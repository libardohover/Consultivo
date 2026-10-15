import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  FileCheck, 
  FileX, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  Info, 
  Layers, 
  User, 
  Phone, 
  Mail,
  ChevronRight,
  Eye,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { OrganizacionNARP } from '../types';
import { ORGANIZACIONES_CIRCULAR_065 } from '../data/circular065Data';
import { PROVINCIAS_SANTANDER } from '../data/santanderTerritory';

interface DirectorioOrganizacionesProps {
  organizacionesExtras?: OrganizacionNARP[];
  onOpenRegistro: () => void;
  filtroPreestablecido?: string;
}

export const DirectorioOrganizaciones: React.FC<DirectorioOrganizacionesProps> = ({
  organizacionesExtras = [],
  onOpenRegistro,
  filtroPreestablecido = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(filtroPreestablecido);
  const [filtroAdmision, setFiltroAdmision] = useState<'Todas' | 'Admitidas' | 'No admitidas' | 'Nuevas inscritas'>('Todas');
  const [filtroProvincia, setFiltroProvincia] = useState<string>('Todas');
  const [filtroMinInterior, setFiltroMinInterior] = useState<string>('Todos');
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState<OrganizacionNARP | null>(null);

  // Todas las organizaciones integrando la carga inicial oficial de la Circular 065 y nuevas inscripciones
  const todasLasOrganizaciones = useMemo(() => {
    return [...ORGANIZACIONES_CIRCULAR_065, ...organizacionesExtras];
  }, [organizacionesExtras]);

  // Filtrado reactivo de organizaciones
  const organizacionesFiltradas = useMemo(() => {
    return todasLasOrganizaciones.filter((org) => {
      // Búsqueda de texto
      const matchesSearch = 
        org.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (org.delegadoElectoral && org.delegadoElectoral.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filtro electoral Circular 065
      let matchesAdmision = true;
      if (filtroAdmision === 'Admitidas') matchesAdmision = org.estadoAdmisionCircular065 === 'Admitida';
      if (filtroAdmision === 'No admitidas') matchesAdmision = org.estadoAdmisionCircular065 === 'No admitida';
      if (filtroAdmision === 'Nuevas inscritas') matchesAdmision = !org.filaCircular065;

      // Filtro provincia
      const matchesProvincia = filtroProvincia === 'Todas' || org.provincia === filtroProvincia;

      // Filtro MinInterior
      const matchesMinInterior = filtroMinInterior === 'Todos' || org.estadoMinInterior === filtroMinInterior;

      return matchesSearch && matchesAdmision && matchesProvincia && matchesMinInterior;
    });
  }, [todasLasOrganizaciones, searchTerm, filtroAdmision, filtroProvincia, filtroMinInterior]);

  // Exportar a CSV para control y auditoría
  const exportarCSV = () => {
    const headers = ['Fila Circular 065', 'Sigla', 'Nombre Organización', 'Municipio', 'Provincia', 'Categoría', 'Delegado Electoral', 'Estado Admisión Electoral', 'Estado MinInterior', 'Resolución'];
    const rows = organizacionesFiltradas.map(o => [
      o.filaCircular065 || 'Nueva inscripción',
      `"${o.sigla}"`,
      `"${o.nombre}"`,
      `"${o.municipio}"`,
      `"${o.provincia}"`,
      `"${o.categoria}"`,
      `"${o.delegadoElectoral || 'N/A'}"`,
      `"${o.estadoAdmisionCircular065 || 'En trámite'}"`,
      `"${o.estadoMinInterior}"`,
      `"${o.numeroResolucion || 'Sin registro'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Directorio_NARP_Santander_Circular_065_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Encabezado del Módulo */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                Módulo 3 • Registro Afro Santander
              </span>
              <span className="text-xs text-stone-400">
                Fuente: Circular N.º 065 de 2026 (PRO 2929074)
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Directorio Departamental de Organizaciones NARP
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
              Base oficial del proceso de conformación de la Comisión Consultiva Departamental de Santander. Incluye <strong>25 organizaciones admitidas</strong>, el expediente histórico de <strong>8 organizaciones no admitidas</strong> y las nuevas postulaciones registradas en la plataforma.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportarCSV}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={onOpenRegistro}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Inscribir Nueva Organización</span>
            </button>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-stone-800 text-xs">
          
          {/* Búsqueda por texto */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, sigla, municipio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Filtro Electoral Circular 065 */}
          <div>
            <select
              value={filtroAdmision}
              onChange={(e) => setFiltroAdmision(e.target.value as any)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Todas">Electoral: Todas las Postulaciones (33)</option>
              <option value="Admitidas">Solo Admitidas Circular 065 (25)</option>
              <option value="No admitidas">Solo No Admitidas Circular 065 (8)</option>
              <option value="Nuevas inscritas">Nuevas en Plataforma</option>
            </select>
          </div>

          {/* Filtro Provincia */}
          <div>
            <select
              value={filtroProvincia}
              onChange={(e) => setFiltroProvincia(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Todas">Provincia: Todas (Santander)</option>
              {PROVINCIAS_SANTANDER.map((p) => (
                <option key={p.nombre} value={p.nombre}>
                  {p.nombre} ({p.capital})
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Estado MinInterior */}
          <div>
            <select
              value={filtroMinInterior}
              onChange={(e) => setFiltroMinInterior(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Todos">Registro MinInterior: Todos los Estados</option>
              <option value="Verificado con RPUN">Verificado con RPUN</option>
              <option value="Reportado, pendiente de verificación">Reportado, pendiente de verificación</option>
              <option value="Sin registro declarado">Sin registro declarado</option>
              <option value="En trámite declarado">En trámite declarado</option>
            </select>
          </div>
        </div>

        {/* Resumen numérico reactivo */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-[11px] text-stone-400">
          <div>
            Mostrando <strong>{organizacionesFiltradas.length}</strong> de {todasLasOrganizaciones.length} organizaciones registradas
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Admitidas en Circular 065: 25
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Histórico No Admitidas: 8
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Tarjetas / Tabla de Organizaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizacionesFiltradas.map((org) => {
          const esAdmitida = org.estadoAdmisionCircular065 === 'Admitida';
          const esNoAdmitida = org.estadoAdmisionCircular065 === 'No admitida';

          return (
            <div
              key={org.id}
              className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between p-5 bg-stone-900/90 hover:shadow-xl ${
                esNoAdmitida 
                  ? 'border-amber-700/40 hover:border-amber-500/60 bg-stone-900/60' 
                  : 'border-stone-800 hover:border-amber-500/50'
              }`}
            >
              <div className="space-y-3">
                {/* Badges superiores */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {org.filaCircular065 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-800 text-stone-300 border border-stone-700">
                        Fila {org.filaCircular065}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-800 text-amber-300 border border-stone-700">
                      {org.categoria}
                    </span>
                  </div>

                  {esAdmitida && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3" />
                      Admitida
                    </span>
                  )}

                  {esNoAdmitida && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-600/40">
                      <AlertTriangle className="w-3 h-3" />
                      No admitida
                    </span>
                  )}
                </div>

                {/* Nombre y Sigla */}
                <div>
                  <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">
                    {org.nombre}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-amber-400 tracking-wider">
                      {org.sigla}
                    </span>
                    <span className="text-stone-500 text-xs">•</span>
                    <span className="text-xs text-stone-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {org.municipio} ({org.provincia})
                    </span>
                  </div>
                </div>

                {/* Descripción o Causal */}
                {esNoAdmitida ? (
                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-200/90">
                    <strong className="block text-amber-300 mb-0.5">Causal de no admisión electoral:</strong>
                    {org.causalRechazoCircular065}
                  </div>
                ) : (
                  <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed">
                    {org.descripcion}
                  </p>
                )}

                {/* Delegado Electoral */}
                {org.delegadoElectoral && (
                  <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-1 border-t border-stone-800">
                    <User className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>Delegado: <strong className="text-stone-200">{org.delegadoElectoral}</strong></span>
                  </div>
                )}

                {/* Estado MinInterior */}
                <div className="text-[10px] text-stone-400 flex items-center justify-between">
                  <span>MinInterior:</span>
                  <span className={`font-medium ${org.estadoMinInterior.includes('Verificado') ? 'text-emerald-400' : 'text-stone-300'}`}>
                    {org.estadoMinInterior}
                  </span>
                </div>
              </div>

              {/* Botón ver ficha completa */}
              <button
                onClick={() => setOrganizacionSeleccionada(org)}
                className="w-full mt-4 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-700 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Ver Ficha Institucional</span>
              </button>
            </div>
          );
        })}
      </div>

      {organizacionesFiltradas.length === 0 && (
        <div className="text-center py-12 bg-stone-900 rounded-2xl border border-stone-800 space-y-3">
          <Info className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No se encontraron organizaciones</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Intente ajustando los términos de búsqueda o eliminando los filtros seleccionados.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFiltroAdmision('Todas');
              setFiltroProvincia('Todas');
              setFiltroMinInterior('Todos');
            }}
            className="px-4 py-1.5 rounded-lg bg-stone-800 text-amber-300 text-xs font-semibold hover:bg-stone-700"
          >
            Limpiar Filtros
          </button>
        </div>
      )}

      {/* MODAL DETALLE DE ORGANIZACIÓN */}
      {organizacionSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-600/40 rounded-2xl shadow-2xl overflow-hidden my-6 text-stone-200 text-xs">
            
            {/* Header del modal */}
            <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  Ficha Oficial de Organización NARP
                </span>
                <h3 className="text-base font-bold text-white">
                  {organizacionSeleccionada.nombre}
                </h3>
              </div>
              <button
                onClick={() => setOrganizacionSeleccionada(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
              >
                ✕
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* Bloque electoral */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Estado Electoral (Circular 065 de 2026):</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    organizacionSeleccionada.estadoAdmisionCircular065 === 'Admitida'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-950 text-amber-300 border border-amber-600/40'
                  }`}>
                    {organizacionSeleccionada.estadoAdmisionCircular065 || 'En revisión en plataforma'}
                  </span>
                </div>

                {organizacionSeleccionada.filaCircular065 && (
                  <div className="text-[11px] text-stone-400">
                    Posición documental: <strong>Fila N.º {organizacionSeleccionada.filaCircular065}</strong> de la Circular Oficial (Secretaría del Interior de Santander, PRO 2929074).
                  </div>
                )}

                {organizacionSeleccionada.causalRechazoCircular065 && (
                  <div className="p-2.5 rounded bg-amber-950/60 border border-amber-700/50 text-amber-200">
                    <strong>Motivo de no admisión en asamblea 2026:</strong>
                    <p className="mt-0.5">{organizacionSeleccionada.causalRechazoCircular065}</p>
                  </div>
                )}
              </div>

              {/* Datos de identidad */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                <div>
                  <span className="text-stone-400 block">Sigla:</span>
                  <span className="font-bold text-amber-400 text-sm">{organizacionSeleccionada.sigla}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Categoría:</span>
                  <span className="font-semibold text-white">{organizacionSeleccionada.categoria}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Municipio / Provincia:</span>
                  <span className="font-semibold text-white">{organizacionSeleccionada.municipio} ({organizacionSeleccionada.provincia})</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Registro MinInterior (RPUN):</span>
                  <span className="font-semibold text-white">{organizacionSeleccionada.estadoMinInterior}</span>
                </div>
                {organizacionSeleccionada.numeroResolucion && (
                  <div className="col-span-2">
                    <span className="text-stone-400 block">Resolución MinInterior:</span>
                    <span className="font-mono text-stone-200">{organizacionSeleccionada.numeroResolucion} ({organizacionSeleccionada.fechaResolucion || 'Fecha registrada'})</span>
                  </div>
                )}
              </div>

              {/* Delegado e información de contacto institucional */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
                  Representación y Contacto
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300">
                  <div>
                    <span className="text-stone-400 block">Delegado/a Electoral:</span>
                    <strong className="text-white">{organizacionSeleccionada.delegadoElectoral || 'No especificado'}</strong>
                  </div>
                  {organizacionSeleccionada.contactoInstitucional.correo && (
                    <div>
                      <span className="text-stone-400 block">Correo Institucional:</span>
                      <span>{organizacionSeleccionada.contactoInstitucional.correo}</span>
                    </div>
                  )}
                  {organizacionSeleccionada.contactoInstitucional.telefono && (
                    <div>
                      <span className="text-stone-400 block">Teléfono:</span>
                      <span>{organizacionSeleccionada.contactoInstitucional.telefono}</span>
                    </div>
                  )}
                  {organizacionSeleccionada.contactoInstitucional.direccionSede && (
                    <div>
                      <span className="text-stone-400 block">Sede Institucional:</span>
                      <span>{organizacionSeleccionada.contactoInstitucional.direccionSede}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Líneas de acción */}
              {organizacionSeleccionada.lineasAccion && organizacionSeleccionada.lineasAccion.length > 0 && (
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
                    Líneas de Trabajo y Experiencia
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {organizacionSeleccionada.lineasAccion.map((linea, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700 text-[10px]">
                        • {linea}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Subcomisión relacionada */}
              {organizacionSeleccionada.subcomisionRelacionada && (
                <div className="text-[11px] text-stone-400">
                  Subcomisión técnica afín: <strong className="text-amber-300">{organizacionSeleccionada.subcomisionRelacionada}</strong>
                </div>
              )}

              <div className="text-[10px] text-stone-500 pt-2 border-t border-stone-800">
                Fuente documental: {organizacionSeleccionada.fuenteDocumental}
              </div>
            </div>

            <div className="bg-stone-950 px-6 py-3 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setOrganizacionSeleccionada(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
