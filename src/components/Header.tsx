import React from 'react';
import { Shield, BookOpen, Cpu, AlertOctagon, Award, GraduationCap, Edit3 } from 'lucide-react';
import { ApprenticeProfile } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  activeTab: 'modules' | 'simulators' | 'cases' | 'evaluation' | 'teacher';
  setActiveTab: (tab: 'modules' | 'simulators' | 'cases' | 'evaluation' | 'teacher') => void;
  profile: ApprenticeProfile;
  onOpenProfileModal: () => void;
  completedModulesCount: number;
  totalModulesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenProfileModal,
  completedModulesCount,
  totalModulesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner: SENA Media Técnica Identification */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between border-b border-slate-800/80 gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SENA • SERVICIO NACIONAL DE APRENDIZAJE
          </div>
          <span className="text-slate-400 hidden sm:inline">
            Programa de Articulación con la Educación Media Técnica (Grados 10° y 11°)
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Botonera de Visualización Claro / Oscuro */}
          <ThemeToggle />

          {/* Apprentice Profile Chip */}
          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-emerald-500/50 px-3 py-1 rounded-md transition-all cursor-pointer group"
            title="Ver o editar datos del aprendiz"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-100 flex items-center gap-1.5 leading-tight">
                <span>{profile.fullName || 'Aprendiz SENA'}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800/60 font-mono">
                  {profile.grade}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono leading-tight">
                Ficha: {profile.courseGroup || 'No Asignada'} • {profile.institution ? profile.institution.slice(0, 24) + '...' : 'IE Articulada'}
              </div>
            </div>
            <Edit3 className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 ml-1 transition-colors" />
          </button>
        </div>
      </div>

      {/* Main Bar: Title & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 ring-2 ring-emerald-400/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>CiberSENA</span>
                <span className="text-emerald-400 font-mono text-sm uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  Media Técnica
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Plataforma Integral de Ciberseguridad, Simulación Forense y Evaluación por Competencias
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'modules'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>10 Pilares Técnicos</span>
            <span className="text-[10px] bg-slate-900/70 text-emerald-300 px-1.5 py-0.5 rounded-full font-mono">
              {completedModulesCount}/{totalModulesCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('simulators')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'simulators'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Simuladores en Vivo</span>
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Casos Reales Colombia</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluation')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'evaluation'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Evaluación & Acta</span>
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Guía Instructor (120m)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
