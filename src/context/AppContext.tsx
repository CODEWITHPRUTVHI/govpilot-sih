import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  User, 
  Challenge, 
  Startup, 
  StartupApplication, 
  Pilot, 
  ValidationReport, 
  ProcurementReadiness, 
  ScaleDecisionRecord, 
  GovDocument, 
  AuditEvent, 
  SystemNotification,
  ScreeningDecision,
  ScaleDecisionType,
  EvidenceItem,
  Milestone
} from '../types';
import { 
  CURRENT_USERS, 
  INITIAL_CHALLENGES, 
  INITIAL_STARTUPS, 
  INITIAL_APPLICATIONS, 
  INITIAL_PILOTS, 
  INITIAL_VALIDATION_REPORT, 
  INITIAL_PROCUREMENT_READINESS, 
  INITIAL_SCALE_DECISION, 
  INITIAL_DOCUMENTS, 
  INITIAL_AUDIT_TRAIL, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedChallengeId: string;
  setSelectedChallengeId: (id: string) => void;
  selectedStartupId: string;
  setSelectedStartupId: (id: string) => void;
  selectedPilotId: string;
  setSelectedPilotId: (id: string) => void;
  
  challenges: Challenge[];
  startups: Startup[];
  applications: StartupApplication[];
  pilots: Pilot[];
  validationReport: ValidationReport;
  procurementReadiness: ProcurementReadiness;
  scaleDecision: ScaleDecisionRecord;
  documents: GovDocument[];
  auditTrail: AuditEvent[];
  notifications: SystemNotification[];
  
  comparisonStartupIds: string[];
  toggleStartupComparison: (startupId: string) => void;
  clearComparison: () => void;
  
  // Guided Tour
  guidedTourActive: boolean;
  guidedTourStep: number;
  startGuidedTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  endTour: () => void;
  
  // Actions
  createChallenge: (newChallenge: Partial<Challenge>) => string;
  submitApplication: (newApp: Partial<StartupApplication>) => void;
  recordScreeningDecision: (appId: string, decision: ScreeningDecision, notes: string, checklist: any) => void;
  submitEvaluationScore: (appId: string, scoreData: any) => void;
  createPilotFromApplication: (challengeId: string, startupId: string) => string;
  updateMilestoneStatus: (pilotId: string, milestoneId: string, status: Milestone['status'], notes?: string) => void;
  uploadEvidence: (evidence: Partial<EvidenceItem>) => void;
  reviewEvidence: (evidenceId: string, status: 'VERIFIED' | 'REJECTED' | 'CLARIFICATION_REQUIRED', notes: string, verifiedVal?: string) => void;
  updateValidationReport: (updatedReport: Partial<ValidationReport>) => void;
  updateRiskItem: (riskId: string, status: any, mitigation?: string) => void;
  submitScaleDecision: (decision: ScaleDecisionType, reason: string, conditions?: any[]) => void;
  markNotificationRead: (id: string) => void;
  addAuditEvent: (action: string, object: string, objectId: string, details: string, status?: 'SUCCESS' | 'WARNING' | 'CRITICAL') => void;
  resetScenario: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('GOVERNMENT_OFFICER');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('CH-001');
  const [selectedStartupId, setSelectedStartupId] = useState<string>('ST-001');
  const [selectedPilotId, setSelectedPilotId] = useState<string>('PLT-001');
  
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [startups, setStartups] = useState<Startup[]>(INITIAL_STARTUPS);
  const [applications, setApplications] = useState<StartupApplication[]>(INITIAL_APPLICATIONS);
  const [pilots, setPilots] = useState<Pilot[]>(INITIAL_PILOTS);
  const [validationReport, setValidationReport] = useState<ValidationReport>(INITIAL_VALIDATION_REPORT);
  const [procurementReadiness, setProcurementReadiness] = useState<ProcurementReadiness>(INITIAL_PROCUREMENT_READINESS);
  const [scaleDecision, setScaleDecision] = useState<ScaleDecisionRecord>(INITIAL_SCALE_DECISION);
  const [documents, setDocuments] = useState<GovDocument[]>(INITIAL_DOCUMENTS);
  const [auditTrail, setAuditTrail] = useState<AuditEvent[]>(INITIAL_AUDIT_TRAIL);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [comparisonStartupIds, setComparisonStartupIds] = useState<string[]>(['ST-001', 'ST-002']);
  
  const [guidedTourActive, setGuidedTourActive] = useState<boolean>(false);
  const [guidedTourStep, setGuidedTourStep] = useState<number>(0);

  const currentUser = CURRENT_USERS[currentRole] || CURRENT_USERS.GOVERNMENT_OFFICER;

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    addAuditEvent('SWITCHED_ROLE', 'UserSession', role, `User active context switched to ${role}`, 'SUCCESS');
  };

  const addAuditEvent = (
    action: string, 
    object: string, 
    objectId: string, 
    details: string, 
    status: 'SUCCESS' | 'WARNING' | 'CRITICAL' = 'SUCCESS'
  ) => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    const newEvent: AuditEvent = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp,
      user: currentUser.name,
      role: currentRole,
      action,
      object,
      objectId,
      status,
      details
    };
    
    setAuditTrail(prev => [newEvent, ...prev]);
  };

  const createChallenge = (newChallengeData: Partial<Challenge>): string => {
    const id = `CH-${String(challenges.length + 1).padStart(3, '0')}`;
    const code = `CH-MH-2026-${String(challenges.length + 10).padStart(3, '0')}`;
    const fullChallenge: Challenge = {
      id,
      challengeCode: code,
      title: newChallengeData.title || 'Untitled Innovation Challenge',
      department: newChallengeData.department || currentUser.department,
      theme: newChallengeData.theme || 'Water & Sanitation',
      problemStatement: newChallengeData.problemStatement || '',
      currentProcess: newChallengeData.currentProcess || '',
      affectedPopulation: newChallengeData.affectedPopulation || '',
      geographicScope: newChallengeData.geographicScope || 'Maharashtra State',
      district: newChallengeData.district || 'Pune',
      currentBaseline: newChallengeData.currentBaseline || '',
      expectedOutcome: newChallengeData.expectedOutcome || '',
      constraints: newChallengeData.constraints || '',
      stage: 'CHALLENGE_PUBLISHED',
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0],
      publishedAt: new Date().toISOString().split('T')[0],
      pilotBudget: newChallengeData.pilotBudget || 1000000,
      pilotDurationDays: newChallengeData.pilotDurationDays || 90,
      pilotLocation: newChallengeData.pilotLocation || 'Selected Gram Panchayats',
      maxParticipants: newChallengeData.maxParticipants || 3,
      eligibilityCriteria: newChallengeData.eligibilityCriteria || {
        dpiitRequired: true,
        maxCompanyAgeYears: 7,
        requiredDomain: 'Innovation Technology',
        securityRequirements: 'Standard MeitY Cloud Hosting',
        technicalRequirements: 'Functional Prototype Ready',
        financialRequirements: 'Positive Net Worth'
      },
      evaluationWeights: newChallengeData.evaluationWeights || {
        technicalFeasibility: 25,
        expectedImpact: 25,
        scalability: 15,
        security: 15,
        costEffectiveness: 10,
        implementationReadiness: 10
      },
      applicationsCount: 0
    };

    setChallenges(prev => [fullChallenge, ...prev]);
    setSelectedChallengeId(id);
    addAuditEvent('PUBLISHED_CHALLENGE', 'Challenge', code, `Published innovation challenge: ${fullChallenge.title}`);
    return id;
  };

  const submitApplication = (newApp: Partial<StartupApplication>) => {
    const appId = `APP-${String(applications.length + 1).padStart(3, '0')}`;
    const app: StartupApplication = {
      id: appId,
      challengeId: newApp.challengeId || selectedChallengeId,
      startupId: newApp.startupId || 'ST-001',
      startupName: newApp.startupName || 'AquaSense Technologies',
      solutionTitle: newApp.solutionTitle || 'Proposed Innovation Solution',
      executiveSummary: newApp.executiveSummary || '',
      appliedDate: new Date().toISOString().split('T')[0],
      technicalProposalDoc: newApp.technicalProposalDoc || 'Technical_Proposal.pdf',
      proposedCost: newApp.proposedCost || 1200000,
      proposedDurationDays: newApp.proposedDurationDays || 90,
      screeningStatus: 'PENDING',
      screeningChecklist: {
        dpiitRecognition: true,
        requiredDocuments: true,
        domainEligibility: true,
        technicalRequirements: true,
        securityRequirements: true,
        conflictDeclaration: true,
        financialSoundness: true,
        dataHandlingCompliance: true
      },
      evaluations: [],
      selectionStatus: 'SUBMITTED'
    };

    setApplications(prev => [app, ...prev]);
    setChallenges(prev => prev.map(c => c.id === app.challengeId ? { ...c, applicationsCount: c.applicationsCount + 1 } : c));
    addAuditEvent('SUBMITTED_PROPOSAL', 'Proposal', appId, `Startup ${app.startupName} submitted proposal for ${app.challengeId}`);
  };

  const recordScreeningDecision = (appId: string, decision: ScreeningDecision, notes: string, checklist: any) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          screeningStatus: decision,
          screeningNotes: notes,
          screeningChecklist: checklist,
          screeningOfficer: currentUser.name,
          screeningDate: new Date().toISOString().split('T')[0],
          selectionStatus: decision === 'PASS' ? 'SCREENED' : (decision === 'FAIL' ? 'REJECTED' : 'SUBMITTED')
        };
      }
      return app;
    }));

    addAuditEvent('SCREENING_DECISION', 'Application', appId, `Screening decision ${decision} recorded for application ${appId}`);
  };

  const submitEvaluationScore = (appId: string, scoreData: any) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const otherEvals = (app.evaluations || []).filter(e => e.expertId !== currentUser.id);
        const newEval = {
          expertId: currentUser.id,
          expertName: currentUser.name,
          expertDesignation: currentUser.designation,
          organization: currentUser.organization,
          submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          hasDeclaredNoConflict: true,
          scores: scoreData.scores,
          weightedTotal: scoreData.weightedTotal,
          qualitativeFeedback: scoreData.qualitativeFeedback
        };
        const updatedEvals = [...otherEvals, newEval];
        const avgScore = updatedEvals.reduce((acc, curr) => acc + curr.weightedTotal, 0) / updatedEvals.length;
        
        return {
          ...app,
          evaluations: updatedEvals,
          averageEvaluationScore: Number(avgScore.toFixed(2)),
          selectionStatus: 'SHORTLISTED'
        };
      }
      return app;
    }));

    addAuditEvent('EVALUATION_SCORED', 'Application', appId, `Expert ${currentUser.name} submitted evaluation score for ${appId}`);
  };

  const createPilotFromApplication = (challengeId: string, startupId: string): string => {
    const challenge = challenges.find(c => c.id === challengeId);
    const startup = startups.find(s => s.id === startupId);
    const newPilotId = `PLT-${String(pilots.length + 1).padStart(3, '0')}`;
    const agreementId = `GOM-WSSD-PILOT-2026-${String(Math.floor(Math.random()*900)+100)}`;

    const newPilot: Pilot = {
      id: newPilotId,
      challengeId: challengeId,
      challengeTitle: challenge?.title || 'Innovation Pilot',
      startupId: startupId,
      startupName: startup?.name || 'Selected Startup',
      department: challenge?.department || currentUser.department,
      agreementId,
      objective: `Controlled field pilot for ${challenge?.title || 'solution'} in designated Maharashtra testbed.`,
      location: challenge?.pilotLocation || 'Designated District Sites',
      district: challenge?.district || 'Amravati, Nashik',
      durationDays: challenge?.pilotDurationDays || 90,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0],
      daysRemaining: challenge?.pilotDurationDays || 90,
      budgetAllocated: challenge?.pilotBudget || 1500000,
      budgetConsumed: 0,
      status: 'ACTIVE',
      riskLevel: 'LOW',
      milestones: [
        {
          id: `MS-${Date.now()}-1`,
          milestoneNumber: 1,
          title: 'M1 — Setup & Baseline Site Calibration',
          deliverable: 'Hardware bench calibration certificates and baseline site sign-offs.',
          requiredEvidence: 'NABL calibration certs & site survey forms.',
          dueDate: '30 days from launch',
          paymentPercentage: 25,
          budgetAmount: (challenge?.pilotBudget || 1500000) * 0.25,
          approvalAuthority: 'Joint Secretary (Procurement Innovation)',
          status: 'IN_PROGRESS'
        },
        {
          id: `MS-${Date.now()}-2`,
          milestoneNumber: 2,
          title: 'M2 — Full Field Deployment & Telemetry Ingestion',
          deliverable: 'Live installation across all pilot points and continuous telemetry stream.',
          requiredEvidence: 'GPS geo-stamped photos & 14-day CSV sensor stream.',
          dueDate: '60 days from launch',
          paymentPercentage: 35,
          budgetAmount: (challenge?.pilotBudget || 1500000) * 0.35,
          approvalAuthority: 'Superintending Engineer',
          status: 'UPCOMING'
        },
        {
          id: `MS-${Date.now()}-3`,
          milestoneNumber: 3,
          title: 'M3 — Outcome Assessment & Independent Validation',
          deliverable: '90-day comprehensive outcome analysis and validation audit sign-off.',
          requiredEvidence: 'Independent validation audit report & satisfaction survey.',
          dueDate: '90 days from launch',
          paymentPercentage: 40,
          budgetAmount: (challenge?.pilotBudget || 1500000) * 0.40,
          approvalAuthority: 'State Mission Director (MSInS)',
          status: 'UPCOMING'
        }
      ],
      metrics: [
        {
          id: `MET-${Date.now()}-1`,
          name: 'Primary Outcome Improvement vs Baseline',
          unit: '% Target',
          baselineValue: 100,
          currentValue: 65,
          targetValue: 40,
          status: 'ON_TRACK',
          category: 'Speed',
          verificationStatus: 'SELF_REPORTED'
        }
      ],
      evidenceList: [],
      risks: [
        {
          id: `RSK-${Date.now()}-1`,
          category: 'Technical',
          description: 'Environmental wear and field connectivity in rural talukas.',
          probability: 'Medium',
          impact: 'Medium',
          score: 4,
          mitigation: 'Offline local data buffering and ruggedized IP68 enclosure.',
          owner: startup?.founder.name || 'Startup CTO',
          status: 'Monitoring'
        }
      ],
      ipTerms: 'Background IP retained by Startup; perpetual government usage license for state operations.',
      dataTerms: 'Data hosted on MeitY empaneled Indian cloud servers; sovereign government ownership.',
      securityRequirements: 'TLS 1.3 encryption and CERT-In VAPT audit clearance.'
    };

    setPilots(prev => [newPilot, ...prev]);
    setSelectedPilotId(newPilotId);
    setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, stage: 'ACTIVE_PILOT', status: 'PILOT_ACTIVE', selectedStartupId: startupId, activePilotId: newPilotId } : c));
    setApplications(prev => prev.map(a => a.challengeId === challengeId && a.startupId === startupId ? { ...a, selectionStatus: 'PILOT_SELECTED' } : a));
    
    addAuditEvent('CREATED_PILOT', 'Pilot', newPilotId, `Created controlled pilot ${agreementId} with ${startup?.name}`);
    return newPilotId;
  };

  const updateMilestoneStatus = (pilotId: string, milestoneId: string, status: Milestone['status'], notes?: string) => {
    setPilots(prev => prev.map(p => {
      if (p.id === pilotId) {
        let addedSpend = 0;
        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            if (status === 'PAYMENT_RELEASED' && m.status !== 'PAYMENT_RELEASED') {
              addedSpend = m.budgetAmount;
            }
            return {
              ...m,
              status,
              verifiedBy: currentUser.name,
              verificationNotes: notes || m.verificationNotes
            };
          }
          return m;
        });

        return {
          ...p,
          budgetConsumed: p.budgetConsumed + addedSpend,
          milestones: updatedMilestones
        };
      }
      return p;
    }));

    addAuditEvent('MILESTONE_STATUS_UPDATED', 'Milestone', milestoneId, `Milestone status changed to ${status}`);
  };

  const uploadEvidence = (evidenceData: Partial<EvidenceItem>) => {
    const newId = `EVD-${String(Math.floor(Math.random()*899)+100)}`;
    const fullItem: EvidenceItem = {
      id: newId,
      pilotId: evidenceData.pilotId || selectedPilotId,
      title: evidenceData.title || 'Submitted Pilot Evidence Record',
      category: evidenceData.category || 'Performance',
      source: evidenceData.source || currentUser.name,
      date: new Date().toISOString().split('T')[0],
      metricName: evidenceData.metricName || 'Pilot Metric',
      baselineValue: evidenceData.baselineValue || 'Baseline value',
      reportedValue: evidenceData.reportedValue || 'Reported value',
      fileType: evidenceData.fileType || 'PDF',
      fileName: evidenceData.fileName || 'Evidence_Report.pdf',
      fileSize: evidenceData.fileSize || '2.4 MB',
      hash: `SHA256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      verificationStatus: 'PENDING_REVIEW',
      confidenceScore: 90,
      extractedMetrics: evidenceData.extractedMetrics || { 'Ingested Records': '1,450', 'Test Accuracy': '97.2%' }
    };

    setPilots(prev => prev.map(p => {
      if (p.id === fullItem.pilotId) {
        return {
          ...p,
          evidenceList: [fullItem, ...p.evidenceList]
        };
      }
      return p;
    }));

    addAuditEvent('UPLOADED_EVIDENCE', 'Evidence', newId, `Uploaded evidence artifact: ${fullItem.title}`);
  };

  const reviewEvidence = (evidenceId: string, status: 'VERIFIED' | 'REJECTED' | 'CLARIFICATION_REQUIRED', notes: string, verifiedVal?: string) => {
    setPilots(prev => prev.map(p => {
      return {
        ...p,
        evidenceList: p.evidenceList.map(e => {
          if (e.id === evidenceId) {
            return {
              ...e,
              verificationStatus: status,
              reviewerName: currentUser.name,
              reviewedDate: new Date().toISOString().split('T')[0],
              reviewNotes: notes,
              verifiedValue: verifiedVal || e.reportedValue,
              confidenceScore: status === 'VERIFIED' ? Math.max(e.confidenceScore, 95) : (status === 'REJECTED' ? 25 : 60)
            };
          }
          return e;
        })
      };
    }));

    addAuditEvent('REVIEWED_EVIDENCE', 'Evidence', evidenceId, `Validator recorded ${status} on evidence ${evidenceId}`);
  };

  const updateValidationReport = (updatedReport: Partial<ValidationReport>) => {
    setValidationReport(prev => ({
      ...prev,
      ...updatedReport,
      submittedDate: new Date().toISOString().split('T')[0]
    }));
    addAuditEvent('UPDATED_VALIDATION_REPORT', 'ValidationReport', validationReport.id, `Updated validation report status to ${updatedReport.status || validationReport.status}`);
  };

  const updateRiskItem = (riskId: string, status: any, mitigation?: string) => {
    setPilots(prev => prev.map(p => ({
      ...p,
      risks: p.risks.map(r => r.id === riskId ? { ...r, status, mitigation: mitigation || r.mitigation } : r)
    })));
    addAuditEvent('UPDATED_RISK', 'RiskItem', riskId, `Risk status updated to ${status}`);
  };

  const submitScaleDecision = (decision: ScaleDecisionType, reason: string, conditions?: any[]) => {
    const newRecord: ScaleDecisionRecord = {
      id: `SCL-2026-${String(Math.floor(Math.random()*89)+10)}`,
      pilotId: selectedPilotId,
      challengeId: selectedChallengeId,
      decision,
      recommendationSummary: decision === 'SCALE' ? 'RECOMMEND PHASE-1 STATEWIDE SCALE' : `${decision} Decision Recorded`,
      decisionReason: reason,
      authorizedOfficer: currentUser.name,
      designation: currentUser.designation,
      approvedDate: new Date().toISOString().split('T')[0],
      scaleConditions: conditions || scaleDecision.scaleConditions,
      projectedDistrictsCount: scaleDecision.projectedDistrictsCount,
      estimatedStateBudget: scaleDecision.estimatedStateBudget,
      estimatedAnnualSavings: scaleDecision.estimatedAnnualSavings,
      procurementRoute: scaleDecision.procurementRoute
    };

    setScaleDecision(newRecord);
    setChallenges(prev => prev.map(c => c.id === selectedChallengeId ? { ...c, stage: decision === 'SCALE' ? 'SCALED' : 'SCALE_DECISION', status: 'COMPLETED' } : c));
    addAuditEvent('RECORDED_SCALE_DECISION', 'ScaleDecision', newRecord.id, `Authorized scale decision: ${decision} by ${currentUser.name}`);
  };

  const toggleStartupComparison = (startupId: string) => {
    setComparisonStartupIds(prev => {
      if (prev.includes(startupId)) {
        return prev.filter(id => id !== startupId);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], startupId];
      }
      return [...prev, startupId];
    });
  };

  const clearComparison = () => setComparisonStartupIds([]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const resetScenario = () => {
    setChallenges(INITIAL_CHALLENGES);
    setStartups(INITIAL_STARTUPS);
    setApplications(INITIAL_APPLICATIONS);
    setPilots(INITIAL_PILOTS);
    setValidationReport(INITIAL_VALIDATION_REPORT);
    setProcurementReadiness(INITIAL_PROCUREMENT_READINESS);
    setScaleDecision(INITIAL_SCALE_DECISION);
    setDocuments(INITIAL_DOCUMENTS);
    setAuditTrail(INITIAL_AUDIT_TRAIL);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentRole('GOVERNMENT_OFFICER');
    setActiveTab('dashboard');
    setSelectedChallengeId('CH-001');
    setSelectedStartupId('ST-001');
    setSelectedPilotId('PLT-001');
    setGuidedTourActive(false);
    setGuidedTourStep(0);
    addAuditEvent('SCENARIO_RESET', 'System', 'ALL', 'Reset all prototype demonstration states to initial scenario.');
  };

  const startGuidedTour = () => {
    setGuidedTourActive(true);
    setGuidedTourStep(0);
  };

  const nextTourStep = () => {
    setGuidedTourStep(prev => prev + 1);
  };

  const prevTourStep = () => {
    setGuidedTourStep(prev => Math.max(0, prev - 1));
  };

  const endTour = () => {
    setGuidedTourActive(false);
    setGuidedTourStep(0);
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      setRole,
      currentUser,
      activeTab,
      setActiveTab,
      selectedChallengeId,
      setSelectedChallengeId,
      selectedStartupId,
      setSelectedStartupId,
      selectedPilotId,
      setSelectedPilotId,
      challenges,
      startups,
      applications,
      pilots,
      validationReport,
      procurementReadiness,
      scaleDecision,
      documents,
      auditTrail,
      notifications,
      comparisonStartupIds,
      toggleStartupComparison,
      clearComparison,
      guidedTourActive,
      guidedTourStep,
      startGuidedTour,
      nextTourStep,
      prevTourStep,
      endTour,
      createChallenge,
      submitApplication,
      recordScreeningDecision,
      submitEvaluationScore,
      createPilotFromApplication,
      updateMilestoneStatus,
      uploadEvidence,
      reviewEvidence,
      updateValidationReport,
      updateRiskItem,
      submitScaleDecision,
      markNotificationRead,
      addAuditEvent,
      resetScenario
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
