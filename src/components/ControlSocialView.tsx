import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Plus, 
  Search, 
  ExternalLink,
  Building,
  Check
} from 'lucide-react';
import { COMPROMISOS_INSTITUCIONALES } from '../data/controlSocialData';
import { CompromisoControlSocial } from '../types';

export const ControlSocialView: React.FC = () => {
  const [compromisos, setCompromisos] = useState<CompromisoControlSocial[]>(COMPROMISOS_INSTITUCIONALES);
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [modalAlertaOpen, setModalAlertaOpen] = useState(false);
  const [alertaRadicada, setAlertaRadicada] = useState(false);

  // Formulario de Alerta de Veeduría
  const [nuevaEntidad, setNuevaEntidad] = useState('');
  const [nuevoCompromiso, setNuevoCompromiso] = useState('');
  const [observacionAlerta, setObservacionAlerta] = useState('');

  const compromisosFiltrados = compromisos.filter(c =>
    filtroEstado === 'Todos' || c.estado === filtroEstado
  );

  const handleRadicarAlerta = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertaRadicada(true);
    setTimeout(() => {
      setAlertaRadicada(false);
      setModalAlertaOpen(false);
      setNuevaEntidad('');
      setNuevoCompromiso('');
      setObservacionAlerta('');
    }, 2000);
  };

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 11 • Control Social Afro
            </span>
            <span className="text-xs text-stone-400">
              Veeduría Ciudadana y Seguimiento a Acuerdos de la Consultiva
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Trazabilidad y Cumplimiento Institucional
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Monitoreo en tiempo real de los compromisos adquiridos por secretarías de la Gobernación de Santander, alcaldías y entidades nacionales con las comunidades NARP. Con evidencias documentales y semáforos verificables.
          </p>
        </div>

        <button
          onClick={() => setModalAlertaOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Radicar Alerta de Veeduría</span>
        </button>
      </div>

      {/* Métricas del Semáforo */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-stone-900 border border-emerald-500/30 text-center space-y-1">
          <span className="text-2xl font-black text-emerald-400">
            {compromisos.filter(c => c.estado === 'Cumplido').length}
          </span>
          <span className="text-[11px] text-stone-300 block font-semibold">Cumplidos</span>
          <span className="text-[10px] text-stone-400">Con evidencia verificada</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-sky-500/30 text-center space-y-1">
          <span className="text-2xl font-black text-sky-400">
            {compromisos.filter(c => c.estado === 'En ejecución').length}
          </span>
          <span className="text-[11px] text-stone-300 block font-semibold">En Ejecución</span>
          <span className="text-[10px] text-stone-400">Dentro del plazo pactado</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-rose-500/30 text-center space-y-1">
          <span className="text-2xl font-black text-rose-400">
            {compromisos.filter(c => c.estado.includes('Vencido')).length}
          </span>
          <span className="text-[11px] text-stone-300 block font-semibold">Vencidos / Con Alerta</span>
          <span className="text-[10px] text-stone-400">Requiere requerimiento formal</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-center space-y-1">
          <span className="text-2xl font-black text-stone-400">
            {compromisos.length}
          </span>
          <span className="text-[11px] text-stone-300 block font-semibold">Total Compromisos</span>
          <span className="text-[10px] text-stone-400">Bajo veeduría activa</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-stone-400 font-medium mr-1">Filtrar estado:</span>
        {['Todos', 'Cumplido', 'En ejecución', 'Vencido o incumplido'].map(estado => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filtroEstado === estado
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      {/* Tabla de Compromisos */}
      <div className="space-y-3">
        {compromisosFiltrados.map((comp) => {
          const esCumplido = comp.estado === 'Cumplido';
          const esVencido = comp.estado.includes('Vencido');

          return (
            <div
              key={comp.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 bg-stone-900 text-xs ${
                esCumplido
                  ? 'border-emerald-500/30 bg-emerald-950/10'
                  : esVencido
                  ? 'border-rose-500/40 bg-rose-950/10'
                  : 'border-stone-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-400 shrink-0" />
                  <strong className="text-white text-xs">{comp.entidadResponsable}</strong>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block self-start sm:self-auto ${
                  esCumplido
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : esVencido
                    ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    : 'bg-sky-950 text-sky-300 border border-sky-500/40'
                }`}>
                  {comp.estado}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-stone-100 text-sm leading-snug">
                  {comp.compromiso}
                </h4>
                <p className="text-[11px] text-stone-400 mt-1">
                  Fuente documental: {comp.fuenteDocumental}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px]">
                <div>
                  <span className="text-stone-400 block text-[10px]">Fecha de Acuerdo:</span>
                  <span className="text-stone-200">{comp.fechaPactada}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Fecha Límite Pactada:</span>
                  <span className="text-amber-400 font-bold">{comp.fechaLimite}</span>
                </div>
              </div>

              {comp.evidencia && (
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-[11px] space-y-1">
                  <strong className="text-emerald-400 block">Evidencia de Cumplimiento:</strong>
                  <p className="text-stone-300">{comp.evidencia}</p>
                </div>
              )}

              {comp.observaciones && (
                <div className="text-[11px] text-stone-400">
                  <strong>Observaciones de Veeduría:</strong> {comp.observaciones}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL RADICAR ALERTA DE VEEDURÍA */}
      {modalAlertaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-2 border-b border-stone-800">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase font-mono">
                  Control Social Ciudadano
                </span>
                <h3 className="text-base font-bold text-white">
                  Radicar Alerta de Seguimiento a Compromiso
                </h3>
              </div>
              <button onClick={() => setModalAlertaOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            {alertaRadicada ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">¡Alerta Registrada para Auditoría!</h4>
                <p className="text-stone-400 text-xs">
                  Se ha remitido a la Secretaría Técnica de la Comisión Consultiva para inclusión en el informe de seguimiento.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRadicarAlerta} className="space-y-3">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Entidad Responsable *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Alcaldía de Barrancabermeja / Secretaría de Salud de Santander"
                    value={nuevaEntidad}
                    onChange={(e) => setNuevaEntidad(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Compromiso Afectado *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Pavimentación y acueducto veredal en zona ribereña"
                    value={nuevoCompromiso}
                    onChange={(e) => setNuevoCompromiso(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Evidencia o Hechos de la Alerta *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Explique por qué considera que el compromiso está vencido, paralizado o sin suficiente información..."
                    value={observacionAlerta}
                    onChange={(e) => setObservacionAlerta(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 border-t border-stone-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalAlertaOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold uppercase tracking-wider"
                  >
                    Radicar Alerta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
