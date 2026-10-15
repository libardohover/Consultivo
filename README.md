# CONSULTIVO AFRO SANTANDER IA

Ecosistema inteligente para la **Comisión Consultiva Departamental de Comunidades Negras, Afrocolombianas, Raizales y Palenqueras (NARP) de Santander**.

> *"Inteligencia, identidad y participación para el desarrollo afro de Santander."*

## Módulos

| Módulo | Descripción |
|---|---|
| **La Consultiva / Gobierno Étnico** | Consultivos acreditados, sesiones y estructura de la Comisión |
| **7 Subcomisiones** | SC-01 a SC-07, planes de trabajo y compromisos |
| **Directorio NARP** | Organizaciones de la Circular 065 de 2026 (25 admitidas / 8 no admitidas) y registro voluntario |
| **Mapa Santander** | Presencia territorial en los 87 municipios y 7 provincias |
| **Normativa IA** | Ley 70/1993, Decreto 1745/1995, Decreto 1640/2020, decretos 2023, T-576/14 |
| **AfroProyecta MGA** | Apoyo a la formulación de proyectos (Metodología General Ajustada) |
| **Observatorio** | Indicadores territoriales con fuente y limitaciones |
| **AfroConvoca** | Convocatorias y oportunidades de financiación |
| **Patrimonio Vivo / AfroEduca / Control Social** | Memoria cultural, formación y seguimiento de compromisos |
| **NEXO AFRO IA** | Asistente con Gemini (lado servidor) y motor RAG local de respaldo |

## Tecnologías

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · Express 5 · Google Gemini (`@google/genai`)

## Requisitos

- [Node.js](https://nodejs.org/) **20.19 o superior** (recomendado 22 LTS)
- Opcional: una clave de API de Gemini ([Google AI Studio](https://aistudio.google.com/apikey))

Sin clave de Gemini la aplicación funciona igual: el asistente NEXO AFRO IA responde con el motor RAG local basado en los datos institucionales incluidos.

## Instalación

```bash
git clone https://github.com/libardohover/Consultivo.git
cd Consultivo
npm install
cp .env.example .env.local     # en Windows: copy .env.example .env.local
```

Edita `.env.local` y coloca tu clave:

```env
GEMINI_API_KEY=tu_clave_aqui
GEMINI_MODEL=gemini-3.8-flash
PORT=3000
```

> La clave **solo se usa en el servidor**; nunca se envía al navegador. `.env.local` está excluido de Git.

## Uso

### Desarrollo (con recarga en caliente)

```bash
npm run dev
```

Abre <http://localhost:3000>.

### Despliegue en servidor local (producción)

```bash
npm run build   # compila el frontend en dist/
npm start       # sirve dist/ y la API /api/chat en el puerto 3000
```

O en un solo paso: `npm run serve`.

También puedes usar los scripts incluidos, que instalan dependencias, crean `.env.local` si falta, compilan e inician:

- **Windows:** doble clic en `iniciar-servidor.bat`
- **Linux / macOS:** `./iniciar-servidor.sh`

El servidor escucha en `0.0.0.0`, así que otros equipos de la red pueden entrar con `http://<IP-del-servidor>:3000`. Si no carga desde otro equipo, abre el puerto 3000 en el firewall.

#### Mantenerlo activo con PM2 (opcional)

```bash
npm install -g pm2
npm run build
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup      # iniciar automáticamente al arrancar el equipo
```

#### Con Docker (opcional)

```bash
docker build -t consultivo-afro .
docker run -d -p 3000:3000 --env-file .env.local --name consultivo-afro consultivo-afro
```

### Endpoints del servidor

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado del servidor y si Gemini está configurado |
| `POST` | `/api/chat` | Consulta al asistente (`{ prompt, systemInstruction?, history? }`) |

## Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo Vite con `/api/chat` |
| `npm run build` | Compila a `dist/` |
| `npm start` | Servidor de producción Express |
| `npm run serve` | `build` + `start` |
| `npm run preview` | Vista previa estática de Vite (sin API de Gemini) |
| `npm run typecheck` | Verificación de tipos TypeScript |

## Estructura

```
├── server/
│   ├── index.ts            # Servidor Express de producción
│   └── geminiHandler.ts    # Lógica de /api/chat (compartida con Vite dev)
├── src/
│   ├── main.tsx            # Punto de entrada React
│   ├── App.tsx
│   ├── index.css           # Tailwind CSS
│   ├── components/         # Vistas y módulos
│   ├── data/               # Datos institucionales (normativa, Circular 065, etc.)
│   ├── services/           # Cliente del asistente + motor RAG local
│   └── types/
├── public/                 # Archivos estáticos
├── .github/workflows/ci.yml
├── Dockerfile
├── ecosystem.config.cjs    # PM2
└── .env.example
```

## Repositorio

Código fuente: <https://github.com/libardohover/Consultivo>

Cada `push` a `main` ejecuta el flujo de CI (verificación de tipos y compilación).

## Aviso

La inscripción en la plataforma **no** sustituye el registro ante el Ministerio del Interior (RPUN, Decreto 1640 de 2020). Las respuestas de NEXO AFRO IA son orientativas y no reemplazan asesoría jurídica. Los datos personales se tratan conforme a la Ley 1581 de 2012.
