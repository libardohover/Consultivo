import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  MapPin, 
  Layers, 
  Download, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { PROYECTOS_BANCO_SANTANDER, GUIA_FORMULACION_MGA } from '../data/proyectosData';
import { SUBCOMISIONES_OFICIALES } from '../data/subcomisionesData';
import { ProyectoNARP } from '../types';

export const AfroProyectaView: React.FC = () => {
  const [proyectos, setProyectos] = useState<ProyectoNARP[]>(PROYECTOS_BANCO_SANTANDER);
  const [modoFormulacion, setModoFormulacion] = useState(false);
  const [proyectoDetalle, setProyectoDetalle] = useState<ProyectoNARP | null>(null);

  // Formulario MGA en Pasos
  const [pasoMGA, setPasoMGA] = useState(1);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    titulo: '',
    subcomision: 'SC-04. Desarrollo económico, empleo y emprendimiento',
    municipio: 'Barrancabermeja',
    entidadProponente: '',
    resumenProblema: '',
    objetivoGeneral: '',
    poblacionBeneficiaria: 500,
    presupuestoEstimado: 250000000,
    fuenteFinanciacion: 'Regalías (SGR)' as const
  });

  const handleCrearProyecto = (e: React.FormEvent) => {
    e.preventDefault();
    const proyectoCreado: ProyectoNARP = {
      id: `proy-nuevo-${Date.now()}`,
      titulo: nuevoProyecto.titulo,
      subcomision: nuevoProyecto.subcomision,
      municipio: nuevoProyecto.municipio,
      provincia: 'Santander',
      entidadProponente: nuevoProyecto.entidadProponente || 'Comunidad NARP Santander',
      estado: 'Formulación MGA',
      presupuestoEstimado: Number(nuevoProyecto.presupuestoEstimado),
      fuenteFinanciacion: nuevoProyecto.fuenteFinanciacion,
      poblacionBeneficiaria: Number(nuevoProyecto.poblacionBeneficiaria),
      resumenProblema: nuevoProyecto.resumenProblema,
      objetivoGeneral: nuevoProyecto.objetivoGeneral,
      fechaRadicacion: new Date().toISOString().slice(0, 10)
    };

    setProyectos([proyectoCreado, ...proyectos]);
    setModoFormulacion(false);
    setPasoMGA(1);
    setProyectoDetalle(proyectoCreado);
  };

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 6 • AfroProyecta IA
            </span>
            <span className="text-xs text-stone-400">
              Metodología General Ajustada (MGA DNP) & Sistema General de Regalías
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Banco Departamental y Formulador de Proyectos
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Plataforma estructurada para convertir necesidades comunitarias en proyectos financiables. Formule árboles de problemas y objetivos, cadenas de valor, matrices de riesgo y presupuestos discriminados por fuentes para Santander.
          </p>
        </div>

        <button
          onClick={() => setModoFormulacion(!modoFormulacion)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{modoFormulacion ? 'Ver Banco de Proyectos' : 'Formular Nuevo Proyecto MGA'}</span>
        </button>
      </div>

      {!modoFormulacion ? (
        <div className="space-y-6">
          
          {/* Métricas del Banco */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-400 font-semibold uppercase">Total Proyectos Registrados</span>
              <div className="text-2xl font-black text-amber-400">{proyectos.length} Iniciativas</div>
              <span className="text-[10px] text-stone-400">En banco departamental</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-400 font-semibold uppercase">Inversión Total Estimada</span>
              <div className="text-2xl font-black text-white">
                ${(proyectos.reduce((acc, p) => acc + p.presupuestoEstimado, 0) / 1000000).toLocaleString('es-CO')}M
              </div>
              <span className="text-[10px] text-stone-400">Pesos Colombianos (COP)</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-400 font-semibold uppercase">Población Beneficiaria</span>
              <div className="text-2xl font-black text-emerald-400">
                {proyectos.reduce((acc, p) => acc + p.poblacionBeneficiaria, 0).toLocaleString('es-CO')}
              </div>
              <span className="text-[10px] text-stone-400">Familias y personas NARP</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-400 font-semibold uppercase">En Ejecución Activa</span>
              <div className="text-2xl font-black text-sky-400">
                {proyectos.filter(p => p.estado === 'En ejecución').length} Proyectos
              </div>
              <span className="text-[10px] text-stone-400">Con código BPIN asignado</span>
            </div>
          </div>

          {/* Grid de Proyectos en el Banco */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {proyectos.map((proy) => (
              <div
                key={proy.id}
                className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 transition-all flex flex-col justify-between text-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-stone-800 text-amber-300">
                      {proy.codigoBpin || 'En radicación BPIN'}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      proy.estado === 'En ejecución'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : proy.estado === 'Viabilidad técnica'
                        ? 'bg-sky-950 text-sky-300 border border-sky-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}>
                      {proy.estado}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-sm leading-snug">
                      {proy.titulo}
                    </h3>
                    <p className="text-[11px] text-amber-400/90 font-medium mt-1">
                      {proy.subcomision}
                    </p>
                  </div>

                  <p className="text-stone-300 text-[11px] line-clamp-2 leading-relaxed">
                    {proy.resumenProblema}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px]">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Municipio:</span>
                      <strong className="text-white">{proy.municipio}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Presupuesto Estimado:</span>
                      <strong className="text-amber-400">
                        ${(proy.presupuestoEstimado / 1000000).toLocaleString('es-CO')} Millones
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Fuente Viable:</span>
                      <span className="text-stone-300">{proy.fuenteFinanciacion}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Beneficiarios:</span>
                      <span className="text-stone-300">{proy.poblacionBeneficiaria} personas</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-[11px]">
                  <span className="text-stone-400">Proponente: {proy.entidadProponente}</span>
                  <button
                    onClick={() => setProyectoDetalle(proy)}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>Ver Ficha MGA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* FORMULADOR INTERACTIVO MGA EN 3 PASOS */
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 text-xs">
          
          <div className="flex justify-between items-center pb-4 border-b border-stone-800">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase font-mono">
                Asistente de Formulación MGA DNP • Paso {pasoMGA} de 3
              </span>
              <h3 className="text-base font-bold text-white">
                Estructuración Metodológica de Proyecto
              </h3>
            </div>
            <button
              onClick={() => setModoFormulacion(false)}
              className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 font-semibold"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleCrearProyecto} className="space-y-6">
            
            {/* PASO 1: IDENTIFICACIÓN Y PROBLEMA */}
            {pasoMGA === 1 && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <strong>Paso 1: Diagnóstico Territorial y Delimitación del Problema.</strong> Identifique la necesidad concreta que afecta a la comunidad afrocolombiana en el territorio santandereano.
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Título del Proyecto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Dotación de Centros de Acopio Solar para Pescadores Artesanales de Barrancabermeja"
                    value={nuevoProyecto.titulo}
                    onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, titulo: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Subcomisión Temática *</label>
                    <select
                      value={nuevoProyecto.subcomision}
                      onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, subcomision: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                    >
                      {SUBCOMISIONES_OFICIALES.map(s => (
                        <option key={s.codigo} value={`${s.codigo}. ${s.nombre}`}>
                          {s.codigo}. {s.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Municipio de Santander *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Barrancabermeja, Puerto Wilches, Cimitarra..."
                      value={nuevoProyecto.municipio}
                      onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, municipio: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Árbol de Problemas (Problema Central y Causas) *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describa el problema central y las evidencias directas del territorio..."
                    value={nuevoProyecto.resumenProblema}
                    onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, resumenProblema: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setPasoMGA(2)}
                    className="px-5 py-2 rounded-lg bg-amber-500 text-stone-950 font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Siguiente: Objetivos y Solución</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PASO 2: OBJETIVOS Y CADENA DE VALOR */}
            {pasoMGA === 2 && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <strong>Paso 2: Árbol de Objetivos y Población Objetivo.</strong> Defina los resultados esperados e indicadores de producto medibles.
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Objetivo General del Proyecto *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Formular en infinitivo: Ej. Incrementar en un 40% los ingresos de las familias pesqueras mediante..."
                    value={nuevoProyecto.objetivoGeneral}
                    onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, objetivoGeneral: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Organización o Consejo Proponente</label>
                    <input
                      type="text"
                      placeholder="Ej. Asociación de Pescadores del Magdalena"
                      value={nuevoProyecto.entidadProponente}
                      onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, entidadProponente: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Población Beneficiaria Directa *</label>
                    <input
                      type="number"
                      required
                      placeholder="Ej. 650 personas"
                      value={nuevoProyecto.poblacionBeneficiaria}
                      onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, poblacionBeneficiaria: Number(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setPasoMGA(1)}
                    className="px-4 py-2 rounded-lg bg-stone-800 text-stone-300 font-semibold"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={() => setPasoMGA(3)}
                    className="px-5 py-2 rounded-lg bg-amber-500 text-stone-950 font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Siguiente: Presupuesto y Financiamiento</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PASO 3: PRESUPUESTO Y RADICACIÓN */}
            {pasoMGA === 3 && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <strong>Paso 3: Presupuesto y Fuente de Financiación.</strong> Estructure los costos y el fondo potencial del orden departamental o nacional.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Presupuesto Total Estimado (COP) *</label>
                    <input
                      type="number"
                      required
                      step="1000000"
                      value={nuevoProyecto.presupuestoEstimado}
                      onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, presupuestoEstimado: Number(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-amber-400 mt-1 block">
                      = ${(nuevoProyecto.presupuestoEstimado / 1000000).toLocaleString('es-CO')} Millones de Pesos
                    </span>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Fuente Principal de Financiación *</label>
                    <select
                      value={nuevoProyecto.fuenteFinanciacion}
                      onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, fuenteFinanciacion: e.target.value as any })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Regalías (SGR)">Regalías (SGR - Asignación Departamental)</option>
                      <option value="Presupuesto Departamental">Presupuesto Ordinario Gobernación de Santander</option>
                      <option value="MinIgualdad">Fondo Étnico Ministerio de Igualdad y Equidad</option>
                      <option value="Cooperación Internacional">Cooperación Internacional (AECID / USAID / UE)</option>
                      <option value="Fondo Étnico">Línea de Crédito Especial FINAGRO / Bancóldex (Dec. 1396/23)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <span className="font-bold text-white text-xs block">Resumen del Proyecto a Radicar:</span>
                  <div className="text-[11px] text-stone-300 space-y-1">
                    <p>• <strong>Título:</strong> {nuevoProyecto.titulo}</p>
                    <p>• <strong>Subcomisión:</strong> {nuevoProyecto.subcomision}</p>
                    <p>• <strong>Municipio:</strong> {nuevoProyecto.municipio}</p>
                    <p>• <strong>Presupuesto:</strong> ${(nuevoProyecto.presupuestoEstimado / 1000000).toLocaleString('es-CO')}M COP ({nuevoProyecto.fuenteFinanciacion})</p>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setPasoMGA(2)}
                    className="px-4 py-2 rounded-lg bg-stone-800 text-stone-300 font-semibold"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20"
                  >
                    Radicar Proyecto en el Banco Departamental
                  </button>
                </div>
              </div>
            )}

          </form>

        </div>
      )}

      {/* MODAL DETALLE DE PROYECTO */}
      {proyectoDetalle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase">
                  Ficha Técnica Metodológica MGA
                </span>
                <h3 className="text-base font-bold text-white leading-snug">{proyectoDetalle.titulo}</h3>
              </div>
              <button onClick={() => setProyectoDetalle(null)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-stone-300">
              <div className="grid grid-cols-2 gap-2 p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px]">
                <div>
                  <span className="text-stone-400 block">Municipio:</span>
                  <strong className="text-white">{proyectoDetalle.municipio}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">Estado:</span>
                  <span className="text-amber-400 font-bold">{proyectoDetalle.estado}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Presupuesto Estimado:</span>
                  <strong className="text-white">${(proyectoDetalle.presupuestoEstimado / 1000000).toLocaleString('es-CO')} Millones COP</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">Fuente Viable:</span>
                  <span className="text-stone-300">{proyectoDetalle.fuenteFinanciacion}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Diagnóstico / Problema Central:</span>
                <p className="text-stone-300 bg-stone-950 p-2.5 rounded-lg border border-stone-800 leading-relaxed">
                  {proyectoDetalle.resumenProblema}
                </p>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Objetivo General y Metas MGA:</span>
                <p className="text-stone-300 bg-stone-950 p-2.5 rounded-lg border border-stone-800 leading-relaxed">
                  {proyectoDetalle.objetivoGeneral}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setProyectoDetalle(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 text-white font-semibold"
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
