import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Scale, 
  BookOpen, 
  ShieldCheck, 
  Layers, 
  Building2, 
  RefreshCw, 
  Copy, 
  Check, 
  Bot, 
  User,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { askNexoAfroAI, ChatMessage } from '../services/geminiService';

interface NexoAfroChatProps {
  isOpen: boolean;
  onClose: () => void;
  fullScreenMode?: boolean;
}

export const NexoAfroChat: React.FC<NexoAfroChatProps> = ({
  isOpen,
  onClose,
  fullScreenMode = false
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `¡Saludos de hermandad y respeto intercultural!\n\nSoy **NEXO AFRO IA**, el asistente inteligente oficial de **CONSULTIVO AFRO SANTANDER IA**.\n\nEstoy capacitado en la legislación constitucional colombiana (Ley 70 de 1993, Decretos 2023, Sentencia T-576/14), el proceso electoral de la **Circular 065 de 2026** (Secretaría del Interior de Santander, PRO 2929074), la metodología MGA y la cartografía de los 87 municipios.\n\n¿En qué gestión comunitaria o consulta jurídica puedo orientarte hoy?`,
      fuente: 'Motor Grounded Oficial Santander NARP'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [citasAbiertas, setCitasAbiertas] = useState<{ [msgIndex: number]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sugerencias = [
    '¿Cuáles organizaciones están admitidas en Barrancabermeja según la Circular 065?',
    '¿Qué diferencia hay entre tener RPUN del MinInterior y registrarse en la plataforma?',
    '¿Cuáles son las 7 subcomisiones de la Consultiva Departamental de Santander?',
    '¿Qué dice el Decreto 1384 de 2023 sobre la Cátedra Afrocolombiana?',
    '¿Cómo formular un proyecto pesquero en metodología MGA para regalías?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: text }
    ];

    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askNexoAfroAI(text, newMessages);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: response.text,
          citas: response.citas,
          fuente: response.source
        }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Ocurrió un error al procesar la solicitud. Por favor verifique su conexión o intente nuevamente.',
          fuente: 'Sistema'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCitas = (idx: number) => {
    setCitasAbiertas(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed z-50 transition-all ${
      fullScreenMode 
        ? 'inset-0 bg-stone-950/90 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center'
        : 'bottom-4 right-4 w-full sm:w-[460px] h-[640px] max-h-[90vh]'
    }`}>
      <div className={`w-full h-full bg-stone-900 border border-amber-600/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-200 text-xs ${
        fullScreenMode ? 'max-w-4xl max-h-[85vh]' : ''
      }`}>
        
        {/* Cabecera del Chat */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 px-5 py-3.5 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-sm">NEXO AFRO IA</h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500 text-stone-950">
                  OFICIAL
                </span>
              </div>
              <p className="text-[10px] text-amber-200/80">
                Grounding Jurídico y Territorial • Santander, Colombia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setMessages([messages[0]]);
              }}
              title="Reiniciar conversación"
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Zona de Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            const tieneCitas = msg.citas && msg.citas.length > 0;
            const citasExpandidas = citasAbiertas[idx];

            return (
              <div
                key={idx}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 leading-relaxed ${
                  isUser
                    ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                    : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap text-xs">
                    {renderInlineMarkdown(msg.content)}
                  </div>

                  {/* Acordeón de Citas Jurídicas Oficiales */}
                  {tieneCitas && (
                    <div className="pt-2 border-t border-stone-800 space-y-1.5 text-[11px]">
                      <button
                        onClick={() => toggleCitas(idx)}
                        className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>Fuentes Jurídicas Oficiales Citadas ({msg.citas!.length})</span>
                        {citasExpandidas ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {citasExpandidas && (
                        <div className="space-y-1.5 pt-1">
                          {msg.citas!.map((c, cIdx) => (
                            <div key={cIdx} className="p-2 rounded bg-stone-900 border border-stone-800 text-[10px] space-y-0.5">
                              <strong className="text-amber-300 block">{c.norma} • {c.articulo}</strong>
                              <p className="text-stone-400 italic">"{c.texto}"</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {!isUser && msg.fuente && (
                    <div className="text-[9px] text-stone-400 font-mono pt-1">
                      Fuente: {msg.fuente}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-stone-400 text-xs">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center animate-spin">
                <RefreshCw className="w-4 h-4" />
              </div>
              <span className="italic">NEXO AFRO IA está consultando la normativa oficial y las fuentes de Santander...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sugerencias Rápidas */}
        {messages.length <= 3 && (
          <div className="px-4 py-2 border-t border-stone-800/80 bg-stone-950/40 shrink-0">
            <span className="text-[10px] text-stone-400 block mb-1.5 font-medium">Preguntas sugeridas:</span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {sugerencias.map((sug, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => handleSend(sug)}
                  className="px-2.5 py-1 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[10px] text-stone-300 whitespace-nowrap cursor-pointer transition-all"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Escriba su consulta jurídica, organizativa o territorial..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex justify-between items-center text-[9px] text-stone-300 pt-1.5 px-1">
            <span>Citando normas oficiales colombianas y Circular 065</span>
            <span>No reemplaza asesoría de abogado</span>
          </div>
        </div>

      </div>
    </div>
  );
};

/** Renderiza **negritas**, *cursivas* y `código` sin usar HTML crudo (seguro frente a XSS). */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i} className="font-semibold text-stone-50">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={i} className="px-1 rounded bg-stone-800 text-amber-300 font-mono text-[11px]">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
