import React, { useState } from 'react';
import { 
  Scale, 
  MapPin, 
  BookOpen, 
  Users, 
  FileText, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Bell, 
  ShieldCheck, 
  Award, 
  Menu, 
  X, 
  Search, 
  Code2, 
  ChevronDown,
  Building
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegistro: () => void;
  onOpenBlueprint: () => void;
  onOpenChat: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegistro,
  onOpenBlueprint,
  onOpenChat,
  searchQuery,
  setSearchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Inicio', icon: Scale },
    { id: 'consultiva', label: 'La Consultiva', icon: Users },
    { id: 'subcomisiones', label: '7 Subcomisiones', icon: Layers },
    { id: 'directorio', label: 'Directorio NARP', icon: Building, badge: 'Circular 065' },
    { id: 'mapa', label: 'Mapa Santander', icon: MapPin },
    { id: 'normativa', label: 'Normativa IA', icon: BookOpen },
    { id: 'proyectos', label: 'AfroProyecta MGA', icon: FileText },
    { id: 'observatorio', label: 'Observatorio', icon: TrendingUp },
    { id: 'convocatorias', label: 'Convocatorias', icon: Bell },
    { id: 'patrimonio', label: 'Patrimonio', icon: Award },
    { id: 'educa', label: 'AfroEduca', icon: BookOpen },
    { id: 'control', label: 'Control Social', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-amber-600/30 shadow-xl">
      {/* Barra superior de estado institucional */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 px-4 py-1.5 border-b border-amber-500/20 text-xs text-amber-200/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-amber-400">PROCESO ELECTORAL 2026:</span>
          <span className="text-stone-300">Circular N.º 065 (PRO 2929074) — 25 Admitidas / 8 No Admitidas</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-stone-300">
          <span>87 Municipios • 7 Provincias de Santander</span>
          <button 
            onClick={onOpenBlueprint}
            className="hover:text-amber-400 flex items-center gap-1 font-medium text-amber-300/90 underline decoration-dotted transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            Blueprint 1.0 & DDL PostGIS/pgvector
          </button>
        </div>
      </div>

      {/* Barra principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo y título */}
          <div 
            onClick={() => setActiveTab('inicio')} 
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-stone-900 p-0.5 shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-amber-400 font-black tracking-wider text-lg border border-amber-500/40">
                AFRO
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  CONSULTIVO AFRO
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-950 uppercase tracking-wider">
                  Santander IA
                </span>
              </div>
              <p className="text-xs text-amber-200/70 font-medium">
                Comisión Consultiva Departamental • Comunidades NARP
              </p>
            </div>
          </div>

          {/* Buscador universal rápido */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar norma, org, municipio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950/80 border border-stone-700/80 rounded-full pl-9 pr-4 py-1.5 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* Acciones principales y botón destacado de registro */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-amber-300 text-xs font-semibold shadow-sm hover:border-amber-500 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>NEXO AFRO IA</span>
            </button>

            <button
              onClick={onOpenRegistro}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform active:scale-95 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Registre su Organización NARP</span>
            </button>
          </div>

          {/* Botón menú móvil */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenRegistro}
              className="px-2.5 py-1.5 rounded bg-amber-500 text-stone-950 text-xs font-bold"
            >
              Inscribir
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Barra de navegación de módulos */}
        <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto py-2 border-t border-stone-800/80 scrollbar-none text-xs font-medium">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 text-[9px] px-1 py-0.2 rounded bg-amber-900/60 text-amber-200 border border-amber-700/50">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Menú Móvil desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar normas, organizaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-left text-xs ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenRegistro();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-amber-500 text-stone-950 font-bold text-xs rounded-lg uppercase tracking-wider text-center"
            >
              Registre su Organización NARP
            </button>
            <button
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-stone-800 text-amber-300 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Asistente NEXO AFRO IA
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
