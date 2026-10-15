import { CursoEduca } from '../types';

export const CURSOS_AFROEDUCA: CursoEduca[] = [
  {
    id: 'curso-01',
    titulo: 'Fundamentos de la Ley 70 de 1993 y Jurisprudencia Étnica',
    duracionHoras: 24,
    modulosCount: 4,
    nivel: 'Introductorio',
    descripcion: 'Aprende los pilares jurídicos del derecho étnico en Colombia: propiedad colectiva, consulta previa bajo el Convenio 169 de la OIT y la Sentencia T-576 de 2014, y la reglamentación expedida en 2023.',
    instructor: 'Comité Jurídico Subcomisión SC-01 y Abogados Especialistas',
    modulos: [
      {
        titulo: 'Módulo 1: Historia del Cimarronaje y el Artículo 55 Transitorio',
        descripcion: 'Contexto social y constitucional previo a la expedición de la Ley 70 de 1993.',
        duracionMin: 60
      },
      {
        titulo: 'Módulo 2: Propiedad Colectiva y Consejos Comunitarios (Dec. 1745 de 1995)',
        descripcion: 'Estructura jurídica de la asamblea y junta del consejo comunitario, inalienabilidad de la tierra.',
        duracionMin: 90
      },
      {
        titulo: 'Módulo 3: El Derecho Fundamental a la Consulta Previa',
        descripcion: 'Estándares jurisprudenciales de la Corte Constitucional y fases del proceso consultivo.',
        duracionMin: 90
      },
      {
        titulo: 'Módulo 4: Los Decretos Reglamentarios de 2023 y Desafíos en Santander',
        descripcion: 'Decretos 1384, 1396, 1397 y 1398 y su aplicación territorial.',
        duracionMin: 60
      }
    ]
  },
  {
    id: 'curso-02',
    titulo: 'Formulación de Proyectos Étnicos en Metodología MGA para Regalías y MinIgualdad',
    duracionHoras: 36,
    modulosCount: 5,
    nivel: 'Intermedio',
    descripcion: 'Guía paso a paso para transformar ideas comunitarias en proyectos viables formulados en Metodología General Ajustada (MGA) para acceder al SGR y fondos del Gobierno Nacional.',
    instructor: 'Economistas de la Subcomisión SC-04 y Consultores de Planeación',
    modulos: [
      {
        titulo: 'Módulo 1: Diagnóstico Territorial y Árbol de Problemas',
        descripcion: 'Cómo delimitar el problema central y las evidencias cuantitativas y cualitativas.',
        duracionMin: 90
      },
      {
        titulo: 'Módulo 2: Árbol de Objetivos y Matriz de Alternativas',
        descripcion: 'Conversión de problemas a objetivos y selección de la alternativa de mayor impacto.',
        duracionMin: 90
      },
      {
        titulo: 'Módulo 3: Cadena de Valor MGA e Indicadores de Producto',
        descripcion: 'Estructuración de insumos, actividades y metas medibles.',
        duracionMin: 120
      },
      {
        titulo: 'Módulo 4: Presupuesto por Fuentes y Viabilidad Financiera',
        descripcion: 'Cotizaciones, precios de referencia y distribución de fuentes de cofinanciación.',
        duracionMin: 120
      },
      {
        titulo: 'Módulo 5: Carga en la Plataforma MGA Web y Radicación BPIN',
        descripcion: 'Uso del sistema oficial del DNP y soporte de requisitos sectoriales.',
        duracionMin: 90
      }
    ]
  },
  {
    id: 'curso-03',
    titulo: 'Veeduría Ciudadana, Control Social y Acceso a la Información Pública (Ley 1712)',
    duracionHoras: 18,
    modulosCount: 3,
    nivel: 'Introductorio',
    descripcion: 'Herramientas prácticas para hacer seguimiento al presupuesto público departamental y municipal con enfoque étnico, radicar derechos de petición efectivos y conformar veedurías ciudadanas reconocidas por personerías.',
    instructor: 'Comisión de Control Social y Transparencia NARP',
    modulos: [
      {
        titulo: 'Módulo 1: Marco Normativo de las Veedurías Étnicas (Ley 850 de 2003)',
        descripcion: 'Requisitos de constitución ante Personería Municipal y facultades legales.',
        duracionMin: 60
      },
      {
        titulo: 'Módulo 2: Derecho de Petición y Transparencia Activa',
        descripcion: 'Cómo solicitar contratos, actas e informes presupuestales en Secop II y SECOP I.',
        duracionMin: 60
      },
      {
        titulo: 'Módulo 3: Elaboración de Informes de Seguimiento e Incidencia',
        descripcion: 'Construcción de alertas tempranas e interlocución con entes de control.',
        duracionMin: 60
      }
    ]
  }
];
