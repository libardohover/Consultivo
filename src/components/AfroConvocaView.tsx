import React, { useState } from 'react';
import { 
  Bell, 
  ExternalLink, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Search, 
  ShieldCheck,
  Check,
  Building
} from 'lucide-react';
import { CONVOCATORIAS_VIGENTES } from '../data/convocatoriasData';
import { ConvocatoriaOportunidad } from '../types';

export const AfroConvocaView: React.FC = () => {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [convocatoriaEvaluada, setConvocatoriaEvaluada] = useState<ConvocatoriaOportunidad | null>(null);

  // Estados del evaluador de elegibilidad
  const [tienePersoneria, setTienePersoneria] = useState(true);
  const [tieneExperiencia, setTieneExperiencia] = useState(true);
  const [tieneRut, setTieneRut] = useState(true);
  const [tieneCuentaBancaria, setTieneCuentaBancaria] = useState(true);

  const convocatoriasFiltradas = CONVOCATORIAS_VIGENTES.filter(c =>
    categoriaFiltro === 'Todas' || c.categoria === categoriaFiltro
  );

  const calcularElegibilidad = () => {
    let cumplidos = 0;
    if (tienePersoneria) cumplidos++;
    if (tieneExperiencia) cumplidos++;
    if (tieneRut) cumplidos++;
    if (tieneCuentaBancaria) cumplidos++;
    return {
      porcentaje: (cumplidos / 4) * 100,
      cumplidos,
      esApto: cumplidos >= 3
    };
  };

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 8 • AfroConvoca IA
            </span>
            <span className="text-xs text-stone-400">
              Radar de Financiación, Becas y Cooperación Internacional
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Convocatorias y Oportunidades Verificadas
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Identificación de convocatorias activas de MinCulturas, MinIgualdad, ICETEX Fondo Étnico, Fondo Emprender SENA y cooperación europea para comunidades NARP de Santander con verificador de elegibilidad.
          </p>
        </div>

        <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs">
          <span className="text-stone-400 block text-[10px]">Oportunidades Abiertas:</span>
          <span className="font-bold text-amber-400 text-sm">5 Convocatorias Vigentes</span>
        </div>
      </div>

      {/* Grid de Convocatorias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {convocatoriasFiltradas.map((conv) => {
          return (
            <div
              key={conv.id}
              className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between text-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-amber-300 border border-stone-700">
                    {conv.categoria}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    conv.estado === 'Abierta'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  }`}>
                    {conv.estado} • Cierre: {conv.fechaCierre}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 font-medium block">
                    {conv.entidad}
                  </span>
                  <h3 className="font-bold text-white text-sm leading-snug">
                    {conv.titulo}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="text-stone-400 text-[10px] block">Monto Máximo Financiable:</span>
                  <strong className="text-amber-400 text-xs">{conv.montoMaximo}</strong>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-white text-[11px] block">Requisitos Principales:</span>
                  <ul className="space-y-1 text-stone-300 text-[11px]">
                    {conv.requisitosClave.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 shrink-0">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-stone-400">
                  <strong>Dirigido a:</strong> {conv.dirigidoA}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <button
                  onClick={() => setConvocatoriaEvaluada(conv)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold cursor-pointer"
                >
                  Evaluar Elegibilidad
                </button>

                <a
                  href={conv.enlaceOficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-amber-400 font-semibold flex items-center gap-1"
                >
                  <span>Portal Oficial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL EVALUADOR DE ELEGIBILIDAD */}
      {convocatoriaEvaluada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 space-y-5 text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase font-mono">
                  Test Interactivo de Elegibilidad
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  {convocatoriaEvaluada.titulo}
                </h3>
              </div>
              <button onClick={() => setConvocatoriaEvaluada(null)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <span className="font-bold text-white text-xs block">
                Marque las condiciones con las que cuenta actualmente su organización:
              </span>

              <label className="flex items-center gap-2.5 p-2.5 bg-stone-950 rounded-lg border border-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tienePersoneria}
                  onChange={(e) => setTienePersoneria(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <span className="text-stone-200">1. Personería jurídica comunitaria o inscripción en esta plataforma.</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 bg-stone-950 rounded-lg border border-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tieneExperiencia}
                  onChange={(e) => setTieneExperiencia(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <span className="text-stone-200">2. Mínimo 1 año de trayectoria en la temática de la convocatoria.</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 bg-stone-950 rounded-lg border border-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tieneRut}
                  onChange={(e) => setTieneRut(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <span className="text-stone-200">3. RUT actualizado con representación legal vigente.</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 bg-stone-950 rounded-lg border border-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tieneCuentaBancaria}
                  onChange={(e) => setTieneCuentaBancaria(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <span className="text-stone-200">4. Cuenta bancaria a nombre de la persona jurídica u organización.</span>
              </label>
            </div>

            {/* Resultado del cálculo */}
            <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-xs">Resultado Preliminar de Idoneidad:</span>
                <span className="font-black text-amber-400 text-sm">{calcularElegibilidad().porcentaje}%</span>
              </div>
              <p className="text-[11px] text-stone-300">
                {calcularElegibilidad().esApto ? (
                  <span className="text-emerald-400 font-semibold">
                    ✓ Su organización cumple con los criterios mínimos para presentar propuesta. Puede estructurar el proyecto en el módulo AfroProyecta MGA.
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold">
                    ⚠ Se sugiere subsanar los requisitos pendientes antes del cierre para evitar rechazo formal.
                  </span>
                )}
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-800">
              <button
                onClick={() => setConvocatoriaEvaluada(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 text-white font-semibold"
              >
                Cerrar Test
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
