import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileText,
  UserCheck
} from 'lucide-react';
import {
  SESSION_PLAN,
  PEDAGOGICAL_ANALOGIES,
  REMEDIATION_STRATEGIES
} from '../data/teacherGuideData';

export const TeacherGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'analogies' | 'remediation'>('timeline');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Módulo Exclusivo para el Docente e Instructor SENA
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Guía Metodológica de Sesión Formativa (120 Minutos)
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Estructurada bajo la pedagogía SENA de Formación Profesional Integral por Competencias Laborales para jóvenes de Media Técnica (Grados 10° y 11°). Incluye el cronograma minuto a minuto, analogías de alto impacto cognitivo y matriz de remediación.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto mt-6 pt-6 border-t border-slate-800 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Plan de Sesión Cronometrado (120 min)</span>
          </button>

          <button
            onClick={() => setActiveTab('analogies')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'analogies'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Decálogo Pedagógico & Analogías Cotidianas</span>
          </button>

          <button
            onClick={() => setActiveTab('remediation')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'remediation'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Matriz de Desviaciones Comunes & Remediación</span>
          </button>
        </div>
      </div>

      {/* Tab 1: 120-min Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs px-2 text-slate-400">
            <span>Secuencia Didáctica de la Clase Taller (2 Horas):</span>
            <span className="font-mono text-emerald-400 font-bold">Total: 120 minutos</span>
          </div>

          <div className="space-y-4">
            {SESSION_PLAN.map((segment, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col md:flex-row gap-5 items-start"
              >
                {/* Time Badge */}
                <div className="shrink-0 bg-slate-850 border border-slate-750 rounded-xl p-3 text-center min-w-[130px]">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Momento {idx + 1}</span>
                  <strong className="text-sm font-mono text-emerald-400 block mt-0.5">
                    {segment.timeRange}
                  </strong>
                  <span className="text-xs text-slate-300 font-semibold mt-1 inline-block bg-slate-800 px-2 py-0.5 rounded">
                    {segment.durationMinutes} min
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 flex-1 text-xs">
                  <div>
                    <h4 className="text-base font-bold text-white">{segment.title}</h4>
                    <span className="text-emerald-400/90 font-medium">{segment.focus}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-850 p-3 rounded-xl border border-slate-800">
                      <span className="font-semibold text-slate-300 block mb-1">
                        🎯 Rol del Instructor SENA:
                      </span>
                      <p className="text-slate-400 leading-relaxed">{segment.instructorAction}</p>
                    </div>

                    <div className="bg-slate-850 p-3 rounded-xl border border-slate-800">
                      <span className="font-semibold text-slate-300 block mb-1">
                        🧑‍💻 Actividad del Aprendiz (10° y 11°):
                      </span>
                      <p className="text-slate-400 leading-relaxed">{segment.apprenticeAction}</p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-750 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Evidencia para SofíaPlus:</strong> {segment.evidenceProduct}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Pedagogical Analogies */}
      {activeTab === 'analogies' && (
        <div className="space-y-4">
          <div className="text-xs px-2 text-slate-400">
            Analogías formuladas para erradicar la abstracción en aprendices de 15 a 17 años:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PEDAGOGICAL_ANALOGIES.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/80 uppercase">
                    Concepto: {item.concept}
                  </div>
                  <h4 className="text-base font-bold text-white">{item.analogyTitle}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-850 p-3.5 rounded-xl border border-slate-800 italic">
                    "{item.story}"
                  </p>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-800/60 p-3 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-300 block text-[11px] uppercase">
                      Conclusión Pedagógica Clave:
                    </span>
                    <p className="leading-relaxed">{item.pedagogicalTakeaway}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Remediation Strategies */}
      {activeTab === 'remediation' && (
        <div className="space-y-4">
          <div className="text-xs px-2 text-slate-400">
            Estrategias de intervención docente ante los errores diagnósticos más recurrentes:
          </div>

          <div className="space-y-4">
            {REMEDIATION_STRATEGIES.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Error Típico: "{item.misconception}"</span>
                  </h4>
                  <span className="text-xs font-mono text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800 shrink-0">
                    Incidencia: {item.impactRate}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-850 p-3 rounded-xl border border-slate-800">
                    <span className="font-semibold text-slate-400 block mb-1">
                      Causa Raíz Cognitiva:
                    </span>
                    <p className="text-slate-300 leading-relaxed">{item.rootCause}</p>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-800/60 p-3 rounded-xl">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      Estrategia de Remediación Práctica en Clase:
                    </span>
                    <p className="text-slate-200 leading-relaxed">{item.remediationAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
