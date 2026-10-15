import React, { useState } from 'react';
import { 
  Award, 
  Music, 
  Utensils, 
  BookOpen, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Heart,
  Volume2
} from 'lucide-react';
import { PATRIMONIO_SANTANDER } from '../data/patrimonioData';
import { PatrimonioElemento } from '../types';

export const PatrimonioVivoView: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');
  const [elementoActivo, setElementoActivo] = useState<PatrimonioElemento | null>(null);

  const categorias = ['Todas', 'Música y Danza', 'Gastronomía', 'Saberes Ancestrales', 'Festividades'];

  const elementosFiltrados = PATRIMONIO_SANTANDER.filter(p =>
    categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada
  );

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 9 • Patrimonio Vivo
            </span>
            <span className="text-xs text-stone-400">
              Memoria, Identidad Biocultural y Saberes Ancestrales
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Patrimonio Cultural Inmaterial Afro-Santandereano
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Preservación comunitaria de la tambora del Magdalena Medio, los cantos de boga, la culinaria ribereña tradicional, los peinados libertarios y la memoria botánica de las parteras con consentimiento libre, previo e informado.
          </p>
        </div>

        <div className="text-right p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs">
          <span className="text-stone-400 block text-[10px]">Protección Colectiva:</span>
          <span className="text-amber-400 font-bold">Convenio 169 OIT & Ley 70</span>
        </div>
      </div>

      {/* Filtro por Categorías */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-stone-400 font-medium mr-1">Filtrar manifestación:</span>
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

      {/* Grid de Fichas Patrimoniales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {elementosFiltrados.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all p-5 space-y-4 flex flex-col justify-between text-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-amber-300 border border-stone-700">
                  {item.categoria}
                </span>
                <span className="text-[10px] text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {item.municipio}
                </span>
              </div>

              <h3 className="font-bold text-white text-base leading-snug">
                {item.nombre}
              </h3>

              <p className="text-stone-300 text-xs leading-relaxed line-clamp-4">
                {item.descripcion}
              </p>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] space-y-1">
                <span className="text-stone-400 block text-[10px]">Comunidad Portadora de Santander:</span>
                <strong className="text-amber-200 block">{item.comunidadPortadora}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Consentimiento informado verificado
              </span>
              <button
                onClick={() => setElementoActivo(item)}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Conocer Más
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DETALLE PATRIMONIAL */}
      {elementoActivo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase font-mono">
                  Patrimonio Inmaterial de Santander
                </span>
                <h3 className="text-base font-bold text-white leading-snug">{elementoActivo.nombre}</h3>
              </div>
              <button onClick={() => setElementoActivo(null)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-stone-300 leading-relaxed text-xs">
              <p>{elementoActivo.descripcion}</p>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <span className="text-stone-400 block text-[10px]">Territorio y Portadores:</span>
                <strong className="text-amber-300">{elementoActivo.comunidadPortadora} en {elementoActivo.municipio}</strong>
              </div>

              <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-800/40 text-amber-200 text-[11px]">
                <strong>Protocolo Ético Comunitario:</strong> Este registro respeta el carácter inalienable del patrimonio biocultural. No se comercializan conocimientos tradicionales sagrados sin el aval de las comunidades portadoras.
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setElementoActivo(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 text-white font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
