import React, { useState } from 'react';
import {
  Scale,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Sliders,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Building2,
  HeartPulse,
  GraduationCap
} from 'lucide-react';

export const RiskCalculator: React.FC = () => {
  // Equation: Riesgo = (Amenaza * Vulnerabilidad * Impacto) / Controles
  const [threat, setThreat] = useState<number>(8);
  const [vulnerability, setVulnerability] = useState<number>(8);
  const [impact, setImpact] = useState<number>(9);
  const [controls, setControls] = useState<number>(2);

  // CIA Triad Balance Sliders
  const [confidentiality, setConfidentiality] = useState<number>(65);
  const [integrity, setIntegrity] = useState<number>(90);
  const [availability, setAvailability] = useState<number>(95);
  const [activeScenario, setActiveScenario] = useState<'hospital' | 'bank' | 'school'>('hospital');

  // Calculate Raw & Normalized Risk (0 - 100)
  const rawRisk = (threat * vulnerability * impact) / Math.max(1, controls);
  const normalizedRisk = Math.min(100, Math.round((rawRisk / 800) * 100));

  let riskLevel = 'Tolerable';
  let riskColor = 'text-emerald-400';
  let riskBg = 'bg-emerald-500/10 border-emerald-500/30';
  let riskBadge = 'bg-emerald-950 text-emerald-400 border-emerald-800';

  if (normalizedRisk >= 75) {
    riskLevel = 'Crítico';
    riskColor = 'text-rose-500';
    riskBg = 'bg-rose-500/10 border-rose-500/30';
    riskBadge = 'bg-rose-950 text-rose-400 border-rose-800';
  } else if (normalizedRisk >= 50) {
    riskLevel = 'Alto';
    riskColor = 'text-orange-400';
    riskBg = 'bg-orange-500/10 border-orange-500/30';
    riskBadge = 'bg-orange-950 text-orange-400 border-orange-800';
  } else if (normalizedRisk >= 25) {
    riskLevel = 'Moderado';
    riskColor = 'text-amber-400';
    riskBg = 'bg-amber-500/10 border-amber-500/30';
    riskBadge = 'bg-amber-950 text-amber-400 border-amber-800';
  }

  const handleApplyMitigation = () => {
    // Keeps threat high, but drastically cuts vulnerability and boosts controls
    setVulnerability(2);
    setControls(9);
  };

  const handleResetEquation = () => {
    setThreat(8);
    setVulnerability(8);
    setImpact(9);
    setControls(2);
  };

  const applyPresetScenario = (scenario: 'hospital' | 'bank' | 'school') => {
    setActiveScenario(scenario);
    if (scenario === 'hospital') {
      setConfidentiality(65);
      setIntegrity(90);
      setAvailability(98);
    } else if (scenario === 'bank') {
      setConfidentiality(95);
      setIntegrity(99);
      setAvailability(85);
    } else {
      setConfidentiality(60);
      setIntegrity(95);
      setAvailability(80);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-8 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          <Activity className="w-3.5 h-3.5" />
          Simulador 3: Modelado de Riesgo & Balance de la Tríada CID
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Calculadora Dinámica de Riesgo y Simulador de la Tríada CID
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Experimenta cómo mitigar vulnerabilidades y aumentar controles reduce el riesgo a niveles tolerables sin pretender eliminar las amenazas externas.
        </p>
      </div>

      {/* Part 1: Risk Equation Simulator */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white">
              Ecuación de Riesgo Dinámica (NIST SP 800-30 / ISO 27005)
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyMitigation}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simular Mitigación Técnica</span>
            </button>
            <button
              onClick={handleResetEquation}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Restablecer valores"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formula Visual Box */}
        <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs sm:text-sm text-slate-300 flex items-center gap-2 flex-wrap">
            <span className="text-slate-400">Riesgo =</span>
            <div className="flex flex-col items-center">
              <span className="border-b border-slate-600 px-2 pb-0.5 text-center">
                <span className="text-rose-400 font-bold">Amenaza ({threat})</span> ×{' '}
                <span className="text-amber-400 font-bold">Vulnerabilidad ({vulnerability})</span> ×{' '}
                <span className="text-sky-400 font-bold">Impacto ({impact})</span>
              </span>
              <span className="text-emerald-400 font-bold pt-0.5">
                Controles de Seguridad ({controls})
              </span>
            </div>
            <span className="text-slate-400">=</span>
            <span className="text-lg font-bold text-white font-mono">{normalizedRisk} / 100</span>
          </div>

          <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 shrink-0 ${riskBg}`}>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Nivel de Riesgo Calculado</div>
              <div className={`text-xl font-extrabold ${riskColor} flex items-center gap-1.5`}>
                <span>{normalizedRisk}%</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${riskBadge}`}>
                  {riskLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Slider 1: Amenaza */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>1. Amenaza Externa (Agente Causal)</span>
              </label>
              <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {threat} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={threat}
              onChange={(e) => setThreat(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Grupos de cibercrimen, ransomware, ataques automatizados en internet (Existe afuera; no lo controlas).
            </p>
          </div>

          {/* Slider 2: Vulnerabilidad */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                <span>2. Vulnerabilidad Interna (Fallo del Activo)</span>
              </label>
              <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {vulnerability} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={vulnerability}
              onChange={(e) => setVulnerability(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Puertos abiertos sin necesidad, claves débiles, software sin parches (Está adentro; ¡sí puedes mitigarlo!).
            </p>
          </div>

          {/* Slider 3: Impacto */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-sky-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>3. Impacto Operacional / Financiero</span>
              </label>
              <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {impact} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={impact}
              onChange={(e) => setImpact(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Pérdidas económicas, sanciones por Habeas Data (SIC), paralización de servicios a ciudadanos.
            </p>
          </div>

          {/* Slider 4: Controles */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>4. Controles y Defensas Aplicadas</span>
              </label>
              <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {controls} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={controls}
              onChange={(e) => setControls(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              MFA obligatorio, backups 3-2-1 inmutables, segmentación de red, concientización contra phishing.
            </p>
          </div>
        </div>

        {/* Pedagogical Lesson Takeaway */}
        <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-emerald-300">
              Conclusión Estratégica del Instructor:
            </span>
            <p className="leading-relaxed">
              Observa cómo al pulsar <strong>"Simular Mitigación Técnica"</strong>, la Amenaza Externa sigue estando en 8/10 (los cibercriminales siguen existiendo en internet), pero al reducir la Vulnerabilidad interna a 2/10 e incrementar los Controles a 9/10, el Riesgo desciende a un nivel <strong>Tolerable</strong>. Esta es la esencia real de la ciberseguridad profesional.
            </p>
          </div>
        </div>
      </div>

      {/* Part 2: CIA Triad Balance Simulator */}
      <div className="border-t border-slate-800 pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <span>Simulador de Balance de la Tríada CID (Escenarios Reales)</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Ajusta los niveles de Confidencialidad, Integridad y Disponibilidad según la misión del sistema.
            </p>
          </div>

          {/* Scenario Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              onClick={() => applyPresetScenario('hospital')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeScenario === 'hospital'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Hospital Urgencias</span>
            </button>
            <button
              onClick={() => applyPresetScenario('bank')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeScenario === 'bank'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Banca Transaccional</span>
            </button>
            <button
              onClick={() => applyPresetScenario('school')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeScenario === 'school'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Sistema Escolar</span>
            </button>
          </div>
        </div>

        {/* 3 Pillars Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* C */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sky-400 uppercase tracking-wider">Confidencialidad</span>
              <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {confidentiality}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={confidentiality}
              onChange={(e) => setConfidentiality(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Cifrado, controles de acceso RBAC, acuerdos de confidencialidad y DLP.
            </p>
          </div>

          {/* I */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-400 uppercase tracking-wider">Integridad</span>
              <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {integrity}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={integrity}
              onChange={(e) => setIntegrity(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Hashing SHA-256, firmas digitales, no repudio y validación de bases de datos.
            </p>
          </div>

          {/* D */}
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-400 uppercase tracking-wider">Disponibilidad</span>
              <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {availability}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={availability}
              onChange={(e) => setAvailability(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Alta disponibilidad, redundancia de energía, réplicas y planes de continuidad de negocio.
            </p>
          </div>
        </div>

        {/* Dynamic Scenario Consequence Feedback */}
        <div className="bg-slate-850 border border-slate-750 rounded-xl p-4 text-xs space-y-2">
          <div className="font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Diagnóstico del Balance Operativo en este Escenario:</span>
          </div>

          {activeScenario === 'hospital' && (
            <p className="text-slate-300 leading-relaxed">
              En una sala de urgencias médicas, la <strong>Disponibilidad ({availability}%)</strong> es de vida o muerte: si un médico debe ingresar 4 contraseñas de 20 caracteres y un token por SMS para ver el tipo de sangre de un paciente que se desangra (exceso de confidencialidad a expensas de la disponibilidad), el paciente puede fallecer. Por eso se implementan protocolos de "Break-Glass" (acceso de emergencia auditable).
            </p>
          )}

          {activeScenario === 'bank' && (
            <p className="text-slate-300 leading-relaxed">
              En el core bancario transaccional, la <strong>Integridad ({integrity}%)</strong> es suprema: es preferible suspender temporalmente el servicio bancario 5 minutos (sacrificar disponibilidad) antes que permitir que un error o ciberataque altere los saldos de miles de ahorradores o duplique transacciones.
            </p>
          )}

          {activeScenario === 'school' && (
            <p className="text-slate-300 leading-relaxed">
              En la plataforma escolar, la <strong>Integridad ({integrity}%)</strong> asegura que nadie altere las notas de grado 11°, mientras que la confidencialidad protege los datos privados de menores conforme a la Ley 1581 de 2012 de Colombia.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
