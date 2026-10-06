import React, { useState } from 'react';
import {
  AlertOctagon,
  ShieldAlert,
  Flame,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  Building,
  Briefcase,
  Layers
} from 'lucide-react';
import { REAL_CASES } from '../data/casesData';
import { RealCase, TriageStep } from '../types';

interface TriageCasesViewProps {
  onCaseScoreUpdate: (caseId: string, score: number) => void;
  caseScores: Record<string, number>;
}

export const TriageCasesView: React.FC<TriageCasesViewProps> = ({
  onCaseScoreUpdate,
  caseScores,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(REAL_CASES[0].id);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [userDecisions, setUserDecisions] = useState<Record<string, Record<number, number>>>({});

  const activeCase = REAL_CASES.find((c) => c.id === selectedCaseId) || REAL_CASES[0];
  const activeStep: TriageStep = activeCase.nistPhases[activePhaseIndex];

  const handleSelectOption = (optionIndex: number) => {
    const updatedCaseDecisions = {
      ...(userDecisions[activeCase.id] || {}),
      [activePhaseIndex]: optionIndex,
    };

    const newAllDecisions = {
      ...userDecisions,
      [activeCase.id]: updatedCaseDecisions,
    };
    setUserDecisions(newAllDecisions);

    // Calculate total score for this case
    let totalScore = 0;
    activeCase.nistPhases.forEach((phase, idx) => {
      const chosenOptIdx = updatedCaseDecisions[idx];
      if (chosenOptIdx !== undefined) {
        totalScore += phase.options[chosenOptIdx].score;
      }
    });

    onCaseScoreUpdate(activeCase.id, totalScore);
  };

  const handleNextPhase = () => {
    if (activePhaseIndex < activeCase.nistPhases.length - 1) {
      setActivePhaseIndex(activePhaseIndex + 1);
    }
  };

  const handlePrevPhase = () => {
    if (activePhaseIndex > 0) {
      setActivePhaseIndex(activePhaseIndex - 1);
    }
  };

  const handleResetCase = () => {
    setUserDecisions((prev) => {
      const next = { ...prev };
      delete next[activeCase.id];
      return next;
    });
    setActivePhaseIndex(0);
    onCaseScoreUpdate(activeCase.id, 0);
  };

  const currentChosenOptionIndex = userDecisions[activeCase.id]?.[activePhaseIndex];
  const currentCaseTotalScore = caseScores[activeCase.id] || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
              <AlertOctagon className="w-3.5 h-3.5" />
              Centro de Operaciones de Ciberseguridad (SOC) • Casos Reales
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Triaje Forense y Primer Respondiente (NIST SP 800-61)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Enfrenta 3 incidentes críticos de la industria colombiana. Actúa como el <strong>Primer Respondiente (First Responder)</strong> y toma decisiones bajo presión en las 4 fases del ciclo de vida del incidente.
            </p>
          </div>

          {/* Quick Score Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shrink-0 min-w-[240px]">
            <div className="text-xs text-slate-400 font-medium mb-1">
              Puntaje del Caso Activo:
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {currentCaseTotalScore} / 100 <span className="text-xs font-sans text-slate-400">pts</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Evidencia de Desempeño</span>
              <button
                onClick={handleResetCase}
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                title="Reiniciar este caso"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Case Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800">
          {REAL_CASES.map((c) => {
            const isSelected = selectedCaseId === c.id;
            const score = caseScores[c.id] || 0;

            return (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedCaseId(c.id);
                  setActivePhaseIndex(0);
                }}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-amber-500 shadow-md ring-1 ring-amber-500/40 text-white'
                    : 'bg-slate-850/80 border-slate-800 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>{c.year}</span>
                    <span className="text-amber-400 font-bold">{score} pts</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 line-clamp-1 mb-1">
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {c.targetEntity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Header Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800/80 font-bold uppercase">
              {activeCase.targetEntity} • {activeCase.year}
            </span>
            <h3 className="text-xl font-bold text-white mt-1.5">{activeCase.title}</h3>
            <p className="text-xs text-slate-300 mt-0.5">{activeCase.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Flame className="w-3.5 h-3.5" />
              Vector de Intrusión:
            </span>
            <p className="text-slate-300 leading-relaxed">{activeCase.vector}</p>
          </div>

          <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5" />
              Impacto Técnico y Operacional:
            </span>
            <p className="text-slate-300 leading-relaxed">{activeCase.impactSummary}</p>
          </div>
        </div>
      </div>

      {/* 4 NIST Phases Stepper Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
          {activeCase.nistPhases.map((phase, idx) => {
            const isCompleted = userDecisions[activeCase.id]?.[idx] !== undefined;
            const isActive = activePhaseIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => setActivePhaseIndex(idx)}
                className={`flex-1 min-w-[170px] p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600/20 border-amber-500 text-white'
                    : isCompleted
                    ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950'
                      : isCompleted
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Fase {idx + 1}</div>
                  <div className="font-semibold text-xs truncate">{phase.phase}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Interactive Station */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <span>Fase NIST: {activeStep.phase}</span>
            <span>Paso {activePhaseIndex + 1} de 4</span>
          </div>
          <h4 className="text-lg font-bold text-white">{activeStep.title}</h4>
        </div>

        {/* Situation Box */}
        <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 space-y-2">
          <div className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Clock className="w-4 h-4" />
            Situación Operativa en Curso:
          </div>
          <p className="leading-relaxed">{activeStep.situation}</p>
        </div>

        {/* Decision Question */}
        <div className="space-y-4">
          <div className="font-bold text-white text-sm bg-slate-800/80 p-3 rounded-xl border border-slate-750">
            {activeStep.question}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {activeStep.options.map((opt, optIdx) => {
              const isSelected = currentChosenOptionIndex === optIdx;
              const hasAnswered = currentChosenOptionIndex !== undefined;

              let btnStyle = 'bg-slate-850 border-slate-800 hover:bg-slate-800 text-slate-200';
              if (hasAnswered) {
                if (opt.isOptimal) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !opt.isOptimal) {
                  btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                }
              }

              return (
                <div key={optIdx} className="space-y-2">
                  <button
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-start gap-3.5 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed flex-1">{opt.text}</span>
                    {hasAnswered && opt.isOptimal && (
                      <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded font-mono shrink-0">
                        +25 pts
                      </span>
                    )}
                  </button>

                  {/* Feedback if selected or optimal */}
                  {hasAnswered && isSelected && (
                    <div
                      className={`p-3 rounded-xl border text-xs space-y-1 animate-fade-in ${
                        opt.isOptimal
                          ? 'bg-emerald-950/50 border-emerald-600/60 text-emerald-300'
                          : 'bg-rose-950/50 border-rose-600/60 text-rose-300'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {opt.isOptimal ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span>¡Decisión Correcta de Primer Respondiente!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Desviación Técnica Detectada ({opt.score} pts)</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed">{opt.feedback}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrevPhase}
            disabled={activePhaseIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            ← Fase Anterior
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {activePhaseIndex + 1} / 4 Fases NIST
          </span>

          <button
            onClick={handleNextPhase}
            disabled={activePhaseIndex === activeCase.nistPhases.length - 1}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Siguiente Fase</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
