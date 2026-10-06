import React, { useState } from 'react';
import {
  Mail,
  MailWarning,
  CheckCircle,
  XCircle,
  FileCode,
  ExternalLink,
  ShieldAlert,
  Search,
  Server,
  ShieldCheck
} from 'lucide-react';
import { SIMULATED_EMAILS } from '../../data/emailsData';

interface PhishingInspectorProps {
  onScoreUpdate?: (score: number) => void;
}

export const PhishingInspector: React.FC<PhishingInspectorProps> = ({ onScoreUpdate }) => {
  const [selectedEmailId, setSelectedEmailId] = useState<string>(SIMULATED_EMAILS[0].id);
  const [showTechnicalHeaders, setShowTechnicalHeaders] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [userDecisions, setUserDecisions] = useState<Record<string, { verdict: 'phishing' | 'legitimate'; isCorrect: boolean }>>({});

  const activeEmail = SIMULATED_EMAILS.find((e) => e.id === selectedEmailId) || SIMULATED_EMAILS[0];

  const handleMakeDecision = (verdict: 'phishing' | 'legitimate') => {
    const isCorrect = (verdict === 'phishing' && activeEmail.isPhishing) || (verdict === 'legitimate' && !activeEmail.isPhishing);
    const updatedDecisions = {
      ...userDecisions,
      [activeEmail.id]: { verdict, isCorrect }
    };
    setUserDecisions(updatedDecisions);

    const correctCount = Object.values(updatedDecisions).filter((d) => d.isCorrect).length;
    const score = Math.round((correctCount / SIMULATED_EMAILS.length) * 100);
    if (onScoreUpdate) {
      onScoreUpdate(score);
    }
  };

  const currentDecision = userDecisions[activeEmail.id];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          <MailWarning className="w-3.5 h-3.5" />
          Simulador 2: Triaje Forense de Correos & Detección de IOCs
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Inspector Forense de Phishing y Cabeceras Técnicas
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Examina cabeceras RFC 5322, registros SPF/DKIM/DMARC, URLs reales camufladas y extensiones maliciosas. Emite tu dictamen técnico de ciberseguridad.
        </p>
      </div>

      {/* Main Client Grid: Inbox List (Left) + Email Viewer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Simulated Inbox */}
        <div className="lg:col-span-4 bg-slate-850 border border-slate-800 rounded-xl overflow-hidden shadow-md">
          <div className="p-3 bg-slate-800/80 border-b border-slate-755 flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              Bandeja de Entrada ({SIMULATED_EMAILS.length})
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Simulador POP3/IMAP</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {SIMULATED_EMAILS.map((email) => {
              const isSelected = selectedEmailId === email.id;
              const decision = userDecisions[email.id];

              return (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmailId(email.id)}
                  className={`p-3.5 cursor-pointer transition-all text-left ${
                    isSelected
                      ? 'bg-slate-750 border-l-4 border-emerald-500 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold truncate text-slate-200">
                      {email.senderDisplay}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                      {email.date}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-300 line-clamp-1 mb-1">
                    {email.subject}
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-mono truncate max-w-[170px]">
                      {email.senderAddress}
                    </span>
                    {decision ? (
                      decision.isCorrect ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                          <CheckCircle className="w-3 h-3" /> Acierto
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-0.5">
                          <XCircle className="w-3 h-3" /> Fallo
                        </span>
                      )
                    ) : (
                      <span className="text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded font-mono">
                        Por Evaluar
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Email Reader & Forensic Station */}
        <div className="lg:col-span-8 bg-slate-850 border border-slate-800 rounded-xl p-5 space-y-4 shadow-md">
          {/* Header Metadata */}
          <div className="border-b border-slate-750 pb-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-base font-bold text-white leading-snug">
                {activeEmail.subject}
              </h4>
              <button
                onClick={() => setShowTechnicalHeaders(!showTechnicalHeaders)}
                className="text-xs text-emerald-400 hover:text-emerald-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 self-start cursor-pointer transition-colors"
              >
                <Server className="w-3.5 h-3.5" />
                <span>{showTechnicalHeaders ? 'Ocultar Cabeceras' : 'Inspeccionar Cabeceras RFC'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-500 font-sans">De:</span>{' '}
                <strong className="text-slate-200">{activeEmail.senderDisplay}</strong>
                <div className="text-slate-400 text-[11px]">&lt;{activeEmail.senderAddress}&gt;</div>
              </div>
              <div>
                <span className="text-slate-500 font-sans">Return-Path:</span>{' '}
                <div className="text-slate-300 text-[11px] truncate">{activeEmail.returnPath}</div>
              </div>
            </div>

            {/* Technical Headers Inspector (Expandable) */}
            {showTechnicalHeaders && (
              <div className="bg-slate-900 border border-slate-750 rounded-xl p-4 text-xs font-mono space-y-3 animate-fade-in">
                <div className="text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800 pb-1">
                  Registros Criptográficos de Autenticación de Dominio:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-800/80 p-2 rounded border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">SPF (Sender Policy):</span>
                    <span
                      className={`font-bold ${
                        activeEmail.spfResult === 'PASS' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {activeEmail.spfResult}
                    </span>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">DKIM (DomainKeys):</span>
                    <span
                      className={`font-bold ${
                        activeEmail.dkimResult === 'PASS' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {activeEmail.dkimResult}
                    </span>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">DMARC Policy:</span>
                    <span
                      className={`font-bold ${
                        activeEmail.dmarcResult === 'PASS' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {activeEmail.dmarcResult}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  💡 <strong>Tip Forense:</strong> Si el <em>Return-Path</em> no coincide con el dominio en el encabezado <em>From</em>, o si SPF/DKIM están en <em>FAIL</em>, el remitente está suplantando la identidad del emisor.
                </div>
              </div>
            )}
          </div>

          {/* Email Body Content */}
          <div className="bg-white rounded-xl p-5 shadow-inner text-slate-900 min-h-[160px]">
            <div dangerouslySetInnerHTML={{ __html: activeEmail.bodyHtml }} />

            {/* Simulated Link in Email */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">
                Pasa el cursor sobre el enlace para inspeccionar la URL destino real:
              </span>
              <a
                href="#simulate-url"
                onClick={(e) => e.preventDefault()}
                onMouseEnter={() => setHoveredLink(activeEmail.hoverUrlTarget)}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-xs text-blue-600 hover:text-blue-800 underline font-medium inline-flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200"
              >
                <span>{activeEmail.displayUrlText}</span>
                <ExternalLink className="w-3 h-3 text-blue-500" />
              </a>
            </div>
          </div>

          {/* Real URL Hover Inspector Tooltip */}
          {hoveredLink && (
            <div className="bg-slate-950 border border-amber-500/80 rounded-lg p-2.5 text-xs text-white font-mono flex items-center justify-between gap-3 animate-fade-in shadow-xl">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  URL Real Destino (Forense): <strong className="text-amber-400">{hoveredLink}</strong>
                </span>
              </div>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                Inspección de enlace
              </span>
            </div>
          )}

          {/* Attachments Section */}
          {activeEmail.attachments && activeEmail.attachments.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Archivos Adjuntos Detectados:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeEmail.attachments.map((att, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-mono ${
                      att.isMalicious
                        ? 'bg-rose-950/40 border-rose-600/60 text-rose-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className={`w-4 h-4 ${att.isMalicious ? 'text-rose-400' : 'text-slate-400'}`} />
                      <span className="truncate">{att.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 ml-2 shrink-0">{att.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apprentice Forensic Dictamen Panel */}
          <div className="bg-slate-900 border border-slate-750 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>Dictamen Forense del Aprendiz SENA:</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Selecciona tu veredicto técnico sobre este correo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleMakeDecision('legitimate')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  currentDecision?.verdict === 'legitimate'
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-950'
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Declarar Correo Legítimo Institucional</span>
              </button>

              <button
                onClick={() => handleMakeDecision('phishing')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  currentDecision?.verdict === 'phishing'
                    ? 'bg-rose-700 border-rose-500 text-white shadow-lg shadow-rose-950'
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300'
                }`}
              >
                <MailWarning className="w-4 h-4 text-rose-400" />
                <span>Declarar Phishing / Amenaza Maliciosa</span>
              </button>
            </div>

            {/* Result & IOC Report */}
            {currentDecision && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2.5 animate-fade-in ${
                  currentDecision.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-600/60'
                    : 'bg-rose-950/40 border-rose-600/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    {currentDecision.isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" /> ¡Dictamen Correcto! (+25 pts Desempeño)
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> Dictamen Incorrecto
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Entidad evaluada: {activeEmail.targetedEntity}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  {activeEmail.forensicAnalysis}
                </p>

                {/* Technical IOCs */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider">
                    Indicadores de Compromiso (IOCs) Verificados:
                  </div>
                  {activeEmail.technicalIOCs.map((ioc, idx) => (
                    <div key={idx} className="text-slate-300 text-[11px] flex items-start gap-2 bg-slate-900/60 p-1.5 rounded">
                      <span className="text-emerald-400 font-mono">•</span>
                      <span>{ioc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
