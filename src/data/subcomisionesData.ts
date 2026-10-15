import { Subcomision, ConsultivoAcreditado, SesionConsultiva } from '../types';

export const SUBCOMISIONES_OFICIALES: Subcomision[] = [
  {
    codigo: 'SC-01',
    nombre: 'Derechos humanos y asuntos jurídicos',
    fundamento: 'Estructura sectorial provisional conforme al Decreto Departamental 166 de 2018 y Ley 70 de 1993',
    coordinador: 'Marlene Palacios Murillo (Barrancabermeja)',
    secretario: 'Albeiro Mosquera (Puerto Parra / Suplente)',
    integrantesCount: 8,
    integrantesNombres: [
      'Marlene Palacios Murillo (AFROCOLBARRANCA)',
      'José Domingo Mosquera Rivas (ASOCONAFRO-BGA)',
      'Oswaldo Mina Rentería (CC-RÍO-COLORADO)',
      'Arnulfo Murillo Córdoba (CC-RÍO-OPÓN)',
      'Dra. Neyla Esperanza Rivas Rivas (CORPOSALUD-AFRO)',
      'Jhon Jairo Hinestroza Perea (ASOCAFRO-GIRÓN)',
      'Keila Valdés Cassiani (PALENQUE-FLORIDA)',
      'Luz Mary Palacios Palacios (AFROVELEÑA)'
    ],
    objetivo: 'Monitorear la garantía de derechos humanos fundamentales y colectivos de la población NARP en Santander, rutas de protección ante amenazas, y asesoría jurídica frente a consultas previas y discriminación racial.',
    proyectosActivos: 3,
    compromisosPendientes: 2,
    compromisosCumplidos: 6,
    sesionesRealizadas: 5,
    planTrabajo2026: [
      'Mesa técnica permanente con la Defensoría del Pueblo y Procuraduría Regional Santander',
      'Protocolo departamental de atención a líderes y lideresas NARP amenazados',
      'Observatorio de tutelas y acciones populares por consulta previa en proyectos de hidrocarburos y vías',
      'Ruta judicial de articulación con el Comité Departamental de Justicia Transicional'
    ]
  },
  {
    codigo: 'SC-02',
    nombre: 'Educación, ciencia, tecnología e innovación',
    fundamento: 'Decreto 1384 de 2023 y Ley 70 de 1993 Art. 32-42',
    coordinador: 'Ángela Patricia Caicedo Hurtado (Bucaramanga)',
    secretario: 'Ing. Yeison Palacios Lemus (Barrancabermeja)',
    integrantesCount: 7,
    integrantesNombres: [
      'Ángela Patricia Caicedo Hurtado (ETNODOCENTES-SANTANDER)',
      'Ing. Yeison Palacios Lemus (INNOVA-AFRO)',
      'Brayan Alexis Asprilla (JUVENTUD-AFRO-STDER)',
      'José Domingo Mosquera Rivas (ASOCONAFRO-BGA)',
      'Yomaira Córdoba Bejarano (KWANZA-AFRO)',
      'Sonia Mercedes Murillo (RAÍCES-ÉBANO)',
      'Faustino Angulo Gamboa (AFROGIRÓN-GUANENTÁ)'
    ],
    objetivo: 'Garantizar la implementación efectiva de la Cátedra de Estudios Afrocolombianos (CEA) en los 87 municipios, cupos especiales y becas de educación superior (ICETEX Fondo Étnico), y programas de conectividad y robótica comunitaria.',
    proyectosActivos: 4,
    compromisosPendientes: 3,
    compromisosCumplidos: 8,
    sesionesRealizadas: 6,
    planTrabajo2026: [
      'Censo de docentes capacitados en CEA en colegios públicos de Santander',
      'Feria de becas universitarias con la UIS, UTS, UNAB y UDI para bachilleres afro',
      'Laboratorio itinerante de robótica comunitaria e IA en colegios del Magdalena Medio',
      'Convenio con la Secretaría de Educación Departamental para material pedagógico etnoeducativo'
    ]
  },
  {
    codigo: 'SC-03',
    nombre: 'Salud y protección social',
    fundamento: 'Ley 70 de 1993 Art. 43 y Plan Decenal de Salud Pública',
    coordinador: 'Dra. Neyla Esperanza Rivas Rivas (Bucaramanga)',
    secretario: 'Gladys Marina Rentería Mena (ASOMUAFRO)',
    integrantesCount: 6,
    integrantesNombres: [
      'Dra. Neyla Esperanza Rivas Rivas (CORPOSALUD-AFRO)',
      'Gladys Marina Rentería Mena (ASOMUAFRO-SANTANDER)',
      'Marlene Palacios Murillo (AFROCOLBARRANCA)',
      'Aura Nidia Mosquera Perea (AFROPLAYÓN)',
      'Héctor Manuel Blandón (CC-CIÉNAGA-PAREDES)',
      'Carlos Julio Chaverra (ASOPEAFRO-MAGDALENA)'
    ],
    objetivo: 'Implementar el enfoque diferencial étnico en el sistema de salud de Santander, con énfasis en diagnóstico precoz de anemia falciforme, reducción de mortalidad materna en zonas ribereñas, y medicina tradicional.',
    proyectosActivos: 2,
    compromisosPendientes: 1,
    compromisosCumplidos: 4,
    sesionesRealizadas: 4,
    planTrabajo2026: [
      'Campaña departamental de tamizaje de anemia de células falciformes (drepanocitosis)',
      'Mesa de trabajo con EPS del régimen subsidiado para caracterización sociodemográfica',
      'Programa de salud materna intercultural y partería tradicional en el Magdalena Medio',
      'Jornadas de atención médica integral en corregimientos ribereños'
    ]
  },
  {
    codigo: 'SC-04',
    nombre: 'Desarrollo económico, empleo y emprendimiento',
    fundamento: 'Decreto 1396 de 2023 y Ley 70 de 1993 Capítulo VI',
    coordinador: 'Carlos Julio Chaverra (Barrancabermeja)',
    secretario: 'Hernán Darío Banguera (Cimitarra)',
    integrantesCount: 8,
    integrantesNombres: [
      'Carlos Julio Chaverra (ASOPEAFRO-MAGDALENA)',
      'Hernán Darío Banguera (CIMARRÓN-CIMITARRA)',
      'Darlys Johana Mosquera (AFROSABANA)',
      'Moisés Bejarano Rivas (ASOPRO-AFRORIONEGRO)',
      'Diana Marcela Moreno Gamboa (AFROLEBRIJA)',
      'Aura Nidia Mosquera Perea (AFROPLAYÓN)',
      'Keila Valdés Cassiani (PALENQUE-FLORIDA)',
      'José Wilson Mina Viáfara (AFROBARBOSA)'
    ],
    objetivo: 'Fomentar la autonomía productiva de las organizaciones NARP mediante líneas especiales de crédito Finagro/Bancóldex, fortalecimiento a pescadores artesanales, cadenas de cacao agroforestal y compras públicas locales.',
    proyectosActivos: 5,
    compromisosPendientes: 4,
    compromisosCumplidos: 9,
    sesionesRealizadas: 7,
    planTrabajo2026: [
      'Línea de crédito blando con el Idesan (Instituto Financiero para el Desarrollo de Santander)',
      'Plataforma de comercialización directa de pescado seco, patacón y dulces ancestrales',
      'Articulación con el SENA para certificación de competencias laborales pesqueras y agrícolas',
      'Rueda de negocios étnica en la Feria Agroindustrial de Bucaramanga y Barrancabermeja'
    ]
  },
  {
    codigo: 'SC-05',
    nombre: 'Territorio, ambiente, vivienda y servicios públicos',
    fundamento: 'Ley 70 de 1993 Capítulos III, IV y V; Decreto 1398 de 2023',
    coordinador: 'Everlides Hurtado Caicedo (Puerto Wilches)',
    secretario: 'Oswaldo Mina Rentería (Barrancabermeja)',
    integrantesCount: 7,
    integrantesNombres: [
      'Everlides Hurtado Caicedo (CONCORPW)',
      'Oswaldo Mina Rentería (CC-RÍO-COLORADO)',
      'Arnulfo Murillo Córdoba (CC-RÍO-OPÓN)',
      'Héctor Manuel Blandón (CC-CIÉNAGA-PAREDES)',
      'Jhon Jairo Hinestroza Perea (ASOCAFRO-GIRÓN)',
      'Moisés Bejarano Rivas (ASOPRO-AFRORIONEGRO)',
      'Hernán Darío Banguera (CIMARRÓN-CIMITARRA)'
    ],
    objetivo: 'Avanzar en los procesos de titulación colectiva de tierras, protección de humedales y ciénagas frente a pasivos ambientales, mejoramiento de vivienda rural y acceso a agua potable para comunidades ribereñas.',
    proyectosActivos: 4,
    compromisosPendientes: 2,
    compromisosCumplidos: 7,
    sesionesRealizadas: 6,
    planTrabajo2026: [
      'Mesa de concertación con la Agencia Nacional de Tierras (ANT) para titulación en el Magdalena Medio',
      'Plan de protección y recuperación de la ciénaga San Silvestre, Paredes y el río Sogamoso',
      'Diagnóstico de acueductos comunitarios veredales con la CAS y la CDMB',
      'Postulación a subsidios de mejoramiento de vivienda rural diferencial del Ministerio de Vivienda'
    ]
  },
  {
    codigo: 'SC-06',
    nombre: 'Cultura, patrimonio, identidad y turismo',
    fundamento: 'Ley 70 de 1993 Capítulo V, Ley 725 de 2001 y Ley General de Cultura',
    coordinador: 'Emilse Cuesta Córdoba (Barrancabermeja)',
    secretario: 'Sonia Mercedes Murillo (Bucaramanga)',
    integrantesCount: 7,
    integrantesNombres: [
      'Emilse Cuesta Córdoba (TAMBORA-PALENQUE)',
      'Sonia Mercedes Murillo (RAÍCES-ÉBANO)',
      'Keila Valdés Cassiani (PALENQUE-FLORIDA)',
      'Faustino Angulo Gamboa (AFROGIRÓN-GUANENTÁ)',
      'Luz Mary Palacios Palacios (AFROVELEÑA)',
      'Ángela Patricia Caicedo Hurtado (ETNODOCENTES-SANTANDER)',
      'Everlides Hurtado Caicedo (CONCORPW)'
    ],
    objetivo: 'Resguardar las manifestaciones inmateriales afrocolombianas en Santander: tambora del Magdalena Medio, peinados ancestrales, medicina botánica, culinaria tradicional y circuitos de etnoturismo comunitario.',
    proyectosActivos: 3,
    compromisosPendientes: 1,
    compromisosCumplidos: 8,
    sesionesRealizadas: 8,
    planTrabajo2026: [
      'Festival Departamental de la Tambora y Saberes Ancestrales en Barrancabermeja',
      'Publicación del libro de cocina afro-santandereana y memorias de las cantaoras',
      'Creación de la Ruta Turística "Río, Tambora y Palenque" en Santander',
      'Conmemoración oficial del 21 de Mayo (Mes de la Herencia Afrocolombiana) con la Gobernación'
    ]
  },
  {
    codigo: 'SC-07',
    nombre: 'Participación, mujer, juventud y fortalecimiento organizativo',
    fundamento: 'Constitución Política Art. 40, Ley 1482 de 2011 y Conpes 3918',
    coordinador: 'Gladys Marina Rentería Mena (Bucaramanga)',
    secretario: 'Brayan Alexis Asprilla (Bucaramanga)',
    integrantesCount: 8,
    integrantesNombres: [
      'Gladys Marina Rentería Mena (ASOMUAFRO-SANTANDER)',
      'Brayan Alexis Asprilla (JUVENTUD-AFRO-STDER)',
      'Yomaira Córdoba Bejarano (KWANZA-AFRO)',
      'José Wilson Mina Viáfara (AFROBARBOSA)',
      'Darlys Johana Mosquera (AFROSABANA)',
      'Ing. Yeison Palacios Lemus (INNOVA-AFRO)',
      'Diana Marcela Moreno Gamboa (AFROLEBRIJA)',
      'Marlene Palacios Murillo (AFROCOLBARRANCA)'
    ],
    objetivo: 'Empoderar a mujeres y juventudes afro en la toma de decisiones, fortalecer la capacidad de gestión de las organizaciones de base con y sin registro, y garantizar la transparencia del sistema consultivo.',
    proyectosActivos: 4,
    compromisosPendientes: 2,
    compromisosCumplidos: 10,
    sesionesRealizadas: 7,
    planTrabajo2026: [
      'Escuela de formación política y liderazgo para mujeres afrodescendientes "Guerreras del Ébano"',
      'Encuentro Departamental de Juventudes Afro en Santander',
      'Asistencia técnica para subsanación y Registro Público Único Nacional ante el MinInterior',
      'Mecanismos de rendición de cuentas pública de los consultivos hacia sus comunidades de base'
    ]
  }
];

