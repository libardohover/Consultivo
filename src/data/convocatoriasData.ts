import { ConvocatoriaOportunidad } from '../types';

export const CONVOCATORIAS_VIGENTES: ConvocatoriaOportunidad[] = [
  {
    id: 'conv-01',
    entidad: 'Ministerio de las Culturas, las Artes y los Saberes (MinCulturas)',
    titulo: 'Programa Nacional de Concertación y Estímulos Étnicos 2026',
    categoria: 'Cultura',
    montoMaximo: 'Hasta $80.000.000 COP por proyecto',
    fechaCierre: '2026-11-15',
    estado: 'Abierta',
    requisitosClave: [
      'Organización sin ánimo de lucro o Consejo Comunitario constituido',
      'Mínimo 1 año de experiencia demostrable en actividades culturales',
      'RUT actualizado y certificación bancaria a nombre de la entidad',
      'Propuesta enfocada en memoria, tradición oral o música de comunidades NARP'
    ],
    enlaceOficial: 'https://estimulos.mincultura.gov.co',
    dirigidoA: 'Consejos comunitarios, colectivos de tambora, redes de mujeres y fundaciones culturales de Santander'
  },
  {
    id: 'conv-02',
    entidad: 'Ministerio de Igualdad y Equidad (MinIgualdad)',
    titulo: 'Fondo de Fortalecimiento a la Autonomía Económica de Mujeres Negras y Afrocolombianas',
    categoria: 'Emprendimiento',
    montoMaximo: 'Hasta $120.000.000 COP para capital semilla asociativo',
    fechaCierre: '2026-11-30',
    estado: 'Abierta',
    requisitosClave: [
      'Organización o red integrada mayoritariamente por mujeres afrocolombianas (mínimo 70%)',
      'Plan de negocio formulado o unidad productiva con ventas activas',
      'Registro en la plataforma o personería jurídica comunitaria',
      'Impacto en municipios PDET o de alta vulnerabilidad'
    ],
    enlaceOficial: 'https://minigualdad.gov.co/convocatorias-etnicas',
    dirigidoA: 'Asociaciones de mujeres como ASOMUAFRO, KWANZA-AFRO y colectivos de transformación agroalimentaria'
  },
  {
    id: 'conv-03',
    entidad: 'ICETEX - Ministerio del Interior',
    titulo: 'Fondo Especial de Créditos Condonables para Comunidades Negras (Segundo Semestre 2026 / 2027)',
    categoria: 'Educación y Becas',
    montoMaximo: 'Matrícula 100% y sostenimiento de 3 SMMLV por semestre',
    fechaCierre: '2026-10-31',
    estado: 'Próximo cierre',
    requisitosClave: [
      'Pertenecer a la comunidad negra, afrocolombiana, raizal o palenquera',
      'Aval expedido por una organización NARP con Registro del MinInterior',
      'Proyecto comunitario de trabajo social aprobado por la organización avalista',
      'Estar admitido en programa de pregrado o posgrado en universidad reconocida'
    ],
    enlaceOficial: 'https://portal.icetex.gov.co/Portal/Home/Home/fondos-en-administracion/comunidades-negras',
    dirigidoA: 'Estudiantes afrocolombianos de Santander matriculados en pregrado o posgrado'
  },
  {
    id: 'conv-04',
    entidad: 'SENA - Fondo Emprender Étnico',
    titulo: 'Línea Especial Comunidades Negras y Afrodescendientes para Proyectos Productivos',
    categoria: 'Emprendimiento',
    montoMaximo: 'Hasta $100.000.000 COP condonables',
    fechaCierre: '2026-12-15',
    estado: 'Abierta',
    requisitosClave: [
      'Ser mayor de edad y pertenecer a la población NARP',
      'Estar certificado por el SENA o contar con título técnico/profesional',
      'Formular el plan de negocio con la Unidad de Emprendimiento SENA Regional Santander',
      'Generación mínima de 3 empleos directos'
    ],
    enlaceOficial: 'https://www.fondoemprender.com',
    dirigidoA: 'Emprendedores agroindustriales, pesqueros, turísticos y tecnológicos afro en Santander'
  },
  {
    id: 'conv-05',
    entidad: 'Agencia Española de Cooperación Internacional para el Desarrollo (AECID)',
    titulo: 'Subvenciones para Protección Ambiental y Derechos Territoriales en la Cuenca del Río Magdalena',
    categoria: 'Cooperación Internacional',
    montoMaximo: 'Hasta €65.000 Euros',
    fechaCierre: '2027-01-20',
    estado: 'Abierta',
    requisitosClave: [
      'Alianza entre consejos comunitarios y ONG con trayectoria internacional',
      'Enfoque de gobernanza biocultural y protección de humedales',
      'Auditoría externa y cuentas bancarias debidamente certificadas'
    ],
    enlaceOficial: 'https://www.aecid.org.co',
    dirigidoA: 'Consejos comunitarios de la cuenca baja del río Sogamoso y ciénagas del Magdalena Medio'
  }
];
