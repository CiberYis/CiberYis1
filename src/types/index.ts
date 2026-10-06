export interface ApprenticeProfile {
  fullName: string;
  documentId: string;
  documentType: 'TI' | 'CC';
  institution: string; // Colegio de articulación
  courseGroup: string; // Ficha de Caracterización SENA
  grade: '10°' | '11°';
  sessionDate: string;
}

export interface PillarModule {
  id: number;
  title: string;
  shortDescription: string;
  category: string;
  iconName: string;
  theory: {
    definition: string;
    keyPoints: string[];
    technicalDeepDive: string;
  };
  instructorVoice: {
    anecdote: string;
    industryWarning: string;
    ruleOfThumb: string;
  };
  colombianContext: string;
  glossary: { term: string; definition: string }[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface EmailSample {
  id: string;
  subject: string;
  senderDisplay: string;
  senderAddress: string;
  returnPath: string;
  date: string;
  spfResult: 'PASS' | 'FAIL' | 'SOFTFAIL';
  dkimResult: 'PASS' | 'FAIL' | 'NONE';
  dmarcResult: 'PASS' | 'FAIL' | 'NONE';
  bodyHtml: string;
  attachments?: { name: string; size: string; extension: string; isMalicious: boolean }[];
  hoverUrlTarget: string;
  displayUrlText: string;
  isPhishing: boolean;
  technicalIOCs: string[];
  forensicAnalysis: string;
  targetedEntity: string;
}

export interface TriageStep {
  phase: 'Identificación' | 'Contención' | 'Erradicación' | 'Lecciones Aprendidas';
  title: string;
  situation: string;
  question: string;
  options: {
    text: string;
    score: number; // 0 to 25
    feedback: string;
    isOptimal: boolean;
  }[];
}

export interface RealCase {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  targetEntity: string;
  vector: string;
  impactSummary: string;
  nistPhases: TriageStep[];
}

export interface ExamQuestion {
  id: number;
  competencyArea: 'Infraestructura de TI' | 'Desarrollo Seguro' | 'Ciberseguridad y Normatividad';
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  technicalRationale: string;
  nistOrIsoReference: string;
}

export interface HardeningItem {
  id: string;
  category: 'Sistema Operativo' | 'Red y Perímetro' | 'Identidad y Cuentas' | 'Copias de Seguridad';
  title: string;
  description: string;
  nistRef: string;
  points: number;
}
