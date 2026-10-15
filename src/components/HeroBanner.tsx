import React from 'react';
import { 
  Users, 
  MapPin, 
  Layers, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  TrendingUp,
  Search,
  BookOpen
} from 'lucide-react';

interface HeroBannerProps {
  onOpenRegistro: () => void;
  onOpenChat: () => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenRegistro,
  onOpenChat,
  setActiveTab,
  setSearchQuery
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-stone-100 border-b border-stone-800">
      {/* Patrón de fondo geométrico étnico sutil */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Resplandor cálido de fondo */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Columna de texto principal */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Gobernanza Étnica Departamental Santander • 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              CONSULTIVO AFRO <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                SANTANDER IA
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal max-w-2xl">
              Ecosistema inteligente para la administración de la Comisión Consultiva Departamental, la articulación de organizaciones NARP, la protección de derechos étnicos, la gestión de proyectos MGA y la inteligencia territorial en los <strong className="text-white">87 municipios</strong> de Santander.
            </p>

            {/* Lema */}
            <div className="p-3 rounded-lg bg-stone-950/70 border-l-4 border-amber-500 text-xs text-amber-200/90 italic font-serif">
              “Inteligencia, identidad y participación para el desarrollo afro de Santander.”
            </div>

            {/* Botones de acción principales */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenRegistro}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Registre su Organización NARP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenChat}
                className="px-4 py-3 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-amber-400"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Asistente NEXO AFRO IA</span>
              </button>

              <button
                onClick={() => setActiveTab('mapa')}
                className="px-4 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-stone-400" />
                <span>Mapa SIG Santander</span>
              </button>
            </div>

            {/* Chips de consultas frecuentes rápidas */}
            <div className="pt-2">
              <span className="text-[11px] text-stone-400 block mb-2 font-medium">
                Consultas rápidas con grounding oficial:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Circular 065 de 2026',
                  'Organizaciones en Barrancabermeja',
                  'Ley 70 de 1993 y Decretos 2023',
                  'Las 7 Subcomisiones',
                  'Proyectos en Metodología MGA'
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(chip);
                      setActiveTab(chip.includes('Subcomisiones') ? 'subcomisiones' : chip.includes('Ley') ? 'normativa' : chip.includes('MGA') ? 'proyectos' : 'directorio');
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700/60 hover:border-amber-500/50 hover:text-amber-300 transition-all cursor-pointer"
                  >
                    #{chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Columna de tarjetas estadísticas y de proceso oficial */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Tarjeta del Proceso Electoral Circular 065 */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border border-amber-600/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Circular N.º 065 de 2026</h3>
                    <p className="text-[11px] text-stone-400">Secretaría del Interior de Santander • PRO 2929074</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700/40 font-mono">
                  05/10/2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-4">
                <div className="p-3 rounded-xl bg-stone-950/80 border border-emerald-500/30">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>25 Postulaciones</span>
                  </div>
                  <div className="text-xl font-black text-white">ADMITIDAS</div>
                  <p className="text-[10px] text-stone-400 mt-1">Con cumplimiento pleno para asamblea electoral.</p>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-500/30">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>8 Postulaciones</span>
                  </div>
                  <div className="text-xl font-black text-white">NO ADMITIDAS</div>
                  <p className="text-[10px] text-stone-400 mt-1">Expediente electoral preservado con justificación.</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-stone-300">
                <span className="text-[11px] text-stone-400">Total expedientes revisados: 33 organizaciones</span>
                <button
                  onClick={() => setActiveTab('directorio')}
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>Ver relación</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Métricas clave del departamento */}
            <div className="grid grid-cols-3 gap-2.5">
              <div 
                onClick={() => setActiveTab('consultiva')}
                className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-colors cursor-pointer text-center"
              >
                <div className="text-xl font-black text-amber-400">18</div>
                <div className="text-[11px] font-semibold text-white">Consultivos</div>
                <div className="text-[10px] text-stone-400">Acreditados</div>
              </div>

              <div 
                onClick={() => setActiveTab('subcomisiones')}
                className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-colors cursor-pointer text-center"
              >
                <div className="text-xl font-black text-amber-400">7</div>
                <div className="text-[11px] font-semibold text-white">Subcomisiones</div>
                <div className="text-[10px] text-stone-400">Temáticas</div>
              </div>

              <div 
                onClick={() => setActiveTab('mapa')}
                className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-colors cursor-pointer text-center"
              >
                <div className="text-xl font-black text-amber-400">87</div>
                <div className="text-[11px] font-semibold text-white">Municipios</div>
                <div className="text-[10px] text-stone-400">Santander</div>
              </div>
            </div>

            {/* Aviso ético y de transparencia */}
            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-[11px] text-stone-400 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Garantía de rigor:</strong> No simulamos datos oficiales. Toda información se basa en actos administrativos expedidos, fuentes del DANE, MinInterior y la Gobernación de Santander.
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
