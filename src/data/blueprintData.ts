export const BLUEPRINT_FUNCIONAL_1_0 = {
  version: '2.0 - Octubre 2026',
  nombre: 'CONSULTIVO AFRO SANTANDER IA',
  lema: 'Inteligencia, identidad y participación para el desarrollo afro de Santander',
  ambito: 'Departamento de Santander, Colombia (87 municipios, 7 provincias)',
  arquitectura: {
    frontend: 'React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Leaflet / Cartografía GeoJSON',
    backend: 'Node.js, Express, TypeScript, REST API, OpenAPI 3.0, Control de Acceso RBAC',
    baseDeDatos: 'PostgreSQL 16 + PostGIS (georreferenciación territorial) + pgvector (embeddings jurídicos y RAG)',
    iaEngine: '@google/genai SDK (Model: gemini-3.8-flash) con Grounding Jurídico, RAG Semántico y Citas Oficiales',
    seguridad: 'Ley 1581 de 2012 (Habeas Data & Datos Sensibles Étnicos), Cifrado TLS 1.3, Auditoría Transaccional'
  },
  modulosIntegrados: [
    { num: 1, codigo: 'GOBIERNO', nombre: 'Gobierno Étnico', desc: 'Administración de la Comisión Consultiva Departamental, consultivos, quórum, actas y credenciales.' },
    { num: 2, codigo: 'SUBCOM', nombre: 'Subcomisiones IA', desc: 'Gestión sectorial de las siete subcomisiones temáticas, planes anuales de trabajo y compromisos.' },
    { num: 3, codigo: 'REGISTRO', nombre: 'Registro Afro Santander', desc: 'Directorio de organizaciones con y sin Registro MinInterior (cargada inicial: Circular 065 de 2026).' },
    { num: 4, codigo: 'MAPA', nombre: 'Mapa Afro Santander', desc: 'Sistema de información geográfica territorial interactivo para los 87 municipios y 7 provincias.' },
    { num: 5, codigo: 'NORMATIVA', nombre: 'Normativa Afro IA', desc: 'Motor jurídico RAG con artículos oficiales (Ley 70, Dec. 1745, CP91, T-576/14, decretos 2023).' },
    { num: 6, codigo: 'PROYECTOS', nombre: 'AfroProyecta IA', desc: 'Banco de proyectos y asistente inteligente de formulación en Metodología General Ajustada (MGA).' },
    { num: 7, codigo: 'OBSERVATORIO', nombre: 'Observatorio NARP Santander', desc: 'Indicadores territoriales, demográficos y socioeconómicos oficiales (DANE, DNP, SISBEN).' },
    { num: 8, codigo: 'CONVOCA', nombre: 'AfroConvoca IA', desc: 'Radar inteligente de oportunidades de financiación, becas y cooperación internacional.' },
    { num: 9, codigo: 'PATRIMONIO', nombre: 'Patrimonio Vivo', desc: 'Preservación de la memoria oral, música de tambora, gastronomía tradicional y saberes bioculturales.' },
    { num: 10, codigo: 'EDUCA', nombre: 'AfroEduca', desc: 'Aula virtual comunitaria para formación en derechos étnicos, liderazgo, formulación MGA y control social.' },
    { num: 11, codigo: 'CONTROL', nombre: 'Control Social Afro', desc: 'Veeduría ciudadana y seguimiento a compromisos institucionales con alertas y semáforos.' },
    { num: 12, codigo: 'NEXO', nombre: 'NEXO AFRO IA', desc: 'Asistente transversal inteligente multicontexto con citas verificadas y sin alucinaciones.' },
    { num: 13, codigo: 'ADMIN', nombre: 'Administración General', desc: 'Seguridad, auditoría, trazabilidad y gestión documental de radicados.' }
  ],
  esquemaPostgresSql: `-- ========================================================
-- ESQUEMA DDL: CONSULTIVO AFRO SANTANDER IA (PostgreSQL 16)
-- Extensiones requeridas: PostGIS y pgvector
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. IDENTIDAD Y SEGURIDAD (RBAC)
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    es_activo BOOLEAN DEFAULT true,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE usuario_roles (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    rol_id INT REFERENCES roles(id) ON DELETE CASCADE,
    organizacion_id UUID,
    PRIMARY KEY (usuario_id, rol_id)
);

-- 2. TERRITORIO (PostGIS)
CREATE TABLE provincias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    capital VARCHAR(100) NOT NULL
);

CREATE TABLE municipios (
    id SERIAL PRIMARY KEY,
    codigo_dane VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    provincia_id INT REFERENCES provincias(id),
    poblacion_total INT,
    poblacion_afro_estimada INT,
    geometria GEOMETRY(MultiPolygon, 4326),
    centroide GEOMETRY(Point, 4326)
);

-- 3. ORGANIZACIONES NARP
CREATE TABLE organizaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    sigla VARCHAR(50),
    categoria VARCHAR(100) NOT NULL,
    municipio_id INT REFERENCES municipios(id),
    direccion_sede TEXT,
    ubicacion GEOMETRY(Point, 4326),
    estado_mininterior VARCHAR(50) NOT NULL DEFAULT 'Reportado, pendiente de verificación',
    numero_resolucion VARCHAR(100),
    fecha_resolucion DATE,
    estado_inscripcion_ecosistema VARCHAR(50) NOT NULL DEFAULT 'Solicitud recibida',
    radicado_inscripcion VARCHAR(50) UNIQUE,
    delegado_electoral VARCHAR(255),
    estado_circular_065 VARCHAR(50),
    fila_circular_065 INT,
    descripcion TEXT,
    correo_contacto VARCHAR(255),
    telefono_contacto VARCHAR(50),
    autorizacion_publicacion BOOLEAN DEFAULT false,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_organizaciones_municipio ON organizaciones(municipio_id);
CREATE INDEX idx_organizaciones_ubicacion ON organizaciones USING GIST(ubicacion);

-- 4. CONSULTIVA Y SUBCOMISIONES
CREATE TABLE consultivos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id),
    organizacion_id UUID REFERENCES organizaciones(id),
    municipio_id INT REFERENCES municipios(id),
    calidad_representacion VARCHAR(50) NOT NULL,
    periodo VARCHAR(50) NOT NULL,
    estado_ejercicio VARCHAR(50) DEFAULT 'En ejercicio',
    acto_acreditacion TEXT,
    fecha_eleccion DATE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE subcomisiones (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    fundamento_legal TEXT,
    coordinador_consultivo_id UUID REFERENCES consultivos(id),
    secretario_consultivo_id UUID REFERENCES consultivos(id),
    objetivo TEXT
);

CREATE TABLE sesiones_consultiva (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    fecha_sesion TIMESTAMP WITH TIME ZONE NOT NULL,
    lugar TEXT,
    quorum_verificado BOOLEAN DEFAULT false,
    acta_aprobada BOOLEAN DEFAULT false,
    acta_documento_url TEXT,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. RAG JURÍDICO (pgvector)
CREATE TABLE normas_rag (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identificador VARCHAR(255) NOT NULL,
    autoridad VARCHAR(255) NOT NULL,
    numero_y_fecha VARCHAR(255) NOT NULL,
    objeto TEXT NOT NULL,
    ambito VARCHAR(100),
    estado_vigencia VARCHAR(50) NOT NULL,
    enlace_oficial TEXT,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fragmentos_normas_rag (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    norma_id UUID REFERENCES normas_rag(id) ON DELETE CASCADE,
    articulo_referencia VARCHAR(100),
    contenido TEXT NOT NULL,
    embedding VECTOR(768) -- Dimensión estándar de embeddings
);

CREATE INDEX idx_fragmentos_embedding ON fragmentos_normas_rag USING ivfflat (embedding vector_cosine_ops);
`,
  matrizRbac: [
    { rol: 'Superadministrador Técnico', alcance: 'Infraestructura, llaves API, backups y monitoreo del sistema', acceso: 'Total' },
    { rol: 'Administrador Institucional (Gobernación)', alcance: 'Secretaría del Interior, validación de radicados oficiales', acceso: 'Departamental' },
    { rol: 'Secretaría Técnica de la Consultiva', alcance: 'Convocatorias, gestión de quórum, actas y correspondencia', acceso: 'Comisión Consultiva' },
    { rol: 'Consultivo Acreditado', alcance: 'Mesa de trabajo, panel propio, proposiciones y compromisos', acceso: 'Consultivo / Subcomisiones' },
    { rol: 'Coordinador de Subcomisión', alcance: 'Plan de acción sectorial, actas y dictámenes de su subcomisión', acceso: 'Subcomisión específica' },
    { rol: 'Representante de Organización', alcance: 'Actualización de ficha institucional, postulación a convocatorias', acceso: 'Propia organización' },
    { rol: 'Ciudadano / Visitante Público', alcance: 'Consulta pública de directorio, mapa, normas, observatorio y radicación', acceso: 'Lectura pública / Radicación' }
  ]
};
