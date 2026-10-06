import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Printer,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { EXAM_QUESTIONS, HARDENING_CHECKLIST } from '../data/examData';
import { ApprenticeProfile } from '../types';
import { EvaluationActPrintable } from './EvaluationActPrintable';

interface EvaluationViewProps {
  profile: ApprenticeProfile;
  performanceScore: number; // from Triage & Labs
  onKnowledgeScoreUpdate: (score: number) => void;
  onProductScoreUpdate: (score: number) => void;
  knowledgeScore: number;
  productScore: number;
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  profile,
  performanceScore,
  onKnowledgeScoreUpdate,
  onProductScoreUpdate,
  knowledgeScore,
  productScore,
}) => {
  const [subTab, setSubTab] = useState<'exam' | 'hardening' | 'act'>('exam');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [checkedHardening, setCheckedHardening] = useState<Record<string, boolean>>({
    'hard-1': true,
    'hard-2': true,
    'hard-3': false,
    'hard-4': false,
  });
  const [showRationale, setShowRationale] = useState<Record<number, boolean>>({});

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    const updatedAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(updatedAnswers);
    setShowRationale((prev) => ({ ...prev, [questionId]: true }));

    // Calculate knowledge score (0 to 100)
    let correctCount = 0;
    EXAM_QUESTIONS.forEach((q) => {
      if (updatedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });
    const score = Math.round((correctCount / EXAM_QUESTIONS.length) * 100);
    onKnowledgeScoreUpdate(score);
  };

  const handleToggleHardening = (itemId: string) => {
    const updated = { ...checkedHardening, [itemId]: !checkedHardening[itemId] };
    setCheckedHardening(updated);

    let totalPoints = 0;
    HARDENING_CHECKLIST.forEach((item) => {
      if (updated[item.id]) {
        totalPoints += item.points;
      }
    });
    onProductScoreUpdate(totalPoints);
  };

  const handleOpenAct = () => {
    setSubTab('act');
  };

  const handleResetExam = () => {
    setSelectedAnswers({});
    setShowRationale({});
    onKnowledgeScoreUpdate(0);
  };

  // Global weighted calculation
  const globalScore = Math.round(
    knowledgeScore * 0.4 + performanceScore * 0.35 + productScore * 0.25
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      {/* Top Banner & Summary Cards */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Evaluación por Competencias Laborales SENA
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Centro Evaluativo & Emisión de Juicio
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Integra las tres fuentes de evidencia oficiales: <strong>Conocimiento</strong> (Examen Técnico), <strong>Desempeño</strong> (Simuladores y Triaje NIST) y <strong>Producto</strong> (Aseguramiento Hardening).
            </p>
          </div>

          {/* Global Summary Badge */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 shrink-0 min-w-[260px] flex flex-col justify-between">
            <div className="text-xs text-slate-400 font-medium mb-1">
              Calificación Global Ponderada:
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">
                {globalScore}%
              </span>
              <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${
                globalScore >= 70
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : 'bg-rose-950 text-rose-400 border-rose-800'
              }`}>
                {globalScore >= 70 ? 'Competente' : 'Aún No Competente'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Umbral mínimo de aprobación SENA: 70%
            </div>
          </div>
        </div>

        {/* 3 Evidence Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-850/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono">1. Conocimiento (40%)</span>
              <div className="text-lg font-bold font-mono text-white">{knowledgeScore}%</div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              +{(knowledgeScore * 0.4).toFixed(1)} pts
            </span>
          </div>

          <div className="bg-slate-850/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono">2. Desempeño (35%)</span>
              <div className="text-lg font-bold font-mono text-white">{performanceScore}%</div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              +{(performanceScore * 0.35).toFixed(1)} pts
            </span>
          </div>

          <div className="bg-slate-850/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono">3. Producto (25%)</span>
              <div className="text-lg font-bold font-mono text-white">{productScore}%</div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              +{(productScore * 0.25).toFixed(1)} pts
            </span>
          </div>
        </div>
      </div>

      {/* Subtab Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-lg flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSubTab('exam')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs transition-all cursor-pointer ${
            subTab === 'exam'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Cuestionario Técnico Saber Pro ({knowledgeScore}%)</span>
        </button>

        <button
          onClick={() => setSubTab('hardening')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs transition-all cursor-pointer ${
            subTab === 'hardening'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>2. Evidencia de Producto: Hardening ({productScore}%)</span>
        </button>

        <button
          onClick={handleOpenAct}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs transition-all cursor-pointer ${
            subTab === 'act'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>3. Acta Oficial SENA (Imprimir / PDF)</span>
        </button>
      </div>

      {/* Subtab Content 1: Exam */}
      {subTab === 'exam' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs px-2 text-slate-400">
            <span>Responde las 10 preguntas situacionales tipo Saber Pro / SENA:</span>
            <button
              onClick={handleResetExam}
              className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Cuestionario</span>
            </button>
          </div>

          <div className="space-y-5">
            {EXAM_QUESTIONS.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-800/80">
                      Pregunta #{idx + 1} • {q.competencyArea}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref: {q.nistOrIsoReference}
                    </span>
                  </div>

                  {/* Scenario */}
                  <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-slate-200 block mb-1">Contexto / Caso Situacional:</strong>
                    <p className="leading-relaxed">{q.scenario}</p>
                  </div>

                  {/* Question */}
                  <div className="font-semibold text-white text-sm">
                    {q.question}
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      let optClass = 'bg-slate-850 border-slate-800 hover:bg-slate-800 text-slate-300';
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          optClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-medium';
                        } else if (selectedOpt === optIdx && !isCorrect) {
                          optClass = 'bg-rose-950/70 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${optClass}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Rationale & Feedback */}
                  {isAnswered && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 animate-fade-in ${
                        isCorrect
                          ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-300'
                          : 'bg-amber-950/40 border-amber-600/60 text-amber-300'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>¡Excelente! Respuesta Técnicamente Correcta.</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span>Justificación Técnica del Instructor:</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed">{q.technicalRationale}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleOpenAct}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-950 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Ver y Emitir Acta Oficial de Juicio Evaluativo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Subtab Content 2: Hardening Checklist (Product Evidence) */}
      {subTab === 'hardening' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              Lista de Chequeo de Hardening y Aseguramiento de Dispositivos
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Evidencia de Producto (25% del Juicio Evaluativo). Marca cada control técnico implementado y verificado en la estación de trabajo del aprendiz.
            </p>
          </div>

          <div className="space-y-4">
            {HARDENING_CHECKLIST.map((item) => {
              const isChecked = !!checkedHardening[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => handleToggleHardening(item.id)}
                  className={`p-4 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/60 text-white'
                      : 'bg-slate-850/80 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-5 h-5 rounded accent-emerald-500 mt-0.5 cursor-pointer"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 text-sm">{item.title}</span>
                      <span className="font-mono text-emerald-400 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/80 text-[11px]">
                        +{item.points} pts
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item.description}</p>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Categoría: {item.category} • Referencia: {item.nistRef}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 flex items-center justify-between">
            <span>Puntos de Producto Obtenidos:</span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {productScore} / 100 pts ({(productScore * 0.25).toFixed(1)}% ponderado)
            </span>
          </div>
        </div>
      )}

      {/* Subtab Content 3: Printable Evaluation Act */}
      {subTab === 'act' && (
        <EvaluationActPrintable
          profile={profile}
          knowledgeScore={knowledgeScore}
          performanceScore={performanceScore}
          productScore={productScore}
          onClose={() => setSubTab('exam')}
        />
      )}
    </div>
  );
};
