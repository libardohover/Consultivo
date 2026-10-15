import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Scale, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  FileDown, 
  Sparkles, 
  Copy, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { NORMATIVA_NARP_SANTANDER } from '../data/normativaData';
import { NormaJuridica } from '../types';

export const NormativaView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [normaSeleccionada, setNormaSeleccionada] = useState<NormaJuridica>(NORMATIVA_NARP_SANTANDER[1]); // Ley 70 por defecto
  const [generadorActivo, setGeneradorActivo] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState<'peticion' | 'consulta_previa'>('peticion');
  const [copiado, setCopiado] = useState(false);

  // Datos para generador de documento
  const [remitente, setRemitente] = useState('');
  const [entidadDestino, setEntidadDestino] = useState('Secretaría del Interior de Santander');
  const [municipio, setMunicipio] = useState('Barrancabermeja');
  const [motivoPeticion, setMotivoPeticion] = useState('');

  const normasFiltradas = NORMATIVA_NARP_SANTANDER.filter(n =>
    n.identificador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.articulosClave.some(a => a.articulo.toLowerCase().includes(searchTerm.toLowerCase()) || a.contenido.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const plantillaDerechoPeticion = `Bucaramanga / ${municipio}, Santander, ${new Date().toLocaleDateString('es-CO')}

Señores:
${entidadDestino}
Gobernación del Departamento de Santander

ASUNTO: DERECHO DE PETICIÓN EN INTERÉS PARTICULAR Y COMUNITARIO (ART. 23 C.P. Y LEY 1755 DE 2015) CON ENFOQUE DIFERENCIAL ÉTNICO (LEY 70 DE 1993 Y SENTENCIA T-576 DE 2014)

Yo, ${remitente || '[NOMBRE DEL REPRESENTANTE / CIUDADANO]'}, identificado(a) como miembro y representante de la comunidad negra / afrocolombiana del municipio de ${municipio}, Santander, en ejercicio del derecho fundamental de petición, me dirijo respetuosamente a su despacho con el fin de exponer:

I. FUNDAMENTO FÁCTICO:
${motivoPeticion || '[Describa aquí la situación, proyecto o requerimiento de la comunidad...]'}

II. FUNDAMENTO JURÍDICO:
1. Constitución Política de 1991: Artículos 7 (reconocimiento de la diversidad étnica), 13 (igualdad material y medidas afirmativas), 23 (derecho de petición) y 55 Transitorio.
2. Ley 70 de 1993: Reconocimiento y fomento de los derechos de las comunidades negras.
3. Convenio 169 de la OIT (Aprobado mediante Ley 21 de 1991): Artículos 6 y 7 sobre participación y consulta.
4. Sentencia T-576 de 2014 de la Corte Constitucional: Debido proceso y representatividad de las comunidades NARP.

III. PETICIONES CONCRETAS:
1. Se informe de manera clara, oportuna y detallada las actuaciones administrativas adelantadas respecto a los hechos expuestos.
2. Se garantice la articulación con la Comisión Consultiva Departamental de Santander y la subcomisión sectorial competente.
3. Se remita copia íntegra de los expedientes y soportes documentales del asunto.

NOTIFICACIONES:
Correo electrónico institucional: [Su correo electrónico]
Dirección de correspondencia: [Dirección o Vereda, Santander]

Atentamente,

___________________________________________________
${remitente || '[FIRMA DEL PETICIONARIO]'}
Representante Comunitario NARP de Santander`;

  const copiarTexto = () => {
    navigator.clipboard.writeText(plantillaDerechoPeticion);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="space-y-6 text-stone-200">
      
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Módulo 5 • Normativa Afro IA
            </span>
            <span className="text-xs text-stone-400">
              Repositorio Jurídico Semántico & RAG de Derechos Étnicos
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Inteligencia Jurídica y Derechos NARP
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Consulte normas vigentes, decretos reglamentarios de 2023, jurisprudencia de la Corte Constitucional y actos administrativos de Santander con transcripción íntegra de artículos oficiales. Generador asistido de derechos de petición comunitarios.
          </p>
        </div>

        <button
          onClick={() => setGeneradorActivo(!generadorActivo)}
          className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>{generadorActivo ? 'Ver Buscador Normativo' : 'Generar Derecho de Petición'}</span>
        </button>
      </div>

      {!generadorActivo ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Columna Izquierda: Buscador y Lista de Normas (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            
            <div className="relative text-xs">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar norma, artículo o palabra clave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
              {normasFiltradas.map((norma) => {
                const isSelected = norma.id === normaSeleccionada.id;
                return (
                  <div
                    key={norma.id}
                    onClick={() => setNormaSeleccionada(norma)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 shadow-md'
                        : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{norma.identificador}</span>
                      <span className={`text-[10px] px-2 py-0.2 rounded font-bold ${
                        norma.estadoVigencia === 'Vigente'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-600/30'
                      }`}>
                        {norma.estadoVigencia}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                      {norma.objeto}
                    </p>
                    <div className="text-[10px] text-stone-500 flex items-center justify-between pt-1 border-t border-stone-800/80">
                      <span>{norma.autoridad}</span>
                      <span>{norma.articulosClave.length} arts. destacados</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Columna Derecha: Detalle de la Norma y Artículos (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 text-xs">
            
            <div className="pb-4 border-b border-stone-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  Ficha Oficial del Sistema Jurídico
                </span>
                <a
                  href={normaSeleccionada.enlaceOficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <span>Fuente Oficial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <h3 className="text-lg font-black text-white">
                {normaSeleccionada.identificador}
              </h3>
              <p className="text-[11px] text-stone-400">
                {normaSeleccionada.numeroYFecha} • {normaSeleccionada.autoridad}
              </p>
            </div>

            {/* Objeto de la norma */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="font-bold text-amber-400 text-[10px] uppercase tracking-wider">
                Objeto Jurídico:
              </span>
              <p className="text-stone-300 text-xs leading-relaxed">
                {normaSeleccionada.objeto}
              </p>
            </div>

            {/* Artículos Clave Oficiales */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Artículos Oficiales Clave</span>
              </h4>

              <div className="space-y-2.5">
                {normaSeleccionada.articulosClave.map((art, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <strong className="text-amber-300 text-xs block">{art.articulo}</strong>
                    <p className="text-stone-300 text-[11px] leading-relaxed italic">
                      "{art.contenido}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Jurisprudencia Relacionada */}
            {normaSeleccionada.jurisprudenciaRelacionada && (
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] space-y-1">
                <span className="font-bold text-stone-400 block">Jurisprudencia Constitucional Relacionada:</span>
                <span className="text-stone-300">{normaSeleccionada.jurisprudenciaRelacionada}</span>
              </div>
            )}

            <div className="text-[10px] text-stone-500 pt-2 border-t border-stone-800 flex items-center justify-between">
              <span>Fecha de verificación documental: {normaSeleccionada.fechaConsulta}</span>
              <span>Ámbito: {normaSeleccionada.ambito}</span>
            </div>

          </div>

        </div>
      ) : (
        /* GENERADOR ASISTIDO DE DERECHO DE PETICIÓN ÉTNICO */
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 text-xs">
          
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 pb-4 border-b border-stone-800">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase">
                Asistente Documental Étnico
              </span>
              <h3 className="text-base font-bold text-white">
                Generador de Derecho de Petición con Enfoque Diferencial NARP
              </h3>
              <p className="text-[11px] text-stone-400">
                Estructurado con fundamento en el Art. 23 C.P., Ley 70 de 1993, Sentencia T-576/14 y Convenio 169 de la OIT.
              </p>
            </div>
            <button
              onClick={() => setGeneradorActivo(false)}
              className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 font-semibold"
            >
              Volver al Buscador
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Formulario de parámetros */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Nombre del Solicitante / Organización</label>
                <input
                  type="text"
                  placeholder="Ej. Marlene Palacios - AFROCOLBARRANCA"
                  value={remitente}
                  onChange={(e) => setRemitente(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Entidad Destinataria en Santander</label>
                <input
                  type="text"
                  placeholder="Ej. Secretaría del Interior de Santander / Alcaldía de Puerto Wilches"
                  value={entidadDestino}
                  onChange={(e) => setEntidadDestino(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Municipio de Santander</label>
                <input
                  type="text"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Hechos y Motivo Concreto de la Solicitud</label>
                <textarea
                  rows={4}
                  placeholder="Describa brevemente qué información, intervención o trámite está solicitando a la entidad..."
                  value={motivoPeticion}
                  onChange={(e) => setMotivoPeticion(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-stone-100"
                />
              </div>
            </div>

            {/* Vista previa del documento generado */}
            <div className="lg:col-span-7 bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-3 font-mono text-[11px] text-stone-300">
              <div className="flex justify-between items-center pb-2 border-b border-stone-800 font-sans">
                <span className="font-bold text-amber-400">Borrador del Documento Jurídico</span>
                <button
                  onClick={copiarTexto}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1 font-sans cursor-pointer"
                >
                  {copiado ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiado ? '¡Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-xs text-stone-200 leading-relaxed max-h-96 overflow-y-auto">
                {plantillaDerechoPeticion}
              </pre>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
