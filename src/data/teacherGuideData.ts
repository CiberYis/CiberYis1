export interface SessionSegment {
  timeRange: string;
  durationMinutes: number;
  title: string;
  focus: string;
  instructorAction: string;
  apprenticeAction: string;
  evidenceProduct: string;
}

export interface PedagogicalAnalogy {
  concept: string;
  analogyTitle: string;
  story: string;
  pedagogicalTakeaway: string;
}

export interface RemediationStrategy {
  misconception: string;
  impactRate: string;
  rootCause: string;
  remediationAction: string;
}

export const SESSION_PLAN: SessionSegment[] = [
  {
    timeRange: '00:00 - 00:15',
    durationMinutes: 15,
    title: 'Apertura y Anclaje Cognitivo con Casos Reales',
    focus: 'Motivación y diagnóstico inicial del aprendiz.',
    instructorAction: 'Presentar el caso real del ataque a EPM Medellín (2022) y las campañas falsas de la DIAN. Plantear la pregunta detonante: "¿Qué harías si llegas a trabajar y todos los servidores de la empresa están bloqueados?".',
    apprenticeAction: 'Completar su Ficha del Aprendiz en la plataforma, debatir experiencias familiares con phishing y reconocer el rol del técnico como primer respondiente.',
    evidenceProduct: 'Registro inicial de Ficha de Caracterización en plataforma.'
  },
  {
    timeRange: '00:15 - 00:45',
    durationMinutes: 30,
    title: 'Conceptualización Técnica Rigurosa (10 Pilares)',
    focus: 'Diferenciación conceptual crítica: Amenaza vs. Vulnerabilidad, Tríada CID e ISO 27001.',
    instructorAction: 'Explicar los 10 pilares técnicos utilizando la "Voz del Instructor SENA". Erradicar activamente la confusión entre amenazas externas y fallas internas del activo.',
    apprenticeAction: 'Navegar por los módulos formativos, responder los 10 mini-retos interactivos y registrar los conceptos clave en el glosario personal.',
    evidenceProduct: 'Progreso del 100% en los 10 mini-checks conceptuales.'
  },
  {
    timeRange: '00:45 - 00:85',
    durationMinutes: 40,
    title: 'Laboratorios Prácticos y Simulación Forense en Vivo',
    focus: 'Experimentación empírica con variables matemáticas y forenses.',
    instructorAction: 'Supervisar el uso del Auditor Criptográfico de Contraseñas, el Inspector Forense de Phishing y la Calculadora Dinámica de Riesgo / Tríada CID. Desafiar a los aprendices a generar Passphrases de >75 bits.',
    apprenticeAction: 'Auditar contraseñas, probar el tiempo de descifrado en GPU RTX 4090, inspeccionar cabeceras SPF/DKIM y emitir dictámenes forenses fundamentados en IOCs.',
    evidenceProduct: 'Reporte de laboratorio interactivo completado.'
  },
  {
    timeRange: '00:85 - 01:10',
    durationMinutes: 25,
    title: 'Triaje Forense NIST SP 800-61 y Evaluación de Competencias',
    focus: 'Aplicación del marco de incidente y examen Saber Pro.',
    instructorAction: 'Guiar el triaje de los 3 casos colombianos (EPM, DIAN, USB Alcaldía). Habilitar la prueba de 10 reactivos situacionales Saber Pro.',
    apprenticeAction: 'Tomar decisiones de primer respondiente en las 4 fases (Identificación, Contención, Erradicación, Lecciones) y resolver el cuestionario técnico.',
    evidenceProduct: 'Calificación de Conocimiento (Examen) y Desempeño (Triaje).'
  },
  {
    timeRange: '01:10 - 02:00',
    durationMinutes: 10,
    title: 'Cierre, Emisión del Juicio Evaluativo y Portafolio SofíaPlus',
    focus: 'Formalización de competencias laborales SENA.',
    instructorAction: 'Revisar la rúbrica tripartita (Conocimiento, Desempeño, Producto). Emitir retroalimentación formativa y firmar digitalmente las actas.',
    apprenticeAction: 'Verificar su Juicio Evaluativo (Competente / Aún No Competente) y exportar/imprimir el Acta Oficial para su Portafolio de Evidencias en SofíaPlus.',
    evidenceProduct: 'Acta Oficial de Juicio Evaluativo firmada y descargada.'
  }
];

