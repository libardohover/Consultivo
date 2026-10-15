import { ProyectoNARP } from '../types';

export const PROYECTOS_BANCO_SANTANDER: ProyectoNARP[] = [
  {
    id: 'proy-01',
    codigoBpin: '2026-68-001-0042',
    titulo: 'Fortalecimiento de la Pesca Artesanal y Manejo Sostenible de Ciénagas en el Magdalena Medio Santandereano',
    subcomision: 'SC-04. Desarrollo económico, empleo y emprendimiento',
    municipio: 'Barrancabermeja y Puerto Wilches',
    provincia: 'Mares',
    entidadProponente: 'ASOPEAFRO-MAGDALENA en articulación con CONCORPW',
    estado: 'En ejecución',
    presupuestoEstimado: 850000000,
    fuenteFinanciacion: 'Regalías (SGR)',
    poblacionBeneficiaria: 1250,
    resumenProblema: 'Baja rentabilidad de los pescadores artesanales por intermediación abusiva y degradación ambiental de las ciénagas Paredes y San Silvestre.',
    objetivoGeneral: 'Dotar de centros de acopio con cadena de frío solar, embarcaciones seguras y planes de manejo pesquero sostenible a 1.250 familias ribereñas.',
    fechaRadicacion: '2025-08-15'
  },
  {
    id: 'proy-02',
    codigoBpin: '2026-68-002-0019',
    titulo: 'Implementación Integral de la Cátedra de Estudios Afrocolombianos en 40 Instituciones Educativas Oficiales de Santander',
    subcomision: 'SC-02. Educación, ciencia, tecnología e innovación',
    municipio: 'Departamental (Bucaramanga, Floridablanca, Girón, Cimitarra, Barrancabermeja)',
    provincia: 'Metropolitana',
    entidadProponente: 'Asociación de Profesionales y Docentes Etnoeducadores (ETNODOCENTES)',
    estado: 'Viabilidad técnica',
    presupuestoEstimado: 420000000,
    fuenteFinanciacion: 'Presupuesto Departamental',
    poblacionBeneficiaria: 14200,
    resumenProblema: 'Incumplimiento de la Ley 70 de 1993 y Decreto 1384 de 2023 en el currículo escolar regular, invisibilizando el aporte afrocolombiano a la historia santandereana.',
    objetivoGeneral: 'Capacitar a 400 docentes y suministrar maletas pedagógicas etnoeducativas a 40 colegios departamentales con alta matrícula de estudiantes afro.',
    fechaRadicacion: '2026-02-10'
  },
  {
    id: 'proy-03',
    titulo: 'Red de Emprendimiento Gastronómico y Agroindustrial de Mujeres Afrodescendientes de Santander',
    subcomision: 'SC-07. Participación, mujer, juventud y fortalecimiento organizativo',
    municipio: 'Bucaramanga, Floridablanca, Piedecuesta y Sabana de Torres',
    provincia: 'Metropolitana',
    entidadProponente: 'ASOMUAFRO-SANTANDER y KWANZA-AFRO',
    estado: 'Formulación MGA',
    presupuestoEstimado: 310000000,
    fuenteFinanciacion: 'MinIgualdad',
    poblacionBeneficiaria: 380,
    resumenProblema: 'Elevada informalidad y brecha de ingresos económicos en madres cabeza de familia afrocolombianas en centros urbanos y cabeceras municipales.',
    objetivoGeneral: 'Consolidar 15 unidades productivas comunitarias de dulces tradicionales, panadería ancestral y cosmética natural con registro INVIMA.',
    fechaRadicacion: '2026-06-20'
  },
  {
    id: 'proy-04',
    codigoBpin: '2026-68-004-0008',
    titulo: 'Ruta Turística y Escuela Intergeneracional de la Tambora y Tradición Oral en el Magdalena Medio',
    subcomision: 'SC-06. Cultura, patrimonio, identidad y turismo',
    municipio: 'Barrancabermeja',
    provincia: 'Mares',
    entidadProponente: 'Colectivo Tambora y Palenque del Magdalena Medio',
    estado: 'En ejecución',
    presupuestoEstimado: 260000000,
    fuenteFinanciacion: 'Cooperación Internacional',
    poblacionBeneficiaria: 950,
    resumenProblema: 'Riesgo de pérdida de los toques ancestrales de tambora y cantos de boga por falta de espacios formativos y desarticulación turística.',
    objetivoGeneral: 'Formar a 120 niños, niñas y jóvenes en luthería y percusión tradicional y dotar la ruta etnoturística ribereña.',
    fechaRadicacion: '2025-11-05'
  },
  {
    id: 'proy-05',
    titulo: 'Programa Departamental de Detección Temprana y Manejo de la Anemia Falciforme en Santander',
    subcomision: 'SC-03. Salud y protección social',
    municipio: 'Departamental con énfasis en Provincia de Mares',
    provincia: 'Mares',
    entidadProponente: 'Corporación de Salud Intercultural Afro Santander (CORPOSALUD)',
    estado: 'Formulación MGA',
    presupuestoEstimado: 540000000,
    fuenteFinanciacion: 'Presupuesto Departamental',
    poblacionBeneficiaria: 5600,
    resumenProblema: 'Subdiagnóstico de la drepanocitosis y falta de tamizaje neonatal especializado en zonas rurales del Magdalena Medio, generando complicaciones graves prevenibles.',
    objetivoGeneral: 'Implementar el protocolo clínico diferencial de tamizaje neonatal y seguimiento especializado a pacientes con anemia falciforme.',
    fechaRadicacion: '2026-07-14'
  }
];

