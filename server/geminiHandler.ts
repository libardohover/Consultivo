import { GoogleGenAI } from '@google/genai';

export const DEFAULT_MODEL = 'gemini-3.8-flash';

const DEFAULT_SYSTEM_INSTRUCTION =
  'Eres NEXO AFRO IA, el asistente oficial del ecosistema CONSULTIVO AFRO SANTANDER IA. ' +
  'Respondes con rigor constitucional, citando normas colombianas (Ley 70 de 1993, Sentencia T-576/14, ' +
  'Decreto 1640/20, Circular 065 de 2026 de Santander). Eres verídico, respetuoso y jamás inventas artículos ni organizaciones.';

export interface ChatRequestBody {
  prompt?: string;
  systemInstruction?: string;
  history?: { role: string; text: string }[];
}

export interface ChatResponseBody {
  reply?: string | null;
  modelUsed?: string;
  fallback?: boolean;
  message?: string;
  error?: string;
}

/** true si hay una clave real (no vacía ni de ejemplo). */
export function isApiKeyConfigured(apiKey?: string): boolean {
  const k = apiKey?.trim();
  return Boolean(k && k !== 'MY_GEMINI_API_KEY' && !k.startsWith('PLACEHOLDER'));
}

const MAX_PROMPT_CHARS = 8000;
const MAX_HISTORY = 20;

/**
 * Lógica compartida del endpoint /api/chat.
 * La usa tanto el servidor de desarrollo de Vite como el servidor de producción (Express).
 * Siempre responde 200 con `fallback: true` ante cualquier fallo, para que el frontend
 * use el motor RAG local sin romper la experiencia.
 */
export async function handleChat(
  body: ChatRequestBody,
  env: { apiKey?: string; model?: string }
): Promise<ChatResponseBody> {
  const apiKey = env.apiKey?.trim();
  if (!apiKey || !isApiKeyConfigured(apiKey)) {
    return {
      reply: null,
      fallback: true,
      message: 'No hay GEMINI_API_KEY configurada; se usa el motor RAG local.',
    };
  }

  const userPrompt = String(body.prompt ?? '').slice(0, MAX_PROMPT_CHARS);
  if (!userPrompt.trim()) {
    return { reply: null, fallback: true, error: 'Consulta vacía.' };
  }

  const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY) : [];
  const model = env.model?.trim() || DEFAULT_MODEL;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const contents = [
      ...history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(h.text ?? '').slice(0, MAX_PROMPT_CHARS) }],
      })),
      { role: 'user', parts: [{ text: userPrompt }] },
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: body.systemInstruction || DEFAULT_SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    return { reply: response.text ?? null, modelUsed: model, fallback: !response.text };
  } catch (error: unknown) {
    console.error('[api/chat] Error al llamar a Gemini:', error);
    return {
      fallback: true,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}
