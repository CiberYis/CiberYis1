import { RealCase } from '../types';

export const REAL_CASES: RealCase[] = [
  {
    id: 'epm-ransomware-2022',
    title: 'Incidente de Ransomware en Empresas Públicas de Medellín (EPM)',
    subtitle: 'Ataque del grupo BlackCat/ALPHV e intrusión por credenciales VPN sin MFA',
    year: 'Diciembre 2022',
    targetEntity: 'Empresas Públicas de Medellín (EPM - Sector Servicios Públicos Críticos)',
    vector: 'Compromiso de credenciales de acceso remoto (VPN) obtenidas en la Dark Web sin autenticación multifactor (MFA).',
    impactSummary: 'Paralización de sistemas comerciales, plataformas de atención al cliente y facturación de servicios de energía, gas y agua; forzó la desconexión total preventiva de más de 4.000 servidores.',
    nistPhases: [
      {
        phase: 'Identificación',
        title: 'Fase 1: Detección y Análisis de la Anomalía Inicial',
        situation: 'A las 02:45 AM de un lunes, el sistema SIEM genera alertas masivas de múltiples servidores Windows en el centro de datos ejecutando "vssadmin.exe delete shadows /all /quiet" y detecta archivos con extensiones aleatorias desconocidas junto a notas de rescate en formato .txt.',
        question: 'Como Primer Respondiente (First Responder) de guardia en el Centro de Operaciones de Seguridad (SOC), ¿cuál es tu acción inmediata de identificación técnica prioritaria?',
        options: [
          {
            text: 'Descargar el archivo de rescate, contactar a los atacantes por el chat de la Dark Web para negociar el precio y pagar con la tarjeta corporativa.',
            score: 0,
            feedback: 'Gravísimo error: Nunca se debe negociar a título personal ni pagar sin autorización judicial. Pagar financia el crimen y no asegura la recuperación.',
            isOptimal: false
          },
          {
            text: 'Validar la alerta en el SIEM/EDR, identificar el hash del proceso malicioso, los equipos afectados y notificar inmediatamente al Comité de Gestión de Crisis Ciber.',
            score: 25,
            feedback: 'Excelente: La identificación rápida y la confirmación de la naturaleza del malware permiten activar el protocolo de crisis sin perder tiempo valioso.',
            isOptimal: true
          },
          {
            text: 'Ignorar la alerta hasta las 08:00 AM para que llegue el jefe de sistemas en horario de oficina.',
            score: 0,
            feedback: 'Fatal: El ransomware se propaga lateralmente a velocidades de decenas de equipos por minuto. Esperar horas garantiza la pérdida total de la infraestructura.',
            isOptimal: false
          },
          {
            text: 'Reiniciar todos los servidores de inmediato para ver si al reiniciar Windows se soluciona el problema de los archivos.',
            score: 5,
            feedback: 'Contraproducente: Reiniciar servidores infectados puede destruir evidencia volátil en memoria RAM (claves de cifrado) y acelerar el bloqueo de arranque.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Contención',
        title: 'Fase 2: Contención Inmediata para Detener el Movimiento Lateral',
        situation: 'El ransomware está intentando propagarse a través de los enlaces de red hacia los sistemas SCADA de control de agua y energía de Antioquia.',
        question: '¿Qué medida de contención técnica debes ordenar ejecutar de manera inmediata para proteger la red de operaciones críticas (OT)?',
        options: [
          {
            text: 'Aislar lógicamente y desconectar físicamente la red corporativa de TI de la red industrial OT, cortar túneles VPN y segmentar VLANs afectadas.',
            score: 25,
            feedback: '¡Respuesta de experto!: La segregación inmediata entre TI y OT previene que el incidente en servidores administrativos paralice la prestación física de agua y energía.',
            isOptimal: true
          },
          {
            text: 'Enviar un correo masivo a todos los empleados pidiéndoles que no abran archivos de Word.',
            score: 5,
            feedback: 'Inútil: El malware ya está dentro y propagándose a nivel de red y controladores de dominio; un correo no detiene el tráfico malicioso.',
            isOptimal: false
          },
          {
            text: 'Conectar un disco duro externo USB con las copias de seguridad al servidor infectado para restaurar los datos ya mismo.',
            score: 0,
            feedback: 'Peligro inminente: El ransomware cifrará inmediatamente el disco de respaldo tan pronto como sea conectado a la máquina comprometida.',
            isOptimal: false
          },
          {
            text: 'Apagar el firewall perimetral para que los atacantes no puedan salir a internet.',
            score: 0,
            feedback: 'Grave: Desactivar el firewall deja la red completamente expuesta e incomunicada sin filtros ni capacidad de registro de tráfico.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Erradicación',
        title: 'Fase 3: Erradicación y Eliminación de la Carga Maliciosa',
        situation: 'La red ya está aislada. Se ha descubierto que el atacante usó una cuenta de VPN sin MFA de un contratista externo y creó puertas traseras con cuentas de administrador ocultas.',
        question: '¿Cómo se debe proceder para erradicar completamente la presencia del adversario antes de restaurar los servicios?',
        options: [
          {
            text: 'Cambiar la contraseña de la cuenta del contratista y continuar operando normalmente sin tocar nada más.',
            score: 5,
            feedback: 'Insuficiente: Los atacantes modernos establecen múltiples mecanismos de persistencia (tareas programadas, cuentas secundarias, certificados falsos).',
            isOptimal: false
          },
          {
            text: 'Reinstalar los sistemas operativos desde imágenes limpias oficiales, revocar credenciales corporativas, eliminar llaves de acceso y restaurar desde backups inmutables verificados.',
            score: 25,
            feedback: 'Impecable: La erradicación profesional exige saneamiento total desde cero y restauración desde copias de seguridad no contaminadas.',
            isOptimal: true
          },
          {
            text: 'Pagar un programa antivirus gratuito de internet y ejecutar un análisis rápido en el escritorio.',
            score: 0,
            feedback: 'Completamente ineficaz frente a un grupo de ciberdelincuencia avanzada (APT) con persistencia en el Active Directory.',
            isOptimal: false
          },
          {
            text: 'Formatear únicamente la partición D: y dejar la partición C: intacta para no perder las fotos del equipo de trabajo.',
            score: 0,
            feedback: 'Inseguro: El malware y sus persistencias residen en el registro del sistema, memoria y archivos del sistema en C:.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Lecciones Aprendidas',
        title: 'Fase 4: Lecciones Aprendidas y Aseguramiento Futuro',
        situation: 'El servicio ha sido recuperado tras semanas de contingencia. La dirección solicita el informe técnico de cierre y las medidas de remediación estructural.',
        question: '¿Cuál de los siguientes planes de remediación representa la mejor práctica para prevenir la repetición de este incidente?',
        options: [
          {
            text: 'Implementar obligatoriamente MFA con tokens FIDO2/TOTP en todos los accesos remotos VPN, arquitectura Zero Trust, y backups inmutables fuera de línea (regla 3-2-1).',
            score: 25,
            feedback: 'Medida maestra: Ataca la causa raíz (falta de MFA) y fortalece la resiliencia integral con arquitecturas modernas de confianza cero.',
            isOptimal: true
          },
          {
            text: 'Prohibir el uso de computadores en la empresa y volver al papel y lápiz para evitar cualquier virus informático.',
            score: 0,
            feedback: 'Inviable operacionalmente para una empresa moderna de servicios públicos.',
            isOptimal: false
          },
          {
            text: 'Contratar una póliza de seguros y permitir que los contratistas sigan usando contraseñas de 6 letras sin segundo factor.',
            score: 0,
            feedback: 'Inaceptable: Las aseguradoras rechazan pagos de siniestros si la empresa no demuestra controles mínimos como MFA en accesos remotos.',
            isOptimal: false
          },
          {
            text: 'Publicar las contraseñas en un boletín público para que nadie tenga que pedir prestadas credenciales.',
            score: 0,
            feedback: 'Disparatado: Destruye cualquier principio de confidencialidad y control de acceso.',
            isOptimal: false
          }
        ]
      }
    ]
  },
  {
    id: 'dian-phishing-mipymes',
    title: 'Campañas Masivas de Phishing DIAN en MiPymes Colombianas',
    subtitle: 'Suplantación institucional y distribución del troyano bancario Grandoreiro',
    year: '2023 - 2024',
    targetEntity: 'Pequeñas y Medianas Empresas (MiPymes) Colombianas - Departamentos Contables y Tesorería',
    vector: 'Correo electrónico con asunto urgente "Última Notificación: Embargo Coactivo de Cuentas Bancarias por la DIAN" con enlace a archivo .zip malicioso.',
    impactSummary: 'Desvío ilícito de fondos bancarios empresariales por más de $3.500 millones de pesos colombianos mediante la intercepción de navegadores y portales bancarios.',
    nistPhases: [
      {
        phase: 'Identificación',
        title: 'Fase 1: Triaje Inicial del Correo y Detección de IOCs',
        situation: 'La contadora de una empresa textil en Bogotá recibe un correo con el logo idéntico de la DIAN informando que la empresa tiene un proceso de cobro coactivo con embargo de sus cuentas en 24 horas. El correo indica: "Descargue el auto de mandamiento de pago aquí: https://dian.notificaciones-coactivas.co/AutoPago.zip".',
        question: 'Como técnico de soporte de la empresa, ¿cómo evalúas técnicamente el correo recibido antes de que la contadora lo abra?',
        options: [
          {
            text: 'Decirle a la contadora que haga clic rápido y pague la deuda de inmediato para que no embarguen la empresa.',
            score: 0,
            feedback: 'Grave: Caer en el gatillo psicológico de urgencia y pánico sin verificar la legitimidad.',
            isOptimal: false
          },
          {
            text: 'Inspeccionar el dominio remitente y la URL: notar que el dominio real es "notificaciones-coactivas.co" (falso) y no el dominio institucional del estado ".gov.co". Declarar el correo como Phishing.',
            score: 25,
            feedback: '¡Excelente triaje forense!: Todas las entidades oficiales del estado colombiano usan el dominio de nivel superior restringido ".gov.co". Un .co privado es un engaño evidente.',
            isOptimal: true
          },
          {
            text: 'Mirar si la imagen de la bandera de Colombia se ve nítida; si se ve nítida, es un correo auténtico.',
            score: 0,
            feedback: 'Error infantil: Los atacantes copian logos y gráficos oficiales en alta definición de internet con un clic.',
            isOptimal: false
          },
          {
            text: 'Reenviar el correo a los 50 empleados de la empresa para que todos lo descarguen y den su opinión.',
            score: 0,
            feedback: 'Peligroso: Propaga la amenaza y multiplica la probabilidad de que alguien ejecute el archivo.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Contención',
        title: 'Fase 2: Contención tras la Descarga Accidental',
        situation: 'Desafortunadamente, la asistente contable ya había descargado el archivo .zip, extrajo un ejecutable con icono de PDF y le dio doble clic. La pantalla parpadeó y apareció una ventana emergente simulando la plataforma de Bancolombia pidiendo el Token dinámico.',
        question: '¿Cuál es la primera acción física y lógica de contención que debes ordenar sobre ese equipo inmediatamente?',
        options: [
          {
            text: 'Desconectar físicamente el cable de red Ethernet y apagar el Wi-Fi del computador, y llamar al banco desde un celular para congelar temporalmente las transferencias salientes.',
            score: 25,
            feedback: 'Respuesta perfecta: Cortar la conectividad impide que el troyano envíe credenciales al servidor C2 del atacante y avisar al banco frena transferencias fraudulentas.',
            isOptimal: true
          },
          {
            text: 'Ingresar los datos y el token para ver si la ventana del banco se cierra sola.',
            score: 0,
            feedback: 'Fatal: Entregar el token dinámico al troyano permite al ciberdelincuente transferir el dinero en tiempo real.',
            isOptimal: false
          },
          {
            text: 'Dejar el computador encendido y esperar al fin de semana a ver si se le quita el virus.',
            score: 0,
            feedback: 'En cuestión de minutos habrán vaciado los fondos corporativos.',
            isOptimal: false
          },
          {
            text: 'Instalar un juego de cartas para distraer la máquina.',
            score: 0,
            feedback: 'Respuesta absurda sin ningún criterio técnico.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Erradicación',
        title: 'Fase 3: Análisis Forense y Limpieza de la Amenaza',
        situation: 'El equipo fue aislado. El análisis revela que el malware Grandoreiro modificó claves del registro de Windows ("Run" keys) para autoiniciarse y descargó un archivo DLL malicioso en la carpeta temporal AppData.',
        question: '¿Qué procedimiento técnico garantiza la erradicación definitiva en este endpoint contable?',
        options: [
          {
            text: 'Borrar el icono del escritorio y vaciar la papelera de reciclaje.',
            score: 0,
            feedback: 'Borrar un acceso directo no elimina el archivo ejecutable ni las llaves del registro ni los procesos residentes en memoria.',
            isOptimal: false
          },
          {
            text: 'Extraer imagen forense del disco para la denuncia ante el CAI Virtual de la Policía, formatear y restaurar el sistema operativo de fábrica con software contable legítimo.',
            score: 25,
            feedback: 'Protocolo profesional: Preserva la cadena de custodia para la investigación judicial y garantiza un entorno limpio al 100%.',
            isOptimal: true
          },
          {
            text: 'Cambiar el fondo de pantalla por uno de color verde.',
            score: 0,
            feedback: 'No tiene ningún efecto sobre la seguridad.',
            isOptimal: false
          },
          {
            text: 'Desinstalar el teclado y el ratón.',
            score: 0,
            feedback: 'Medida inútil e incoherente.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Lecciones Aprendidas',
        title: 'Fase 4: Políticas de Prevención Organizacional',
        situation: 'La empresa evitó el robo de 150 millones gracias a la rápida desconexión. La gerencia solicita un protocolo formal para que esto no vuelva a ocurrir.',
        question: '¿Qué combinación de controles técnicos y humanos previene eficazmente futuros ataques de phishing institucional?',
        options: [
          {
            text: 'Bloquear extensiones ejecutables (.exe, .scr, .vbs, .zip) en el gateway de correo corporativo, configurar filtrado DNS defensivo, y capacitar al personal en inspección del dominio oficial ".gov.co".',
            score: 25,
            feedback: 'Solución integral: Aplica defensa en profundidad combinando filtros tecnológicos con cultura y concientización del usuario.',
            isOptimal: true
          },
          {
            text: 'Eliminar el acceso a internet para siempre en toda la empresa y usar palomas mensajeras.',
            score: 0,
            feedback: 'Solución no viable para el funcionamiento económico de una empresa.',
            isOptimal: false
          },
          {
            text: 'Decirle a la contadora que de ahora en adelante solo abra correos que tengan faltas de ortografía.',
            score: 0,
            feedback: 'Los correos legítimos no tienen faltas deliberadas y muchos phishings modernos son gramaticalmente perfectos.',
            isOptimal: false
          },
          {
            text: 'No hacer nada porque un rayo nunca cae dos veces en el mismo lugar.',
            score: 0,
            feedback: 'Falso: Las organizaciones vulneradas son atacadas repetidamente si no corrigen las fallas.',
            isOptimal: false
          }
        ]
      }
    ]
  },
  {
    id: 'usb-baiting-alcaldia',
    title: 'Infección por Memoria USB en Alcaldía Municipal (Baiting / BadUSB)',
    subtitle: 'Ingeniería social con señuelo físico y ejecución de script malicioso en la red pública',
    year: '2023',
    targetEntity: 'Alcaldía Municipal de Sexta Categoría (Cundinamarca)',
    vector: 'Memoria USB encontrada en el parqueadero exterior de la alcaldía con la etiqueta manuscrita "Nómina Directivos y Viáticos Alcalde 2023".',
    impactSummary: 'Ejecución oculta de script PowerShell con elevación de privilegios, instalación de puerta trasera y compromiso de confidencialidad de la base de datos de subsidios del SISBÉN.',
    nistPhases: [
      {
        phase: 'Identificación',
        title: 'Fase 1: Reconocimiento del Vector de Cebo Físico',
        situation: 'Un funcionario de la oficina de planeación encuentra una memoria USB Kingston de 32GB en el piso del parqueadero. Siente curiosidad por la etiqueta "Nómina Directivos" y decide llevarla a su escritorio para revisarla.',
        question: '¿Qué acción debió realizar el funcionario conforme a los protocolos de seguridad física de la información?',
        options: [
          {
            text: 'Conectarla inmediatamente al computador principal del servidor del SISBÉN para revisar si contiene virus.',
            score: 0,
            feedback: 'El peor error posible: Conectar un dispositivo desconocido en un activo crítico expone toda la infraestructura.',
            isOptimal: false
          },
          {
            text: 'No conectarla a ningún equipo y entregarla formalmente al área de Sistemas / Seguridad de la Información como posible señuelo de ataque (Baiting).',
            score: 25,
            feedback: 'Conducta ejemplar: Reconoce el ataque de Baiting y evita la materialización del vector de contagio.',
            isOptimal: true
          },
          {
            text: 'Llevarla a su casa y conectarla en el computador de sus hijos pequeños para ver qué fotos tiene.',
            score: 0,
            feedback: 'Pone en riesgo inminente los dispositivos y la privacidad de su hogar.',
            isOptimal: false
          },
          {
            text: 'Guardarla en su billetera y venderla por 10.000 pesos en la calle.',
            score: 0,
            feedback: 'Conducta no ética que no resuelve el riesgo de seguridad institucional.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Contención',
        title: 'Fase 2: Respuesta ante la Inserción de la USB Maliciosa',
        situation: 'El funcionario la conectó a su PC. En la pantalla no se abrió ninguna carpeta de Word, pero una ventana negra de consola PowerShell parpadeó durante 1 segundo y desapareció. El ventilador del equipo empezó a sonar a máxima velocidad.',
        question: 'Como aprendiz SENA que está realizando la etapa práctica en el área de sistemas del municipio, ¿qué acción de contención aplicas?',
        options: [
          {
            text: 'Retirar la USB de inmediato, desconectar el cable de red del computador, abrir el Administrador de Tareas para identificar el proceso PowerShell anómalo y registrar el PID.',
            score: 25,
            feedback: 'Excelente respuesta de primer respondiente: Detiene la comunicación con el atacante y registra el proceso en ejecución para triaje.',
            isOptimal: true
          },
          {
            text: 'Pedirle al funcionario que abra YouTube para ver si el sonido del ventilador se calma.',
            score: 0,
            feedback: 'Respuesta absurda: Ignora los síntomas clásicos de ejecución de un script malicioso en segundo plano.',
            isOptimal: false
          },
          {
            text: 'Dejar el computador conectado y salir a almorzar durante 2 horas.',
            score: 0,
            feedback: 'Permite que el script complete la exfiltración de la base de datos municipal sin oposición.',
            isOptimal: false
          },
          {
            text: 'Copiar los archivos de la USB en la red compartida de toda la alcaldía.',
            score: 0,
            feedback: 'Multiplica la catástrofe infectando todas las dependencias municipales.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Erradicación',
        title: 'Fase 3: Auditoría y Desinfección del Dispositivo y del Host',
        situation: 'En un equipo de análisis aislado (Sandbox/Air-gapped), se inspecciona la memoria USB. Contiene un archivo con acceso directo LNK modificado que ejecuta PowerShell con parámetros ocultos: "-WindowStyle Hidden -ExecutionPolicy Bypass -Enc ...".',
        question: '¿Qué medida técnica en el sistema operativo previene la ejecución de este tipo de scripts no autorizados?',
        options: [
          {
            text: 'Configurar directivas de grupo (GPO) con AppLocker / Software Restriction Policies y habilitar PowerShell Constrained Language Mode junto a bloqueo de puertos USB por directiva.',
            score: 25,
            feedback: 'Respuesta de nivel senior: El endurecimiento (Hardening) de directivas del sistema operativo impide que scripts no firmados se ejecuten aun si se inserta el medio.',
            isOptimal: true
          },
          {
            text: 'Ponerle una calcomanía reflectiva al computador que diga "Prohibido hackear".',
            score: 0,
            feedback: 'Ningún atacante ni script malicioso respeta calcomanías.',
            isOptimal: false
          },
          {
            text: 'Desinstalar el sistema operativo Windows e instalar un emulador de PlayStation 2.',
            score: 0,
            feedback: 'Respuesta sin sentido para una red municipal.',
            isOptimal: false
          },
          {
            text: 'Cambiar el mouse de USB a inalámbrico.',
            score: 0,
            feedback: 'No tiene relación con la vulnerabilidad de ejecución de código.',
            isOptimal: false
          }
        ]
      },
      {
        phase: 'Lecciones Aprendidas',
        title: 'Fase 4: Política Institucional de Medios Extraíbles',
        situation: 'El incidente fue neutralizado antes de que la base del SISBÉN fuera enviada a internet. Se debe redactar la política de seguridad para el despacho del Alcalde.',
        question: '¿Cuál es la política definitiva más efectiva para erradicar el riesgo de memorias USB en entidades públicas?',
        options: [
          {
            text: 'Deshabilitar por directiva GPO el uso de unidades de almacenamiento masivo USB en todos los puestos estándar (salvo excepciones criptográficamente aprobadas) e impartir capacitación continua de ingeniería social.',
            score: 25,
            feedback: 'Medida estándar en la industria y el estado: Elimina la superficie de ataque física de medios extraíbles y robustece la concientización.',
            isOptimal: true
          },
          {
            text: 'Comprar memorias USB de colores llamativos para que nadie las pierda.',
            score: 0,
            feedback: 'No previene que un tercero malicioso plante una memoria con cebo.',
            isOptimal: false
          },
          {
            text: 'Permitir que los funcionarios lleven sus computadores personales de su casa para no usar los de la alcaldía.',
            score: 0,
            feedback: 'Crea el problema de BYOD no controlado y multiplica las brechas de seguridad.',
            isOptimal: false
          },
          {
            text: 'Ignorar el evento y confiar en la suerte.',
            score: 0,
            feedback: 'La suerte no es una estrategia de ciberseguridad.',
            isOptimal: false
          }
        ]
      }
    ]
  }
];
