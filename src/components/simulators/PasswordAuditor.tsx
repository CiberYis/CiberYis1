import React, { useState, useMemo } from 'react';
import {
  KeyRound,
  Eye,
  EyeOff,
  Wand2,
  Cpu,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Info,
  CheckCircle,
  Copy
} from 'lucide-react';
import { calculatePasswordEntropy, generateNistPassphrase } from '../../utils/cryptoUtils';

export const PasswordAuditor: React.FC = () => {
  const [password, setPassword] = useState<string>('Tr0b4dor!');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const entropyResult = useMemo(() => {
    return calculatePasswordEntropy(password);
  }, [password]);

  const handleGeneratePassphrase = () => {
    const newPass = generateNistPassphrase();
    setPassword(newPass);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            Simulador 1: Criptoanálisis & Entropía NIST SP 800-63B
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Auditor Criptográfico de Contraseñas y Generador de Passphrases
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calcula la entropía real en bits (<span className="font-mono text-emerald-400">H = L × log₂(R)</span>) y estima el tiempo de descifrado por fuerza bruta con hardware de GPUs moderno.
          </p>
        </div>

        <button
          onClick={handleGeneratePassphrase}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-xl text-xs shadow-lg shadow-emerald-950 transition-all shrink-0 cursor-pointer"
        >
          <Wand2 className="w-4 h-4" />
          <span>Generar Passphrase NIST (Español)</span>
        </button>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Ingresa o prueba una contraseña para auditar:
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe aquí tu clave..."
            className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500 font-mono tracking-wide focus:outline-none transition-colors pr-24"
          />
          <div className="absolute right-3 top-2.5 flex items-center gap-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/80 transition-colors cursor-pointer"
              title={showPassword ? 'Ocultar caracteres' : 'Mostrar caracteres'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/80 transition-colors cursor-pointer"
              title="Copiar contraseña"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
          <span>Longitud: {password.length} caracteres</span>
          <span>Juego de caracteres (R): {entropyResult.poolSize} símbolos</span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Bits of Entropy */}
        <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Entropía Matemática</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400">
              {entropyResult.bits} <span className="text-sm font-sans text-slate-400">bits</span>
            </div>
            <div className={`text-xs font-semibold mt-1 ${entropyResult.strengthColor}`}>
              Nivel: {entropyResult.strengthLevel}
            </div>
          </div>
          <div className="w-full bg-slate-750 h-2 rounded-full overflow-hidden mt-3">
            <div
              className={`h-full transition-all duration-300 ${
                entropyResult.bits >= 75
                  ? 'bg-emerald-500'
                  : entropyResult.bits >= 50
                  ? 'bg-teal-500'
                  : entropyResult.bits >= 35
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, (entropyResult.bits / 85) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Metric 2: Crack Time GPU Rig */}
        <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Fuerza Bruta Rig GPU</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-purple-300 line-clamp-1">
              {entropyResult.crackTimeOffline}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              8x NVIDIA RTX 4090 (~350 GH/s en hash NTLM)
            </div>
          </div>
          <div className="text-[10px] text-slate-500 mt-2 bg-slate-800/80 p-2 rounded border border-slate-750">
            Ataque fuera de línea tras filtración de base de datos de hashes.
          </div>
        </div>

        {/* Metric 3: Online Attack */}
        <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Ataque en Línea</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-sky-300 line-clamp-1">
              {entropyResult.crackTimeOnline}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Con firewall y limitador de tasa (100 intentos/min)
            </div>
          </div>
          <div className="text-[10px] text-slate-500 mt-2 bg-slate-800/80 p-2 rounded border border-slate-750">
            Ataque remoto directo al formulario web de inicio de sesión.
          </div>
        </div>
      </div>

      {/* Forensic Analysis & Tips */}
      <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2.5">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400" />
          <span>Diagnóstico Criptográfico y Detección de Debilidades</span>
        </h4>
        <div className="space-y-1.5">
          {entropyResult.analysisPoints.map((point, idx) => (
            <div key={idx} className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NIST Comparison Table */}
      <div className="border border-slate-800 bg-slate-850/60 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          Comparativa Didáctica: Regla Clásica Obsoleta vs. Estándar NIST SP 800-63B
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3 space-y-2">
            <div className="font-bold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Modelo Antiguo (Complejidad Forzada)</span>
            </div>
            <div className="font-mono text-slate-200 bg-slate-900/80 p-2 rounded text-xs">
              Ejemplo: <strong className="text-rose-400">P@ssw0rd1!</strong> (10 caracteres)
            </div>
            <ul className="text-slate-400 space-y-1 text-[11px] list-disc list-inside">
              <li>Entropía real baja (~34 bits por palabras predecibles).</li>
              <li>Fácilmente adivinable por diccionarios y reglas de permutación.</li>
              <li>Difícil de recordar; el usuario la anota en un papel pegado al monitor.</li>
              <li>Obliga a cambios mensuales absurdos (P@ssw0rd2!, P@ssw0rd3!).</li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3 space-y-2">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Modelo Moderno NIST (Passphrase Larga)</span>
            </div>
            <div className="font-mono text-slate-200 bg-slate-900/80 p-2 rounded text-xs">
              Ejemplo: <strong className="text-emerald-400">Caballo-Laguna-Granito-Sol42</strong> (28 caracteres)
            </div>
            <ul className="text-slate-400 space-y-1 text-[11px] list-disc list-inside">
              <li>Entropía superior a 78 bits reales.</li>
              <li>Imposible de crackear por GPUs en millones de años.</li>
              <li>Fácil de recordar mentalmente como una historia visual.</li>
              <li>No requiere rotación forzada si no se ha detectado brecha previa.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
