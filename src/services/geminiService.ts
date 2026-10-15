import { NORMATIVA_NARP_SANTANDER } from '../data/normativaData';
import { ORGANIZACIONES_CIRCULAR_065 } from '../data/circular065Data';
import { SUBCOMISIONES_OFICIALES } from '../data/subcomisionesData';
import { CONVOCATORIAS_VIGENTES } from '../data/convocatoriasData';
import { PROYECTOS_BANCO_SANTANDER } from '../data/proyectosData';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citas?: { norma: string; articulo: string; texto: string }[];
  fuente?: string;
}

export async function askNexoAfroAI(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<{ text: string; citas?: { norma: string; articulo: string; texto: string }[]; source: string }> {
  // Preparamos el contexto RAG enriquecido del ecosistema de Santander
  const systemPrompt = `Eres NEXO AFRO IA, el asistente jurídico y territorial oficial del ecosistema "CONSULTIVO AFRO SANTANDER IA" (Versión 2.0 | Octubre de 2026).
Tu misión es orientar con máximo rigor técnico, constitucional y respeto intercultural a las comunidades negras, afrocolombianas, raizales y palenqueras (NARP) de los 87 municipios del departamento de Santander.

REGLAS ESTRICTAS DE RESPUESTA:
1. Basarse exclusivamente en normas oficiales colombianas: Constitución Política de 1991 (arts. 7, 13, 40, 70, 55 Transitorio), Ley 70 de 1993, Decreto 1745 de 1995, Decreto 1640 de 2020 (RPUN MinInterior), Decretos 1384, 1396, 1397, 1398 de 2023, Sentencia T-576 de 2014, Decreto Departamental 166 de 2018 y Circular 065 del 5 de octubre de 2026 de Santander (proceso PRO 2929074).
2. Diferenciar tajantemente entre:
   - Inscripción voluntaria en la plataforma vs. Reconocimiento/certificación oficial del Ministerio del Interior.
   - Delegados electorales de la Circular 065 vs. Consultivos elegidos y acreditados.
   - 25 organizaciones admitidas y 8 no admitidas de la Circular 065.
3. No inventar leyes, números de artículos ni datos censales inexistentes. Citar siempre las fuentes documentales.
4. Conocer las 7 subcomisiones temáticas de la Consultiva Departamental de Santander (SC-01 a SC-07).
5. Expresarse en tono institucional, cálido, dignificante y pedagógico.`;

  try {
    const formattedHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      text: h.content
    }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: userQuery,
        systemInstruction: systemPrompt,
        history: formattedHistory
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply && !data.fallback) {
        return {
          text: data.reply,
          source: 'Gemini 3.8 Flash (Servicio Oficial Server-Side)'
        };
      }
    }
  } catch (err) {
    console.warn('Network call to /api/chat had an issue, falling back to local grounded RAG engine', err);
  }

  // Grounded Local RAG fallback
  return generateGroundedRAGResponse(userQuery);
}

