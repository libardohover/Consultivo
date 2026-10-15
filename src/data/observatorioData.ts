import { IndicadorTerritorial } from '../types';

export const INDICADORES_OBSERVATORIO: IndicadorTerritorial[] = [
  {
    id: 'ind-01',
    nombre: 'Población NARP Total en el Departamento de Santander',
    municipio: 'Departamental (87 municipios)',
    provincia: 'Santander',
    valor: '148.500 personas aprox.',
    unidad: 'Habitantes',
    fuente: 'DANE - Censo Nacional de Población y Vivienda / Proyecciones Territoriales 2026',
    fechaMedicion: '2026-06-30',
    poblacionReferencia: 'Comunidades Negras, Afrocolombianas, Raizales y Palenqueras en Santander',
    limitaciones: 'Basado en tasa de autorreconocimiento censal y ajuste demográfico departamental.',
    categoria: 'Demografía'
  },
  {
    id: 'ind-02',
    nombre: 'Proporción de Población Afrocolombiana en Barrancabermeja',
    municipio: 'Barrancabermeja',
    provincia: 'Mares',
    valor: 20.47,
    unidad: '% de la población municipal',
    fuente: 'DANE - DNP Terridata Santander',
    fechaMedicion: '2025-12-31',
    poblacionReferencia: 'Población total residente en el Distrito de Barrancabermeja',
    limitaciones: 'Mayor concentración en Comunas 1, 3, 5 y corregimientos ribereños.',
    categoria: 'Demografía'
  },
  {
    id: 'ind-03',
    nombre: 'Proporción de Población Afrocolombiana en Puerto Wilches',
    municipio: 'Puerto Wilches',
    provincia: 'Mares',
    valor: 20.34,
    unidad: '% de la población municipal',
    fuente: 'DANE - Caracterización Municipal Secretaría del Interior',
    fechaMedicion: '2025-12-31',
    poblacionReferencia: 'Población residente en cabecera y corregimientos del río',
    limitaciones: 'Comunidades pesqueras y de palma de aceite con alta movilidad estacional.',
    categoria: 'Demografía'
  },
  {
    id: 'ind-04',
    nombre: 'Población Afrodescendiente en el Área Metropolitana de Bucaramanga',
    municipio: 'Bucaramanga, Floridablanca, Girón, Piedecuesta',
    provincia: 'Metropolitana',
    valor: '63.500 personas',
    unidad: 'Habitantes',
    fuente: 'Área Metropolitana de Bucaramanga (AMB) & DANE',
    fechaMedicion: '2026-03-31',
    poblacionReferencia: 'Comunidades NARP residentes en las 4 ciudades conurbadas',
    limitaciones: 'Incluye migraciones laborales históricas del Chocó, Valle, Costa Caribe y Antioquia.',
    categoria: 'Demografía'
  },
  {
    id: 'ind-05',
    nombre: 'Brecha de Necesidades Básicas Insatisfechas (NBI) en Hogares NARP Rurales',
    municipio: 'Provincia de Mares y Vélez',
    provincia: 'Mares / Vélez',
    valor: 34.2,
    unidad: '% de hogares con NBI',
    fuente: 'DNP - Departamento Nacional de Planeación / SISBEN IV',
    fechaMedicion: '2025-10-15',
    poblacionReferencia: 'Hogares afro rurales frente al promedio departamental del 14.8%',
    limitaciones: 'Cálculo focalizado en corregimientos y veredas ribereñas sin acueducto formal.',
    categoria: 'Vivienda y Servicios'
  },
  {
    id: 'ind-06',
    nombre: 'Tasa de Acceso a Educación Superior en Jóvenes NARP de Santander',
    municipio: 'Departamental',
    provincia: 'Santander',
    valor: 24.6,
    unidad: '% de jóvenes bachilleres graduados',
    fuente: 'Ministerio de Educación Nacional - SNIES & ICETEX Fondo Étnico',
    fechaMedicion: '2025-11-30',
    poblacionReferencia: 'Jóvenes NARP entre 17 y 24 años frente al promedio departamental de 46.1%',
    limitaciones: 'Subrepresentación en universidades públicas con cupo por admisión tradicional.',
    categoria: 'Educación'
  },
  {
    id: 'ind-07',
    nombre: 'Tasa de Informalidad Laboral en Población Afrocolombiana Urbana',
    municipio: 'Bucaramanga y Barrancabermeja',
    provincia: 'Metropolitana y Mares',
    valor: 58.4,
    unidad: '% de ocupados en informalidad',
    fuente: 'DANE - Gran Encuesta Integrada de Hogares (GEIH)',
    fechaMedicion: '2026-04-30',
    poblacionReferencia: 'Población económicamente activa NARP',
    limitaciones: 'Alta participación en comercio informal, servicios domésticos y construcción.',
    categoria: 'Empleo e Ingresos'
  },
  {
    id: 'ind-08',
    nombre: 'Población NARP Víctima del Conflicto Armado Registrada en Santander',
    municipio: 'Departamental con foco en Magdalena Medio y Carare',
    provincia: 'Santander',
    valor: '23.840 personas',
    unidad: 'Personas en RUV',
    fuente: 'Unidad para las Víctimas (UARIV) - Red Nacional de Información',
    fechaMedicion: '2026-01-31',
    poblacionReferencia: 'Población étnica con hechos victimizantes (desplazamiento forzado)',
    limitaciones: 'Sujeto a declaraciones pendientes de valoración o actualización registral.',
    categoria: 'Víctimas'
  }
];

export const ESTADISTICAS_GENERALES = {
  totalOrganizacionesRegistradas: 33, // 25 admitidas + 8 histórico de la Circular 065
  organizacionesAdmitidasCircular065: 25,
  organizacionesNoAdmitidasCircular065: 8,
  consejosComunitariosConstituidos: 5,
  consultivosAcreditados: 18,
  subcomisionesOperativas: 7,
  municipiosConPresenciaNarp: 38,
  proyectosRegistradosBanco: 5,
  inversionProyectadaBanco: '$2.380 Millones COP'
};
