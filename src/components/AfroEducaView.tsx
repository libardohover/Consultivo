import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle, 
  PlayCircle, 
  FileText, 
  User, 
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { CURSOS_AFROEDUCA } from '../data/educaData';
import { CursoEduca } from '../types';

export const AfroEducaView: React.FC = () => {
  const [cursoActivo, setCursoActivo] = useState<CursoEduca>(CURSOS_AFROEDUCA[0]);
  const [moduloActivoIdx, setModuloActivoIdx] = useState(0);
  const [certificadoNombre, setCertificadoNombre] = useState('');
  const [generarCertificado, setGenerarCertificado] = useState(false);

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 10 • AfroEduca
            </span>
            <span className="text-xs text-stone-400">
              Aula Virtual de Capacidades y Liderazgo NARP
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Formación en Derechos Étnicos, MGA y Control Social
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Módulos formativos prácticos diseñados para líderes comunitarios, consultivos y jóvenes afrocolombianos de Santander. Acceda a contenidos sobre la Ley 70 de 1993, formulación de proyectos y veedurías ciudadanas.
          </p>
        </div>

        <div className="text-right p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs">
          <span className="text-stone-400 block text-[10px]">Cursos Disponibles:</span>
          <span className="text-amber-400 font-bold">3 Programas Modulares</span>
        </div>
      </div>

      {/* Selector de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CURSOS_AFROEDUCA.map((curso) => {
          const isSelected = curso.id === cursoActivo.id;
          return (
            <div
              key={curso.id}
              onClick={() => {
                setCursoActivo(curso);
                setModuloActivoIdx(0);
                setGenerarCertificado(false);
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-950/40 border-amber-500 shadow-xl'
                  : 'bg-stone-900 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-stone-800 text-amber-300 font-mono font-bold">
                    {curso.nivel}
                  </span>
                  <span className="text-stone-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-stone-500" />
                    {curso.duracionHoras} Horas
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm leading-snug">
                  {curso.titulo}
                </h3>

                <p className="text-stone-300 text-xs line-clamp-3 leading-relaxed">
                  {curso.descripcion}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                <span>{curso.modulos.length} Módulos</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <span>Abrir Aula</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Aula Virtual del Curso Activo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl text-xs">
        
        {/* Lista de Lecciones / Módulos (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-stone-800 pb-4 lg:pb-0 lg:pr-4">
          <div className="space-y-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase font-mono">
              Estructura Curricular
            </span>
            <h4 className="font-bold text-white text-sm">
              {cursoActivo.titulo}
            </h4>
            <p className="text-[11px] text-stone-400">
              Instructor: {cursoActivo.instructor}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {cursoActivo.modulos.map((mod, idx) => {
              const isCurrent = idx === moduloActivoIdx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setModuloActivoIdx(idx);
                    setGenerarCertificado(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-amber-400">Módulo {idx + 1}</span>
                    <span className="text-stone-400 font-mono">{mod.duracionMin} Min</span>
                  </div>
                  <strong className="block text-xs leading-snug">{mod.titulo}</strong>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-800">
            <button
              onClick={() => setGenerarCertificado(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Emitir Constancia de Participación</span>
            </button>
          </div>
        </div>

        {/* Visor de Contenido del Módulo (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {!generarCertificado ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-stone-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase font-mono">
                    Contenido Lectivo • Módulo {moduloActivoIdx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {cursoActivo.modulos[moduloActivoIdx].titulo}
                  </h3>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">
                  {cursoActivo.modulos[moduloActivoIdx].duracionMin} minutos de estudio
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3 leading-relaxed text-stone-300">
                <p className="text-xs">
                  {cursoActivo.modulos[moduloActivoIdx].descripcion}
                </p>

                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-[11px] space-y-2">
                  <strong className="text-amber-400 block font-semibold">Conceptos Clave para la Comunidad:</strong>
                  <ul className="space-y-1 list-disc list-inside text-stone-300">
                    <li>Aplicación del enfoque diferencial en planes departamentales y municipales de desarrollo de Santander.</li>
                    <li>Rutas de participación ciudadana y veeduría comunitaria reconocidas por la normatividad colombiana.</li>
                    <li>Mecanismos de exigibilidad y derechos colectivos tutelados por la Corte Constitucional (Sentencia T-576 de 2014).</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-stone-800">
                <button
                  disabled={moduloActivoIdx === 0}
                  onClick={() => setModuloActivoIdx(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 disabled:opacity-40"
                >
                  ← Módulo Anterior
                </button>
                <button
                  disabled={moduloActivoIdx === cursoActivo.modulos.length - 1}
                  onClick={() => setModuloActivoIdx(prev => Math.min(cursoActivo.modulos.length - 1, prev + 1))}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold disabled:opacity-40"
                >
                  Siguiente Módulo →
                </button>
              </div>
            </div>
          ) : (
            /* GENERADOR DE CONSTANCIA DE PARTICIPACIÓN */
            <div className="p-6 bg-stone-950 rounded-2xl border border-amber-500/40 text-center space-y-5">
              <Award className="w-12 h-12 text-amber-400 mx-auto" />
              
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  Generación de Constancia de Participación Comunitaria
                </h3>
                <p className="text-stone-400 text-xs max-w-md mx-auto">
                  Acreditación de formación ciudadana no formal expedida por el sistema pedagógico de CONSULTIVO AFRO SANTANDER IA.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-2 text-left">
                <label className="block text-stone-300 text-xs font-medium">
                  Nombre Completo del Participante / Líder Comunitario:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Keila Valdés Cassiani"
                  value={certificadoNombre}
                  onChange={(e) => setCertificadoNombre(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {certificadoNombre && (
                <div className="max-w-lg mx-auto p-5 rounded-xl border-2 border-dashed border-amber-500/60 bg-stone-900 text-stone-200 font-serif space-y-2 text-left shadow-lg">
                  <div className="text-center font-sans text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                    REPÚBLICA DE COLOMBIA • DEPARTAMENTO DE SANTANDER
                  </div>
                  <h4 className="text-center font-sans font-black text-sm text-white">
                    CONSTANCIA DE PARTICIPACIÓN FORMATIVA
                  </h4>
                  <p className="text-xs text-center italic text-stone-300">
                    Se hace constar que <strong>{certificadoNombre}</strong> completó satisfactoriamente el programa modular de:
                  </p>
                  <p className="text-center font-bold text-amber-300 text-xs">
                    "{cursoActivo.titulo}" ({cursoActivo.duracionHoras} Horas)
                  </p>
                  <div className="pt-3 border-t border-stone-800 flex justify-between text-[10px] font-sans text-stone-400">
                    <span>Fecha: {new Date().toLocaleDateString('es-CO')}</span>
                    <span>Código: STDER-EDUCA-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setGenerarCertificado(false)}
                  className="px-4 py-1.5 rounded-lg bg-stone-800 text-stone-300 font-semibold"
                >
                  Volver al Módulo
                </button>
                {certificadoNombre && (
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Constancia</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
