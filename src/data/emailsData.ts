import { EmailSample } from '../types';

export const SIMULATED_EMAILS: EmailSample[] = [
  {
    id: 'email-dian-embargo',
    subject: 'URGENTE: Notificación de Embargo Coactivo de Cuentas y Bienes - Mandamiento N° 849204-DIAN',
    senderDisplay: 'Dirección de Impuestos y Aduanas Nacionales (DIAN)',
    senderAddress: 'notificaciones@dian-coactivas-colombia.co',
    returnPath: 'bounce-tracker@spammer-vps-server44.ru',
    date: 'Hoy, 08:23 AM',
    spfResult: 'FAIL',
    dkimResult: 'FAIL',
    dmarcResult: 'FAIL',
    targetedEntity: 'Dirección de Impuestos y Aduanas Nacionales (DIAN)',
    bodyHtml: `
      <div class="space-y-3 font-sans text-sm text-slate-800">
        <div class="border-b pb-2 flex items-center justify-between">
          <span class="font-bold text-red-700 uppercase tracking-wide">⚠️ Notificación Judicial Inmediata</span>
          <span class="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">Auto 2024-DIAN-89</span>
        </div>
        <p>Estimado(a) Contribuyente y/o Representante Legal,</p>
        <p>Le notificamos que el Juzgado de Cobro Coactivo de la Dirección de Impuestos y Aduanas Nacionales ha decretado el <strong>EMBARGO PREVENTIVO DE SUS CUENTAS BANCARIAS</strong> y el registro en centrales de riesgo por presuntas inconsistencias en sus declaraciones tributarias.</p>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-3 my-2 text-xs">
          <strong>PLAZO PERENTORIO:</strong> Dispone de veinticuatro (24) horas hábiles para interponer recurso de reposición o cancelar la obligación antes del congelamiento financiero.
        </div>
        <p>Para consultar el detalle de las cuentas afectadas y liquidar el valor pendiente, descargue el expediente anexo en este comunicado.</p>
      </div>
    `,
    attachments: [
      {
        name: 'Expediente_Embargo_DIAN_Exp849204.pdf.exe',
        size: '1.4 MB',
        extension: '.exe',
        isMalicious: true
      }
    ],
    hoverUrlTarget: 'http://dian-coactivas-colombia.co/descargas/payload.exe',
    displayUrlText: 'https://www.dian.gov.co/tramites/cobrocoactivo/expediente',
    isPhishing: true,
    technicalIOCs: [
      'Remitente falso: Dominio "dian-coactivas-colombia.co" registrado recientemente en vez del dominio oficial del estado ".gov.co".',
      'Return-Path discrepante: Apunta a "bounce-tracker@spammer-vps-server44.ru".',
      'Fallo en SPF / DKIM / DMARC: El servidor emisor no está autorizado por la DIAN.',
      'Archivo malicioso con doble extensión: "Expediente_Embargo_DIAN_Exp849204.pdf.exe" oculta un ejecutable malicioso bajo la apariencia de un PDF.',
      'Gatillo de urgencia extrema y pánico de 24 horas para bloquear el pensamiento crítico del receptor.'
    ],
    forensicAnalysis: 'Phishing institucional de alta severidad utilizado para distribuir troyanos bancarios y keyloggers (como Grandoreiro). El atacante abusa del miedo a un embargo financiero y oculta un ejecutable .exe.'
  },
  {
    id: 'email-banco-bloqueo',
    subject: 'Su cuenta ha sido temporalmente inhabilitada por seguridad - Confirme sus datos',
    senderDisplay: 'Bancolombia Sucursal Virtual',
    senderAddress: 'seguridad-alertas@banc0l0mbia-verificacion.com',
    returnPath: 'mailer@hostinger-shared-phish.net',
    date: 'Ayer, 09:14 PM',
    spfResult: 'FAIL',
    dkimResult: 'NONE',
    dmarcResult: 'FAIL',
    targetedEntity: 'Bancolombia',
    bodyHtml: `
      <div class="space-y-3 font-sans text-sm text-slate-800">
        <div class="border-b pb-2 flex items-center justify-between">
          <span class="font-bold text-amber-600">Alerta de Seguridad en Línea</span>
          <span class="text-xs text-slate-500 font-mono">Ref: BCOL-9921</span>
        </div>
        <p>Apreciado cliente de Bancolombia,</p>
        <p>Hemos detectado un intento de inicio de sesión no reconocido desde una dirección IP en el exterior (Moscú, Rusia). Para resguardar su capital, hemos bloqueado preventivamente sus productos.</p>
        <p>Para desbloquear su cuenta y verificar su identidad, ingrese inmediatamente a nuestra sucursal virtual haciendo clic en el siguiente botón:</p>
        <div class="py-2 text-center">
          <span class="inline-block bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded shadow-sm text-xs cursor-pointer border border-yellow-500">
            DESBLOQUEAR MI CUENTA AHORA
          </span>
        </div>
        <p class="text-xs text-slate-500">Si no realiza la validación en menos de 2 horas, su tarjeta débito y crédito serán anuladas de forma definitiva.</p>
      </div>
    `,
    hoverUrlTarget: 'https://banc0l0mbia-verificacion.com/login.php?token=92842',
    displayUrlText: 'https://sucursalvirtual.bancolombia.com/personas',
    isPhishing: true,
    technicalIOCs: [
      'Ataque de homógrafo / Typosquatting: El dominio utiliza ceros en vez de letras "o" ("banc0l0mbia").',
      'Desalineación de URL: El texto mostrado simula la web bancaria legítima, pero el hipervínculo real apunta a un servidor phishing externo.',
      'DMARC Fail y SPF Fail: No coincide con los servidores de correo autorizados por el Grupo Bancolombia.',
      'Gatillo psicológico de miedo a bloqueo en 2 horas y solicitud directa de credenciales en un portal externo.'
    ],
    forensicAnalysis: 'Campana de Phishing de credenciales bancarias. Busca capturar usuario, clave de 4 dígitos y token de seguridad mediante un sitio web clonado con certificado HTTPS fraudulento.'
  },
  {
    id: 'email-sena-oficial',
    subject: 'Convocatoria y Bienvenida: Inducción Programa Articulación con la Media Técnica 2024',
    senderDisplay: 'Servicio Nacional de Aprendizaje SENA',
    senderAddress: 'articulacion.bogota@sena.edu.co',
    returnPath: 'articulacion.bogota@sena.edu.co',
    date: 'Lunes, 10:00 AM',
    spfResult: 'PASS',
    dkimResult: 'PASS',
    dmarcResult: 'PASS',
    targetedEntity: 'SENA - Servicio Nacional de Aprendizaje',
    bodyHtml: `
      <div class="space-y-3 font-sans text-sm text-slate-800">
        <div class="border-b pb-2 flex items-center justify-between">
          <span class="font-bold text-emerald-700">Comité de Articulación con la Educación Media</span>
          <span class="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">Ficha Técnica Oficial</span>
        </div>
        <p>Apreciados Aprendices de Grado 10° y 11° y Directivos Docentes,</p>
        <p>Nos complace darles la bienvenida formal al ciclo de formación técnica profesional en el marco del convenio de Articulación con la Media Técnica SENA.</p>
        <p>Los talleres presenciales y las evidencias de aprendizaje se gestionarán a través de las plataformas institucionales oficiales. Recuerden que el SENA <strong>NUNCA</strong> les solicitará contraseñas ni dinero para trámites de matrícula o certificación.</p>
        <p>Pueden consultar el calendario académico y normativo en el portal oficial del SENA:</p>
      </div>
    `,
    attachments: [
      {
        name: 'Guia_Aprendizaje_Ciberseguridad_01.pdf',
        size: '420 KB',
        extension: '.pdf',
        isMalicious: false
      }
    ],
    hoverUrlTarget: 'https://www.senasofiaplus.edu.co/sofia-public/inicio.faces',
    displayUrlText: 'https://www.senasofiaplus.edu.co',
    isPhishing: false,
    technicalIOCs: [
      'Dominio institucional legítimo: "@sena.edu.co" perteneciente al Servicio Nacional de Aprendizaje.',
      'Verificación criptográfica completa: SPF, DKIM y DMARC en estado PASS.',
      'Enlace verificado: Coincide exactamente con el portal seguro oficial senasofiaplus.edu.co.',
      'Archivo adjunto legítimo: Formato PDF sin extensiones dobles ni macros ejecutables.',
      'Sin gatillos de pánico: Contenido formativo e informativo sin peticiones de claves personales.'
    ],
    forensicAnalysis: 'Correo 100% Legítimo e Institucional. Cumple con todos los estándares RFC de autenticación de correo y directrices del estado colombiano.'
  },
  {
    id: 'email-secretaria-educacion',
    subject: 'Circular Informativa: Calendario de Evaluaciones y Entrega de Boletines Grado 10° y 11°',
    senderDisplay: 'Secretaría de Educación Distrital',
    senderAddress: 'comunicaciones@sedbogota.edu.co',
    returnPath: 'mailer-relay@sedbogota.edu.co',
    date: 'Viernes, 03:15 PM',
    spfResult: 'PASS',
    dkimResult: 'PASS',
    dmarcResult: 'PASS',
    targetedEntity: 'Secretaría de Educación de Bogotá',
    bodyHtml: `
      <div class="space-y-3 font-sans text-sm text-slate-800">
        <div class="border-b pb-2 flex items-center justify-between">
          <span class="font-bold text-sky-800">Dirección de Educación Media y Superior</span>
          <span class="text-xs text-slate-500 font-mono">Circular 042-2024</span>
        </div>
        <p>Estimada Comunidad Educativa de los Colegios Distritales y en Convenio SENA,</p>
        <p>Por medio de la presente, remitimos el cronograma oficial correspondiente al cierre del periodo académico y la programación de entrega de boletines y valoraciones de competencias laborales.</p>
        <p>Agradecemos a los coordinadores y docentes articular las fechas con los instructores SENA asignados a cada institución.</p>
      </div>
    `,
    attachments: [
      {
        name: 'Circular_042_Cronograma_Academico.pdf',
        size: '650 KB',
        extension: '.pdf',
        isMalicious: false
      }
    ],
    hoverUrlTarget: 'https://www.educacionbogota.edu.co/portal_institucional/noticias/cronograma',
    displayUrlText: 'https://www.educacionbogota.edu.co',
    isPhishing: false,
    technicalIOCs: [
      'Dominio gubernamental verificado: "sedbogota.edu.co" con registros DNS consolidados.',
      'Autenticación SPF/DKIM/DMARC: Validada con PASS en servidores de correo distritales.',
      'Contenido pedagógico y formal sin solicitudes de credenciales o pagos.',
      'Archivo adjunto seguro: Documento PDF limpio sin código embebido.'
    ],
    forensicAnalysis: 'Correo Legítimo. No presenta ningún Indicador de Compromiso (IOC) y se ajusta a la comunicación regular de la secretaría de educación.'
  }
];
