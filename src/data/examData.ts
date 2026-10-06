import { ExamQuestion, HardeningItem } from '../types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    competencyArea: 'Ciberseguridad y Normatividad',
    scenario: 'Durante una auditoría a una empresa de desarrollo de software, el auditor descubre que los contratos con clientes y las fórmulas matemáticas propietarias impresas se dejan en mesas de juntas sin supervisión y se desechan en la basura común sin triturar.',
    question: 'Desde el punto de vista normativo de ISO/IEC 27001, ¿qué tipo de vulneración se ha producido?',
    options: [
      'Un incidente de ciberseguridad exclusivo de redes WAN.',
      'Un fallo crítico de Seguridad de la Información que viola la política de confidencialidad física y tratamiento de soportes impresos.',
      'Un ataque de inyección de código SQL contra la base de datos de los contratos.',
      'Un fallo de disponibilidad que requiere comprar más switches de fibra óptica.'
    ],
    correctIndex: 1,
    technicalRationale: 'La Seguridad de la Información (ISO/IEC 27001) abarca la información en cualquier formato, incluido el papel físico. El descarte negligente viola el Anexo A.8 (Controles Físicos y Tratamiento de Medios).',
    nistOrIsoReference: 'ISO/IEC 27001:2022 Control 7.10 (Almacenamiento de Medios) y 7.14 (Seguridad de cables y soportes).'
  },
  {
    id: 2,
    competencyArea: 'Infraestructura de TI',
    scenario: 'Un aprendiz de Media Técnica afirma: "El ransomware que atacó el hospital es una vulnerabilidad muy peligrosa". El instructor técnico le corrige de inmediato.',
    question: '¿Por qué la afirmación del aprendiz es técnicamente incorrecta según los estándares de gestión de riesgo?',
    options: [
      'Porque el ransomware no afecta hospitales, solo empresas mineras.',
      'Porque el ransomware es una AMENAZA (software malicioso/agente causal externo); la VULNERABILIDAD fue la debilidad interna (ej. sistema sin parches de seguridad o puerto RDP expuesto) que permitió su entrada.',
      'Porque en ciberseguridad las palabras amenaza y vulnerabilidad son exactamente el mismo concepto técnico.',
      'Porque el hospital no tenía computadores conectados a internet.'
    ],
    correctIndex: 1,
    technicalRationale: 'La Amenaza es el agente o evento potencial capaz de causar daño (el ransomware/ciberdelincuente). La Vulnerabilidad es la debilidad interna del sistema que hace viable el ataque.',
    nistOrIsoReference: 'NIST SP 800-30 Rev 1 (Guía para la Realización de Evaluaciones de Riesgo).'
  },
  {
    id: 3,
    competencyArea: 'Infraestructura de TI',
    scenario: 'Un atacante no logra descifrar los datos de la base de datos clínica de un hospital, pero ejecuta un ataque de denegación de servicio distribuido (DDoS) saturando los enlaces de internet durante una cirugía crítica.',
    question: '¿Qué componente de la Tríada CID ha sido quebrantado de forma directa en este incidente?',
    options: [
      'Integridad',
      'Confidencialidad',
      'Disponibilidad',
      'Autenticidad'
    ],
    correctIndex: 2,
    technicalRationale: 'Un ataque DDoS no modifica datos (integridad) ni los sustrae necesariamente (confidencialidad), sino que impide que los usuarios autorizados accedan al servicio y a los activos cuando los necesitan (Disponibilidad).',
    nistOrIsoReference: 'NIST CSF v2.0 - Categoría PR.DS y DE.CM.'
  },
  {
    id: 4,
    competencyArea: 'Desarrollo Seguro',
    scenario: 'Un administrador de red aplica una directiva que exige a los usuarios cambiar su clave cada 30 días con al menos una mayúscula, un dígito y un símbolo de puntuación en 8 caracteres.',
    question: 'De acuerdo con las directrices modernas de NIST SP 800-63B (Gestión de Identidades Digitales), ¿por qué esta práctica está obsoleta y desaconsejada?',
    options: [
      'Porque los computadores modernos ya no entienden números en las claves.',
      'Porque fomenta que los usuarios creen patrones predecibles y de baja entropía (ej. "Marzo2024!"), siendo mucho más efectivo promover Passphrases largas (>16 caracteres) sin rotación forzada arbitraria.',
      'Porque la norma NIST exige que las contraseñas tengan únicamente números pares.',
      'Porque cambiar la clave hace que el cable de red se desgaste más rápido.'
    ],
    correctIndex: 1,
    technicalRationale: 'NIST SP 800-63B determinó que la rotación periódica forzada degrada la seguridad real al incentivar variaciones triviales, y prioriza la longitud mediante Passphrases verificadas contra brechas previas.',
    nistOrIsoReference: 'NIST SP 800-63B Sección 5.1.1 (Memorized Secrets).'
  },
  {
    id: 5,
    competencyArea: 'Ciberseguridad y Normatividad',
    scenario: 'Para ingresar al sistema de calificaciones del colegio, el sistema pide: 1) Nombre de usuario y contraseña, y 2) El PIN de seguridad de 4 dígitos que el profesor eligió al registrarse.',
    question: '¿Por qué esta configuración NO califica técnicamente como Autenticación Multifactor (MFA)?',
    options: [
      'Porque el colegio no tiene servidores propios.',
      'Porque tanto la contraseña como el PIN pertenecen al MISMO factor de autenticación: "Algo que sabes" (conocimiento).',
      'Porque el PIN debe tener obligatoriamente 16 dígitos para ser multifactor.',
      'Porque no se envió un correo a los padres de familia notificando el ingreso.'
    ],
    correctIndex: 1,
    technicalRationale: 'MFA requiere elementos independientes de dos o más categorías distintas: Algo que sabes (conocimiento), Algo que tienes (posesión) o Algo que eres (inherencia). Dos contraseñas siguen siendo un único factor (1FA).',
    nistOrIsoReference: 'NIST SP 800-63B Sección 4.1 y RFC 6238.'
  },
  {
    id: 6,
    competencyArea: 'Ciberseguridad y Normatividad',
    scenario: 'Un empleado recibe una llamada de una supuesta mesa de ayuda del banco informando con tono de apremio que "su tarjeta ha sido clonada en Barranquilla" y solicitándole dictar de inmediato el código de 6 dígitos que acaba de llegar a su celular.',
    question: '¿Qué vectores combinados de ataque están presentes en este escenario?',
    options: [
      'Cross-Site Scripting (XSS) y ataque Man-in-the-Middle físico.',
      'Ingeniería social mediante Vishing (phishing por voz), explotación del gatillo de pánico/urgencia y robo de token 2FA.',
      'Infección por gusano informático a través del altavoz del teléfono.',
      'Criptoanálisis de canal lateral sobre el chip SIM.'
    ],
    correctIndex: 1,
    technicalRationale: 'El Vishing (Voice Phishing) utiliza llamadas telefónicas y manipulación psicológica (pánico) para forzar a la víctima a entregar un token temporal de un solo uso (OTP/2FA).',
    nistOrIsoReference: 'NIST SP 800-61 Rev 2 (Computer Security Incident Handling Guide).'
  },
  {
    id: 7,
    competencyArea: 'Desarrollo Seguro',
    scenario: 'Un usuario accede a una página con la URL "https://banco-bogota-verificacion.xyz" que muestra el ícono del candado cerrado en la barra de direcciones del navegador.',
    question: '¿Qué garantiza técnicamente la presencia del candado HTTPS en dicha página?',
    options: [
      'Garantiza que la página es legítima, segura y pertenece oficialmente al Banco de Bogotá.',
      'Garantiza únicamente que la comunicación entre el navegador y el servidor remoto está cifrada con TLS, pero NO valida la honestidad ni la legitimidad del propietario del sitio web.',
      'Garantiza que en ese computador nunca podrá ingresar ningún tipo de virus.',
      'Garantiza que el gobierno de Colombia auditó el código fuente de la página.'
    ],
    correctIndex: 1,
    technicalRationale: 'El certificado SSL/TLS solo cifra el canal de transporte para evitar espionaje pasivo. Cualquier cibercriminal puede emitir un certificado TLS gratuito para su propio dominio de phishing.',
    nistOrIsoReference: 'OWASP Top 10 - A02:2021 Cryptographic Failures.'
  },
  {
    id: 8,
    competencyArea: 'Infraestructura de TI',
    scenario: 'Una empresa sufrió una infección por ransomware que cifró todas las bases de datos de clientes. El administrador procedió a conectar el disco duro externo donde guardaba los respaldos diarios, pero el ransomware infectó y cifró el disco externo en menos de dos minutos.',
    question: '¿Qué pilar fundamental de la estrategia de respaldo "Regla 3-2-1" fue ignorado por el administrador?',
    options: [
      'Tener 3 copias de los datos.',
      'Mantener al menos UNA (1) copia fuera del sitio o completamente desconectada (Offline / Air-Gapped) e inmutable frente a amenazas de red.',
      'Usar discos duros que sean de color negro.',
      'Hacer las copias de seguridad únicamente en días festivos.'
    ],
    correctIndex: 1,
    technicalRationale: 'La Regla 3-2-1 exige: 3 copias, en 2 medios diferentes, y 1 copia fuera de línea / remota (air-gapped) para evitar que un malware activo en el sistema anfitrión la destruya al ser conectada.',
    nistOrIsoReference: 'NIST SP 800-209 (Guideline for Storage Infrastructure Security).'
  },
  {
    id: 9,
    competencyArea: 'Desarrollo Seguro',
    scenario: 'En un informe forense tras una infección masiva de red se determina que el malware no requirió que ningún usuario abriera archivos ni hiciera clic en correos, propagándose en 15 minutos por 200 computadores a través de un puerto SMB 445 vulnerable.',
    question: '¿A qué categoría técnica pertenece este malware por su capacidad de replicación?',
    options: [
      'Troyano bancario tradicional.',
      'Gusano de red (Worm).',
      'Spyware pasivo.',
      'Keylogger por hardware.'
    ],
    correctIndex: 1,
    technicalRationale: 'Los gusanos informáticos (Worms) tienen la propiedad definitoria de autorreplicación autónoma a través de protocolos y puertos de red sin requerir interacción o ejecución humana (como WannaCry o NotPetya).',
    nistOrIsoReference: 'NIST SP 800-83 Rev 1 (Guide to Malware Incident Prevention and Handling).'
  },
  {
    id: 10,
    competencyArea: 'Infraestructura de TI',
    scenario: 'En una sala de cómputo del SENA, el instructor configura los equipos para que los aprendices utilicen cuentas estándar sin permisos de administrador y activa el arranque seguro (Secure Boot) y directivas de restricción de software.',
    question: '¿Cómo se denomina técnicamente este conjunto sistemático de acciones de seguridad?',
    options: [
      'Hardening (Endurecimiento de sistemas) y Principio de Menor Privilegio (PoLP).',
      'Ingeniería inversa de software.',
      'Criptoanálisis cuántico asimétrico.',
      'Ataque de fuerza bruta distribuido.'
    ],
    correctIndex: 0,
    technicalRationale: 'El Hardening reduce la superficie de ataque del sistema eliminando privilegios innecesarios y configurando políticas restrictivas de ejecución.',
    nistOrIsoReference: 'CIS Benchmarks & NIST SP 800-123 (Guide to General Server Security).'
  }
];

