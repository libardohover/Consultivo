import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Info, 
  Building2, 
  Users, 
  Eye, 
  Compass, 
  CheckCircle2, 
  Maximize2,
  Minimize2,
  ExternalLink
} from 'lucide-react';
import { MUNICIPIOS_DESTACADOS, PROVINCIAS_SANTANDER } from '../data/santanderTerritory';
import { ORGANIZACIONES_CIRCULAR_065 } from '../data/circular065Data';
import { PROYECTOS_BANCO_SANTANDER } from '../data/proyectosData';
import { OrganizacionNARP } from '../types';

interface MapaAfroSantanderProps {
  onSelectOrganizacion?: (org: OrganizacionNARP) => void;
  onOpenRegistro?: () => void;
}

export const MapaAfroSantander: React.FC<MapaAfroSantanderProps> = ({
  onSelectOrganizacion,
  onOpenRegistro
}) => {
  const [provinciaActiva, setProvinciaActiva] = useState<string>('Todas');
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string>('Barrancabermeja');
  
  // Capas visibles
  const [mostrarRegistroNacional, setMostrarRegistroNacional] = useState(true);
  const [mostrarSinRegistro, setMostrarSinRegistro] = useState(true);
  const [mostrarConsejosComunitarios, setMostrarConsejosComunitarios] = useState(true);
  const [mostrarProyectos, setMostrarProyectos] = useState(true);

  // Municipio enfocado
  const municipioDetalle = useMemo(() => {
    return MUNICIPIOS_DESTACADOS.find(m => m.nombre === municipioSeleccionado) || MUNICIPIOS_DESTACADOS[0];
  }, [municipioSeleccionado]);

  // Organizaciones en el municipio enfocado
  const organizacionesDelMunicipio = useMemo(() => {
    return ORGANIZACIONES_CIRCULAR_065.filter(o => o.municipio.toLowerCase() === municipioDetalle.nombre.toLowerCase());
  }, [municipioDetalle]);

  // Proyectos en el municipio
  const proyectosDelMunicipio = useMemo(() => {
    return PROYECTOS_BANCO_SANTANDER.filter(p => p.municipio.toLowerCase().includes(municipioDetalle.nombre.toLowerCase()));
  }, [municipioDetalle]);

  // Coordenadas cartográficas normalizadas en SVG para Santander (Lat 5.7 a 8.1, Lng -74.5 a -72.4)
  const proyectarCoordenadas = (lat: number, lng: number) => {
    // Escala del bounding box de Santander:
    // Min Lat: 5.7, Max Lat: 8.1
    // Min Lng: -74.5, Max Lng: -72.4
    const minLat = 5.75;
    const maxLat = 7.95;
    const minLng = -74.45;
    const maxLng = -72.45;

    const x = ((lng - minLng) / (maxLng - minLng)) * 750 + 25;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 550 + 25;

    return { x: Math.max(30, Math.min(770, x)), y: Math.max(30, Math.min(570, y)) };
  };

  return (
    <div className="space-y-6">
      
      {/* Encabezado del módulo */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 4 • Mapa Afro Santander
            </span>
            <span className="text-xs text-stone-400">
              Sistema de Información Geográfica Territorial (SIG NARP)
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Georreferenciación Étnica de Santander
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Cartografía interactiva de los 87 municipios y 7 provincias. Visualice consejos comunitarios, organizaciones con RPUN del MinInterior, colectivos comunitarios y proyectos territoriales con rigurosa verificación de coordenadas aproximadas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenRegistro && (
            <button
              onClick={onOpenRegistro}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Registrar Nueva Sede
            </button>
          )}
        </div>
      </div>

      {/* Contenedor del Mapa y Panel de Información */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ÁREA DE CARTOGRAFÍA INTERACTIVA (8 Columnas) */}
        <div className="lg:col-span-8 bg-stone-900/95 border border-stone-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
          
          {/* Barra de control de capas y filtros */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800 text-xs">
            
            {/* Selector de Provincia */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium">Provincia:</span>
              <select
                value={provinciaActiva}
                onChange={(e) => setProvinciaActiva(e.target.value)}
                className="bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Todas">Todas las 7 Provincias</option>
                {PROVINCIAS_SANTANDER.map(p => (
                  <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
                ))}
              </select>
            </div>

            {/* Toggles de Capas */}
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <button
                onClick={() => setMostrarRegistroNacional(!mostrarRegistroNacional)}
                className={`px-2.5 py-1 rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                  mostrarRegistroNacional 
                    ? 'bg-amber-950/70 text-amber-300 border-amber-600/50 font-semibold' 
                    : 'bg-stone-950 text-stone-500 border-stone-800'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span>Registro Nacional Verificado</span>
              </button>

              <button
                onClick={() => setMostrarConsejosComunitarios(!mostrarConsejosComunitarios)}
                className={`px-2.5 py-1 rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                  mostrarConsejosComunitarios 
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600/50 font-semibold' 
                    : 'bg-stone-950 text-stone-500 border-stone-800'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span>Consejos Comunitarios</span>
              </button>

              <button
                onClick={() => setMostrarProyectos(!mostrarProyectos)}
                className={`px-2.5 py-1 rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                  mostrarProyectos 
                    ? 'bg-sky-950/70 text-sky-300 border-sky-600/50 font-semibold' 
                    : 'bg-stone-950 text-stone-500 border-stone-800'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                <span>Proyectos MGA</span>
              </button>
            </div>
          </div>

          {/* Lienzo Cartográfico SVG interactivo de Santander */}
          <div className="relative w-full aspect-[4/3] bg-stone-950 rounded-xl overflow-hidden border border-stone-800/80 my-3 flex items-center justify-center">
            
            {/* Brújula y orientación */}
            <div className="absolute top-3 right-3 p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-[10px] text-stone-400 flex items-center gap-1 backdrop-blur-sm z-10">
              <Compass className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Norte • Santander</span>
            </div>

            {/* Leyenda en el mapa */}
            <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-[10px] text-stone-300 space-y-1 backdrop-blur-sm z-10">
              <div className="font-bold text-amber-400 text-[11px] mb-1">Capas Cartográficas</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Org. con Registro MinInterior</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Consejo Comunitario Titulado/Proceso</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Proyecto BPIN en Ejecución</span>
              </div>
            </div>

            {/* SVG del Territorio Santandereano */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full select-none"
            >
              {/* Contorno simplificado del Departamento de Santander */}
              <defs>
                <linearGradient id="santanderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1c1917" />
                  <stop offset="50%" stopColor="#292524" />
                  <stop offset="100%" stopColor="#1c1917" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Polígono estilizado del contorno departamental de Santander */}
              <path
                d="M 160 80 L 320 50 L 450 60 L 590 120 L 680 190 L 710 320 L 640 440 L 530 540 L 420 560 L 320 520 L 260 460 L 190 380 L 120 280 L 110 160 Z"
                fill="url(#santanderGradient)"
                stroke="#d97706"
                strokeWidth="2"
                strokeDasharray="4 2"
                className="transition-all"
              />

              {/* Río Magdalena (Límite Occidental / Magdalena Medio) */}
              <path
                d="M 120 160 Q 140 220 150 280 T 170 370 T 210 460"
                fill="none"
                stroke="#0284c7"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.7"
              />
              <text x="140" y="230" fill="#38bdf8" fontSize="10" transform="rotate(-65 140 230)" opacity="0.8" fontWeight="bold">
                RÍO MAGDALENA
              </text>

              {/* Río Sogamoso y Lebrija */}
              <path
                d="M 140 220 Q 230 200 320 220"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2.5"
                opacity="0.5"
              />

              {/* Regiones Provinciales Marcadas */}
              <text x="210" y="240" fill="#f59e0b" fontSize="11" fontWeight="bold" opacity="0.6">PROVINCIA DE MARES</text>
              <text x="440" y="210" fill="#a8a29e" fontSize="10" fontWeight="bold" opacity="0.5">METROPOLITANA</text>
              <text x="320" y="470" fill="#a8a29e" fontSize="10" fontWeight="bold" opacity="0.5">VÉLEZ</text>
              <text x="490" y="360" fill="#a8a29e" fontSize="10" fontWeight="bold" opacity="0.5">GUANENTÁ</text>
              <text x="420" y="400" fill="#a8a29e" fontSize="10" fontWeight="bold" opacity="0.5">COMUNERA</text>
              <text x="610" y="290" fill="#a8a29e" fontSize="10" fontWeight="bold" opacity="0.5">GARCÍA ROVIRA</text>

              {/* Marcadores de los Municipios */}
              {MUNICIPIOS_DESTACADOS.map((mun) => {
                const { x, y } = proyectarCoordenadas(mun.lat, mun.lng);
                const isSelected = mun.nombre === municipioSeleccionado;
                const matchesProv = provinciaActiva === 'Todas' || mun.provincia === provinciaActiva;
                if (!matchesProv) return null;

                const tieneConsejos = mun.consejosComunitarios > 0;

                return (
                  <g
                    key={mun.nombre}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setMunicipioSeleccionado(mun.nombre)}
                  >
                    {/* Anillo de selección pulsante */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="18"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}

                    {/* Círculo de base del municipio */}
                    <circle
                      cx={x}
                      cy={y}
                      r={tieneConsejos && mostrarConsejosComunitarios ? 11 : 8}
                      fill={
                        tieneConsejos && mostrarConsejosComunitarios
                          ? '#10b981'
                          : isSelected
                          ? '#f59e0b'
                          : '#d97706'
                      }
                      stroke="#1c1917"
                      strokeWidth="2"
                      filter="url(#glow)"
                    />

                    {/* Icono de punto central */}
                    <circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#ffffff"
                    />

                    {/* Etiqueta del municipio */}
                    <text
                      x={x + 10}
                      y={y + 4}
                      fill={isSelected ? '#fbbf24' : '#e7e5e4'}
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="drop-shadow-md select-none"
                    >
                      {mun.nombre} {mun.porcentajeAfro >= 10 ? `(${mun.porcentajeAfro}%)` : ''}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Barra de estado inferior */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
            <span>Haga clic en cualquier municipio para desplegar su ficha demográfica y organizaciones.</span>
            <span className="font-semibold text-amber-400">Total 87 Municipios Integrados</span>
          </div>
        </div>

        {/* PANEL LATERAL DE DETALLE TERRITORIAL (4 Columnas) */}
        <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-5">
          
          {/* Cabecera del Municipio Seleccionado */}
          <div className="pb-4 border-b border-stone-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Provincia de {municipioDetalle.provincia}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Lat {municipioDetalle.lat}° | Lng {municipioDetalle.lng}°
              </span>
            </div>
            <h3 className="text-xl font-black text-white">
              {municipioDetalle.nombre}
            </h3>
            <p className="text-xs text-stone-400">
              Departamento de Santander, Colombia
            </p>
          </div>

          {/* Estadísticas Demográficas Étnicas (DANE Censo 2026) */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Demografía NARP Municipal (DANE 2026)</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Población Total:</span>
                <span className="font-bold text-white text-sm">
                  {municipioDetalle.poblacionTotal.toLocaleString('es-CO')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-950 border border-amber-500/30">
                <span className="text-[10px] text-amber-300 block">Población Afro NARP:</span>
                <span className="font-bold text-amber-400 text-sm">
                  {municipioDetalle.poblacionAfroEstimada.toLocaleString('es-CO')}
                </span>
              </div>
            </div>

            {/* Barra de proporción demográfica */}
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-400">Proporción autorreconocida:</span>
                <strong className="text-amber-300">{municipioDetalle.porcentajeAfro}%</strong>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                  style={{ width: `${Math.min(100, municipioDetalle.porcentajeAfro * 3.5)}%` }}
                />
              </div>
              <span className="text-[10px] text-stone-300 block">
                Fuente: Proyecciones territoriales DANE y Caracterización Secretaría del Interior.
              </span>
            </div>
          </div>

          {/* Organizaciones Activas en el Municipio */}
          <div className="space-y-3 pt-2 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Organizaciones Registradas ({organizacionesDelMunicipio.length})</span>
              </span>
            </div>

            {organizacionesDelMunicipio.length > 0 ? (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {organizacionesDelMunicipio.map((org) => (
                  <div
                    key={org.id}
                    className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/40 transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{org.sigla}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-800 text-amber-300">
                        {org.categoria}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 line-clamp-1">{org.nombre}</p>
                    {org.delegadoElectoral && (
                      <span className="text-[10px] text-stone-400 block">
                        Delegada/o: <strong className="text-stone-300">{org.delegadoElectoral}</strong>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center text-xs text-stone-400 space-y-1">
                <p>No hay organizaciones formalizadas con sede en este municipio aún.</p>
                {onOpenRegistro && (
                  <button
                    onClick={onOpenRegistro}
                    className="text-amber-400 hover:underline text-[11px] font-semibold"
                  >
                    + Inscribir primera organización aquí
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Proyectos del Banco MGA en la zona */}
          {proyectosDelMunicipio.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <span className="font-bold text-xs text-sky-400 flex items-center gap-1">
                <span>Proyectos AfroProyecta MGA ({proyectosDelMunicipio.length})</span>
              </span>
              {proyectosDelMunicipio.map(proy => (
                <div key={proy.id} className="p-2 rounded-lg bg-sky-950/40 border border-sky-800/40 text-[11px]">
                  <strong className="text-white block line-clamp-1">{proy.titulo}</strong>
                  <span className="text-stone-400">Estado: <span className="text-sky-300 font-medium">{proy.estado}</span> • ${(proy.presupuestoEstimado / 1000000).toFixed(0)}M COP</span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
