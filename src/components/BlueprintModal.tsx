import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Database, 
  ShieldCheck, 
  Server, 
  Layers, 
  Copy, 
  Check, 
  Terminal, 
  Download,
  BookOpen
} from 'lucide-react';
import { BLUEPRINT_FUNCIONAL_1_0 } from '../data/blueprintData';

interface BlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintModal: React.FC<BlueprintModalProps> = ({ isOpen, onClose }) => {
  const [tabTecnico, setTabTecnico] = useState<'arquitectura' | 'sql' | 'rbac' | 'modulos'>('arquitectura');
  const [copiado, setCopiado] = useState(false);

  const copiarSQL = () => {
    navigator.clipboard.writeText(BLUEPRINT_FUNCIONAL_1_0.esquemaPostgresSql);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto text-xs text-stone-200">
      <div className="relative w-full max-w-5xl bg-stone-900 border border-amber-600/50 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Cabecera */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Blueprint Funcional 1.0 & Arquitectura de Software
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500 text-stone-950">
                  v2.0 Octubre 2026
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80">
                Especificación técnica integral: PostgreSQL 16 + PostGIS + pgvector + RBAC + RAG Jurídico
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tabs técnicas */}
        <div className="flex border-b border-stone-800 bg-stone-950 px-6 pt-2 gap-2 shrink-0">
          {[
            { id: 'arquitectura', label: 'Arquitectura & Stack', icon: Server },
            { id: 'sql', label: 'Esquema DDL PostgreSQL (PostGIS/pgvector)', icon: Database },
            { id: 'rbac', label: 'Matriz de Permisos RBAC', icon: ShieldCheck },
            { id: 'modulos', label: 'Catálogo de 13 Módulos', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = tabTecnico === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTabTecnico(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-stone-900/60'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido scrolleable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: ARQUITECTURA */}
          {tabTecnico === 'arquitectura' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    Frontend Intercultural
                  </h4>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    Construido en <strong>React 19, TypeScript y Tailwind CSS v4</strong>. Diseñado bajo la disciplina de alta legibilidad, contraste cromático ético inspirado en la identidad afrodescendiente y santandereana, adaptado para dispositivos móviles en áreas rurales ribereñas.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Server className="w-4 h-4" />
                    Backend & API Server-Side
                  </h4>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    Arquitectura en <strong>Node.js / Express con endpoints REST seguros</strong>. Las llamadas al SDK oficial <code>@google/genai</code> se ejecutan exclusivamente del lado del servidor para proteger la clave de API y garantizar auditoría institucional.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    Persistencia Relacional & Espacial
                  </h4>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    <strong>PostgreSQL 16</strong> como motor central con <strong>PostGIS</strong> para cálculo de geometrías de los 87 municipios y <strong>pgvector</strong> para recuperación semántica RAG de sentencias constitucionales y normas.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Seguridad & Habeas Data (Ley 1581)
                  </h4>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    Protección reforzada de datos sensibles con pertenencia étnica. Disociación entre registro público y datos de contacto restringidos. Trazabilidad inalterable de radicados.
                  </p>
                </div>
              </div>

              {/* Modelo de Sostenibilidad */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider">
                  Modelo de Sostenibilidad Institucional (Prompt Sección 24)
                </h4>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  El sostenimiento de la plataforma se apoya en <strong>convenios interinstitucionales con la Gobernación de Santander, el Ministerio de Igualdad y Equidad, la cooperación internacional (AECID/USAID) y alianzas académicas con la UIS</strong>. El acceso a la información pública, la consulta jurídica y el registro de organizaciones es 100% gratuito. Se prohíbe taxativamente la comercialización de datos personales comunitarios.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ESQUEMA DDL SQL */}
          {tabTecnico === 'sql' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-stone-400">
                  Script DDL de inicialización para PostgreSQL 16 con PostGIS y pgvector:
                </span>
                <button
                  onClick={copiarSQL}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiado ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiado ? '¡Copiado!' : 'Copiar DDL Completo'}</span>
                </button>
              </div>

              <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-[11px] font-mono text-amber-300 overflow-x-auto leading-relaxed max-h-[60vh]">
                {BLUEPRINT_FUNCIONAL_1_0.esquemaPostgresSql}
              </pre>
            </div>
          )}

          {/* TAB 3: MATRIZ RBAC */}
          {tabTecnico === 'rbac' && (
            <div className="space-y-4">
              <p className="text-[11px] text-stone-300">
                Matriz de Control de Acceso Basado en Roles (RBAC) diseñada para garantizar soberanía comunitaria y debida custodia de la información:
              </p>

              <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-900 border-b border-stone-800 text-amber-400">
                      <th className="p-3 font-bold">Rol en el Ecosistema</th>
                      <th className="p-3 font-bold">Alcance Funcional</th>
                      <th className="p-3 font-bold">Nivel de Acceso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/80 text-stone-300 text-[11px]">
                    {BLUEPRINT_FUNCIONAL_1_0.matrizRbac.map((r, idx) => (
                      <tr key={idx} className="hover:bg-stone-900/40">
                        <td className="p-3 font-semibold text-white">{r.rol}</td>
                        <td className="p-3">{r.alcance}</td>
                        <td className="p-3 font-mono text-amber-300">{r.acceso}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CATÁLOGO DE MÓDULOS */}
          {tabTecnico === 'modulos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BLUEPRINT_FUNCIONAL_1_0.modulosIntegrados.map((mod) => (
                <div key={mod.num} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-amber-400 font-bold text-[10px]">
                      MÓDULO {mod.num} • {mod.codigo}
                    </span>
                  </div>
                  <strong className="text-white text-xs block">{mod.nombre}</strong>
                  <p className="text-[11px] text-stone-400 leading-relaxed">{mod.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-stone-950 px-6 py-3 border-t border-stone-800 flex justify-between items-center shrink-0">
          <span className="text-[10px] text-stone-400">
            Documento de Ingeniería de Software • Preparado para Producción Departamental
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 text-white font-semibold"
          >
            Cerrar Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