export const CONSULTIVOS_REGISTRADOS: ConsultivoAcreditado[] = [
  {
    id: 'cons-01',
    nombre: 'Marlene Palacios Murillo',
    organizacion: 'Asociación Afrocolombiana de Barrancabermeja (AFROCOLBARRANCA)',
    municipio: 'Barrancabermeja',
    provincia: 'Mares',
    calidadRepresentacion: 'Principal',
    periodo: '2024-2027',
    estadoEjercicio: 'En ejercicio',
    subcomisiones: ['SC-01. Derechos humanos y asuntos jurídicos', 'SC-03. Salud y protección social'],
    responsabilidades: ['Vocera en la Mesa de Garantías Departamental', 'Coordinadora de la Subcomisión SC-01'],
    fechaEleccion: '2024-04-12',
    actoAcreditacion: 'Acta de Asamblea Electoral N.º 004-2024 y Resolución Gobernación 341',
    participacionPorcentaje: 94
  },
  {
    id: 'cons-02',
    nombre: 'Everlides Hurtado Caicedo',
    organizacion: 'Consejo Comunitario de la Cuenca del Río Sogamoso (CONCORPW)',
    municipio: 'Puerto Wilches',
    provincia: 'Mares',
    calidadRepresentacion: 'Principal',
    periodo: '2024-2027',
    estadoEjercicio: 'En ejercicio',
    subcomisiones: ['SC-05. Territorio, ambiente, vivienda y servicios públicos', 'SC-06. Cultura y patrimonio'],
    responsabilidades: ['Delegado ante la Mesa Forestal de Santander', 'Coordinador Subcomisión SC-05'],
    fechaEleccion: '2024-04-12',
    actoAcreditacion: 'Acta de Asamblea Electoral N.º 004-2024',
    participacionPorcentaje: 91
  },
  {
    id: 'cons-03',
    nombre: 'José Domingo Mosquera Rivas',
    organizacion: 'Asociación de Comunidades Negras del Área Metropolitana (ASOCONAFRO-BGA)',
    municipio: 'Bucaramanga',
    provincia: 'Metropolitana',
    calidadRepresentacion: 'Principal',
    periodo: '2024-2027',
    estadoEjercicio: 'En ejercicio',
    subcomisiones: ['SC-01. Derechos humanos', 'SC-02. Educación, ciencia y tecnología'],
    responsabilidades: ['Interlocutor ante el Consejo Territorial de Planeación (CTP) Santander'],
    fechaEleccion: '2024-04-12',
    actoAcreditacion: 'Acta de Asamblea Electoral N.º 004-2024',
    participacionPorcentaje: 88
  },
  {
    id: 'cons-04',
    nombre: 'Gladys Marina Rentería Mena',
    organizacion: 'Asociación de Mujeres Negras y Afrodescendientes de Santander (ASOMUAFRO)',
    municipio: 'Bucaramanga',
    provincia: 'Metropolitana',
    calidadRepresentacion: 'Principal',
    periodo: '2024-2027',
    estadoEjercicio: 'En ejercicio',
    subcomisiones: ['SC-07. Participación, mujer y juventud', 'SC-03. Salud y protección social'],
    responsabilidades: ['Coordinadora de SC-07', 'Mesa Interinstitucional contra Violencias de Género'],
    fechaEleccion: '2024-04-12',
    actoAcreditacion: 'Acta de Asamblea Electoral N.º 004-2024',
    participacionPorcentaje: 96
  },
  {
    id: 'cons-05',
    nombre: 'Carlos Julio Chaverra',
    organizacion: 'Asociación de Pescadores y Artesanos Afro del Río Magdalena (ASOPEAFRO)',
    municipio: 'Barrancabermeja',
    provincia: 'Mares',
    calidadRepresentacion: 'Principal',
    periodo: '2024-2027',
    estadoEjercicio: 'En ejercicio',
    subcomisiones: ['SC-04. Desarrollo económico y empleo', 'SC-05. Territorio y ambiente'],
    responsabilidades: ['Coordinador SC-04', 'Mesa Pesquera Departamental'],
    fechaEleccion: '2024-04-12',
    actoAcreditacion: 'Acta de Asamblea Electoral N.º 004-2024',
    participacionPorcentaje: 85
  },
  {
    id: 'cons-06',
    nombre: 'Ángela Patricia Caicedo Hurtado',
    organizacion: 'Asociación de Profesionales y Docentes Etnoeducadores (ETNODOCENTES)',
    municipio: 'Bucaramanga',
    provincia: 'Metropolitana',
    calidadRepresentacion: 'Principal',
    periodo: '2024-2027',
    estadoEjercicio: 'En ejercicio',
    subcomisiones: ['SC-02. Educación, ciencia y tecnología', 'SC-06. Cultura y patrimonio'],
    responsabilidades: ['Coordinadora SC-02', 'Comité Departamental de Convivencia Escolar'],
    fechaEleccion: '2024-04-12',
    actoAcreditacion: 'Acta de Asamblea Electoral N.º 004-2024',
    participacionPorcentaje: 92
  },
  {
    id: 'cons-07',
    nombre: 'Emilse Cuesta Córdoba',
    organizacion: 'Colectivo Tambora y Palenque del Magdalena Medio',
    municipio: 'Barrancabermeja',
    provincia: 'Mares',
    calidadRepresentacion: 'Principal',
    periodo: '2024-2027',
    estadoEjercicio: 'En ejercicio',
    subcomisiones: ['SC-06. Cultura, patrimonio, identidad y turismo'],
    responsabilidades: ['Coordinadora SC-06', 'Consejo Departamental de Cultura'],
    fechaEleccion: '2024-04-12',
    actoAcreditacion: 'Acta de Asamblea Electoral N.º 004-2024',
    participacionPorcentaje: 90
  },
  {
    id: 'cons-08',
    nombre: 'Hernán Darío Banguera',
    organizacion: 'Corporación Afro Cimarrón de Cimitarra',
    municipio: 'Cimitarra',
    provincia: 'Vélez',
    calidadRepresentacion: 'Principal',
    periodo: '2024-2027',
    estadoEjercicio: 'En ejercicio',
    subcomisiones: ['SC-04. Desarrollo económico', 'SC-05. Territorio'],
    responsabilidades: ['Delegado por la Provincia de Vélez y el Carare-Opón'],
    fechaEleccion: '2024-04-12',
    actoAcreditacion: 'Acta de Asamblea Electoral N.º 004-2024',
    participacionPorcentaje: 82
  }
];

