export type RegistralMinInteriorStatus = 
  | 'Verificado con RPUN'
  | 'Reportado, pendiente de verificación'
  | 'Sin registro declarado'
  | 'En trámite declarado'
  | 'No admitido en Circular 065'
  | 'Desconocido';

export type InscripcionPlataformaStatus = 
  | 'Validada'
  | 'En revisión'
  | 'Solicitud recibida'
  | 'Requiere subsanación'
  | 'Rechazada con justificación'
  | 'Inactiva'
  | 'Histórico electoral';

export type CategoriaOrganizacion = 
  | 'Consejo Comunitario'
  | 'Organización de Base'
  | 'Formas y Expresiones Organizativas'
  | 'Asociación Afrodescendiente'
  | 'Corporación'
  | 'Fundación'
  | 'Colectivo Cultural'
  | 'Red de Mujeres Afro'
  | 'Organización Juvenil'
  | 'Asociación Productiva'
  | 'Organización Comunitaria Rural';

export interface OrganizacionNARP {
  id: string;
  filaCircular065?: number;
  nombre: string;
  sigla: string;
  municipio: string;
  provincia: string;
  categoria: CategoriaOrganizacion;
  estadoMinInterior: RegistralMinInteriorStatus;
  estadoInscripcion: InscripcionPlataformaStatus;
  numeroResolucion?: string;
  fechaResolucion?: string;
  delegadoElectoral?: string;
  estadoAdmisionCircular065?: 'Admitida' | 'No admitida';
  causalRechazoCircular065?: string;
  coordenadasAproximadas: { lat: number; lng: number };
  contactoInstitucional: {
    correo?: string;
    telefono?: string;
    direccionSede?: string;
  };
  descripcion: string;
  lineasAccion: string[];
  miembrosAproximados?: number;
  subcomisionRelacionada?: string;
  fechaRegistro: string;
  fuenteDocumental: string;
}

export interface ConsultivoAcreditado {
  id: string;
  nombre: string;
  organizacion: string;
  municipio: string;
  provincia: string;
  calidadRepresentacion: 'Principal' | 'Suplente' | 'Secretaría Técnica' | 'Delegado Municipal';
  periodo: string;
  estadoEjercicio: 'En ejercicio' | 'Postulado' | 'Suplencia' | 'Cierre de período';
  subcomisiones: string[];
  responsabilidades: string[];
  fechaEleccion: string;
  actoAcreditacion: string;
  fotoUrl?: string;
  participacionPorcentaje: number;
}

export interface Subcomision {
  codigo: string;
  nombre: string;
  fundamento: string;
  coordinador: string;
  secretario: string;
  integrantesCount: number;
  integrantesNombres: string[];
  objetivo: string;
  proyectosActivos: number;
  compromisosPendientes: number;
  compromisosCumplidos: number;
  sesionesRealizadas: number;
  planTrabajo2026: string[];
}

export interface SesionConsultiva {
  id: string;
  numero: string;
  fecha: string;
  lugar: string;
  tipo: 'Ordinaria' | 'Extraordinaria' | 'Mesa Técnica';
  ordenDelDia: string[];
  quorumVerificado: boolean;
  asistentesCount: number;
  totalConsultivos: number;
  actaUrl?: string;
  estado: 'Convocada' | 'Realizada' | 'Acta en revisión' | 'Acta aprobada';
  principalesAcuerdos: string[];
}

export interface NormaJuridica {
  id: string;
  identificador: string;
  autoridad: string;
  numeroYFecha: string;
  objeto: string;
  articulosClave: { articulo: string; contenido: string }[];
  ambito: string;
  estadoVigencia: 'Vigente' | 'Reglamentada parcialmente' | 'Pendiente de verificación jurídica' | 'Histórica';
  jurisprudenciaRelacionada?: string;
  enlaceOficial: string;
  fechaConsulta: string;
}

export interface ProyectoNARP {
  id: string;
  codigoBpin?: string;
  titulo: string;
  subcomision: string;
  municipio: string;
  provincia: string;
  entidadProponente: string;
  estado: 'Idea' | 'Formulación MGA' | 'Viabilidad técnica' | 'En ejecución' | 'Finalizado';
  presupuestoEstimado: number;
  fuenteFinanciacion: 'Regalías (SGR)' | 'Presupuesto Departamental' | 'MinIgualdad' | 'Cooperación Internacional' | 'Fondo Étnico';
  poblacionBeneficiaria: number;
  resumenProblema: string;
  objetivoGeneral: string;
  fechaRadicacion: string;
}

export interface IndicadorTerritorial {
  id: string;
  nombre: string;
  municipio: string;
  provincia: string;
  valor: number | string;
  unidad: string;
  fuente: string;
  fechaMedicion: string;
  poblacionReferencia: string;
  limitaciones: string;
  categoria: 'Demografía' | 'Educación' | 'Salud' | 'Vivienda y Servicios' | 'Empleo e Ingresos' | 'Víctimas';
}

export interface ConvocatoriaOportunidad {
  id: string;
  entidad: string;
  titulo: string;
  categoria: 'Cultura' | 'Educación y Becas' | 'Emprendimiento' | 'Desarrollo Comunitario' | 'Cooperación Internacional';
  montoMaximo: string;
  fechaCierre: string;
  estado: 'Abierta' | 'Próximo cierre' | 'Cerrada';
  requisitosClave: string[];
  enlaceOficial: string;
  dirigidoA: string;
}

export interface PatrimonioElemento {
  id: string;
  nombre: string;
  categoria: 'Música y Danza' | 'Gastronomía' | 'Tradición Oral y Memoria' | 'Saberes Ancestrales' | 'Festividades';
  municipio: string;
  descripcion: string;
  comunidadPortadora: string;
  consentimientoInformado: boolean;
  galeria?: string[];
  audioVisualUrl?: string;
}

export interface CursoEduca {
  id: string;
  titulo: string;
  duracionHoras: number;
  modulosCount: number;
  nivel: 'Introductorio' | 'Intermedio' | 'Avanzado';
  descripcion: string;
  instructor: string;
  modulos: {
    titulo: string;
    descripcion: string;
    duracionMin: number;
  }[];
}

export interface CompromisoControlSocial {
  id: string;
  entidadResponsable: string;
  compromiso: string;
  fuenteDocumental: string;
  fechaPactada: string;
  fechaLimite: string;
  estado: 'Cumplido' | 'En ejecución' | 'Vencido o incumplido' | 'Sin información suficiente';
  evidencia?: string;
  observaciones: string;
}
