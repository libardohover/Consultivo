import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { handleChat } from './server/geminiHandler';

/** Expone /api/chat durante `npm run dev` usando la misma lógica que el servidor de producción. */
function geminiServerApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'gemini-server-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', async () => {
          let data = {};
          try {
            data = JSON.parse(body || '{}');
          } catch {
            /* cuerpo inválido: se trata como vacío */
          }
          const result = await handleChat(data, {
            apiKey: env.GEMINI_API_KEY,
            model: env.GEMINI_MODEL,
          });
          res.statusCode = 200;
          res.end(JSON.stringify(result));
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Carga .env, .env.local, etc. (sin prefijo VITE_ => nunca se exponen al navegador)
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), geminiServerApiPlugin(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: true,
      port: 3000,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // El bloque principal incluye los datos institucionales (normativa, Circular 065, etc.)
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            icons: ['lucide-react'],
          },
        },
      },
    },
    preview: {
      host: true,
      port: 3000,
    },
  };
});
