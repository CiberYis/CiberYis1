import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <div
      role="group"
      aria-label="Selector de modo de visualización"
      className={`inline-flex items-center p-1 rounded-xl border transition-all shadow-inner ${
        isDark
          ? 'bg-slate-800/90 border-slate-700'
          : 'bg-slate-200 border-slate-300'
      }`}
    >
      {/* Botón Modo Claro */}
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          !isDark
            ? 'bg-white text-amber-600 shadow-sm ring-1 ring-slate-300/80 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title="Cambiar a Modo Claro"
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
        <span>Claro</span>
      </button>

      {/* Botón Modo Oscuro */}
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          isDark
            ? 'bg-slate-900 text-emerald-400 shadow-sm ring-1 ring-emerald-500/30 font-bold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Cambiar a Modo Oscuro"
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-600'}`} />
        <span>Oscuro</span>
      </button>
    </div>
  );
};
