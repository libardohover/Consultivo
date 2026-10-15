import React, { useState } from 'react';
import { 
  Layers, 
  User, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Send, 
  AlertCircle, 
  Plus, 
  Check, 
  BarChart2, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { SUBCOMISIONES_OFICIALES } from '../data/subcomisionesData';
import { Subcomision } from '../types';

export const SubcomisionesView: React.FC = () => {
  const [subcomisionActiva, setSubcomisionActiva] = useState<Subcomision>(SUBCOMISIONES_OFICIALES[0]);
  const [modalIniciativaOpen, setModalIniciativaOpen] = useState(false);
  const [iniciativaEnviada, setIniciativaEnviada] = useState(false);

  // Formulario para radicar necesidad o iniciativa ante la subcomisión
  const [tituloIniciativa, setTituloIniciativa] = useState('');
  const [municipioIniciativa, setMunicipioIniciativa] = useState('Barrancabermeja');
  const [organizacionIniciativa, setOrganizacionIniciativa] = useState('');
  const [descripcionIniciativa, setDescripcionIniciativa] = useState('');

  const handleRadicarIniciativa = (e: React.FormEvent) => {
    e.preventDefault();
    setIniciativaEnviada(true);
    setTimeout(() => {
      setIniciativaEnviada(false);
      setModalIniciativaOpen(false);
      setTituloIniciativa('');
      setDescripcionIniciativa('');
    }, 2500);
  };

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 2 • Subcomisiones IA
            </span>
            <span className="text-xs text-stone-400">
              Estructura Sectorial de Trabajo Técnico de Santander
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Gestión de las Siete Subcomisiones
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Unidades sectoriales de formulación de propuestas, dictámenes y seguimiento a políticas públicas con enfoque diferencial. Cada subcomisión cuenta con coordinación técnica, plan anual de trabajo e indicadores de cumplimiento.
          </p>
        </div>

        <button
          onClick={() => setModalIniciativaOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Radicar Necesidad o Iniciativa</span>
        </button>
      </div>

      {/* Selector de Subcomisiones (Tabs Horizontales) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {SUBCOMISIONES_OFICIALES.map((sub) => {
          const isActive = sub.codigo === subcomisionActiva.codigo;
          return (
            <button
              key={sub.codigo}
              onClick={() => setSubcomisionActiva(sub)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                isActive
                  ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-amber-400' : 'text-stone-400'}`}>
                  {sub.codigo}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-950 text-stone-300 font-mono">
                  {sub.integrantesCount} int.
                </span>
              </div>
              <span className={`text-[11px] font-bold line-clamp-2 leading-tight ${isActive ? 'text-amber-200' : 'text-stone-300'}`}>
                {sub.nombre}
              </span>
              <div className="text-[9px] text-stone-400">
                {sub.compromisosCumplidos} cumplidos / {sub.compromisosPendientes} pend.
              </div>
            </button>
          );
        })}
      </div>

      {/* Contenido Principal de la Subcomisión Seleccionada */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ficha General y Plan de Trabajo (8 Columnas) */}
        <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 text-xs">
          
          <div className="pb-4 border-b border-stone-800 flex flex-col sm:flex-row justify-between items-start gap-2">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                Subcomisión Sectorial {subcomisionActiva.codigo}
              </span>
              <h3 className="text-lg font-bold text-white">
                {subcomisionActiva.nombre}
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Fundamento: {subcomisionActiva.fundamento}
              </p>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-[10px] text-stone-400 block">Sesiones Realizadas:</span>
              <span className="font-bold text-amber-400 text-sm">{subcomisionActiva.sesionesRealizadas} Sesiones 2026</span>
            </div>
          </div>

          {/* Objetivo sectorial */}
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
            <span className="font-bold text-white uppercase text-[10px] text-amber-400 tracking-wider">
              Objetivo Estratégico Sectorial:
            </span>
            <p className="text-stone-300 text-xs leading-relaxed">
              {subcomisionActiva.objetivo}
            </p>
          </div>

          {/* Coordinación y Secretaría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-stone-400 text-[10px] block font-medium">Coordinador/a Técnico/a:</span>
              <strong className="text-white text-xs block">{subcomisionActiva.coordinador}</strong>
              <span className="text-[10px] text-amber-400/80">Lidera la formulación de recomendaciones</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-stone-400 text-[10px] block font-medium">Secretaría de la Subcomisión:</span>
              <strong className="text-white text-xs block">{subcomisionActiva.secretario}</strong>
              <span className="text-[10px] text-stone-400">Custodia actas y compromisos</span>
            </div>
          </div>

          {/* Plan de Trabajo Anual 2026 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan Anual de Trabajo 2026</span>
            </h4>
            <div className="space-y-2">
              {subcomisionActiva.planTrabajo2026.map((actividad, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{actividad}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Integrantes */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Integrantes Oficiales ({subcomisionActiva.integrantesCount})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {subcomisionActiva.integrantesNombres.map((nombre, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{nombre}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Tablero de Indicadores y Flujo de Trabajo (4 Columnas) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Métricas de Rendimiento de la Subcomisión */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-xl text-xs">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Tablero de Gestión</span>
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-stone-950 border border-emerald-500/30 text-center">
                <span className="text-xl font-black text-emerald-400">
                  {subcomisionActiva.compromisosCumplidos}
                </span>
                <span className="text-[10px] text-stone-300 block font-semibold">Compromisos Cumplidos</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-amber-500/30 text-center">
                <span className="text-xl font-black text-amber-400">
                  {subcomisionActiva.compromisosPendientes}
                </span>
                <span className="text-[10px] text-stone-300 block font-semibold">En Seguimiento</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-400">Tasa de cumplimiento:</span>
                <strong className="text-emerald-400">
                  {((subcomisionActiva.compromisosCumplidos / (subcomisionActiva.compromisosCumplidos + subcomisionActiva.compromisosPendientes)) * 100).toFixed(0)}%
                </strong>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{
                    width: `${(subcomisionActiva.compromisosCumplidos / (subcomisionActiva.compromisosCumplidos + subcomisionActiva.compromisosPendientes)) * 100}%`
                  }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
              Proyectos activos en el Banco Departamental: <strong className="text-white">{subcomisionActiva.proyectosActivos} iniciativas</strong>
            </div>
          </div>

          {/* Flujo de Trabajo Reglamentario */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3 shadow-xl text-xs">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Flujo Reglamentario (10 Pasos)
            </h4>
            <div className="space-y-1.5 text-[11px] text-stone-300">
              <div className="p-2 rounded bg-stone-950 border border-stone-800">1. Radicación de iniciativa comunitaria</div>
              <div className="p-2 rounded bg-stone-950 border border-stone-800">2. Clasificación temática y asignación</div>
              <div className="p-2 rounded bg-stone-950 border border-stone-800">3. Estudio y debate en mesa sectorial</div>
              <div className="p-2 rounded bg-stone-950 border border-stone-800">4. Formulación de propuesta formal</div>
              <div className="p-2 rounded bg-stone-950 border border-stone-800">5. Remisión a la Gobernación / Instancia</div>
              <div className="p-2 rounded bg-stone-950 border border-stone-800">6. Veeduría y evaluación periódica</div>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL RADICAR INICIATIVA */}
      {modalIniciativaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-2 border-b border-stone-800">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase">
                  Radicar Necesidad o Iniciativa
                </span>
                <h3 className="text-base font-bold text-white">
                  Ante la {subcomisionActiva.codigo}: {subcomisionActiva.nombre}
                </h3>
              </div>
              <button onClick={() => setModalIniciativaOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            {iniciativaEnviada ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">¡Iniciativa Radicada Exitosamente!</h4>
                <p className="text-stone-400 text-xs">
                  Se ha asignado el radicado <strong className="text-amber-400">INIC-2026-{Math.floor(100 + Math.random() * 900)}</strong>. Será incluida en el orden del día de la próxima sesión ordinaria de la subcomisión.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRadicarIniciativa} className="space-y-3">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Título de la Necesidad o Proyecto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Solicitud de dotación etnoeducativa para colegios de Puerto Wilches"
                    value={tituloIniciativa}
                    onChange={(e) => setTituloIniciativa(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Municipio *</label>
                    <input
                      type="text"
                      required
                      value={municipioIniciativa}
                      onChange={(e) => setMunicipioIniciativa(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Organización Solicitante</label>
                    <input
                      type="text"
                      placeholder="Nombre de la organización o colectivo"
                      value={organizacionIniciativa}
                      onChange={(e) => setOrganizacionIniciativa(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Descripción y Justificación *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Explique la situación que afecta a la comunidad y la propuesta de solución requerida..."
                    value={descripcionIniciativa}
                    onChange={(e) => setDescripcionIniciativa(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 border-t border-stone-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalIniciativaOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold uppercase tracking-wider"
                  >
                    Enviar a la Subcomisión
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
