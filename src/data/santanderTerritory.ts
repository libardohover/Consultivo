export interface MunicipioSantander {
  nombre: string;
  provincia: 'Mares' | 'Metropolitana' | 'Guanentá' | 'Comunera' | 'Vélez' | 'García Rovira' | 'Soto Norte';
  poblacionTotal: number;
  poblacionAfroEstimada: number;
  porcentajeAfro: number;
  lat: number;
  lng: number;
  organizacionesActivas: number;
  consejosComunitarios: number;
}

export const PROVINCIAS_SANTANDER = [
  {
    nombre: 'Mares',
    capital: 'Barrancabermeja',
    municipiosCount: 7,
    poblacionAfroEstimada: 54200,
    descripcion: 'Región del Magdalena Medio, principal epicentro histórico de comunidades ribereñas, pesqueras y petroleras afrocolombianas en Santander.'
  },
  {
    nombre: 'Metropolitana',
    capital: 'Bucaramanga',
    municipiosCount: 10,
    poblacionAfroEstimada: 61500,
    descripcion: 'Población afro urbana y periurbana con alto dinamismo etnoeducativo, universitario, laboral y cultural.'
  },
  {
    nombre: 'Vélez',
    capital: 'Vélez',
    municipiosCount: 19,
    poblacionAfroEstimada: 14800,
    descripcion: 'Región sur-occidental con comunidades campesinas afrodescendientes en Cimitarra, Landázuri, Barbosa y el Carare-Opón.'
  },
  {
    nombre: 'Guanentá',
    capital: 'San Gil',
    municipiosCount: 18,
    poblacionAfroEstimada: 6200,
    descripcion: 'Provincia turística y patrimonial con expresiones organizativas afro en San Gil, Barichara y Charalá.'
  },
  {
    nombre: 'Comunera',
    capital: 'Socorro',
    municipiosCount: 16,
    poblacionAfroEstimada: 5400,
    descripcion: 'Cuna de la insurrección comunera, con presencia afrodescendiente histórica en labores de tabaco, caña y artesanía.'
  },
  {
    nombre: 'García Rovira',
    capital: 'Málaga',
    municipiosCount: 12,
    poblacionAfroEstimada: 3900,
    descripcion: 'Zona nororiental andina con liderazgos y colectivos culturales afrodescendientes en centros urbanos.'
  },
  {
    nombre: 'Soto Norte',
    capital: 'Matanza',
    municipiosCount: 5,
    poblacionAfroEstimada: 2500,
    descripcion: 'Subregión minera y ambiental con iniciativas de visibilización étnica y derechos bioculturales.'
  }
];

