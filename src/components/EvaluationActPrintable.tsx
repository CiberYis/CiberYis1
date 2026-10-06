import React from 'react';
import { Printer, ShieldCheck, Award, FileText, CheckCircle2, AlertTriangle, Download } from 'lucide-react';
import { ApprenticeProfile } from '../types';

interface EvaluationActPrintableProps {
  profile: ApprenticeProfile;
  knowledgeScore: number; // 0 - 100
  performanceScore: number; // 0 - 100
  productScore: number; // 0 - 100
  onClose?: () => void;
}

export const EvaluationActPrintable: React.FC<EvaluationActPrintableProps> = ({
  profile,
  knowledgeScore,
  performanceScore,
  productScore,
  onClose,
}) => {
  // Ponderación oficial SENA: Conocimiento 40%, Desempeño 35%, Producto 25%
  const globalWeightedScore = Math.round(
    knowledgeScore * 0.4 + performanceScore * 0.35 + productScore * 0.25
  );

  const isCompetent = globalWeightedScore >= 70;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
      {/* Action Bar (Not shown in print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-850 p-4 rounded-xl border border-slate-750 print:hidden">
        <div>
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Acta Oficial de Juicio Evaluativo lista para SofíaPlus</span>
          </h4>
          <p className="text-xs text-slate-400">
            Formato reglamentario por competencias laborales para el Portafolio de Evidencias.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors cursor-pointer"
            >
              Cerrar Vista Previa
            </button>
          )}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (Stylized for screen and print) */}
      <div className="printable-sheet bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl border border-slate-200 max-w-4xl mx-auto space-y-6 print:p-6 print:border-none print:shadow-none print:m-0 print:w-full">
        {/* Header Institucional SENA */}
        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-extrabold text-xl tracking-tighter shadow">
              SENA
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-emerald-700">
                Servicio Nacional de Aprendizaje
              </div>
              <h1 className="text-lg font-black tracking-tight text-slate-900 leading-tight">
                DIRECCIÓN DE FORMACIÓN PROFESIONAL INTEGRAL
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Programa de Articulación con la Educación Media Técnica (Grados 10° y 11°)
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:pl-4 border-slate-300 text-xs">
            <div className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-300">
              ACTA N° EV-{profile.courseGroup || '2874102'}-01
            </div>
            <div className="text-slate-500 text-[10px] mt-1 font-mono">
              Fecha de Emisión: {profile.sessionDate || '2024-10-25'}
            </div>
          </div>
        </div>

        {/* Datos del Aprendiz y Programa */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
          <div className="font-bold text-slate-800 uppercase text-[11px] border-b border-slate-200 pb-1">
            I. Identificación del Aprendiz y del Programa de Formación
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <span className="text-slate-500 block text-[11px]">Nombre Completo del Aprendiz:</span>
              <strong className="text-slate-900 text-sm font-semibold">
                {profile.fullName || 'Aprendiz No Registrado'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Documento de Identidad:</span>
              <strong className="text-slate-900 font-mono">
                {profile.documentType} {profile.documentId || 'Sin registrar'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Institución Educativa Articulada:</span>
              <strong className="text-slate-900">
                {profile.institution || 'I.E. En Convenio Media Técnica'}
              </strong>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block text-[11px]">Ficha de Caracterización:</span>
                <strong className="text-slate-900 font-mono">{profile.courseGroup || '2874102'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Grado Escolar:</span>
                <strong className="text-slate-900">{profile.grade}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Competencia Evaluada */}
        <div className="border border-slate-200 rounded-lg p-4 space-y-1.5 text-xs">
          <div className="font-bold text-slate-800 uppercase text-[11px] border-b border-slate-200 pb-1">
            II. Norma Sectorial de Competencia Laboral (NSCL) Evaluada
          </div>
          <p className="text-slate-700 leading-relaxed pt-1">
            <strong>Código NSCL: 220501096</strong> — <em>"Implementar medidas de seguridad digital y protección de la infraestructura informática y los activos de información conforme a políticas de la organización y marcos internacionales (NIST CSF / ISO/IEC 27001:2022)."</em>
          </p>
          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded">
            <strong>Resultados de Aprendizaje:</strong> RAP 01 (Identificar amenazas y vulnerabilidades), RAP 02 (Auditar identidades y contraseñas según NIST SP 800-63B), RAP 03 (Actuar como primer respondiente en incidentes forenses según NIST SP 800-61).
          </div>
        </div>

        {/* Rúbrica Tripartita de Evidencias */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-slate-800 uppercase text-[11px]">
            III. Consolidado de Evidencias de Aprendizaje
          </div>
          <table className="w-full text-left border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase">
                <th className="border border-slate-300 p-2.5">Tipo de Evidencia</th>
                <th className="border border-slate-300 p-2.5">Instrumento y Criterio Técnico</th>
                <th className="border border-slate-300 p-2.5 text-center">Ponderación</th>
                <th className="border border-slate-300 p-2.5 text-center">Calificación</th>
                <th className="border border-slate-300 p-2.5 text-center">Puntaje Ponderado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2.5 font-bold text-slate-900">
                  1. Evidencia de Conocimiento
                </td>
                <td className="border border-slate-300 p-2.5 text-slate-700">
                  Cuestionario Técnico Saber Pro (10 reactivos situacionales de los 10 pilares).
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-semibold">40%</td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-bold">
                  {knowledgeScore}%
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-bold text-emerald-700">
                  {(knowledgeScore * 0.4).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2.5 font-bold text-slate-900">
                  2. Evidencia de Desempeño
                </td>
                <td className="border border-slate-300 p-2.5 text-slate-700">
                  Triaje Forense NIST SP 800-61 (EPM, DIAN, USB) y Laboratorio de Phishing/Entropía.
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-semibold">35%</td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-bold">
                  {performanceScore}%
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-bold text-emerald-700">
                  {(performanceScore * 0.35).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2.5 font-bold text-slate-900">
                  3. Evidencia de Producto
                </td>
                <td className="border border-slate-300 p-2.5 text-slate-700">
                  Lista de Verificación de Hardening y Aseguramiento de Dispositivos (PoLP, BitLocker, 3-2-1).
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-semibold">25%</td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-bold">
                  {productScore}%
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-mono font-bold text-emerald-700">
                  {(productScore * 0.25).toFixed(1)}%
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td colSpan={3} className="border border-slate-300 p-2.5 text-right uppercase text-slate-800">
                  Calificación Global Acumulada:
                </td>
                <td colSpan={2} className="border border-slate-300 p-2.5 text-center text-base font-mono text-emerald-800">
                  {globalWeightedScore}% / 100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dictamen del Juicio Evaluativo */}
        <div className={`p-5 rounded-xl border-2 text-center space-y-2 ${
          isCompetent
            ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
            : 'bg-rose-50 border-rose-600 text-rose-950'
        }`}>
          <div className="text-xs uppercase font-extrabold tracking-wider text-slate-600">
            IV. Juicio Evaluativo Final Emitido por el Instructor SENA
          </div>
          <div className="text-2xl sm:text-3xl font-black uppercase tracking-wider flex items-center justify-center gap-2">
            {isCompetent ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <span className="text-emerald-800">JUICIO: COMPETENTE (APROBADO)</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-8 h-8 text-rose-600" />
                <span className="text-rose-800">JUICIO: AÚN NO COMPETENTE</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {isCompetent
              ? 'El aprendiz ha demostrado dominio teórico y práctico en la identificación de vectores de amenaza, análisis de entropía de credenciales, triaje forense de incidentes y aseguramiento de dispositivos según los estándares oficiales del SENA.'
              : 'El aprendiz no alcanzó el umbral mínimo del 70%. Conforme al Reglamento del Aprendiz, se programa sesión de refuerzo formativo y presentación de plan de mejoramiento pedagógico.'}
          </p>
        </div>

        {/* Firmas Digitales Institucionales */}
        <div className="pt-8 grid grid-cols-2 gap-8 text-xs text-center border-t border-slate-300">
          <div className="space-y-1">
            <div className="border-b border-slate-400 pb-8 italic text-slate-500 font-serif text-sm">
              Instructor Técnico Especialista
            </div>
            <strong className="block text-slate-900 font-bold">
              Instructor Técnico Especialista SENA
            </strong>
            <span className="text-slate-500 text-[11px] block">
              20 Años de Experiencia • Área Ciberseguridad & TI
            </span>
            <span className="text-slate-400 font-mono text-[10px]">
              Firma Digital Certificada SENA
            </span>
          </div>

          <div className="space-y-1">
            <div className="border-b border-slate-400 pb-8 italic text-slate-500 font-serif text-sm">
              {profile.fullName || 'Firma del Aprendiz'}
            </div>
            <strong className="block text-slate-900 font-bold">
              {profile.fullName || 'Aprendiz SENA'}
            </strong>
            <span className="text-slate-500 text-[11px] block">
              Documento: {profile.documentType} {profile.documentId || '__________'}
            </span>
            <span className="text-slate-400 font-mono text-[10px]">
              Portafolio de Evidencias SofíaPlus
            </span>
          </div>
        </div>

        {/* Footer Institucional */}
        <div className="text-[10px] text-slate-400 text-center border-t border-slate-200 pt-3">
          Documento generado automáticamente por la Plataforma CiberSENA Media Técnica. Válido como evidencia de aprendizaje para el proceso de certificación técnica en articulación con la educación media.
        </div>
      </div>
    </div>
  );
};
