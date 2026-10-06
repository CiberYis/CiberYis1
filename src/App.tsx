import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ApprenticeModal } from './components/ApprenticeModal';
import { ModulesView } from './components/ModulesView';
import { SimulatorsView } from './components/simulators/SimulatorsView';
import { TriageCasesView } from './components/TriageCasesView';
import { EvaluationView } from './components/EvaluationView';
import { TeacherGuideView } from './components/TeacherGuideView';
import { ApprenticeProfile } from './types';
import { PILLAR_MODULES } from './data/modulesData';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import {
  ShieldCheck,
  Award,
  GraduationCap,
  Cpu,
  BookOpen,
  AlertOctagon,
  CheckCircle2,
  Calendar,
  School,
  FileText
} from 'lucide-react';

const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: 'Laura Sofía Restrepo Gómez',
  documentType: 'TI',
  documentId: '1085294812',
  institution: 'I.E. Técnico Industrial Pascual Bravo',
  courseGroup: '2874102',
  grade: '11°',
  sessionDate: new Date().toISOString().split('T')[0],
};

function AppContent() {
  const { isDark } = useTheme();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'modules' | 'simulators' | 'cases' | 'evaluation' | 'teacher'>('modules');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Apprentice Profile State with LocalStorage
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('cibersena_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Completed Modules State with LocalStorage
  const [completedModules, setCompletedModules] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cibersena_completed_modules');
      return saved ? JSON.parse(saved) : { 1: true, 2: true };
    } catch {
      return { 1: true, 2: true };
    }
  });

  // Triage Cases Scores State with LocalStorage
  const [caseScores, setCaseScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('cibersena_case_scores');
      return saved ? JSON.parse(saved) : { 'epm-ransomware-2022': 75 };
    } catch {
      return { 'epm-ransomware-2022': 75 };
    }
  });

  // Phishing Forensic Score
  const [phishingScore, setPhishingScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cibersena_phishing_score');
      return saved ? Number(saved) : 75;
    } catch {
      return 75;
    }
  });

  // Knowledge Score (Exam)
  const [knowledgeScore, setKnowledgeScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cibersena_knowledge_score');
      return saved ? Number(saved) : 80;
    } catch {
      return 80;
    }
  });

  // Product Score (Hardening)
  const [productScore, setProductScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cibersena_product_score');
      return saved ? Number(saved) : 50;
    } catch {
      return 50;
    }
  });

  // Save to LocalStorage effects
  useEffect(() => {
    localStorage.setItem('cibersena_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('cibersena_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('cibersena_case_scores', JSON.stringify(caseScores));
  }, [caseScores]);

  useEffect(() => {
    localStorage.setItem('cibersena_phishing_score', String(phishingScore));
  }, [phishingScore]);

  useEffect(() => {
    localStorage.setItem('cibersena_knowledge_score', String(knowledgeScore));
  }, [knowledgeScore]);

  useEffect(() => {
    localStorage.setItem('cibersena_product_score', String(productScore));
  }, [productScore]);

  // Handlers
  const handleCompleteModule = (moduleId: number) => {
    setCompletedModules((prev) => ({ ...prev, [moduleId]: true }));
  };

  const handleCaseScoreUpdate = (caseId: string, score: number) => {
    setCaseScores((prev) => ({ ...prev, [caseId]: score }));
  };

  // Performance Score calculation: 60% from Triage cases + 40% from Phishing Forensics Lab
  const caseScoreValues = Object.values(caseScores);
  const avgCasesScore = caseScoreValues.length > 0
    ? caseScoreValues.reduce((a, b) => a + b, 0) / Math.max(1, caseScoreValues.length)
    : 0;
  const performanceScore = Math.min(100, Math.round(avgCasesScore * 0.6 + phishingScore * 0.4));

  const completedCount = Object.keys(completedModules).filter((k) => completedModules[Number(k)]).length;

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Institutional Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        completedModulesCount={completedCount}
        totalModulesCount={PILLAR_MODULES.length}
      />

      {/* Hero Banner: Programa de Articulación con la Educación Media Técnica */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          {/* Header del Banner */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SENA • Centro de Operaciones de Ciberseguridad</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Programa de Articulación con la Educación Media Técnica
              </h2>
              <p className="text-xs text-slate-400">
                Formación de clase mundial en ciberseguridad, defensa proactiva e inteligencia de amenazas (Grados 10° y 11°)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-lg shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Norma NSCL: 220501096</span>
            </div>
          </div>

          {/* Imagen oficial colocada debajo del texto */}
          <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[380px] overflow-hidden bg-slate-950">
            <img
              src="/cibersena_laboratorio.jpg"
              alt="Programa de Articulación con la Educación Media Técnica - Laboratorio de Ciberseguridad SENA"
              className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

            {/* Badges de telemetría flotantes */}
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs pointer-events-none">
              <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg text-slate-200 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-emerald-400">Defensa Proactiva:</span>
                <span className="text-slate-300">Monitoreo en Tiempo Real & Triaje Forense</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg text-slate-200 shadow-lg">
                <span className="font-semibold text-cyan-400">Hacking Ético & Hardening:</span>
                <span className="text-slate-300">NIST SP 800-61 / ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'modules' && (
          <ModulesView
            completedModules={completedModules}
            onCompleteModule={handleCompleteModule}
            onNavigateToSimulators={() => setActiveTab('simulators')}
          />
        )}

        {activeTab === 'simulators' && (
          <SimulatorsView onPhishingScoreUpdate={setPhishingScore} />
        )}

        {activeTab === 'cases' && (
          <TriageCasesView
            onCaseScoreUpdate={handleCaseScoreUpdate}
            caseScores={caseScores}
          />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationView
            profile={profile}
            performanceScore={performanceScore}
            onKnowledgeScoreUpdate={setKnowledgeScore}
            onProductScoreUpdate={setProductScore}
            knowledgeScore={knowledgeScore}
            productScore={productScore}
          />
        )}

        {activeTab === 'teacher' && <TeacherGuideView />}
      </main>

      {/* Apprentice Profile Modal */}
      <ApprenticeModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
      />

      {/* Institutional Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-xs text-slate-400 py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold text-xs">
              SENA
            </div>
            <div>
              <div className="font-semibold text-slate-200">
                CiberSENA • Articulación con la Media Técnica
              </div>
              <div className="text-[11px] text-slate-500">
                Diseñado para Aprendices de Grados 10° y 11° • Norma Sectorial 220501096
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Metodología NIST SP 800-61 / ISO 27001
            </span>
            <span className="hidden md:inline">
              Portafolio de Evidencias SofíaPlus
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
