import React, { useState } from 'react';
import { KeyRound, MailWarning, Activity, Cpu } from 'lucide-react';
import { PasswordAuditor } from './PasswordAuditor';
import { PhishingInspector } from './PhishingInspector';
import { RiskCalculator } from './RiskCalculator';

interface SimulatorsViewProps {
  onPhishingScoreUpdate?: (score: number) => void;
}

export const SimulatorsView: React.FC<SimulatorsViewProps> = ({ onPhishingScoreUpdate }) => {
  const [activeSimulator, setActiveSimulator] = useState<'password' | 'phishing' | 'risk'>('password');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Subtab Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-lg flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSimulator('password')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-medium text-xs transition-all cursor-pointer ${
            activeSimulator === 'password'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>1. Auditor Criptográfico & Passphrases</span>
        </button>

        <button
          onClick={() => setActiveSimulator('phishing')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-medium text-xs transition-all cursor-pointer ${
            activeSimulator === 'phishing'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <MailWarning className="w-4 h-4" />
          <span>2. Inspector Forense de Phishing & IOCs</span>
        </button>

        <button
          onClick={() => setActiveSimulator('risk')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-medium text-xs transition-all cursor-pointer ${
            activeSimulator === 'risk'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>3. Matriz de Riesgo & Tríada CID</span>
        </button>
      </div>

      {/* Active Simulator Content */}
      <div className="transition-opacity duration-300">
        {activeSimulator === 'password' && <PasswordAuditor />}
        {activeSimulator === 'phishing' && <PhishingInspector onScoreUpdate={onPhishingScoreUpdate} />}
        {activeSimulator === 'risk' && <RiskCalculator />}
      </div>
    </div>
  );
};
