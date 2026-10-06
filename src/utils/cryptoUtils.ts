// Diccionario pedagógico en español para passphrases según NIST SP 800-63B
const SPANISH_WORDLIST = [
  'aguila', 'arbol', 'arena', 'aurora', 'bosque', 'brújula', 'caballo', 'camino',
  'canario', 'carretera', 'castillo', 'cedro', 'ceniza', 'cereza', 'cipres', 'colina',
  'cometa', 'cordillera', 'cristal', 'delfin', 'desierto', 'diamante', 'durazno', 'eco',
  'elefante', 'encina', 'espejo', 'estrella', 'farallon', 'faro', 'flamenco', 'galaxia',
  'gaviota', 'glaciar', 'granito', 'guacamaya', 'horizonte', 'huella', 'iguana', 'isla',
  'jaguar', 'laberinto', 'laguna', 'laurel', 'libelula', 'limon', 'lobo', 'manantial',
  'mariposa', 'medusa', 'melocoton', 'mirlo', 'montaña', 'morrena', 'neblina', 'nevado',
  'oasis', 'oceano', 'orquidea', 'palmera', 'pantano', 'paraje', 'pelicano', 'peninsula',
  'pinaculo', 'puma', 'quebrada', 'quimbaya', 'rayo', 'recife', 'relampago', 'rio',
  'robledal', 'rosal', 'safiro', 'sendero', 'sierra', 'sol', 'sonido', 'tacto',
  'tormenta', 'trueno', 'tulipan', 'valle', 'viento', 'volcan', 'zorro', 'armadillo'
];

export interface EntropyResult {
  bits: number;
  poolSize: number;
  crackTimeOffline: string;
  crackTimeOnline: string;
  strengthLevel: 'Muy Débil' | 'Débil' | 'Moderada' | 'Fuerte' | 'Excelente';
  strengthColor: string;
  analysisPoints: string[];
}

export function calculatePasswordEntropy(password: string): EntropyResult {
  if (!password) {
    return {
      bits: 0,
      poolSize: 0,
      crackTimeOffline: '0 segundos',
      crackTimeOnline: '0 segundos',
      strengthLevel: 'Muy Débil',
      strengthColor: 'text-rose-500',
      analysisPoints: ['Ingresa una contraseña para analizar su entropía.'],
    };
  }

  let poolSize = 0;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumbers) poolSize += 10;
  if (hasSymbols) poolSize += 33;

  if (poolSize === 0) poolSize = 1;

  // Entropía teórica en bits: H = L * log2(R)
  let bits = Math.round(password.length * Math.log2(poolSize));

  const analysisPoints: string[] = [];

  // Detección de patrones y penalizaciones de entropía real
  const commonWeak = [
    '123456', '12345678', 'password', 'contraseña', 'admin', 'qwerty',
    'sena2024', 'sena2025', 'sena2026', 'colombia', 'medellin', 'bogota', 'cali'
  ];

  const lowerPwd = password.toLowerCase();
  const isCommon = commonWeak.some((weak) => lowerPwd.includes(weak));

  if (isCommon) {
    bits = Math.max(10, Math.floor(bits * 0.35));
    analysisPoints.push('⚠️ Contiene patrones vulnerables comunes o palabras de diccionario frecuentes.');
  }

  if (/(.)\1{2,}/.test(password)) {
    bits = Math.max(10, bits - 15);
    analysisPoints.push('⚠️ Caracteres repetidos consecutivos detectados (ej: "aaa", "111").');
  }

  if (/^(012|123|234|345|456|567|678|789|abc|bcd|cde)/i.test(password)) {
    bits = Math.max(10, bits - 12);
    analysisPoints.push('⚠️ Secuencias numéricas o alfabéticas consecutivas detectadas.');
  }

  if (password.length >= 16) {
    analysisPoints.push('✅ Excelente longitud (>16 caracteres), altamente resistente a ataques de diccionario y permutaciones.');
  } else if (password.length >= 12) {
    analysisPoints.push('✅ Longitud aceptable conforme a NIST SP 800-63B (>12 caracteres).');
  } else {
    analysisPoints.push('❌ Longitud insuficiente (<12 caracteres). Longitud es el factor exponencial clave.');
  }

  if (poolSize > 60) {
    analysisPoints.push('✅ Diversidad de juego de caracteres (mayúsculas, minúsculas, dígitos y símbolos).');
  }

  // Estimación de tiempo con GPU Rig moderna (8x RTX 4090 ~ 3.5e11 hashes/segundo para NTLM)
  const combinations = Math.pow(2, bits);
  const hashesPerSecOffline = 3.5e11;
  const secondsOffline = combinations / (hashesPerSecOffline * 2);

  const attemptsPerSecOnline = 1.66; // 100 intentos por min
  const secondsOnline = combinations / (attemptsPerSecOnline * 2);

  const formatDuration = (seconds: number): string => {
    if (seconds < 1) return 'Instantáneo (< 1 seg)';
    if (seconds < 60) return `${Math.round(seconds)} segundos`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutos`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} horas`;
    if (seconds < 86400 * 30) return `${Math.round(seconds / 86400)} días`;
    if (seconds < 86400 * 365) return `${Math.round(seconds / (86400 * 30))} meses`;
    if (seconds < 86400 * 365 * 1000) return `${Math.round(seconds / (86400 * 365))} años`;
    if (seconds < 86400 * 365 * 1e6) return `${(seconds / (86400 * 365 * 1000)).toFixed(1)} mil años`;
    if (seconds < 86400 * 365 * 1e9) return `${(seconds / (86400 * 365 * 1e6)).toFixed(1)} millones de años`;
    return 'Siglos incontables (> 1 billón de años)';
  };

  let strengthLevel: EntropyResult['strengthLevel'] = 'Muy Débil';
  let strengthColor = 'text-rose-500';

  if (bits >= 75) {
    strengthLevel = 'Excelente';
    strengthColor = 'text-emerald-500';
  } else if (bits >= 55) {
    strengthLevel = 'Fuerte';
    strengthColor = 'text-teal-500';
  } else if (bits >= 40) {
    strengthLevel = 'Moderada';
    strengthColor = 'text-amber-500';
  } else if (bits >= 25) {
    strengthLevel = 'Débil';
    strengthColor = 'text-orange-500';
  }

  return {
    bits,
    poolSize,
    crackTimeOffline: formatDuration(secondsOffline),
    crackTimeOnline: formatDuration(secondsOnline),
    strengthLevel,
    strengthColor,
    analysisPoints,
  };
}

export function generateNistPassphrase(): string {
  const chosen: string[] = [];
  const separators = ['-', '.', '#', '_'];
  const sep = separators[Math.floor(Math.random() * separators.length)];

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * SPANISH_WORDLIST.length);
    let word = SPANISH_WORDLIST[randomIndex];
    word = word.charAt(0).toUpperCase() + word.slice(1);
    chosen.push(word);
  }

  const randomNum = Math.floor(Math.random() * 90) + 10;
  return `${chosen.join(sep)}${sep}${randomNum}`;
}
