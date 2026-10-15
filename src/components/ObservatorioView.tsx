import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Home, 
  Briefcase, 
  HeartHandshake, 
  AlertCircle, 
  Layers, 
  MapPin, 
  Info,
  Download
} from 'lucide-react';
import { INDICADORES_OBSERVATORIO, ESTADISTICAS_GENERALES } from '../data/observatorioData';
import { MUNICIPIOS_DESTACADOS } from '../data/santanderTerritory';

export const ObservatorioView: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');

  const categorias = ['Todas', 'Demografía', 'Educación', 'Vivienda y Servicios', 'Empleo e Ingresos', 'Víctimas'];

  const indicadoresFiltrados = INDICADORES_OBSERVATORIO.filter(ind => 
    categoriaSeleccionada === 'Todas' || ind.categoria === categoriaSeleccionada
  );

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 7 • Observatorio NARP Santander
            </span>
            <span className="text-xs text-stone-400">
              Fuentes: DANE • DNP Terridata • SISBEN IV • UARIV 2026
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Observatorio de Indicadores y Brechas Sociales
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Medición rigurosa de las condiciones de vida de la población afrocolombiana en Santander. Cada indicador especifica su fuente oficial, fecha de medición, metodología y limitaciones estadísticas.
          </p>
        </div>

        <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-right">
          <span className="text-[10px] text-stone-400 block">Población NARP Departamental Estimada:</span>
          <span className="text-lg font-black text-amber-400">~148.500 Personas</span>
        </div>
      </div>

      {/* Tarjetas Principales de Resumen Departamental */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-semibold uppercase">Población en Barrancabermeja</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">20.47%</div>
          <span className="text-[10px] text-emerald-400">Mayor concentración departamental (~43.500 hab.)</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-semibold uppercase">Población en Puerto Wilches</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">20.34%</div>
          <span className="text-[10px] text-emerald-400">Comunidades ribereñas y cenagosas (~7.200 hab.)</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-semibold uppercase">Brecha NBI Rural NARP</span>
            <Home className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">34.2%</div>
          <span className="text-[10px] text-stone-400">Frente al 14.8% promedio departamental</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-semibold uppercase">Víctimas en RUV Santander</span>
            <HeartHandshake className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">23.840</div>
          <span className="text-[10px] text-stone-400">Población étnica con afectación por conflicto</span>
        </div>
      </div>

      {/* Gráfico Comparativo Municipal de Distribución Étnica */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <h3 className="font-bold text-white text-sm">
              Distribución Demográfica de Población NARP por Municipios de Santander
            </h3>
            <p className="text-[11px] text-stone-400">
              Proporción de autorreconocimiento étnico (%) según el Censo Nacional DANE y proyecciones municipales 2026.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {MUNICIPIOS_DESTACADOS.slice(0, 6).map((m) => (
            <div key={m.nombre} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-200">{m.nombre} ({m.provincia})</span>
                <span className="text-amber-400 font-mono font-bold">
                  {m.porcentajeAfro}% ({m.poblacionAfroEstimada.toLocaleString('es-CO')} hab.)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-full"
                  style={{ width: `${Math.min(100, m.porcentajeAfro * 4.5)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros por Categoría de Indicador */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs text-stone-400 font-medium mr-1">Filtrar por categoría:</span>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              categoriaSeleccionada === cat
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Fichas Técnicas de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicadoresFiltrados.map((ind) => (
          <div
            key={ind.id}
            className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-amber-300 border border-stone-700">
                {ind.categoria}
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                Medición: {ind.fechaMedicion}
              </span>
            </div>

            <h4 className="font-bold text-white text-sm leading-snug">
              {ind.nombre}
            </h4>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex justify-between items-center">
              <span className="text-stone-400 text-[11px]">Valor Registrado:</span>
              <span className="text-base font-black text-amber-400">
                {ind.valor} {ind.unidad.includes('%') ? '' : ind.unidad}
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-stone-300">
              <p>• <strong>Ámbito territorial:</strong> {ind.municipio}</p>
              <p>• <strong>Población de referencia:</strong> {ind.poblacionReferencia}</p>
              <p>• <strong>Fuente oficial:</strong> {ind.fuente}</p>
            </div>

            {ind.limitaciones && (
              <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-[10px] text-stone-400">
                <strong>Limitaciones metodológicas:</strong> {ind.limitaciones}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Principio de rigor documental:</strong> No extrapolamos ni inventamos cifras municipales cuando las fuentes oficiales solo disponen de agregados departamentales. Todas las fuentes se citan conforme a los estándares de datos abiertos de Colombia.
        </span>
      </div>

    </div>
  );
};