export const SESIONES_HISTORIAL: SesionConsultiva[] = [
  {
    id: 'ses-2026-03',
    numero: 'Sesión Ordinaria N.º 03 - 2026',
    fecha: '2026-09-18',
    lugar: 'Palacio Amarillo - Salón Augusto Espinosa Valderrama, Bucaramanga / Híbrida',
    tipo: 'Ordinaria',
    ordenDelDia: [
      '1. Verificación del quórum reglamentario',
      '2. Instalación por el Secretario del Interior Departamental',
      '3. Socialización del avance del cronograma electoral 2026 (Circular 065)',
      '4. Informes de gestión de las siete subcomisiones temáticas',
      '5. Presentación de propuestas para el presupuesto departamental 2027',
      '6. Proposiciones y varios'
    ],
    quorumVerificado: true,
    asistentesCount: 16,
    totalConsultivos: 18,
    estado: 'Acta aprobada',
    principalesAcuerdos: [
      'Aprobación unánime del cronograma de acompañamiento técnico a las organizaciones en proceso de inscripción.',
      'Solicitud a la Secretaría de Hacienda Departamental para incorporar un rubro específico del 2.5% de inversión social con enfoque étnico.',
      'Convocatoria a audiencia pública sobre títulos colectivos en la cuenca del Magdalena Medio para noviembre de 2026.'
    ]
  },
  {
    id: 'ses-2026-02',
    numero: 'Sesión Extraordinaria N.º 02 - 2026',
    fecha: '2026-06-25',
    lugar: 'Sede Alcaldía Distrital de Barrancabermeja - Auditorio Centro',
    tipo: 'Extraordinaria',
    ordenDelDia: [
      '1. Verificación de quórum',
      '2. Análisis de alertas tempranas de la Defensoría del Pueblo para liderazgos del Magdalena Medio',
      '3. Compromisos con la Unidad Nacional de Protección (UNP)',
      '4. Conclusiones y tareas urgentes'
    ],
    quorumVerificado: true,
    asistentesCount: 15,
    totalConsultivos: 18,
    estado: 'Acta aprobada',
    principalesAcuerdos: [
      'Activación de canal prioritario de comunicación con la Policía Departamental del Magdalena Medio.',
      'Remisión formal de informe de riesgo a la Secretaría del Interior de Santander y MinInterior.'
    ]
  },
  {
    id: 'ses-2026-01',
    numero: 'Sesión Ordinaria N.º 01 - 2026',
    fecha: '2026-03-14',
    lugar: 'Gobernación de Santander, Bucaramanga',
    tipo: 'Ordinaria',
    ordenDelDia: [
      '1. Apertura y verificación de quórum',
      '2. Adopción del Plan Anual de Acción 2026 de la Consultiva Departamental',
      '3. Asignación de coordinaciones provisionales de las siete subcomisiones',
      '4. Varios y compromisos institucionales'
    ],
    quorumVerificado: true,
    asistentesCount: 17,
    totalConsultivos: 18,
    estado: 'Acta aprobada',
    principalesAcuerdos: [
      'Aprobación formal del Plan Operativo Anual 2026.',
      'Conformación técnica de las 7 subcomisiones de trabajo temático.'
    ]
  }
];
