import React from 'react';
import { Scale, Shield, FileText, CheckCircle, ExternalLink, Code2 } from 'lucide-react';

interface FooterProps {
  onOpenBlueprint: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBlueprint, setActiveTab }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Identidad */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-stone-950 text-sm">
                CAS
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                CONSULTIVO AFRO SANTANDER IA
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Plataforma oficial de inteligencia territorial, administración de la Comisión Consultiva Departamental y articulación de organizaciones NARP del departamento de Santander, Colombia.
            </p>
            <div className="text-[11px] text-amber-400/90 font-mono">
              Versión 2.0 • Octubre de 2026
            </div>
          </div>

          {/* Marco Institucional */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs flex items-center gap-1.5 text-amber-400">
              <Scale className="w-3.5 h-3.5" />
              Marco Legal Principal
            </h4>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li>• Constitución Política de Colombia (Art. 7, 13, 55T)</li>
              <li>• Ley 70 de 1993 y Convenio 169 de la OIT</li>
              <li>• Decreto 1640 de 2020 (RPUN MinInterior)</li>
              <li>• Decretos 1384, 1396, 1397, 1398 de 2023</li>
              <li>• Sentencia T-576 de 2014 de la Corte Constitucional</li>
              <li>• Circular 065 de 2026 (Secretaría del Interior Santander)</li>
            </ul>
          </div>

          {/* Enlaces de Interés */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs flex items-center gap-1.5 text-amber-400">
              <FileText className="w-3.5 h-3.5" />
              Módulos del Ecosistema
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('directorio')} className="hover:text-amber-300">
                  Directorio Organizaciones (Circular 065)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('subcomisiones')} className="hover:text-amber-300">
                  Las 7 Subcomisiones Sectoriales
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('mapa')} className="hover:text-amber-300">
                  Mapa SIG Santander (87 Municipios)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('proyectos')} className="hover:text-amber-300">
                  Banco AfroProyecta MGA
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('observatorio')} className="hover:text-amber-300">
                  Observatorio de Brechas e Indicadores
                </button>
              </li>
            </ul>
          </div>

          {/* Transparencia y Datos Sensibles */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs flex items-center gap-1.5 text-amber-400">
              <Shield className="w-3.5 h-3.5" />
              Protección de Datos y Ética
            </h4>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              En estricto cumplimiento de la <strong>Ley 1581 de 2012</strong>, los datos étnicos son sensibles. No se difunden datos privados de delegados sin consentimiento previo. La inscripción voluntaria en esta plataforma no reemplaza el Registro Público Único Nacional del Ministerio del Interior.
            </p>
            <button
              onClick={onOpenBlueprint}
              className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
            >
              <Code2 className="w-3.5 h-3.5" />
              Ver Esquema de Base de Datos y Arquitectura
            </button>
          </div>

        </div>

        {/* Separador inferior */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <div>
            © 2026 CONSULTIVO AFRO SANTANDER IA • Departamento de Santander, Colombia.
          </div>
          <div className="flex items-center gap-4 text-xs text-stone-300">
            <span>Comisión Consultiva Departamental</span>
            <span>•</span>
            <span>Secretaría del Interior de Santander</span>
            <span>•</span>
            <span className="text-amber-400">Desarrollo con Enfoque Diferencial Étnico</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