export interface PlantillaMGA {
  fase: string;
  pasos: {
    nombre: string;
    descripcion: string;
    camposSugeridos: string[];
  }[];
}

export const GUIA_FORMULACION_MGA: PlantillaMGA[] = [
  {
    fase: '1. Identificación y Diagnóstico',
    pasos: [
      {
        nombre: 'Diagnóstico Territorial Participativo',
        descripcion: 'Caracterización de la comunidad NARP en el municipio santandereano, causas de la problemática y actores involucrados.',
        camposSugeridos: ['Municipio y veredas afectadas', 'Población étnica objetivo', 'Antecedentes y justificación']
      },
      {
        nombre: 'Árbol de Problemas',
        descripcion: 'Identificación del problema central, causas directas e indirectas, y efectos en la calidad de vida comunitaria.',
        camposSugeridos: ['Problema central', 'Causas raíz', 'Efectos mediatos e inmediatos']
      }
    ]
  },
  {
    fase: '2. Preparación y Alternativas',
    pasos: [
      {
        nombre: 'Árbol de Objetivos',
        descripcion: 'Transformación del problema en estado positivo deseado: objetivo general y objetivos específicos medibles.',
        camposSugeridos: ['Objetivo general', 'Objetivos específicos', 'Fines del proyecto']
      },
      {
        nombre: 'Cadena de Valor MGA',
        descripcion: 'Relación articulada entre Insumos -> Actividades -> Productos -> Resultados e Impacto.',
        camposSugeridos: ['Insumos necesarios', 'Productos tangibles a entregar', 'Indicadores de producto']
      }
    ]
  },
  {
    fase: '3. Evaluación y Financiamiento',
    pasos: [
      {
        nombre: 'Presupuesto por Fuentes',
        descripcion: 'Estructuración presupuestal discriminada por rubros y fuentes de financiación viables (SGR, OCAD Paz, MinIgualdad, Cooperación).',
        camposSugeridos: ['Costos de personal comunitario', 'Equipamiento e insumos', 'Gastos operativos']
      },
      {
        nombre: 'Matriz de Riesgos y Sostenibilidad',
        descripcion: 'Análisis de riesgos ambientales, políticos y comunitarios con planes de mitigación y sostenibilidad a largo plazo.',
        camposSugeridos: ['Riesgo identificado', 'Probabilidad e impacto', 'Acción mitigadora', 'Sostenibilidad comunitaria']
      }
    ]
  }
];
