export type UserRole = 
  | 'GOVERNMENT_OFFICER' 
  | 'STARTUP' 
  | 'EXPERT_EVALUATOR' 
  | 'INDEPENDENT_VALIDATOR' 
  | 'PROGRAM_ADMIN';

export type ChallengeStage = 
  | 'PROBLEM_DEFINITION'
  | 'CHALLENGE_PUBLISHED'
  | 'STARTUP_DISCOVERY'
  | 'SCREENING'
  | 'EVALUATION'
  | 'PILOT_DESIGN'
  | 'ACTIVE_PILOT'
  | 'EVIDENCE_COLLECTION'
  | 'INDEPENDENT_VALIDATION'
  | 'PROCUREMENT_READINESS'
  | 'SCALE_DECISION'
  | 'SCALED'
  | 'CLOSED';

export type ChallengeStatus = 'DRAFT' | 'OPEN' | 'IN_EVALUATION' | 'PILOT_ACTIVE' | 'VALIDATION' | 'SCALE_PENDING' | 'COMPLETED' | 'CANCELLED';

export type ScreeningDecision = 'PENDING' | 'PASS' | 'FAIL' | 'REVIEW_REQUIRED';

export type ValidationStatus = 'PENDING' | 'VALIDATED' | 'PARTIALLY_VALIDATED' | 'NOT_VALIDATED' | 'REVISION_REQUESTED';

export type ScaleDecisionType = 'SCALE' | 'EXTEND_PILOT' | 'RE_PILOT' | 'IMPROVE_REASSESS' | 'STOP';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type EvidenceCategory = 
  | 'Performance'
  | 'Cost'
  | 'Usage'
  | 'Reliability'
  | 'User feedback'
  | 'Security'
  | 'Compliance'
  | 'Operational impact';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  department: string;
  organization: string;
  avatarUrl?: string;
}

export interface MetricOutcome {
  id: string;
  name: string;
  unit: string;
  baselineValue: number;
  currentValue: number;
  targetValue: number;
  status: 'EXCEEDS_TARGET' | 'ON_TRACK' | 'AT_RISK' | 'FAILS_TARGET';
  category: 'Speed' | 'Cost' | 'Quality' | 'Coverage' | 'Compliance';
  verificationStatus: 'UNVERIFIED' | 'SELF_REPORTED' | 'INDEPENDENTLY_VERIFIED';
}

export interface Milestone {
  id: string;
  milestoneNumber: number;
  title: string;
  deliverable: string;
  requiredEvidence: string;
  dueDate: string;
  paymentPercentage: number;
  budgetAmount: number;
  approvalAuthority: string;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'SUBMITTED' | 'VERIFIED' | 'APPROVED' | 'PAYMENT_RELEASED';
  submittedDate?: string;
  evidenceId?: string;
  verifiedBy?: string;
  verificationNotes?: string;
}

export interface EvidenceItem {
  id: string;
  pilotId: string;
  title: string;
  category: EvidenceCategory;
  source: string;
  date: string;
  metricName: string;
  baselineValue: string;
  reportedValue: string;
  verifiedValue?: string;
  fileType: 'CSV' | 'PDF' | 'IMAGE' | 'JSON' | 'REPORT';
  fileName: string;
  fileSize: string;
  hash: string;
  verificationStatus: 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED' | 'CLARIFICATION_REQUIRED';
  reviewerName?: string;
  reviewedDate?: string;
  reviewNotes?: string;
  confidenceScore: number; // 0-100%
  extractedMetrics?: { [key: string]: string | number };
}

export interface RiskItem {
  id: string;
  category: 'Technical' | 'Cybersecurity' | 'Data privacy' | 'Operational' | 'Financial' | 'Legal/procurement' | 'Vendor dependency' | 'Scalability';
  description: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  score: number; // calculated 1-9
  mitigation: string;
  owner: string;
  status: 'Open' | 'Mitigated' | 'Monitoring' | 'Critical';
}

export interface EvaluationScore {
  expertId: string;
  expertName: string;
  expertDesignation: string;
  organization: string;
  submittedAt?: string;
  hasDeclaredNoConflict: boolean;
  scores: {
    problemFit: number; // weight 25%
    technicalFeasibility: number; // weight 25%
    scalability: number; // weight 15%
    security: number; // weight 15%
    costEffectiveness: number; // weight 10%
    implementationReadiness: number; // weight 10%
  };
  weightedTotal: number;
  qualitativeFeedback: {
    strengths: string;
    risks: string;
    pilotRecommendations: string;
  };
}

export interface StartupApplication {
  id: string;
  challengeId: string;
  startupId: string;
  startupName: string;
  solutionTitle: string;
  executiveSummary: string;
  appliedDate: string;
  technicalProposalDoc: string;
  proposedCost: number;
  proposedDurationDays: number;
  screeningStatus: ScreeningDecision;
  screeningChecklist: {
    dpiitRecognition: boolean;
    requiredDocuments: boolean;
    domainEligibility: boolean;
    technicalRequirements: boolean;
    securityRequirements: boolean;
    conflictDeclaration: boolean;
    financialSoundness: boolean;
    dataHandlingCompliance: boolean;
  };
  screeningNotes?: string;
  screeningOfficer?: string;
  screeningDate?: string;
  evaluations: EvaluationScore[];
  averageEvaluationScore?: number;
  selectionStatus: 'SUBMITTED' | 'SCREENED' | 'SHORTLISTED' | 'PILOT_SELECTED' | 'REJECTED';
}

