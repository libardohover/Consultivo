// Configuración de PM2 para mantener el servidor activo en segundo plano.
// Uso: npm run build && pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'consultivo-afro-santander-ia',
      script: 'server/index.ts',
      interpreter: 'node',
      interpreter_args: '--import tsx',
      env: { NODE_ENV: 'production', PORT: 3000, HOST: '0.0.0.0' },
      max_memory_restart: '400M',
      autorestart: true,
    },
  ],
};
