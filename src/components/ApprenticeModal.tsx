import React, { useState } from 'react';
import { X, UserCheck, School, Hash, Calendar, CheckCircle, ShieldAlert } from 'lucide-react';
import { ApprenticeProfile } from '../types';

interface ApprenticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSaveProfile: (updated: ApprenticeProfile) => void;
}

export const ApprenticeModal: React.FC<ApprenticeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>(profile);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900/60 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">Ficha del Aprendiz SENA</h2>
              <p className="text-xs text-slate-400">
                Programa de Articulación con la Educación Media Técnica
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Nombre Completo del Aprendiz *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Ej: Laura Sofía Restrepo Gómez"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Tipo Doc. *
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value as 'TI' | 'CC' })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="TI">T.I. (Tarjeta)</option>
                <option value="CC">C.C. (Cédula)</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Número de Documento *
              </label>
              <input
                type="text"
                required
                value={formData.documentId}
                onChange={(e) => setFormData({ ...formData, documentId: e.target.value })}
                placeholder="Ej: 1085294812"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Institución Educativa (Colegio de Articulación) *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Ej: I.E. Técnico Industrial Pascual Bravo"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <School className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Ficha de Caracterización *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.courseGroup}
                  onChange={(e) => setFormData({ ...formData, courseGroup: e.target.value })}
                  placeholder="Ej: 2874102"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-8 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                />
                <Hash className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Grado Académico *
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value as '10°' | '11°' })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="10°">Grado Décimo (10°)</option>
                <option value="11°">Grado Undécimo (11°)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Fecha de Sesión Formativa
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.sessionDate}
                onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3 text-xs text-slate-400 flex items-start gap-2.5 mt-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Estos datos se usarán para generar automáticamente tu <strong>Acta Oficial de Juicio Evaluativo</strong>, la cual se adjuntará como evidencia formal al sistema SofíaPlus del SENA.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-lg shadow-emerald-950 transition-all flex items-center gap-2 cursor-pointer"
            >
              {showSavedFeedback ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-200" />
                  <span>¡Guardado con Éxito!</span>
                </>
              ) : (
                <span>Guardar Ficha del Aprendiz</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
