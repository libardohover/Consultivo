import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  FileText, 
  ShieldCheck, 
  Award, 
  Clock, 
  MapPin, 
  Layers, 
  FileCheck, 
  AlertCircle, 
  Download, 
  CheckSquare,
  Search,
  ExternalLink
} from 'lucide-react';
import { CONSULTIVOS_REGISTRADOS, SESIONES_HISTORIAL } from '../data/subcomisionesData';
import { ConsultivoAcreditado, SesionConsultiva } from '../types';

export const GobiernoEtnico: React.FC = () => {
  const [subTab, setSubTab] = useState<'consultivos' | 'sesiones' | 'secretaria'>('consultivos');
  const [consultivoSeleccionado, setConsultivoSeleccionado] = useState<ConsultivoAcreditado | null>(null);
  const [sesionSeleccionada, setSesionSeleccionada] = useState<SesionConsultiva>(SESIONES_HISTORIAL[0]);
  const [searchConsultivo, setSearchConsultivo] = useState('');

  const consultivosFiltrados = CONSULTIVOS_REGISTRADOS.filter(c => 
    c.nombre.toLowerCase().includes(searchConsultivo.toLowerCase()) ||
    c.organizacion.toLowerCase().includes(searchConsultivo.toLowerCase()) ||
    c.municipio.toLowerCase().includes(searchConsultivo.toLowerCase())
  );

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado del Módulo */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 1 • Gobierno Étnico
            </span>
            <span className="text-xs text-stone-400">
              Decreto Departamental 166 de 2018 & Ley 70 de 1993
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Comisión Consultiva Departamental de Santander
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Instancia oficial de interlocución y concertación entre las comunidades negras, afrocolombianas, raizales y palenqueras y el Gobierno Departamental de Santander. Administre consultivos acreditados, quórum en sesiones, actas y compromisos vinculantes.
          </p>
        </div>

        {/* Sub-navegación */}
        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs font-semibold">
          <button
            onClick={() => setSubTab('consultivos')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              subTab === 'consultivos'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Consultivos Acreditados
          </button>
          <button
            onClick={() => setSubTab('sesiones')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              subTab === 'sesiones'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Sesiones y Actas
          </button>
          <button
            onClick={() => setSubTab('secretaria')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              subTab === 'secretaria'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Secretaría Técnica
          </button>
        </div>
      </div>

      {/* SUB-VISTA 1: CONSULTIVOS ACREDITADOS */}
      {subTab === 'consultivos' && (
        <div className="space-y-4">
          
          {/* Barra de búsqueda y advertencia jurídica */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900 p-4 rounded-xl border border-stone-800">
            <div className="relative w-full sm:w-80 text-xs">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar consultivo por nombre o municipio..."
                value={searchConsultivo}
                onChange={(e) => setSearchConsultivo(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="text-[11px] text-amber-200/80 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/40 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Diferenciación estricta: Solo figuran como consultivos quienes cuentan con acta de elección en asamblea y acto formal de posesión.</span>
            </div>
          </div>

          {/* Grid de Consultivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {consultivosFiltrados.map((cons) => (
              <div
                key={cons.id}
                className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl p-4 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-lg flex items-center justify-center">
                      {cons.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {cons.estadoEjercicio}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-sm">
                      {cons.nombre}
                    </h3>
                    <p className="text-[11px] text-amber-400 font-medium">
                      {cons.calidadRepresentacion} • Período {cons.periodo}
                    </p>
                  </div>

                  <div className="text-[11px] text-stone-400 space-y-1">
                    <div className="flex items-center gap-1.5 text-stone-300">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{cons.municipio} ({cons.provincia})</span>
                    </div>
                    <p className="text-stone-400 line-clamp-1">
                      {cons.organizacion}
                    </p>
                  </div>

                  {/* Asistencia */}
                  <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-[10px] space-y-1">
                    <div className="flex justify-between text-stone-300">
                      <span>Participación en sesiones:</span>
                      <strong className="text-amber-400">{cons.participacionPorcentaje}%</strong>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${cons.participacionPorcentaje}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setConsultivoSeleccionado(cons)}
                  className="w-full py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Ver Ficha Administrativa
                </button>
              </div>
            ))}
          </div>

          {/* Modal Ficha del Consultivo */}
          {consultivoSeleccionado && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-sm">
              <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs">
                <div className="flex justify-between items-start pb-3 border-b border-stone-800">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase">
                      Ficha Oficial de Consultivo Departamental
                    </span>
                    <h3 className="text-base font-bold text-white">{consultivoSeleccionado.nombre}</h3>
                  </div>
                  <button onClick={() => setConsultivoSeleccionado(null)} className="text-stone-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-2 text-stone-300">
                  <p><strong>Organización que representa:</strong> {consultivoSeleccionado.organizacion}</p>
                  <p><strong>Municipio de referencia:</strong> {consultivoSeleccionado.municipio} ({consultivoSeleccionado.provincia})</p>
                  <p><strong>Acto de Elección y Acreditación:</strong> {consultivoSeleccionado.actoAcreditacion}</p>
                  <p><strong>Fecha de Elección:</strong> {consultivoSeleccionado.fechaEleccion}</p>
                  <p><strong>Subcomisiones asignadas:</strong></p>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-300">
                    {consultivoSeleccionado.subcomisiones.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                  <p><strong>Responsabilidades asignadas:</strong></p>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-300">
                    {consultivoSeleccionado.responsabilidades.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-stone-800 flex justify-end">
                  <button
                    onClick={() => setConsultivoSeleccionado(null)}
                    className="px-4 py-1.5 rounded-lg bg-stone-800 text-white font-semibold"
                  >
                    Cerrar Ficha
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-VISTA 2: SESIONES Y ACTAS */}
      {subTab === 'sesiones' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Lista de Sesiones (4 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Historial de Sesiones Convocadas</span>
            </h3>

            {SESIONES_HISTORIAL.map((sesion) => {
              const isSelected = sesion.id === sesionSeleccionada.id;
              return (
                <div
                  key={sesion.id}
                  onClick={() => setSesionSeleccionada(sesion)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-amber-950/30 border-amber-500 shadow-md'
                      : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-stone-800 text-amber-300">
                      {sesion.tipo}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">{sesion.fecha}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug">
                    {sesion.numero}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>Asistencia: {sesion.asistentesCount} / {sesion.totalConsultivos}</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Quórum Verificado
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detalle de la Sesión y Acta (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 text-xs">
            <div className="pb-4 border-b border-stone-800 flex justify-between items-start">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase">
                  Detalle de la Sesión Oficial
                </span>
                <h3 className="text-base font-bold text-white">
                  {sesionSeleccionada.numero}
                </h3>
                <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  {sesionSeleccionada.lugar}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                {sesionSeleccionada.estado}
              </span>
            </div>

            {/* Quórum Reglamentario */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-stone-300">Verificación de Quórum Deliberatorio y Decisorio:</span>
                <span className="font-bold text-emerald-400">
                  {((sesionSeleccionada.asistentesCount / sesionSeleccionada.totalConsultivos) * 100).toFixed(1)}% (Válido)
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Asistieron <strong>{sesionSeleccionada.asistentesCount}</strong> de los 18 consultivos acreditados. Se dio cumplimiento estricto al reglamento interno de la Comisión Consultiva de Santander.
              </p>
            </div>

            {/* Orden del Día */}
            <div className="space-y-2">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                Orden del Día Desahogado
              </h4>
              <ul className="space-y-1 text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800">
                {sesionSeleccionada.ordenDelDia.map((punto, idx) => (
                  <li key={idx} className="text-[11px]">• {punto}</li>
                ))}
              </ul>
            </div>

            {/* Principales Acuerdos y Decisiones */}
            <div className="space-y-2">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                Principales Acuerdos Aprobados
              </h4>
              <div className="space-y-1.5">
                {sesionSeleccionada.principalesAcuerdos.map((acuerdo, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-[11px] text-stone-300 flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{acuerdo}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">Acta oficial firmada por la Secretaría Técnica</span>
              <button
                onClick={() => alert('Descargando extracto oficial del Acta en formato PDF...')}
                className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Descargar Acta Aprobada</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VISTA 3: SECRETARÍA TÉCNICA */}
      {subTab === 'secretaria' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 text-xs">
          <div>
            <h3 className="text-base font-bold text-white">Panel de Coordinación y Secretaría Técnica</h3>
            <p className="text-xs text-stone-400 mt-1">
              Operado conjuntamente entre la Dirección de Asuntos Étnicos de la Secretaría del Interior de Santander y la Secretaría Comunitaria de la Consultiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <FileCheck className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-white">Plan Operativo Anual 2026</h4>
              <p className="text-stone-400 text-[11px]">
                Aprobado el 14 de marzo de 2026 con 4 metas departamentales y 28 actividades sectoriales articuladas en las 7 subcomisiones.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <Clock className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-white">Archivo y Radicación</h4>
              <p className="text-stone-400 text-[11px]">
                Control de correspondencia externa con alcaldías municipales, la CAS, la CDMB y ministerios del orden nacional.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-white">Seguimiento a Acuerdos</h4>
              <p className="text-stone-400 text-[11px]">
                Trazabilidad de compromisos asumidos por el Gobernador de Santander y secretarios de despacho en sesiones ordinarias.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
            <strong>Límite de competencias legales:</strong> La plataforma apoya técnicamente la gestión documental, el cálculo de quórum y el seguimiento de acuerdos; no asume competencias soberanas de designación que correspondan a las autoridades constitucionales.
          </div>
        </div>
      )}

    </div>
  );
};