export const HARDENING_CHECKLIST: HardeningItem[] = [
  {
    id: 'hard-1',
    category: 'Identidad y Cuentas',
    title: 'Separación de Cuentas y Menor Privilegio (PoLP)',
    description: 'Verificar que la cuenta de uso diario del aprendiz sea Usuario Estándar y que la cuenta de Administrador tenga contraseña robusta exclusiva.',
    nistRef: 'NIST SP 800-53 AC-6',
    points: 25
  },
  {
    id: 'hard-2',
    category: 'Sistema Operativo',
    title: 'Cifrado de Disco Completo (BitLocker / LUKS) y TPM 2.0',
    description: 'Comprobar el cifrado de datos en reposo para evitar la extracción de información confidencial en caso de pérdida o robo físico del equipo.',
    nistRef: 'NIST SP 800-111',
    points: 25
  },
  {
    id: 'hard-3',
    category: 'Red y Perímetro',
    title: 'Cierre de Puertos Inseguros y Firewall de Host Activo',
    description: 'Deshabilitar protocolos obsoletos (SMBv1, Telnet puerto 23, NetBIOS) y asegurar que el firewall filtre conexiones entrantes no solicitadas.',
    nistRef: 'NIST SP 800-41 Rev 1',
    points: 25
  },
  {
    id: 'hard-4',
    category: 'Copias de Seguridad',
    title: 'Implementación de Política 3-2-1 con Respaldo Aislado',
    description: 'Verificar la existencia de 3 copias de los proyectos de software, 2 medios y al menos 1 copia en medio desconectado o nube inmutable.',
    nistRef: 'NIST SP 800-209',
    points: 25
  }
];
