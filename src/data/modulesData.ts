import { PillarModule } from '../types';

export const PILLAR_MODULES: PillarModule[] = [
  {
    id: 1,
    title: '¿Qué es Ciberseguridad?',
    shortDescription: 'Definición formal, ámbito del ciberespacio y protección integral de activos digitales e infraestructuras críticas.',
    category: 'Fundamentos',
    iconName: 'ShieldCheck',
    theory: {
      definition: 'La ciberseguridad es la disciplina técnico-estratégica encargada de proteger los sistemas conectados a redes, infraestructuras de procesamiento, dispositivos de punto final (endpoints) y datos digitales contra accesos no autorizados, ataques maliciosos, alteración deliberada y sabotaje.',
      keyPoints: [
        'Ciberespacio como dominio operacional: Redes, internet, sistemas en la nube y dispositivos IoT.',
        'Activos a proteger: Datos en reposo (almacenamiento), datos en tránsito (redes) y datos en uso (memoria/procesamiento).',
        'Postura defensiva integral: Defensa en profundidad (Defence-in-Depth) con capas físicas, de red, de host y de aplicación.',
        'Evolución de amenazas: Desde virus recreativos de los años 90 hasta cibercrimen organizado y ciberguerra patrocinada por estados.'
      ],
      technicalDeepDive: 'Según el marco NIST CSF (Cybersecurity Framework 2.0), la ciberseguridad no es un producto que se instala, sino un ciclo continuo estructurado en 6 funciones: Gobernar (Govern), Identificar (Identify), Proteger (Protect), Detectar (Detect), Responder (Respond) y Recuperar (Recover).'
    },
    instructorVoice: {
      anecdote: 'En mis 20 años formando técnicos en Colombia, he visto a cientos de empresas pensar que "ciberseguridad" era solo comprar un antivirus de 50.000 pesos y olvidarse. Cuando una fábrica de textiles en Medellín sufrió un bloqueo total de su base de datos, el gerente me dijo: "¡Pero si teníamos antivirus!". Lo que no tenían era control de accesos, copias desconectadas ni personal capacitado.',
      industryWarning: 'Un fallo de ciberseguridad moderno no apaga una pantalla con una calavera; opera en silencio durante un promedio de 204 días (tiempo de permanencia o Dwell Time) antes de que la víctima se entere de la filtración.',
      ruleOfThumb: 'La seguridad no es un estado absoluto; es la gestión calculada del riesgo hasta un nivel tolerable para la organización.'
    },
    colombianContext: 'En Colombia, el CONPES 3995 de 2020 define la Política Nacional de Confianza y Seguridad Digital, asignando al CSIRT de la Policía Nacional (cc-csirt.policia.gov.co) y al ColCERT la coordinación de incidentes en infraestructura crítica nacional.',
    glossary: [
      { term: 'Endpoint', definition: 'Cualquier dispositivo final que se conecta a una red (PC, servidor, smartphone, sensor IoT).' },
      { term: 'Dwell Time', definition: 'Tiempo que un atacante pasa dentro de la red corporativa sin ser detectado.' },
      { term: 'Defensa en Profundidad', definition: 'Estrategia de seguridad que implementa múltiples capas superpuestas de control defensivo.' }
    ],
    quickCheck: {
      question: '¿Cuál de las siguientes afirmaciones define con mayor precisión técnica el alcance de la ciberseguridad?',
      options: [
        'Es la instalación obligatoria de software antivirus en todas las computadoras de una oficina.',
        'Es la práctica de proteger sistemas conectados, redes, programas y datos en el ciberespacio contra ciberataques mediante un modelo de defensa en profundidad.',
        'Es un conjunto de leyes penales para encarcelar a hackers sin intervenir en la infraestructura técnica.',
        'Es la configuración exclusiva de contraseñas de más de 8 caracteres con números.'
      ],
      correctIndex: 1,
      explanation: 'La ciberseguridad abarca personas, procesos y tecnologías para salvaguardar activos en el ciberespacio aplicando múltiples capas defensivas.'
    }
  },
  {
    id: 2,
    title: 'Amenazas vs. Vulnerabilidades',
    shortDescription: 'Erradicación de la confusión conceptual clásica del 70% de aprendices y cálculo formal del riesgo.',
    category: 'Gestión de Riesgo',
    iconName: 'AlertTriangle',
    theory: {
      definition: 'La AMENAZA es cualquier circunstancia, actor externo o evento con el potencial de causar daño intencional o accidental a un activo. La VULNERABILIDAD es una debilidad, fallo o brecha interna en el diseño, implementación, configuración o procedimiento que puede ser aprovechada por la amenaza.',
      keyPoints: [
        'Diferencia cardinal: La amenaza EXISTE afuera (un grupo cibercriminal, un terremoto, un script kiddie). La vulnerabilidad ESTÁ adentro (un puerto abierto sin parchear, una contraseña débil, un empleado sin capacitar).',
        'Ecuación Fundamental del Riesgo: Riesgo = (Amenaza × Vulnerabilidad × Impacto) / Controles.',
        'Exploit: Es el fragmento de código, técnica o herramienta que materializa el ataque aprovechando la vulnerabilidad.',
        'No puedes eliminar todas las amenazas externas, pero SÍ puedes mitigar y cerrar las vulnerabilidades internas con controles.'
      ],
      technicalDeepDive: 'En bases de datos de vulnerabilidades internacionales como CVE (Common Vulnerabilities and Exposures) y NVD (National Vulnerability Database), las vulnerabilidades reciben una puntuación CVSS (Common Vulnerability Scoring System) del 0.0 al 10.0 según su explotabilidad e impacto.'
    },
    instructorVoice: {
      anecdote: 'En los exámenes Saber Pro y pruebas SENA, 7 de cada 10 aprendices marcan que un puerto 3389 (RDP) expuesto en internet es una "amenaza". ¡Grave error! El puerto abierto sin autenticación es la VULNERABILIDAD; los atacantes escaneando internet con Shodan son la AMENAZA. Si no dominas esta diferencia, jamás redactarás un informe técnico creíble ante un cliente o un oficial de seguridad.',
      industryWarning: 'Gastar millones en firewalls no sirve de nada si dejas la contraseña predeterminada "admin/admin" en un router; la vulnerabilidad anula cualquier defensa perimetral.',
      ruleOfThumb: 'Amenaza = El ladrón rondando la calle. Vulnerabilidad = Dejar la puerta de la casa sin cerrojo. Riesgo = La probabilidad de que te roben las joyas.'
    },
    colombianContext: 'En los juzgados y alcaldías de Colombia, la mayoría de incidentes ocurren por vulnerabilidades conocidas no corregidas (sistemas Windows 7 o servidores desactualizados sin parches de hace 4 años), aprovechadas por amenazas de ransomware automatizado.',
    glossary: [
      { term: 'CVE', definition: 'Identificador estandarizado mundial para fallos y vulnerabilidades de seguridad conocidas.' },
      { term: 'Exploit', definition: 'Software o secuencia de comandos diseñada para tomar ventaja de una vulnerabilidad específica.' },
      { term: 'Zero-Day (Día Cero)', definition: 'Vulnerabilidad desconocida por el fabricante para la cual aún no existe un parche de seguridad disponible.' }
    ],
    quickCheck: {
      question: 'Un servidor web en una institución educativa tiene un software Apache con una versión de hace 3 años que permite inyección SQL. Un grupo de hackers rusos está escaneando servidores escolares. ¿Cuál es la vulnerabilidad?',
      options: [
        'El grupo de hackers rusos que escanea la red.',
        'El software Apache desactualizado con fallo de inyección SQL en el servidor.',
        'La conexión de fibra óptica contratada por el colegio.',
        'El dinero que cobra el grupo de hackers por no filtrar las notas.'
      ],
      correctIndex: 1,
      explanation: 'El software desactualizado con el fallo es la debilidad interna del activo (Vulnerabilidad). Los hackers rusos constituyen el agente externo (Amenaza).'
    }
  },
  {
    id: 3,
    title: 'Seguridad de la Información vs. Ciberseguridad & ISO 27001',
    shortDescription: 'Alcance holístico del SGSI, protección de medios físicos, documentos en papel y normativa ISO/IEC 27001.',
    category: 'Gobernanza y Normas',
    iconName: 'FileText',
    theory: {
      definition: 'La Seguridad de la Información (InfoSec) es el paraguas holístico que protege la información en CUALQUIER formato (digital, impreso en papel, verbal o audiovisual). La Ciberseguridad es el subconjunto especializado enfocado exclusivamente en los activos digitales dentro del ciberespacio.',
      keyPoints: [
        'Alcance de ISO/IEC 27001: Establece los requisitos para implementar un Sistema de Gestión de Seguridad de la Información (SGSI).',
        'Seguridad Física: Destructoras de papel (trituración cruzada DIN 66399), control biométrico en cuartos de servidores (CPD), política de escritorio limpio y pantallas bloqueadas.',
        'Ciclo PHVA: Planificar, Hacer, Verificar, Actuar para la mejora continua de la seguridad.',
        'Anexo A de ISO 27001:2022: Organiza 93 controles agrupados en 4 temas: Organizacionales (37), Personas (8), Físicos (14) y Tecnológicos (34).'
      ],
      technicalDeepDive: 'Si un empleado imprime el listado de cédulas y salarios de toda la empresa y lo deja olvidado en la bandeja de la fotocopiadora comunitaria, es un fallo gravísimo de Seguridad de la Información (violación de confidencialidad física), aunque la red no haya sufrido ningún ciberataque.'
    },
    instructorVoice: {
      anecdote: 'Una vez auditamos una entidad financiera en Bogotá. Tenían firewalls de última generación y cifrado TLS 1.3. Sin embargo, bajamos al cuarto de basura y encontramos en bolsas negras estados de cuenta bancarios de clientes listos para ser reciclados sin triturar. Eso costó una sanción multimillonaria de la Superintendencia de Industria y Comercio (SIC). La seguridad de la información nunca es solo de computadores.',
      industryWarning: 'No confundas el SGSI con un manual que se guarda en una carpeta. Un SGSI auditable requiere evidencias constantes de gestión de incidentes y revisiones de la alta dirección.',
      ruleOfThumb: 'Toda la ciberseguridad es seguridad de la información, pero no toda la seguridad de la información es ciberseguridad.'
    },
    colombianContext: 'En Colombia, la Ley 1581 de 2012 (Habeas Data) y la Circular Única de la SIC obligan a todas las personas jurídicas a registrar sus bases de datos (RNBD) y demostrar medidas efectivas de seguridad de la información para evitar sanciones de hasta 2.000 SMMLV.',
    glossary: [
      { term: 'SGSI', definition: 'Sistema de Gestión de Seguridad de la Información estructurado bajo la norma ISO/IEC 27001.' },
      { term: 'Política de Pantallas Limpias', definition: 'Obligación de bloquear la sesión del ordenador al levantarse del puesto de trabajo.' },
      { term: 'Habeas Data', definition: 'Derecho fundamental a conocer, actualizar y rectificar la información personal en bases de datos.' }
    ],
    quickCheck: {
      question: '¿Cuál de los siguientes escenarios representa un incidente de Seguridad de la Información pero NO estrictamente de Ciberseguridad?',
      options: [
        'Un ataque de denegación de servicio (DDoS) contra el servidor web de la alcaldía.',
        'El robo físico de una carpeta con historias clínicas impresas dejada sobre un escritorio desatendido.',
        'La infección de un equipo con ransomware mediante un correo de phishing.',
        'La inyección SQL en la base de datos de matrículas del colegio.'
      ],
      correctIndex: 1,
      explanation: 'El expediente impreso en papel no pertenece al ciberespacio, pero es un activo crítico de información cubierto por la Seguridad de la Información y la norma ISO 27001.'
    }
  },
  {
    id: 4,
    title: 'Confidencialidad, Integridad y Disponibilidad (Tríada CID)',
    shortDescription: 'Los 3 pilares supremos de la seguridad de la información y su balance estratégico en sistemas reales.',
    category: 'Fundamentos',
    iconName: 'Scale',
    theory: {
      definition: 'La Tríada CID (Confidencialidad, Integridad y Disponibilidad) es el modelo conceptual que define los tres objetivos fundamentales de cualquier control o política de seguridad de la información.',
      keyPoints: [
        'Confidencialidad: Garantizar que la información sea accesible ÚNICAMENTE por personas, entidades o procesos debidamente autorizados (Controles: Cifrado AES-256, RBAC, DLP).',
        'Integridad: Salvaguardar la exactitud, completitud y veracidad de la información y sus métodos de procesamiento, previniendo modificaciones no autorizadas (Controles: Hashing SHA-256, firmas digitales, checksums).',
        'Disponibilidad: Garantizar que los usuarios legítimos tengan acceso oportuno e ininterrumpido a los datos y servicios cuando los requieran (Controles: Redundancia, alta disponibilidad, backups, balanceadores de carga).',
        'El dilema del balance: Máxima confidencialidad puede entorpecer la disponibilidad; disponibilidad absoluta sin controles destruye la confidencialidad.'
      ],
      technicalDeepDive: 'En un hospital de urgencias, la Disponibilidad del sistema de signos vitales prima sobre la confidencialidad de 5 factores de contraseña. En un banco de pagos internacionales, la Integridad y Confidencialidad de la transacción financiera son innegociables.'
    },
    instructorVoice: {
      anecdote: 'Durante un ciberataque a una empresa de acueducto, los ingenieros desconectaron todos los cables de red para salvar la confidencialidad de los datos. Lograron que nadie robara un archivo, pero dejaron sin agua potable a 400.000 personas durante 36 horas porque los sistemas SCADA de bombeo perdieron la Disponibilidad. El aprendiz debe comprender que "desconectar todo" no siempre es la respuesta profesional.',
      industryWarning: 'La integridad suele ser el pilar más peligroso cuando se vulnera: un atacante que altera silenciosamente los saldos bancarios o las notas académicas causa más caos que quien simplemente borra la base de datos.',
      ruleOfThumb: 'Identifica cuál pilar es vital para el negocio antes de diseñar los controles técnicos.'
    },
    colombianContext: 'El fallo de la plataforma de la Registraduría Nacional durante preconteos electorales vulnera la Disponibilidad; la alteración de un acta E-14 vulnera la Integridad; y la filtración de la base de datos del censo vulnera la Confidencialidad.',
    glossary: [
      { term: 'Hash Criptográfico', definition: 'Función unidireccional matemática que genera una huella digital única (ej. SHA-256) para verificar integridad.' },
      { term: 'RBAC', definition: 'Control de acceso basado en roles (Role-Based Access Control) que restringe permisos según el cargo del usuario.' },
      { term: 'RTO / RPO', definition: 'Objetivos de tiempo y punto de recuperación que miden la tolerancia al impacto en disponibilidad.' }
    ],
    quickCheck: {
      question: 'Un ciberatacante altera discretamente los números de cuenta bancaria de destino en la base de datos de nómina antes de procesar el pago. ¿Qué pilar de la Tríada CID ha sido comprometido de forma directa?',
      options: [
        'Disponibilidad',
        'Confidencialidad',
        'Integridad',
        'No Repudio'
      ],
      correctIndex: 2,
      explanation: 'La modificación no autorizada e indebida de los datos altera su exactitud y fidelidad original, lo cual es una violación directa del pilar de Integridad.'
    }
  },
  {
    id: 5,
    title: 'Contraseñas Seguras y Entropía (NIST SP 800-63B)',
    shortDescription: 'Cálculo matemático de entropía en bits, mitos de caducidad forzada y el poder de las frases de contraseña (Passphrases).',
    category: 'Criptografía y Autenticación',
    iconName: 'KeyRound',
    theory: {
      definition: 'La robustez de un secreto de autenticación no depende de reglas complejas artificiales (como cambiar letras por números obvios como P@$$w0rd), sino de su ENTROPÍA matemáticamente calculada en bits, la cual mide el grado de incertidumbre y el espacio de búsqueda que un atacante debe explorar.',
      keyPoints: [
        'Fórmula de Entropía: H = L × log2(R), donde L es la longitud en caracteres y R es el tamaño del conjunto de caracteres posibles.',
        'La Longitud vence a la Complejidad: Una frase de 4 palabras en español como "Caballo-Laguna-Granito-Sol42" tiene más de 75 bits de entropía real y es inmune a ataques de diccionario.',
        'Revolución NIST SP 800-63B: Elimina la obligación de cambiar contraseñas cada 30 o 60 días (lo cual fomenta patrones predecibles) y prioriza verificar contra listas de contraseñas ya filtradas.',
        'Almacenamiento Seguro: Las contraseñas NUNCA se guardan en texto plano ni con cifrado reversible; se almacenan usando funciones lentas de hashing con sal (Salt) como Argon2id, bcrypt o PBKDF2.'
      ],
      technicalDeepDive: 'Una contraseña como "Tr0b4dor!" tiene 9 caracteres y puede ser descifrada por un rig de 8 tarjetas GPU RTX 4090 en menos de 10 minutos. Una frase de contraseña de 24 caracteres requiere billones de años con la tecnología actual.'
    },
    instructorVoice: {
      anecdote: 'Recuerdo una entidad gubernamental donde la política obligaba a cambiar la clave cada 30 días con mayúscula, minúscula, número y símbolo. ¿Qué hacían los funcionarios? Ponían "Colombia.01", al mes siguiente "Colombia.02", y al mes siguiente "Colombia.03", ¡y lo pegaban en un post-it amarillo en el monitor! El estándar NIST demostró que las políticas absurdas fomentan comportamientos inseguros.',
      industryWarning: 'Sustituir la "a" por "@" o la "e" por "3" está programado en todos los diccionarios de ataque de herramientas como Hashcat y John the Ripper desde hace más de 15 años.',
      ruleOfThumb: 'Más larga y memorable supera a corta y rebuscada. ¡Usa frases de paso (Passphrases)!'
    },
    colombianContext: 'En Colombia, el análisis forense de ataques a portales educativos y cuentas institucionales revela que "Sena2024*", "Institucion123*" y el número de documento de identidad son las credenciales más comprometidas por aprendices y docentes.',
    glossary: [
      { term: 'Entropía Criptográfica', definition: 'Medida en bits de la aleatoriedad y resistencia matemática de una clave frente a la fuerza bruta.' },
      { term: 'Sal (Salt)', definition: 'Secuencia de bits aleatoria agregada a la contraseña antes del hash para neutralizar tablas Rainbow.' },
      { term: 'Passphrase', definition: 'Frase de contraseña compuesta por varias palabras separadas, mucho más larga y fácil de recordar que una palabra aislada.' }
    ],
    quickCheck: {
      question: 'Según la directriz NIST SP 800-63B, ¿cuál de las siguientes estrategias es la más eficaz y recomendada para la creación de credenciales seguras?',
      options: [
        'Obligar a cambiar la contraseña cada 30 días agregando el mes en curso.',
        'Usar contraseñas de 8 caracteres sustituyendo vocales por símbolos clásicos (ej: P@ssw0rd!).',
        'Fomentar frases de contraseña (Passphrases) largas (>16 caracteres), memorables, y contrastarlas contra bases de datos de contraseñas vulneradas.',
        'Usar únicamente el número de teléfono celular con un asterisco al final.'
      ],
      correctIndex: 2,
      explanation: 'NIST SP 800-63B rechaza la rotación forzada arbitraria y prioriza la longitud extrema mediante passphrases junto con la verificación contra listas de brechas previas.'
    }
  },
  {
    id: 6,
    title: 'Autenticación Multifactor (1FA vs. MFA/2FA)',
    shortDescription: 'Los 3 factores fundamentales, vulnerabilidades del SMS y la supremacía de TOTP y FIDO2.',
    category: 'Criptografía y Autenticación',
    iconName: 'Fingerprint',
    theory: {
      definition: 'La autenticación es el proceso de verificar la identidad declarada por un usuario o sistema. El MFA (Multi-Factor Authentication) exige la presentación exitosa de DOS o MÁS pruebas pertenecientes a DIFERENTES categorías de factores independientes.',
      keyPoints: [
        'Factor 1 - Algo que sabes: Contraseñas, frases de paso, PIN, preguntas de seguridad (el factor más débil y filtrable).',
        'Factor 2 - Algo que tienes: Token generador de claves TOTP (Google Authenticator, Microsoft Authenticator), llave física USB FIDO2/WebAuthn (YubiKey), tarjeta inteligente.',
        'Factor 3 - Algo que eres: Biometría como huella dactilar, reconocimiento facial, iris o patrón de voz.',
        'La trampa del 2FA falso: Solicitar una contraseña y un PIN NO es 2FA; son dos elementos del MISMO factor ("algo que sabes").',
        'Vulnerabilidad del SMS: El envío de códigos por mensaje de texto es vulnerable a ataques de SIM Swapping (duplicado no autorizado de la SIM ante el operador de telecomunicaciones) e interceptación SS7.'
      ],
      technicalDeepDive: 'El protocolo TOTP (RFC 6238 - Time-Based One-Time Password) utiliza una semilla criptográfica compartida entre el servidor y el cliente junto con la marca de tiempo UNIX actual (en ventanas de 30 segundos) para generar un código hash HMAC-SHA1 de 6 dígitos sin requerir internet en el dispositivo.'
    },
    instructorVoice: {
      anecdote: 'El caso más doloroso que atendí fue el de un microempresario en Cali al que le vaciaron la cuenta jurídica de 80 millones de pesos. Los delincuentes fueron a un punto de telefonía móvil con una cédula falsa, solicitaron un duplicado de su SIM prepago y recibieron los códigos bancarios por SMS. Si la empresa hubiera usado una llave de seguridad FIDO2 o TOTP en su celular, el ataque habría fracasado.',
      industryWarning: 'El agotamiento por fatiga de notificaciones (MFA Prompt Bombing) ocurre cuando un atacante envía decenas de solicitudes de aprobación push al teléfono de la víctima en la madrugada hasta que, medio dormida, presiona "Aceptar".',
      ruleOfThumb: 'SMS es mejor que nada, pero TOTP y llaves de hardware FIDO2 son el estándar profesional indiscutible.'
    },
    colombianContext: 'En Colombia, el SIM Swapping creció más del 150% en los últimos años debido a la vulnerabilidad de validación en tiendas de operadores móviles, llevando a la Superintendencia de Industria y Comercio a ordenar medidas biométricas en la expedición de SIMs.',
    glossary: [
      { term: 'TOTP', definition: 'Algoritmo de contraseñas de un solo uso basadas en tiempo, renovadas cada 30 segundos.' },
      { term: 'SIM Swapping', definition: 'Fraude en el que un atacante transfiere ilegalmente el número telefónico de la víctima a una SIM bajo su control.' },
      { term: 'FIDO2 / WebAuthn', definition: 'Estándar abierto de autenticación sin contraseña basado en criptografía de clave pública resistente al phishing.' }
    ],
    quickCheck: {
      question: 'Un sistema solicita para iniciar sesión: 1) Contraseña de usuario y 2) La respuesta a la pregunta secreta "¿Cuál es tu comida favorita?". ¿Cumple técnicamente con ser Autenticación Multifactor (MFA)?',
      options: [
        'Sí, porque son dos preguntas diferentes y obligatorias.',
        'No, porque ambos elementos pertenecen al mismo factor de autenticación ("Algo que sabes").',
        'Sí, porque la comida favorita es un dato biométrico personal.',
        'Solo si la respuesta tiene más de 12 letras mayúsculas.'
      ],
      correctIndex: 1,
      explanation: 'Para que sea multifactor, los elementos deben provenir de diferentes categorías: saber (clave), tener (token/celular) o ser (biometría). Dos secretos conocidos siguen siendo 1FA.'
    }
  },
  {
    id: 7,
    title: 'Ingeniería Social y Gatillos Psicológicos',
    shortDescription: 'Explotación del eslabón humano, técnicas de Pretexting, Baiting, Quid pro quo y gatillos emocionales.',
    category: 'Vectores de Ataque',
    iconName: 'BrainCircuit',
    theory: {
      definition: 'La ingeniería social es el arte de manipular psicológicamente a las personas para que ejecuten acciones involuntarias o divulguen información confidencial que comprometa la seguridad de los activos organizacionales.',
      keyPoints: [
        'Gatillo de Urgencia y Pánico: "Su cuenta será suspendida en 15 minutos si no actualiza sus datos inmediatamente". Impide el pensamiento reflexivo.',
        'Gatillo de Autoridad: El atacante se hace pasar por el Gerente General, un auditor de la DIAN, un fiscal o el soporte técnico del SENA.',
        'Gatillo de Curiosidad y Escasez: "Descargue aquí la lista confidencial de despidos o aumentos salariales".',
        'Técnicas principales:',
        '  • Pretexting: Creación de un escenario ficticio elaborado para engañar a la víctima.',
        '  • Baiting (Cebo): Dejar una memoria USB infectada en el parqueadero o baño con la etiqueta "Salarios Directivos 2024".',
        '  • Quid pro quo: Ofrecer un beneficio falso (ej. soporte telefónico fraudulento).',
        '  • Shoulder Surfing: Mirar por encima del hombro para espiar credenciales o códigos PIN en cajeros o escritorios.'
      ],
      technicalDeepDive: 'Kevin Mitnick, uno de los consultores de seguridad más reconocidos del mundo, acuñó la frase: "Puedes tener los mejores firewalls del planeta, pero si alguien convence a tu secretaria de leer su contraseña por teléfono, tu seguridad es cero".'
    },
    instructorVoice: {
      anecdote: 'En un ejercicio de auditoría autorizada (Red Team) en un colegio de Bogotá, dejamos 5 memorias USB con el logo del colegio y la etiqueta "Exámenes Finales Grado 11 con Respuestas" tiradas cerca de la cafetería. En menos de 25 minutos, 4 estudiantes y 1 profesor las habían conectado a computadores institucionales. Ese día aprendieron más sobre ciberseguridad que en todo el semestre.',
      industryWarning: 'Los ciberdelincuentes no atacan firewalls cuando pueden simplemente llamar al área de servicio al cliente y sonar amables, preocupados o autoritarios.',
      ruleOfThumb: 'Si un mensaje te genera una emoción extrema (miedo, urgencia o euforia por un premio), deténte: estás bajo un intento de manipulación psicológica.'
    },
    colombianContext: 'En Colombia, el timo de la llamada del "Tío o Sobrino capturado por la Policía que necesita dinero urgente" es una variante clásica de ingeniería social telefónica que explota el gatillo emocional de angustia familiar.',
    glossary: [
      { term: 'Pretexting', definition: 'Técnica en la que el atacante inventa una identidad y pretexto verosímil para obtener datos sensibles.' },
      { term: 'Baiting', definition: 'Ataque que utiliza un señuelo físico o digital (como una memoria USB o descarga gratuita) para infectar a la víctima.' },
      { term: 'Shoulder Surfing', definition: 'Observación visual directa de credenciales o pantallas sin autorización.' }
    ],
    quickCheck: {
      question: 'Un técnico de soporte llega sin cita previa a la oficina administrativa del colegio afirmando con voz firme y traje formal: "Vengo del Ministerio de Educación a auditar los servidores centrales por orden del rector, déjeme ingresar ya porque tengo prisa". ¿Qué gatillo de ingeniería social está explotando principalmente?',
      options: [
        'Criptografía asimétrica',
        'Autoridad combinada con urgencia e intimidación',
        'Inyección SQL perimetral',
        'Fuerza bruta distribuida'
      ],
      correctIndex: 1,
      explanation: 'El atacante utiliza la figura de autoridad (Ministerio/Rector) y el apuro para intimidar al empleado y evitar que verifique los protocolos de acceso físico.'
    }
  },
  {
    id: 8,
    title: 'Phishing y sus Variantes (Spear, Smishing, Vishing)',
    shortDescription: 'Inspección de cabeceras, vectores móviles, desmontaje del mito del candado HTTPS y detección forense de IOCs.',
    category: 'Vectores de Ataque',
    iconName: 'MailWarning',
    theory: {
      definition: 'El phishing es un ataque cibernético que emplea comunicaciones digitales fraudulentas diseñadas para suplantar identidades legítimas (bancos, entidades del estado, directivos) con el fin de inducir a la víctima a descargar malware o ingresar credenciales en sitios clonados.',
      keyPoints: [
        'Spear Phishing: Ataque altamente dirigido y personalizado contra una persona específica (ej. tesorero del colegio, rector) investigando previamente su vida en LinkedIn o redes.',
        'Smishing: Phishing mediante mensajes de texto SMS ("Su paquete de Servientrega está retenido, pague 4.500 pesos en este enlace: bit.ly/falso").',
        'Vishing: Phishing mediante llamadas telefónicas con suplantación del número emisor (Caller ID Spoofing) y uso de voces clonadas con IA.',
        'QRishing: Uso de códigos QR falsificados pegados sobre códigos QR legítimos en restaurantes, parquímetros o transporte.',
        'El Gran Mito del Candado HTTPS: El candado verde o HTTPS solo significa que la conexión entre tu navegador y el servidor está CIFRADA; ¡NO significa que el sitio web pertenezca a una empresa confiable! Los atacantes crean certificados SSL gratuitos de Let\'s Encrypt en minutos para sus sitios de phishing.'
      ],
      technicalDeepDive: 'La inspección técnica de un correo de phishing examina las cabeceras RFC 5322: Compara la cabecera visible "From" con el remitente técnico "Return-Path" o "Envelope Sender", y valida las políticas de autenticación de dominio: SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail) y DMARC.'
    },
    instructorVoice: {
      anecdote: 'Un aprendiz de 11° me discutía: "Profe, pero la página de Bancolombia a la que entré tenía candadito HTTPS y decía Conexión Segura, ¿cómo va a ser falsa?". Le mostré en el proyector cómo cualquier persona puede comprar el dominio "banc0l0mbia-pagos.xyz", generar un certificado SSL gratis en 30 segundos y clonar la interfaz. El candado protege de espías en la red, ¡no del dueño de la página!',
      industryWarning: 'Fíjate siempre en el DOMINIO RAÍZ a la izquierda de la primera barra diagonal: "login.dian.gov.co.servicios-pagos.com/login" NO es de la DIAN; pertenece a "servicios-pagos.com".',
      ruleOfThumb: 'Nunca pulses sobre el enlace del correo; abre una pestaña nueva y escribe tú mismo la URL oficial de la entidad.'
    },
    colombianContext: 'Las campañas de phishing más comunes en Colombia suplantan a la DIAN (falso embargo coactivo con archivo adjunto ejecutable), a la Policía Nacional (falso comparendo de tránsito) y a Bancolombia / Daviplata / Nequi.',
    glossary: [
      { term: 'SPF / DKIM / DMARC', definition: 'Protocolos de autenticación de correo que verifican que el servidor emisor tiene permiso del dueño del dominio.' },
      { term: 'Punycode / Homógrafo', definition: 'Ataque que usa caracteres del alfabeto cirílico idénticos visualmente al alfabeto latino para engañar en el nombre de dominio.' },
      { term: 'Caller ID Spoofing', definition: 'Técnica que falsea el número de teléfono mostrado en la pantalla de la persona llamada.' }
    ],
    quickCheck: {
      question: 'Un correo electrónico afirma ser de la DIAN con una citación judicial urgente y adjunta un archivo llamado "Citacion_Embargo_DIAN.pdf.exe". ¿Qué indicador de compromiso (IOC) es el más concluyente para calificarlo como malware/phishing?',
      options: [
        'El correo llegó a las 3:00 de la tarde.',
        'La doble extensión ".pdf.exe" que oculta un archivo ejecutable malicioso bajo la apariencia de un documento PDF.',
        'El correo tiene el logo oficial del escudo de Colombia.',
        'El texto del correo está redactado con ortografía perfecta.'
      ],
      correctIndex: 1,
      explanation: 'La técnica de doble extensión oculta el archivo ejecutable de Windows (.exe) para engañar al usuario haciéndole creer que abre un documento de lectura PDF.'
    }
  },
  {
    id: 9,
    title: 'Malware y Familias de Amenazas Lógicas',
    shortDescription: 'Ransomware de doble extorsión, troyanos bancarios, gusanos de red, spyware y redes botnet con C2.',
    category: 'Amenazas Técnicas',
    iconName: 'Bug',
    theory: {
      definition: 'Malware (Malicious Software) es cualquier programa o código informático diseñado deliberadamente para infiltrarse, dañar, alterar, espiar o tomar control de un sistema computacional sin el consentimiento informado del legítimo propietario.',
      keyPoints: [
        'Ransomware: Cifra los archivos del sistema operativo mediante algoritmos robustos (AES + RSA) y exige un rescate en criptomonedas. La "Doble Extorsión" además amenaza con publicar los datos confidenciales en la Dark Web si no se paga.',
        'Troyano: Software que se disfraza de herramienta útil o juego legítimo (ej. activadores de Office o trucos de juegos) pero contiene una carga útil maliciosa oculta (RAT - Remote Access Trojan).',
        'Gusano (Worm): Malware con capacidad de autorreplicación autónoma a través de redes locales e internet sin necesidad de interacción humana (ej. WannaCry explotando EternalBlue / MS17-010).',
        'Spyware y Keyloggers: Monitorean en segundo plano las pulsaciones de teclado, capturan pantallas y graban audio/video para enviar credenciales al atacante.',
        'Botnets y C2: Redes de computadores infectados (zombis) controlados remotamente por un servidor de Comando y Control (C2) para ejecutar ataques DDoS masivos o minería ilegal.'
      ],
      technicalDeepDive: 'El ransomware moderno no solo cifra archivos locales; escanea las unidades de red mapeadas, borra las instantáneas de volumen (Volume Shadow Copies mediante "vssadmin delete shadows") y busca deshabilitar el arranque seguro de Windows antes de mostrar la nota de rescate.'
    },
    instructorVoice: {
      anecdote: 'En un laboratorio del SENA, un aprendiz descargó un "crack" para activar Photoshop desde una página sospechosa para hacer una tarea. A los 5 minutos, el troyano había desactivado el antivirus local, conectado con un servidor C2 en Rusia y comenzado a escanear todos los computadores de la red del aula para propagarse. Tuvimos que aislar el switch del laboratorio de inmediato.',
      industryWarning: 'Pagar el rescate de un ransomware está totalmente desaconsejado por las autoridades: financia el terrorismo, no garantiza que entreguen la clave de descifrado y marca a la empresa como un objetivo fácil para un segundo ataque.',
      ruleOfThumb: 'Software pirata = malware garantizado. Nadie invierte meses descifrando software comercial para regalarlo por bondad.'
    },
    colombianContext: 'En Colombia, el troyano bancario Grandoreiro y variantes del ransomware LockBit y BlackCat han paralizado empresas de servicios públicos, firmas de ingeniería y clínicas de salud en Bogotá, Medellín y Barranquilla.',
    glossary: [
      { term: 'C2 (Command & Control)', definition: 'Servidor central operado por atacantes que envía instrucciones a los computadores infectados.' },
      { term: 'Payload', definition: 'Carga útil del malware; la acción destructiva o de espionaje que ejecuta en el sistema.' },
      { term: 'Shadow Copies', definition: 'Copias de seguridad automáticas de Windows que el ransomware intenta eliminar de inmediato.' }
    ],
    quickCheck: {
      question: '¿Cuál es la diferencia técnica fundamental entre un Virus/Troyano tradicional y un Gusano (Worm) informático?',
      options: [
        'El gusano solo infecta teléfonos celulares y no computadores de escritorio.',
        'El gusano se autorreplica y propaga de forma autónoma por la red sin requerir la intervención o ejecución del usuario.',
        'El troyano siempre borra el disco duro al encender la máquina.',
        'El gusano requiere que el usuario haga clic en un archivo adjunto todos los días.'
      ],
      correctIndex: 1,
      explanation: 'A diferencia de los virus y troyanos que requieren que el usuario ejecute un archivo huésped, los gusanos aprovechan fallos de red para propagarse solos sin intervención humana.'
    }
  },
  {
    id: 10,
    title: 'Protección de Dispositivos y Hardening',
    shortDescription: 'Regla 3-2-1 de copias de seguridad, cifrado de disco BitLocker/LUKS, principio de menor privilegio y parches.',
    category: 'Defensa y Buenas Prácticas',
    iconName: 'ServerCrash',
    theory: {
      definition: 'El Hardening (endurecimiento de sistemas) es el proceso técnico sistemático de reducir la superficie de ataque de un dispositivo o servidor eliminando servicios innecesarios, configurando políticas restrictivas y aplicando controles de seguridad robustos.',
      keyPoints: [
        'Regla de Copias de Seguridad 3-2-1: Mantener 3 copias de los datos, en 2 medios de almacenamiento diferentes (ej. disco duro externo y servidor local), y 1 copia fuera del sitio o desconectada (Inmutable / Cloud / Offline) inmune al ransomware.',
        'Principio de Menor Privilegio (PoLP): Ningún usuario debe operar su computador diario con cuenta de Administrador del sistema; las cuentas estándar mitigan el 85% de infecciones de malware.',
        'Cifrado de Disco Completo (FDE): BitLocker en Windows o LUKS en Linux con chip TPM 2.0; si el portátil es robado físicamente, nadie puede leer los archivos extrayendo el disco.',
        'Gestión Continua de Parches (Patch Management): Actualizar oportunamente el sistema operativo, navegadores, plugins y firmware de red.',
        'Cierre de Puertos y Servicios Innecesarios: Deshabilitar protocolos antiguos e inseguros como SMBv1, Telnet, FTP y NetBIOS.'
      ],
      technicalDeepDive: 'El Centro de Seguridad de Internet (CIS - Center for Internet Security) publica las "CIS Benchmarks", guías técnicas con configuraciones de endurecimiento paso a paso para Windows, Linux, routers Cisco, bases de datos y servicios en la nube.'
    },
    instructorVoice: {
      anecdote: 'Un aprendiz me dijo con orgullo: "Profesor, yo tengo copias de seguridad automáticas de mi proyecto final de grado conectadas en un disco duro externo USB permanente". Le pregunté: "¿Qué pasa si un ransomware entra hoy a tu PC?". Se quedó helado al darse cuenta de que el ransomware cifra el disco C: y el disco externo USB conectado al mismo tiempo. Esa es la razón de oro del "1" en la regla 3-2-1: una copia debe estar DESCONECTADA.',
      industryWarning: 'Trabajar en tu computador de desarrollo como "root" o "Administrator" por flojera de escribir contraseñas es como caminar por una favela con fajos de billetes colgando del bolsillo.',
      ruleOfThumb: 'Si una función, puerto o programa no es estrictamente necesario para la operación, desinstálalo o bloquéalo.'
    },
    colombianContext: 'En las instituciones educativas colombianas de Media Técnica, implementar la separación de cuentas de usuario estándar para los aprendices frente a cuentas de administrador del profesor es la medida número uno para evitar desastres en las salas de cómputo.',
    glossary: [
      { term: 'TPM 2.0', definition: 'Módulo de plataforma de confianza criptográfico integrado en la placa madre para almacenar claves de cifrado.' },
      { term: 'Copia Inmutable', definition: 'Copia de seguridad con bloqueo WORM (Write Once, Read Many) que no puede ser alterada ni borrada durante un tiempo fijado.' },
      { term: 'Superficie de Ataque', definition: 'La suma total de todos los puntos de acceso, puertos, protocolos y aplicaciones por donde un atacante puede intentar vulnerar el sistema.' }
    ],
    quickCheck: {
      question: 'Según la regla de copias de seguridad 3-2-1, ¿por qué es indispensable que al menos UNA (1) de las copias esté fuera de línea (offline) o en una ubicación remota independiente?',
      options: [
        'Para que la copia ocupe menos espacio en el disco duro.',
        'Para evitar que un ransomware que infecte la red local pueda acceder y cifrar simultáneamente el respaldo.',
        'Porque las copias desconectadas transmiten información por telepatía sin internet.',
        'Porque Windows no permite hacer más de dos copias en la misma ciudad.'
      ],
      correctIndex: 1,
      explanation: 'La copia fuera de línea / remota (air-gapped o inmutable) garantiza que un malware que comprometa todos los dispositivos en red no tenga acceso físico ni lógico para sabotear la copia de recuperación.'
    }
  }
];