function generateGroundedRAGResponse(query: string): {
  text: string;
  citas?: { norma: string; articulo: string; texto: string }[];
  source: string;
} {
  const q = query.toLowerCase();

  // 1. Consulta sobre Barrancabermeja o Magdalena Medio
  if (q.includes('barrancabermeja') || q.includes('magdalena medio') || q.includes('puerto wilches')) {
    const orgsBca = ORGANIZACIONES_CIRCULAR_065.filter(o => 
      o.municipio.toLowerCase().includes('barrancabermeja') || 
      o.municipio.toLowerCase().includes('puerto wilches')
    );
    const admitidas = orgsBca.filter(o => o.estadoAdmisionCircular065 === 'Admitida');

    return {
      text: `En la subregión de Mares (Barrancabermeja y Puerto Wilches) se concentra la mayor presencia histórica y territorial de comunidades NARP en Santander:\n\n` +
        `• **Población estimada (DANE 2026):** En Barrancabermeja cerca del 20.47% (~43.500 hab.) y en Puerto Wilches 20.34% (~7.200 hab.) se autorreconocen como afrocolombianos.\n` +
        `• **Organizaciones admitidas en la Circular 065 de 2026:** Hay registradas ${admitidas.length} organizaciones admitidas para el proceso electoral, entre ellas:\n` +
        admitidas.slice(0, 4).map(o => `  - **${o.sigla}** (${o.nombre}) en ${o.municipio}, delegada/o: ${o.delegadoElectoral}`).join('\n') +
        `\n\n• **Consejos Comunitarios destacados:** Consejo Comunitario de la Cuenca del Río Sogamoso (CONCORPW), Consejo Comunitario Rural Río Colorado y Consejo Comunitario Ancestral del Río Opón.\n\n` +
        `*Nota de transparencia:* La inscripción electoral en la Circular 065 certifica cumplimiento de requisitos de postulación departamental según PRO 2929074.`,
      citas: [
        {
          norma: 'Circular N.º 065 de 2026 (PRO 2929074)',
          articulo: 'Anexo 1 - Postulaciones Admitidas',
          texto: 'Relación de 25 postulaciones habilitadas ante la Secretaría del Interior de Santander.'
        },
        {
          norma: 'Ley 70 de 1993',
          articulo: 'Capítulo III y V',
          texto: 'Protección de tierras rurales ribereñas, ciénagas y recursos naturales en comunidades negras.'
        }
      ],
      source: 'Motor Jurídico y Territorial Local RAG (Santander Oficial)'
    };
  }

  // 2. Consulta sobre Circular 065 o proceso electoral 2026
  if (q.includes('circular 065') || q.includes('circular') || q.includes('admitidas') || q.includes('no admitidas') || q.includes('eleccion') || q.includes('elección')) {
    return {
      text: `Conforme a la **Circular N.º 065 del 5 de octubre de 2026** (proceso PRO 2929074) de la Secretaría del Interior de la Gobernación de Santander:\n\n` +
        `1. **Postulaciones Admitidas (25 organizaciones):** Cumplieron la totalidad de requisitos exigidos (constancia de registro ante MinInterior, acta de asamblea de designación de delegado y documentación al día). Entre ellas destacan AFROCOLBARRANCA, CONCORPW, ASOCONAFRO-BGA, PALENQUE-FLORIDA, ASOCAFRO-GIRÓN, KWANZA-AFRO, ASOMUAFRO, CIMARRÓN-CIMITARRA, entre otras.\n\n` +
        `2. **Postulaciones No Admitidas (8 organizaciones):** No superaron el filtro formal por causales objetivas tipificadas en el anexo 2 (extemporaneidad en la radicación, duplicidad de delegados, inconsistencia en documentos de identidad o falta de acreditación estatutaria en vigor). Estas organizaciones se conservan en el expediente histórico con fines de debida trazabilidad y no son eliminadas del sistema.\n\n` +
        `*Principio de legalidad:* La condición de delegado postulado o admitido en la Circular 065 NO equivale automáticamente a ser consultivo elegido. La elección se define en la Asamblea Departamental convocada por la Gobernación.`,
      citas: [
        {
          norma: 'Circular N.º 065 del 5 de octubre de 2026',
          articulo: 'Anexos 1 y 2',
          texto: 'Resultados de verificación documental y cumplimiento de requisitos para la elección de consultivos departamentales de Santander.'
        }
      ],
      source: 'Motor Jurídico y Territorial Local RAG (Santander Oficial)'
    };
  }

  // 3. Consulta sobre Ley 70 de 1993 o Consejos Comunitarios
  if (q.includes('ley 70') || q.includes('propiedad colectiva') || q.includes('consejo comunitario') || q.includes('decreto 1745')) {
    return {
      text: `La **Ley 70 de 1993** es la carta magna de los derechos étnicos y territoriales de las comunidades negras en Colombia:\n\n` +
        `• **Propiedad Colectiva (Capítulo III y Decreto 1745/95):** Reconoce a los Consejos Comunitarios como personas jurídicas encargadas de administrar las tierras de titulación colectiva, las cuales son inalienables, imprescriptibles e inembargables.\n` +
        `• **Uso de Recursos Naturales (Capítulo IV):** Garantiza el aprovechamiento preferente y tradicional de los recursos forestales, pesqueros e hídricos.\n` +
        `• **Mecanismos de Fomento (Capítulo VI):** Obliga al Estado a disponer de fondos especiales de crédito condonable (como el fondo ICETEX) y fomento empresarial con enfoque diferencial.\n` +
        `• **Reglamentaciones de 2023:** Mediante los Decretos 1384 (Educación propia), 1396 (Fomento económico), 1397 (Titulación) y 1398 (Medio ambiente), se activaron capítulos históricamente pendientes de la Ley 70.`,
      citas: [
        {
          norma: 'Ley 70 de 1993',
          articulo: 'Artículos 1, 3, Capítulo III y VI',
          texto: 'Reconocimiento de la propiedad colectiva y mecanismos de fomento socioeconómico para comunidades negras.'
        },
        {
          norma: 'Decreto 1745 de 1995',
          articulo: 'Artículos 3 y 5',
          texto: 'Naturaleza jurídica de los Consejos Comunitarios y conformación de la Asamblea General y la Junta.'
        }
      ],
      source: 'Motor Jurídico y Territorial Local RAG (Santander Oficial)'
    };
  }

  // 4. Consulta sobre Subcomisiones
  if (q.includes('subcomision') || q.includes('subcomisiones') || q.includes('comision') || q.includes('comisión')) {
    return {
      text: `La Comisión Consultiva Departamental de Santander opera a través de **siete (7) subcomisiones sectoriales de trabajo técnico**:\n\n` +
        SUBCOMISIONES_OFICIALES.map(s => `• **${s.codigo}. ${s.nombre}:** Coordinada por ${s.coordinador}. Objetivo: ${s.objetivo.slice(0, 110)}...`).join('\n\n') +
        `\n\n*Nota:* Estas denominaciones corresponden a la estructura de concertación técnica departamental en armonía con el Decreto Departamental 166 de 2018 y las directrices de la Secretaría del Interior de Santander.`,
      citas: [
        {
          norma: 'Decreto Departamental 166 de 2018',
          articulo: 'Estructura Sectorial',
          texto: 'Conformación de comisiones de trabajo técnico de la Comisión Consultiva de Comunidades Negras de Santander.'
        }
      ],
      source: 'Motor Jurídico y Territorial Local RAG (Santander Oficial)'
    };
  }

  // 5. Consulta sobre inscripción de organizaciones
  if (q.includes('inscribir') || q.includes('registro') || q.includes('formulario') || q.includes('mininterior') || q.includes('rpun')) {
    return {
      text: `Para registrar una organización en el ecosistema **CONSULTIVO AFRO SANTANDER IA**:\n\n` +
        `1. **Inscripción Voluntaria e Incluyente:** Cualquier organización NARP con sede o actuación en Santander puede inscribirse a través del botón **"REGISTRE SU ORGANIZACIÓN NARP"** en el menú superior o en la ruta \`/organizaciones/registro\`.\n` +
        `2. **Distinción Registral:**\n` +
        `   - Si cuenta con Registro Público Único Nacional (RPUN) ante el Ministerio del Interior (Decreto 1640 de 2020), podrá anexar el número y soporte de resolución.\n` +
        `   - Si NO cuenta con registro nacional, podrá inscribirse igualmente como organización de base comunitaria en proceso de fortalecimiento.\n` +
        `3. **Estructura del Formulario (Secciones A a G):**\n` +
        `   - A. Identificación (Nombre, sigla, tipo)\n` +
        `   - B. Ubicación (Municipio de Santander, provincia, ámbito de actuación)\n` +
        `   - C. Situación registral (Resolución MinInterior si aplica)\n` +
        `   - D. Actividad organizativa (Líneas de trabajo, población atendida)\n` +
        `   - E. Contacto institucional autorizado\n` +
        `   - F. Documentos de soporte (PDF)\n` +
        `   - G. Autorización de tratamiento de datos personales (Ley 1581 de 2012).\n\n` +
        `*Garantía institucional:* La inscripción en la plataforma no suple el registro legal ante el Ministerio del Interior ni confiere personerías jurídicas públicas, sino que garantiza inclusión en el directorio y observatorio departamental.`,
      citas: [
        {
          norma: 'Decreto 1640 de 2020',
          articulo: 'Art. 2.5.1.2.1.2',
          texto: 'Registro Público Único Nacional de Consejos Comunitarios y Organizaciones de Base NARP.'
        },
        {
          norma: 'Ley 1581 de 2012',
          articulo: 'Artículos 5 y 6',
          texto: 'Protección reforzada para datos sensibles con pertenencia étnica.'
        }
      ],
      source: 'Motor Jurídico y Territorial Local RAG (Santander Oficial)'
    };
  }

  // 6. Consulta sobre proyectos o MGA
  if (q.includes('proyecto') || q.includes('mga') || q.includes('formular') || q.includes('regalias') || q.includes('regalías')) {
    return {
      text: `El módulo **AFROPROYECTA IA** apoya a las organizaciones y subcomisiones en la formulación de proyectos bajo la Metodología General Ajustada (MGA) del DNP:\n\n` +
        `• **Proyectos actualmente en el Banco Departamental:**\n` +
        PROYECTOS_BANCO_SANTANDER.map(p => `  - *${p.titulo}* (${p.municipio}) | Estado: **${p.estado}** | Presupuesto: $${(p.presupuestoEstimado / 1000000).toFixed(0)}M COP`).join('\n') +
        `\n\n• **Pasos Clave para Formular:**\n` +
        `  1. Diagnóstico y Árbol de Problemas (causa raíz en el territorio santandereano).\n` +
        `  2. Árbol de Objetivos y Cadena de Valor (Insumos -> Actividades -> Productos -> Resultados).\n` +
        `  3. Presupuesto discriminado y fuentes viables (Sistema General de Regalías, Fondo de Comunidades Negras, MinIgualdad).\n` +
        `  4. Matriz de riesgos y plan de sostenibilidad comunitaria.`,
      citas: [
        {
          norma: 'Decreto 1396 de 2023',
          articulo: 'Fomento Productivo',
          texto: 'Financiamiento y estructuración de proyectos de fomento para organizaciones de base afrodescendientes.'
        }
      ],
      source: 'Motor Jurídico y Territorial Local RAG (Santander Oficial)'
    };
  }

  // 7. Consulta sobre convocatorias o financiación
  if (q.includes('convocatoria') || q.includes('beca') || q.includes('fondo') || q.includes('icetex') || q.includes('plata')) {
    return {
      text: `En el módulo **AFROCONVOCA IA** se identifican convocatorias oficiales vigentes con enfoque étnico:\n\n` +
        CONVOCATORIAS_VIGENTES.map(c => `• **${c.titulo}**\n  - Entidad: ${c.entidad}\n  - Monto: ${c.montoMaximo}\n  - Cierre: ${c.fechaCierre} (${c.estado})\n  - Enlace oficial: ${c.enlaceOficial}`).join('\n\n') +
        `\n\n*Recomendación:* El sistema permite evaluar la elegibilidad de tu organización según sus estatutos, experiencia previa y vigencia registral.`,
      citas: [
        {
          norma: 'Convocatorias Oficiales Nacionales',
          articulo: 'Términos de Referencia 2026',
          texto: 'Bases y requisitos de postulación para programas de concertación cultural, fondos ICETEX y MinIgualdad.'
        }
      ],
      source: 'Motor Jurídico y Territorial Local RAG (Santander Oficial)'
    };
  }

  // 8. Respuesta general orientadora
  return {
    text: `Bienvenido a **NEXO AFRO IA**, el asistente inteligente del ecosistema **CONSULTIVO AFRO SANTANDER IA**.\n\nPuedo orientarte con precisión jurídica y documental sobre:\n\n` +
      `1. **Normativa y Derechos Étnicos:** Ley 70 de 1993, Consulta Previa (Convenio 169 OIT y Sentencia T-576/14), decretos reglamentarios de 2023 y Ley 1581 (Habeas Data).\n` +
      `2. **Directorio y Proceso Electoral de Santander:** 25 organizaciones admitidas y 8 no admitidas de la Circular 065 del 5 de octubre de 2026 (Secretaría del Interior).\n` +
      `3. **Las 7 Subcomisiones Temáticas:** Derechos humanos, educación, salud, desarrollo económico, territorio y medio ambiente, cultura y participación.\n` +
      `4. **Formulación de Proyectos (AfroProyecta IA):** Metodología MGA, árbol de problemas, cadena de valor y fuentes del Sistema General de Regalías (SGR).\n` +
      `5. **Inscripción de Organizaciones:** Cómo registrar una organización con o sin Registro Público Único Nacional (RPUN) del Ministerio del Interior.\n\n` +
      `¿En qué tema específico deseas profundizar para la gestión de tu comunidad?`,
    citas: [
      {
        norma: 'Constitución Política de 1991',
        articulo: 'Artículos 7 y 55 Transitorio',
        texto: 'Reconocimiento y protección constitucional a la diversidad étnica y derechos colectivos de las comunidades negras.'
      }
    ],
    source: 'Motor Jurídico y Territorial Local RAG (Santander Oficial)'
  };
}