export interface Startup {
  id: string;
  name: string;
  legalEntity: string;
  dpiitNumber: string;
  dpiitStatus: 'RECOGNIZED' | 'PENDING' | 'EXPIRED';
  foundedYear: number;
  headquarters: string;
  website: string;
  domains: string[];
  capabilities: string[];
  techStack: string[];
  securityReadiness: 'HIGH' | 'MEDIUM' | 'BASIC';
  certifications: string[];
  previousGovernmentDeployments: {
    pilotName: string;
    department: string;
    durationDays: number;
    outcome: string;
    validationStatus: 'Independently validated' | 'Self reported' | 'Completed';
  }[];
  evidenceScore: number; // 0-100
  matchExplanation?: string;
  founder: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Pilot {
  id: string;
  challengeId: string;
  challengeTitle: string;
  startupId: string;
  startupName: string;
  department: string;
  agreementId: string;
  objective: string;
  location: string;
  district: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  budgetAllocated: number;
  budgetConsumed: number;
  status: 'DRAFT_DESIGN' | 'ACTIVE' | 'MID_TERM_REVIEW' | 'AWAITING_VALIDATION' | 'COMPLETED' | 'TERMINATED';
  riskLevel: RiskLevel;
  milestones: Milestone[];
  metrics: MetricOutcome[];
  evidenceList: EvidenceItem[];
  risks: RiskItem[];
  ipTerms: string;
  dataTerms: string;
  securityRequirements: string;
}

export interface ValidationReport {
  id: string;
  pilotId: string;
  validatorName: string;
  validatorOrganization: string;
  submittedDate: string;
  methodology: string;
  evidenceReviewedCount: number;
  verifiedOutcomes: {
    metric: string;
    baseline: string;
    claimed: string;
    verified: string;
    variance: string;
    isVerified: boolean;
  }[];
  unverifiedClaims: string[];
  keyFindings: string[];
  limitations: string[];
  recommendation: string;
  status: ValidationStatus;
  digitalSignature: string;
}

export interface ProcurementReadiness {
  pilotId: string;
  overallScore: number; // 0-100
  grade: 'READY_TO_SCALE' | 'CONDITIONAL_APPROVAL' | 'REQUIRES_REMEDIATION' | 'NOT_READY';
  dimensions: {
    name: string;
    score: number; // 0-100
    weight: number;
    status: 'STRONG' | 'ADEQUATE' | 'WEAK' | 'BLOCKER';
    notes: string;
  }[];
  strengths: string[];
  weaknesses: string[];
  blockers: string[];
}

export interface ScaleDecisionRecord {
  id: string;
  pilotId: string;
  challengeId: string;
  decision: ScaleDecisionType;
  recommendationSummary: string;
  decisionReason: string;
  authorizedOfficer: string;
  designation: string;
  approvedDate: string;
  scaleConditions: {
    id: string;
    condition: string;
    status: 'COMPLETED' | 'PENDING' | 'IN_PROGRESS';
    owner: string;
  }[];
  projectedDistrictsCount: number;
  estimatedStateBudget: number;
  estimatedAnnualSavings: number;
  procurementRoute: string;
}

export interface Challenge {
  id: string;
  challengeCode: string;
  title: string;
  department: string;
  theme: 'Water & Sanitation' | 'Agriculture & Rural Tech' | 'Healthcare & Diagnostics' | 'Smart Governance' | 'Urban Mobility' | 'Environment & Energy';
  problemStatement: string;
  currentProcess: string;
  affectedPopulation: string;
  geographicScope: string;
  district: string;
  currentBaseline: string;
  expectedOutcome: string;
  constraints: string;
  stage: ChallengeStage;
  status: ChallengeStatus;
  createdAt: string;
  publishedAt?: string;
  pilotBudget: number;
  pilotDurationDays: number;
  pilotLocation: string;
  maxParticipants: number;
  eligibilityCriteria: {
    dpiitRequired: boolean;
    maxCompanyAgeYears: number;
    requiredDomain: string;
    securityRequirements: string;
    technicalRequirements: string;
    financialRequirements: string;
  };
  evaluationWeights: {
    technicalFeasibility: number;
    expectedImpact: number;
    scalability: number;
    security: number;
    costEffectiveness: number;
    implementationReadiness: number;
  };
  applicationsCount: number;
  selectedStartupId?: string;
  activePilotId?: string;
}

export interface GovDocument {
  id: string;
  title: string;
  category: 
    | 'Problem Statement'
    | 'Evaluation Criteria'
    | 'Pilot Agreement'
    | 'Data Agreement'
    | 'IP Agreement'
    | 'Security Assessment'
    | 'Validation Report'
    | 'Procurement Recommendation'
    | 'Scale Decision';
  challengeCode: string;
  referenceId: string;
  version: string;
  uploadedBy: string;
  date: string;
  size: string;
  fileFormat: 'PDF' | 'DOCX';
  isOfficialOrder: boolean;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  object: string;
  objectId: string;
  status: 'SUCCESS' | 'WARNING' | 'CRITICAL';
  details: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'PILOT' | 'VALIDATION' | 'EVALUATION' | 'PAYMENT' | 'SECURITY';
  targetRole?: UserRole;
  actionRoute?: string;
}

export interface ScaleSimulationParams {
  districtsCount: number; // 1 to 36 (Maharashtra districts)
  targetBeneficiaries: number;
  hardwareDeploymentUnitCost: number;
  annualSoftwareOperatingCost: number;
  baselineAnnualCostPerUnit: number;
  efficiencyGainPercentage: number;
}
