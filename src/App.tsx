import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { DemoBanner } from './components/layout/DemoBanner';
import { GuidedScenarioTour } from './components/common/GuidedScenarioTour';

// Core Workflow Views
import { DashboardView } from './views/DashboardView';
import { ChallengesView } from './views/ChallengesView';
import { CreateChallengeView } from './views/CreateChallengeView';
import { ChallengeDetailView } from './views/ChallengeDetailView';
import { StartupDiscoveryView } from './views/StartupDiscoveryView';
import { StartupProfileView } from './views/StartupProfileView';
import { EligibilityScreeningView } from './views/EligibilityScreeningView';
import { ExpertEvaluationView } from './views/ExpertEvaluationView';
import { PilotCommandCenterView } from './views/PilotCommandCenterView';
import { ContractMilestonesView } from './views/ContractMilestonesView';
import { EvidenceRoomView } from './views/EvidenceRoomView';
import { BaselineOutcomeView } from './views/BaselineOutcomeView';
import { IndependentValidationView } from './views/IndependentValidationView';
import { ProcurementReadinessView } from './views/ProcurementReadinessView';
import { ScaleDecisionView } from './views/ScaleDecisionView';
import { ScaleSimulatorView } from './views/ScaleSimulatorView';
import { RiskEngineView } from './views/RiskEngineView';
import { ProcurementPathwayView } from './views/ProcurementPathwayView';
import { DocumentCenterView } from './views/DocumentCenterView';
import { AuditTrailView } from './views/AuditTrailView';
import { AnalyticsView } from './views/AnalyticsView';

// Role Portals
import { StartupPortalView } from './views/portals/StartupPortalView';
import { EvaluatorPortalView } from './views/portals/EvaluatorPortalView';
import { ValidatorPortalView } from './views/portals/ValidatorPortalView';
import { AdminPortalView } from './views/portals/AdminPortalView';

const MainAppContent: React.FC = () => {
  const { activeTab } = useApp();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'challenges':
        return <ChallengesView />;
      case 'create-challenge':
        return <CreateChallengeView />;
      case 'challenge-detail':
        return <ChallengeDetailView />;
      case 'startup-discovery':
      case 'discovery':
        return <StartupDiscoveryView />;
      case 'startup-profile':
        return <StartupProfileView />;
      case 'eligibility-screening':
      case 'screening':
        return <EligibilityScreeningView />;
      case 'expert-evaluation':
      case 'evaluation':
        return <ExpertEvaluationView />;
      case 'pilot-command':
        return <PilotCommandCenterView />;
      case 'contract-milestones':
        return <ContractMilestonesView />;
      case 'evidence-room':
        return <EvidenceRoomView />;
      case 'baseline-outcome':
        return <BaselineOutcomeView />;
      case 'validation':
        return <IndependentValidationView />;
      case 'procurement-readiness':
        return <ProcurementReadinessView />;
      case 'scale-decision':
        return <ScaleDecisionView />;
      case 'scale-simulator':
        return <ScaleSimulatorView />;
      case 'risk-engine':
        return <RiskEngineView />;
      case 'procurement-pathway':
        return <ProcurementPathwayView />;
      case 'documents':
        return <DocumentCenterView />;
      case 'audit-trail':
        return <AuditTrailView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'startup-portal':
        return <StartupPortalView />;
      case 'evaluator-portal':
      case 'expert-portal':
        return <EvaluatorPortalView />;
      case 'validator-portal':
        return <ValidatorPortalView />;
      case 'admin-portal':
        return <AdminPortalView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col font-sans text-[#0D1B2A] antialiased selection:bg-[#0F3460] selection:text-white">
      {/* Top Demo Banner */}
      <DemoBanner />

      {/* Main Header */}
      <Header onToggleMobileNav={() => setMobileNavOpen(prev => !prev)} />

      {/* Guided Scenario Step-by-Step Tour */}
      <GuidedScenarioTour />

      {/* Main Shell Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Left Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Center Stage Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-10 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Drawer & Bottom Navigation */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
