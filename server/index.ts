/**
 * Servidor de producción para CONSULTIVO AFRO SANTANDER IA.
 * - Sirve el frontend compilado (carpeta dist/).
 * - Expone POST /api/chat, que llama a Gemini desde el servidor (la API key nunca llega al navegador).
 *
 * Uso: npm run build && npm start
 */
import 'dotenv/config';
import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULT_MODEL, handleChat, isApiKeyConfigured } from './geminiHandler.ts';

// .env.local tiene prioridad sobre .env (misma convención que Vite)
dotenv.config({ path: '.env.local', override: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('No se encontró dist/index.html. Ejecuta primero: npm run build');
  process.exit(1);
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    gemini: isApiKeyConfigured(process.env.GEMINI_API_KEY),
  });
});

app.post('/api/chat', async (req, res) => {
  const result = await handleChat(req.body ?? {}, {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL,
  });
  res.json(result);
});

app.all('/api/{*splat}', (_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(express.static(distDir, { index: false, maxAge: '1h' }));

// SPA: cualquier otra ruta devuelve index.html
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  const iaActiva = isApiKeyConfigured(process.env.GEMINI_API_KEY);
  console.log(`\n  CONSULTIVO AFRO SANTANDER IA`);
  console.log(`  ➜ Local:   http://localhost:${PORT}`);
  console.log(`  ➜ Red:     http://<IP-del-servidor>:${PORT}`);
  console.log(`  ➜ IA:      ${iaActiva ? 'Gemini (' + (process.env.GEMINI_MODEL || DEFAULT_MODEL) + ')' : 'motor RAG local (sin GEMINI_API_KEY)'}\n`);
});