export const PEDAGOGICAL_ANALOGIES: PedagogicalAnalogy[] = [
  {
    concept: 'Amenaza vs. Vulnerabilidad',
    analogyTitle: 'La Casa, el Ladrón y la Ventana sin Seguro',
    story: 'Imagina que sales de tu casa y dejas la ventana del primer piso abierta de par en par. En el barrio hay delincuentes que caminan por la acera buscando casas para robar. El ladrón en la acera es la AMENAZA (existe afuera, no lo controlas). La ventana abierta es la VULNERABILIDAD (es tuya, está en tu casa). El RIESGO es la probabilidad de que el ladrón vea tu ventana y se lleve tus pertenencias. Ponerle reja a la ventana (control de seguridad) no desaparece a los ladrones del mundo, pero anula la vulnerabilidad y reduce el riesgo a cero.',
    pedagogicalTakeaway: 'No gastes tiempo intentando desaparecer todas las amenazas del internet mundial; concéntrate en cerrar y blindar tus vulnerabilidades internas.'
  },
  {
    concept: 'Seguridad de la Información vs. Ciberseguridad',
    analogyTitle: 'La Fotocopia del Examen en la Tienda Escolar',
    story: 'El profesor diseña el examen de grado 11 en un computador sin internet, con disco cifrado y clave de 20 caracteres (ciberseguridad impecable). Luego imprime 40 copias en papel, las lleva a la papelería de la esquina y deja una copia olvidada en la fotocopiadora. Diez minutos después, los estudiantes ya tienen las respuestas por WhatsApp. Los computadores nunca fueron hackeados, pero la Seguridad de la Información fracasó rotundamente en el medio físico.',
    pedagogicalTakeaway: 'La información tiene valor por su contenido, no por el cable donde viaja. Papel, memorias, pantallas y palabras son activos de información.'
  },
  {
    concept: 'El Mito del Candado HTTPS',
    analogyTitle: 'El Taxi Polarizado con Conductor Desconocido',
    story: 'Subirte a un taxi con vidrios oscuros blindados significa que nadie desde la acera puede ver qué llevas dentro (conexión cifrada / HTTPS). Pero si el conductor del taxi es un delincuente que te lleva a un descampado para asaltarte, los vidrios oscuros solo le ayudaron a él a cometer el delito sin que nadie lo viera. El candado protege el trayecto, ¡no garantiza la honestidad del chofer!',
    pedagogicalTakeaway: 'HTTPS protege de espías en la red Wi-Fi, pero no garantiza que la empresa dueña del sitio sea legítima.'
  },
  {
    concept: 'Regla 3-2-1 de Copias de Seguridad',
    analogyTitle: 'La Llave de Repuesto y el Incendio de la Casa',
    story: 'Si guardas tres copias de la llave de tu casa en el mismo llavero dentro de tu habitación, el día que la casa se incendie o pierdas el llavero, habrás perdido las tres copias al mismo tiempo. Por eso una copia debe estar en la casa de tu abuela en otro barrio (desconectada y remota).',
    pedagogicalTakeaway: 'Una copia de seguridad conectada en la misma máquina o red infectada por ransomware será destruida de inmediato.'
  }
];

export const REMEDIATION_STRATEGIES: RemediationStrategy[] = [
  {
    misconception: 'Creer que un puerto abierto o un software desactualizado es una "amenaza" cibernética.',
    impactRate: '70% de aprendices novatos',
    rootCause: 'Uso coloquial indiferenciado en los medios de comunicación que llaman a todo "amenaza".',
    remediationAction: 'Hacer el ejercicio de la Calculadora de Riesgo: mostrar que al mover el slider de "Vulnerabilidad" a cero, el riesgo desaparece aunque la "Amenaza" esté al 100%.'
  },
  {
    misconception: 'Creer que una clave de 8 caracteres con números y símbolos raros (ej. "T#9!x$") es más segura que una frase de 4 palabras en español.',
    impactRate: '65% de aprendices',
    rootCause: 'Reglas de portales web obsoletos de los años 2000 que no aplican NIST SP 800-63B.',
    remediationAction: 'Poner a competir ambas claves en el Auditor Criptográfico y mostrar que la frase de 24 caracteres requiere 500 millones de años frente a 2 horas de la clave de 8 caracteres.'
  },
  {
    misconception: 'Asumir que si un sitio tiene candado HTTPS no puede ser un fraude o phishing.',
    impactRate: '58% de aprendices',
    rootCause: 'Campañas publicitarias antiguas de navegadores que decían "Busque el candado verde para estar seguro".',
    remediationAction: 'Utilizar el Inspector Forense de Phishing con el correo de Bancolombia clonado para evidenciar que el certificado SSL es emitido gratis por atacantes.'
  },
  {
    misconception: 'Creer que solicitar Contraseña + PIN de 4 dígitos es Autenticación Multifactor (MFA).',
    impactRate: '52% de aprendices',
    rootCause: 'Confundir cantidad de pasos con multiplicidad de factores independientes.',
    remediationAction: 'Realizar la matriz de los 3 factores: ¿Sabes? ¿Tienes? ¿Eres? Si ambas respuestas caen en la columna "Sabes", no es MFA.'
  }
];
