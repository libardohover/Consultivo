import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/HeroBanner';
import { DirectorioOrganizaciones } from './components/DirectorioOrganizaciones';
import { MapaAfroSantander } from './components/MapaAfroSantander';
import { GobiernoEtnico } from './components/GobiernoEtnico';
import { SubcomisionesView } from './components/SubcomisionesView';
import { NormativaView } from './components/NormativaView';
import { AfroProyectaView } from './components/AfroProyectaView';
import { ObservatorioView } from './components/ObservatorioView';
import { AfroConvocaView } from './components/AfroConvocaView';
import { PatrimonioVivoView } from './components/PatrimonioVivoView';
import { AfroEducaView } from './components/AfroEducaView';
import { ControlSocialView } from './components/ControlSocialView';
import { NexoAfroChat } from './components/NexoAfroChat';
import { FormularioRegistroModal } from './components/FormularioRegistroModal';
import { BlueprintModal } from './components/BlueprintModal';
import { OrganizacionNARP } from './types';
import { 
  Building2, 
  MapPin, 
  BookOpen, 
  Layers, 
  FileText, 
  TrendingUp, 
  Bell, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [registroModalOpen, setRegistroModalOpen] = useState(false);
  const [blueprintModalOpen, setBlueprintModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Lista de organizaciones adicionales registradas en tiempo de ejecución
  const [organizacionesNuevas, setOrganizacionesNuevas] = useState<OrganizacionNARP[]>([]);

  const handleOrganizacionRegistrada = (org: OrganizacionNARP) => {
    setOrganizacionesNuevas(prev => [org, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Barra de Navegación Principal */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRegistro={() => setRegistroModalOpen(true)}
        onOpenBlueprint={() => setBlueprintModalOpen(true)}
        onOpenChat={() => setChatOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Contenido Dinámico */}
      <main className="flex-1">
        {activeTab === 'inicio' && (
          <div>
            {/* Banner Hero */}
            <HeroBanner
              onOpenRegistro={() => setRegistroModalOpen(true)}
              onOpenChat={() => setChatOpen(true)}
              setActiveTab={setActiveTab}
              setSearchQuery={setSearchQuery}
            />

            {/* Módulos Destacados en Inicio */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
              
              {/* Sección de Módulos Centrales */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                      Ecosistema Departamental
                    </span>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      Módulos Integrados de Gobernanza Étnica
                    </h2>
                  </div>
                  <span className="text-xs text-stone-400">
                    Haga clic para acceder a cada herramienta especializada
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'consultiva', title: 'Gobierno Étnico', desc: 'Comisión Consultiva Departamental, sesiones, quórum y actas de concertación.', icon: Building2, tag: 'Instancia Oficial' },
                    { id: 'subcomisiones', title: '7 Subcomisiones', desc: 'Gestión técnica sectorial: derechos humanos, educación, salud, economía y cultura.', icon: Layers, tag: 'Técnico' },
                    { id: 'directorio', title: 'Directorio NARP', desc: 'Registro de organizaciones: 25 admitidas y 8 no admitidas de la Circular 065 de 2026.', icon: FileText, tag: 'Circular 065' },
                    { id: 'mapa', title: 'Mapa Santander', desc: 'SIG territorial interactivo de los 87 municipios y 7 provincias con consejos comunitarios.', icon: MapPin, tag: '87 Municipios' },
                    { id: 'normativa', title: 'Normativa Afro IA', desc: 'Buscador jurídico RAG: Ley 70, Convenio 169 OIT, Sentencia T-576/14 y decretos 2023.', icon: BookOpen, tag: 'RAG Jurídico' },
                    { id: 'proyectos', title: 'AfroProyecta MGA', desc: 'Banco de proyectos y formulador asistido en Metodología General Ajustada (DNP).', icon: TrendingUp, tag: 'MGA & Regalías' },
                    { id: 'observatorio', title: 'Observatorio', desc: 'Indicadores territoriales y brechas sociales basados en DANE, DNP y fuentes de Santander.', icon: TrendingUp, tag: 'Datos 2026' },
                    { id: 'convocatorias', title: 'AfroConvoca IA', desc: 'Radar de oportunidades de financiación, becas ICETEX y cooperación internacional.', icon: Bell, tag: 'Oportunidades' }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="group p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 text-stone-300 border border-stone-800">
                              {item.tag}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
                          <span>Ingresar al módulo</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Banner de Llamado a la Acción para Inscripción Voluntaria */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border border-amber-600/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Inscripción Gratuita e Incluyente</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    ¿Pertenece a una Organización o Expresión NARP en Santander?
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Haga visible a su comunidad en el directorio oficial y mapa territorial. No es requisito obligatorio contar con registro nacional previo ante el Ministerio del Interior para comenzar su proceso de fortalecimiento en la plataforma.
                  </p>
                </div>

                <button
                  onClick={() => setRegistroModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 shrink-0 transition-transform active:scale-95 cursor-pointer"
                >
                  Registre su Organización NARP
                </button>
              </div>

              {/* Vista previa rápida del Directorio Circular 065 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                      Expediente Electoral Departamental
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Directorio de Organizaciones (Circular N.º 065 de 2026)
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('directorio')}
                    className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Ver las 33 organizaciones completas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <DirectorioOrganizaciones
                  organizacionesExtras={organizacionesNuevas}
                  onOpenRegistro={() => setRegistroModalOpen(true)}
                  filtroPreestablecido={searchQuery}
                />
              </div>

            </div>
          </div>
        )}

        {/* MÓDULOS ESPECÍFICOS */}
        {activeTab !== 'inicio' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'consultiva' && <GobiernoEtnico />}
            {activeTab === 'subcomisiones' && <SubcomisionesView />}
            {activeTab === 'directorio' && (
              <DirectorioOrganizaciones
                organizacionesExtras={organizacionesNuevas}
                onOpenRegistro={() => setRegistroModalOpen(true)}
                filtroPreestablecido={searchQuery}
              />
            )}
            {activeTab === 'mapa' && (
              <MapaAfroSantander
                onOpenRegistro={() => setRegistroModalOpen(true)}
              />
            )}
            {activeTab === 'normativa' && <NormativaView />}
            {activeTab === 'proyectos' && <AfroProyectaView />}
            {activeTab === 'observatorio' && <ObservatorioView />}
            {activeTab === 'convocatorias' && <AfroConvocaView />}
            {activeTab === 'patrimonio' && <PatrimonioVivoView />}
            {activeTab === 'educa' && <AfroEducaView />}
            {activeTab === 'control' && <ControlSocialView />}
          </div>
        )}
      </main>

      {/* Botón Flotante de Asistente NEXO AFRO IA */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setChatOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300/40"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-950"></span>
          </span>
          <Sparkles className="w-4 h-4 text-stone-950" />
          <span>Consultar NEXO AFRO IA</span>
        </button>
      </div>

      {/* Modales y Drawers */}
      <NexoAfroChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      <FormularioRegistroModal
        isOpen={registroModalOpen}
        onClose={() => setRegistroModalOpen(false)}
        onOrganizacionRegistrada={handleOrganizacionRegistrada}
      />

      <BlueprintModal
        isOpen={blueprintModalOpen}
        onClose={() => setBlueprintModalOpen(false)}
      />

      {/* Pie de Página */}
      <Footer
        onOpenBlueprint={() => setBlueprintModalOpen(true)}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
