import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Scale,
  KeyRound,
  Fingerprint,
  BrainCircuit,
  MailWarning,
  Bug,
  ServerCrash,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  BookMarked,
  Info,
  ExternalLink
} from 'lucide-react';
import { PILLAR_MODULES } from '../data/modulesData';
import { PillarModule } from '../types';

interface ModulesViewProps {
  completedModules: Record<number, boolean>;
  onCompleteModule: (moduleId: number) => void;
  onNavigateToSimulators: () => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({
  completedModules,
  onCompleteModule,
  onNavigateToSimulators,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [revealedFeedback, setRevealedFeedback] = useState<Record<number, boolean>>({});

  const categories = ['Todos', 'Fundamentos', 'Gestión de Riesgo', 'Gobernanza y Normas', 'Criptografía y Autenticación', 'Vectores de Ataque', 'Amenazas Técnicas', 'Defensa y Buenas Prácticas'];

  const filteredModules = selectedCategory === 'Todos'
    ? PILLAR_MODULES
    : PILLAR_MODULES.filter((m) => m.category === selectedCategory);

  const activeModule = PILLAR_MODULES.find((m) => m.id === selectedModuleId) || PILLAR_MODULES[0];

  const handleSelectOption = (moduleId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [moduleId]: optionIndex }));
    setRevealedFeedback((prev) => ({ ...prev, [moduleId]: true }));
    if (optionIndex === activeModule.quickCheck.correctIndex) {
      onCompleteModule(moduleId);
    }
  };

  const completedCount = Object.keys(completedModules).filter((k) => completedModules[Number(k)]).length;
  const progressPercent = Math.round((completedCount / PILLAR_MODULES.length) * 100);

  const renderIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'AlertTriangle': return <AlertTriangle className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'KeyRound': return <KeyRound className={className} />;
      case 'Fingerprint': return <Fingerprint className={className} />;
      case 'BrainCircuit': return <BrainCircuit className={className} />;
      case 'MailWarning': return <MailWarning className={className} />;
      case 'Bug': return <Bug className={className} />;
      case 'ServerCrash': return <ServerCrash className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner: Overview and Progress */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              10 Pilares Técnicos Fundamentales
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Eje Temático y Arquitectura Conceptual
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Diseñado bajo la metodología de Formación Profesional Integral del SENA. Cada módulo contiene lecciones de 20 años de experiencia técnica en la industria colombiana, desmontaje de mitos comunes y un mini-reto evaluativo.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shrink-0 min-w-[260px]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">Progreso de Pilares:</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">{completedCount} / 10 ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {completedCount === 10 ? '¡10 pilares superados!' : 'Responde cada mini-reto'}
              </span>
              <button
                onClick={onNavigateToSimulators}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Ir a Simuladores</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-800/80 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Modules Navigation & Active Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 10 Modules List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-medium">
            <span>Listado de Módulos Formativos</span>
            <span>Haz clic para explorar</span>
          </div>

          {filteredModules.map((module) => {
            const isCompleted = !!completedModules[module.id];
            const isSelected = selectedModuleId === module.id;

            return (
              <div
                key={module.id}
                onClick={() => setSelectedModuleId(module.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left ${
                  isSelected
                    ? 'bg-slate-800/95 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {renderIcon(module.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-emerald-400">
                        #{module.id < 10 ? `0${module.id}` : module.id}
                      </span>
                      <h3 className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {module.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isCompleted ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center" title="Completado">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-mono">Pendiente</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Module Deep Dive */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Header of Active Module */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Pilar #{activeModule.id} • {activeModule.category}
              </span>
              {completedModules[activeModule.id] && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mini-Reto Aprobado</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                {renderIcon(activeModule.iconName, 'w-5 h-5')}
              </span>
              <span>{activeModule.title}</span>
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {activeModule.theory.definition}
            </p>
          </div>

          {/* Key Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-emerald-400" />
              <span>Fundamentos Técnicos Esenciales</span>
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {activeModule.theory.keyPoints.map((point, idx) => (
                <div key={idx} className="bg-slate-850 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 font-mono font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Deep Dive */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-xs text-slate-300 space-y-1.5">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Info className="w-3.5 h-3.5" />
              Profundización de Estándar (NIST / ISO)
            </span>
            <p className="leading-relaxed">{activeModule.theory.technicalDeepDive}</p>
          </div>

          {/* The Voice of the SENA Instructor Card */}
          <div className="bg-gradient-to-br from-emerald-950/70 via-slate-850 to-slate-900 border-2 border-emerald-600/40 rounded-xl p-5 shadow-lg relative">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                SENA
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-300">
                  La Voz del Instructor SENA (20 Años de Experiencia)
                </h4>
                <p className="text-[11px] text-emerald-400/80">
                  Anécdotas reales del campo laboral y advertencias de la industria colombiana
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-emerald-900/50">
                <span className="font-semibold text-emerald-400 block mb-1">
                  💡 Caso de Campo Real en Colombia:
                </span>
                <p className="italic text-slate-300 leading-relaxed">
                  "{activeModule.instructorVoice.anecdote}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-amber-900/40">
                  <span className="font-semibold text-amber-400 block mb-1">
                    ⚠️ Error Común en Empresas:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {activeModule.instructorVoice.industryWarning}
                  </p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-emerald-900/40">
                  <span className="font-semibold text-emerald-400 block mb-1">
                    🎯 Regla de Oro del Instructor:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {activeModule.instructorVoice.ruleOfThumb}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contexto Nacional Colombia */}
          <div className="border border-slate-800 bg-slate-850/60 rounded-xl p-4 text-xs text-slate-300">
            <span className="font-semibold text-slate-200 block mb-1">
              🇨🇴 Contexto Legal y Tecnológico Colombiano:
            </span>
            <p className="leading-relaxed text-slate-300">
              {activeModule.colombianContext}
            </p>
          </div>

          {/* Glossary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Glosario Técnico Inmediato
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {activeModule.glossary.map((item, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-750 p-2.5 rounded-lg">
                  <div className="font-semibold text-emerald-400 font-mono text-[11px] mb-1">
                    {item.term}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    {item.definition}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Quick Check */}
          <div className="border-t border-slate-800 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">
                  Mini-Reto de Comprensión Laboral
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">
                Requisito para habilitar juicio de competencia
              </span>
            </div>

            <p className="text-xs font-medium text-slate-200 bg-slate-850 p-3 rounded-lg border border-slate-800">
              {activeModule.quickCheck.question}
            </p>

            <div className="space-y-2">
              {activeModule.quickCheck.options.map((opt, optIdx) => {
                const selected = userAnswers[activeModule.id] === optIdx;
                const isCorrect = optIdx === activeModule.quickCheck.correctIndex;
                const revealed = revealedFeedback[activeModule.id];

                let optionStyles = 'bg-slate-800/70 border-slate-700 hover:bg-slate-750 text-slate-200';
                if (revealed) {
                  if (isCorrect) {
                    optionStyles = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium';
                  } else if (selected && !isCorrect) {
                    optionStyles = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }
                } else if (selected) {
                  optionStyles = 'bg-slate-700 border-slate-500 text-white';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(activeModule.id, optIdx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${optionStyles}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 font-mono text-[10px] font-bold">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Revealed Feedback */}
            {revealedFeedback[activeModule.id] && (
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-1 animate-fade-in ${
                  userAnswers[activeModule.id] === activeModule.quickCheck.correctIndex
                    ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-300'
                    : 'bg-amber-950/60 border-amber-600/60 text-amber-300'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {userAnswers[activeModule.id] === activeModule.quickCheck.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>¡Correcto! Respuesta técnicamente precisa.</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Atención: Revisa el argumento técnico del instructor.</span>
                    </>
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeModule.quickCheck.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