export const MUNICIPIOS_DESTACADOS: MunicipioSantander[] = [
  {
    nombre: 'Barrancabermeja',
    provincia: 'Mares',
    poblacionTotal: 212500,
    poblacionAfroEstimada: 43500,
    porcentajeAfro: 20.47,
    lat: 7.0653,
    lng: -73.8547,
    organizacionesActivas: 9,
    consejosComunitarios: 3
  },
  {
    nombre: 'Bucaramanga',
    provincia: 'Metropolitana',
    poblacionTotal: 614000,
    poblacionAfroEstimada: 34200,
    porcentajeAfro: 5.57,
    lat: 7.1193,
    lng: -73.1227,
    organizacionesActivas: 7,
    consejosComunitarios: 0
  },
  {
    nombre: 'Puerto Wilches',
    provincia: 'Mares',
    poblacionTotal: 35400,
    poblacionAfroEstimada: 7200,
    porcentajeAfro: 20.34,
    lat: 7.3486,
    lng: -73.9022,
    organizacionesActivas: 4,
    consejosComunitarios: 2
  },
  {
    nombre: 'Floridablanca',
    provincia: 'Metropolitana',
    poblacionTotal: 280000,
    poblacionAfroEstimada: 12400,
    porcentajeAfro: 4.43,
    lat: 7.0622,
    lng: -73.0864,
    organizacionesActivas: 2,
    consejosComunitarios: 0
  },
  {
    nombre: 'Girón',
    provincia: 'Metropolitana',
    poblacionTotal: 185000,
    poblacionAfroEstimada: 9800,
    porcentajeAfro: 5.30,
    lat: 7.0682,
    lng: -73.1698,
    organizacionesActivas: 2,
    consejosComunitarios: 0
  },
  {
    nombre: 'Piedecuesta',
    provincia: 'Metropolitana',
    poblacionTotal: 165000,
    poblacionAfroEstimada: 7100,
    porcentajeAfro: 4.30,
    lat: 7.0058,
    lng: -73.0494,
    organizacionesActivas: 2,
    consejosComunitarios: 0
  },
  {
    nombre: 'Cimitarra',
    provincia: 'Vélez',
    poblacionTotal: 48900,
    poblacionAfroEstimada: 5300,
    porcentajeAfro: 10.84,
    lat: 6.3155,
    lng: -73.9507,
    organizacionesActivas: 2,
    consejosComunitarios: 1
  },
  {
    nombre: 'Sabana de Torres',
    provincia: 'Mares',
    poblacionTotal: 23600,
    poblacionAfroEstimada: 3100,
    porcentajeAfro: 13.14,
    lat: 7.3916,
    lng: -73.4947,
    organizacionesActivas: 2,
    consejosComunitarios: 0
  },
  {
    nombre: 'San Gil',
    provincia: 'Guanentá',
    poblacionTotal: 58000,
    poblacionAfroEstimada: 2400,
    porcentajeAfro: 4.14,
    lat: 6.556,
    lng: -73.137,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  },
  {
    nombre: 'Barbosa',
    provincia: 'Vélez',
    poblacionTotal: 30200,
    poblacionAfroEstimada: 1800,
    porcentajeAfro: 5.96,
    lat: 5.9328,
    lng: -73.6158,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  },
  {
    nombre: 'El Playón',
    provincia: 'Metropolitana',
    poblacionTotal: 13200,
    poblacionAfroEstimada: 980,
    porcentajeAfro: 7.42,
    lat: 7.4735,
    lng: -73.2045,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  },
  {
    nombre: 'Lebrija',
    provincia: 'Metropolitana',
    poblacionTotal: 42100,
    poblacionAfroEstimada: 1850,
    porcentajeAfro: 4.39,
    lat: 7.1189,
    lng: -73.2206,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  },
  {
    nombre: 'Rionegro',
    provincia: 'Metropolitana',
    poblacionTotal: 31000,
    poblacionAfroEstimada: 1650,
    porcentajeAfro: 5.32,
    lat: 7.2625,
    lng: -73.1517,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  },
  {
    nombre: 'Vélez',
    provincia: 'Vélez',
    poblacionTotal: 20100,
    poblacionAfroEstimada: 950,
    porcentajeAfro: 4.73,
    lat: 6.0125,
    lng: -73.6739,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  },
  {
    nombre: 'Socorro',
    provincia: 'Comunera',
    poblacionTotal: 32000,
    poblacionAfroEstimada: 1100,
    porcentajeAfro: 3.44,
    lat: 6.4678,
    lng: -73.2608,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  },
  {
    nombre: 'San Vicente de Chucurí',
    provincia: 'Mares',
    poblacionTotal: 34500,
    poblacionAfroEstimada: 1400,
    porcentajeAfro: 4.06,
    lat: 6.8822,
    lng: -73.4128,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  },
  {
    nombre: 'Málaga',
    provincia: 'García Rovira',
    poblacionTotal: 22800,
    poblacionAfroEstimada: 720,
    porcentajeAfro: 3.16,
    lat: 6.6997,
    lng: -72.7331,
    organizacionesActivas: 1,
    consejosComunitarios: 0
  }
];

// Lista de los 87 municipios oficiales de Santander clasificados por provincia
export const TODOS_LOS_87_MUNICIPIOS = [
  // Mares (7)
  'Barrancabermeja', 'Puerto Wilches', 'Sabana de Torres', 'San Vicente de Chucurí', 'El Carmen de Chucurí', 'Betulia', 'Zapatoca',
  // Metropolitana / Soto (10)
  'Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Lebrija', 'El Playón', 'Rionegro', 'Santa Bárbara', 'Los Santos', 'Tona',
  // Soto Norte (5)
  'California', 'Charta', 'Matanza', 'Suratá', 'Vetas',
  // Guanentá (18)
  'San Gil', 'Aratoca', 'Barichara', 'Cabrera', 'Cepita', 'Charalá', 'Coromoro', 'Curití', 'Encino', 'Jordán', 'Mogotes', 'Ocamonte', 'Onzaga', 'Páramo', 'Pinchote', 'San Joaquín', 'Valle de San José', 'Villanueva',
  // Comunera (16)
  'Socorro', 'Chima', 'Confines', 'Contratación', 'El Guacamayo', 'Galán', 'Gámbita', 'Guadalupe', 'Guapotá', 'Hato', 'Oiba', 'Palmar', 'Palmas del Socorro', 'Santa Helena del Opón', 'Simacota', 'Suaita',
  // Vélez (19)
  'Vélez', 'Aguada', 'Albania', 'Barbosa', 'Bolívar', 'Cimitarra', 'Chipatá', 'El Peñón', 'Florián', 'Guavatá', 'Güepsa', 'Jesús María', 'La Belleza', 'La Paz', 'Landázuri', 'Puente Nacional', 'Puerto Parra', 'San Benito', 'Sucre',
  // García Rovira (12)
  'Málaga', 'Capitanejo', 'Carcasí', 'Cerrito', 'Concepción', 'Enciso', 'Guaca', 'Macaravita', 'Molagavita', 'San Andrés', 'San José de Miranda', 'San Miguel'
];
