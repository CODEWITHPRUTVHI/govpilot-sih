import { 
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
  SystemNotification 
} from '../types';

export const CURRENT_USERS: Record<string, User> = {
  GOVERNMENT_OFFICER: {
    id: 'USR-GOV-01',
    name: 'Shri Rajesh Patil, IAS',
    email: 'rajesh.patil@maharashtra.gov.in',
    role: 'GOVERNMENT_OFFICER',
    designation: 'Joint Secretary & Director (Procurement Innovation)',
    department: 'Water Supply & Sanitation Department',
    organization: 'Government of Maharashtra',
  },
  STARTUP: {
    id: 'USR-ST-01',
    name: 'Vikram Malhotra',
    email: 'vikram@aquasense.io',
    role: 'STARTUP',
    designation: 'Chief Executive Officer',
    department: 'Smart IoT Solutions',
    organization: 'AquaSense Technologies Pvt. Ltd.',
  },
  EXPERT_EVALUATOR: {
    id: 'USR-EXP-01',
    name: 'Dr. Ananya Sharma',
    email: 'a.sharma@iitb.ac.in',
    role: 'EXPERT_EVALUATOR',
    designation: 'Professor & Head of Environmental Systems',
    department: 'Department of Civil & Environmental Engineering',
    organization: 'IIT Bombay / State Technical Advisory Council',
  },
  INDEPENDENT_VALIDATOR: {
    id: 'USR-VAL-01',
    name: 'Dr. K. S. Deshmukh',
    email: 'ks.deshmukh@cwprs.gov.in',
    role: 'INDEPENDENT_VALIDATOR',
    designation: 'Chief Scientist & Lead Validation Auditor',
    department: 'Water Quality & Hydro-informatics Division',
    organization: 'CWPRS Pune & Quality Council of India (QCI)',
  },
  PROGRAM_ADMIN: {
    id: 'USR-ADM-01',
    name: 'Smt. Sunita More',
    email: 'sunita.more@msins.in',
    role: 'PROGRAM_ADMIN',
    designation: 'State Mission Director (Innovation Ecosystem)',
    department: 'Maharashtra State Innovation Society (MSInS)',
    organization: 'Dept of Skills, Employment, Entrepreneurship & Innovation',
  },
};

export const INITIAL_STARTUPS: Startup[] = [
  {
    id: 'ST-001',
    name: 'AquaSense Technologies',
    legalEntity: 'AquaSense Technologies Private Limited',
    dpiitNumber: 'DIPP89214',
    dpiitStatus: 'RECOGNIZED',
    foundedYear: 2021,
    headquarters: 'Pune, Maharashtra',
    website: 'https://aquasense.demo.gov.in',
    domains: ['Water & Sanitation', 'IoT & Edge AI', 'Smart Utilities'],
    capabilities: [
      'Multi-parameter Optical Contamination Sensing (pH, Turbidity, TDS, Coliform proxy)',
      'Edge anomaly detection without continuous cellular connectivity',
      'Solar-powered low-power submersible probe design (IP68)',
      'Automated alert dispatch to Gram Panchayat water valve operators via SMS/IVR'
    ],
    techStack: ['LoRaWAN / GSM', 'TinyML on ARM Cortex-M4', 'PostgreSQL / TimescaleDB', 'REST APIs & Webhooks'],
    securityReadiness: 'HIGH',
    certifications: ['ISO 27001 Certified', 'STQC Lab Tested', 'BIS IS 10500 compliant telemetry'],
    previousGovernmentDeployments: [
      {
        pilotName: 'Municipal Water Anomaly Pilot (Pimpri-Chinchwad)',
        department: 'PCMC Urban Water Supply',
        durationDays: 90,
        outcome: '31% faster biological contaminant identification; 0 telemetry dropouts',
        validationStatus: 'Independently validated'
      },
      {
        pilotName: 'Pilot Tanker Surveillance Trial',
        department: 'Nashik Zilla Parishad',
        durationDays: 60,
        outcome: 'Reduced manual water sample testing overhead by ₹1.2L/month',
        validationStatus: 'Completed'
      }
    ],
    evidenceScore: 94,
    matchExplanation: "Matched because the startup's solution addresses continuous microbial anomaly detection at edge nodes, has completed 2 verified civic pilots in Maharashtra, and meets full DPIIT and STQC data security prerequisites.",
    founder: {
      name: 'Vikram Malhotra',
      email: 'vikram@aquasense.io',
      phone: '+91 98230 45678'
    }
  },
  {
    id: 'ST-002',
    name: 'CivicGrid Labs',
    legalEntity: 'CivicGrid Solutions India LLP',
    dpiitNumber: 'DIPP76432',
    dpiitStatus: 'RECOGNIZED',
    foundedYear: 2022,
    headquarters: 'Mumbai, Maharashtra',
    website: 'https://civicgrid.demo.gov.in',
    domains: ['Water & Sanitation', 'SCADA Integration', 'GIS Mapping'],
    capabilities: [
      'Satellite Remote Sensing & GIS Hydrological Mapping',
      'Reservoir Turbidity Prediction using Cloud Computer Vision',
      'Centralized Jal Jeevan Mission Dashboard integration'
    ],
    techStack: ['Python / PyTorch', 'Sentinel-2 API', 'React GIS', 'Docker Containers'],
    securityReadiness: 'MEDIUM',
    certifications: ['CERT-In Empaneled Cloud Audit Passed', 'DPIIT Registered'],
    previousGovernmentDeployments: [
      {
        pilotName: 'Satara District Reservoir Monitoring',
        department: 'Water Resources Dept, GoM',
        durationDays: 120,
        outcome: 'Accurate surface catchment turbidity prediction 48 hours in advance',
        validationStatus: 'Self reported'
      }
    ],
    evidenceScore: 78,
    matchExplanation: 'Matched for predictive surface water modeling, but requires cloud connectivity and lacks real-time localized submersible microbial sensing for remote village borewells.',
    founder: {
      name: 'Pooja Kulkarni',
      email: 'pooja@civicgrid.io',
      phone: '+91 98221 87654'
    }
  },
  {
    id: 'ST-003',
    name: 'HydroSafe Analytics',
    legalEntity: 'HydroSafe Health Systems Pvt Ltd',
    dpiitNumber: 'DIPP99401',
    dpiitStatus: 'RECOGNIZED',
    foundedYear: 2023,
    headquarters: 'Nagpur, Maharashtra',
    website: 'https://hydrosafe.demo.gov.in',
    domains: ['Water & Sanitation', 'Chemical Testing', 'Rapid Test Kits'],
    capabilities: [
      'Digital Colorimetric Spectrophotometer Handheld Reader',
      'Field worker mobile app for manual reagent test capture',
      'GPS tagged water test result ingestion'
    ],
    techStack: ['Android Native (Kotlin)', 'Bluetooth BLE', 'Firebase Backend'],
    securityReadiness: 'BASIC',
    certifications: ['DPIIT Registered'],
    previousGovernmentDeployments: [
      {
        pilotName: 'Asha Worker Water Kit Pilot',
        department: 'Public Health Department, Gadchiroli',
        durationDays: 45,
        outcome: 'Recorded 1,200 manual field samples across 40 PHCs',
        validationStatus: 'Self reported'
      }
    ],
    evidenceScore: 71,
    matchExplanation: 'Matched for manual sample digital logging, but lacks continuous 24/7 automated telemetry and edge alarm triggering required for instantaneous pipeline breach alerts.',
    founder: {
      name: 'Dr. Nikhil Joshi',
      email: 'nikhil@hydrosafe.io',
      phone: '+91 97654 32109'
    }
  },
  {
    id: 'ST-004',
    name: 'AgriPulse Systems',
    legalEntity: 'AgriPulse Innovations Pvt Ltd',
    dpiitNumber: 'DIPP65412',
    dpiitStatus: 'RECOGNIZED',
    foundedYear: 2020,
    headquarters: 'Aurangabad, Maharashtra',
    website: 'https://agripulse.demo.gov.in',
    domains: ['Agriculture & Rural Tech', 'Precision Farming', 'Soil IoT'],
    capabilities: ['Soil NPK & Moisture telemetry', 'Canal water gate automated throttling', 'Farmer Marathi Voice Bot'],
    techStack: ['LoRa Mesh', 'MicroPython', 'Flask', 'PostgreSQL'],
    securityReadiness: 'HIGH',
    certifications: ['ISO 9001', 'DPIIT Registered'],
    previousGovernmentDeployments: [],
    evidenceScore: 82,
    matchExplanation: 'Domain specialized in agriculture irrigation rather than municipal potability and microbial pathogens.',
    founder: {
      name: 'Sanjay Jadhav',
      email: 'sanjay@agripulse.io',
      phone: '+91 98901 12345'
    }
  },
  {
    id: 'ST-005',
    name: 'UrbanSignal Analytics',
    legalEntity: 'UrbanSignal Intelligence Systems LLP',
    dpiitNumber: 'DIPP88190',
    dpiitStatus: 'RECOGNIZED',
    foundedYear: 2021,
    headquarters: 'Thane, Maharashtra',
    website: 'https://urbansignal.demo.gov.in',
    domains: ['Smart Governance', 'Urban Mobility', 'Traffic AI'],
    capabilities: ['CCTV Video Analytics at Edge', 'Emergency Vehicle Green Corridor Routing', 'Traffic Density AI'],
    techStack: ['NVIDIA Jetson', 'YOLOv8', 'WebSockets', 'Kafka'],
    securityReadiness: 'HIGH',
    certifications: ['ISO 27001', 'DPIIT Registered'],
    previousGovernmentDeployments: [],
    evidenceScore: 89,
    matchExplanation: 'Specialized in transport and urban mobility surveillance.',
    founder: {
      name: 'Rohan Mehra',
      email: 'rohan@urbansignal.io',
      phone: '+91 98111 22334'
    }
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'CH-001',
    challengeCode: 'CH-MH-2026-014',
    title: 'Early detection of contamination in rural drinking-water systems',
    department: 'Water Supply & Sanitation Department',
    theme: 'Water & Sanitation',
    problemStatement: 'Rural water schemes (Jal Jeevan Mission / Har Ghar Nal Se Jal) in drought-prone and tribal districts face recurring microbiological and chemical contamination incidents during monsoons and seasonal aquifer shifts. Currently, water sample testing relies on manual physical sample collection transported to district public health laboratories, resulting in a 72-hour turnaround time during which contaminated water is consumed by rural households.',
    currentProcess: 'Manual grab sampling once every 14 days by Gram Sevak/Jal Surakshak; physical transport via ST bus/courier to Sub-Divisional Public Health Lab; manual register entry; report dispatched via postal or manual SMS 3-4 days later.',
    affectedPopulation: 'Approx. 4.2 Million citizens across 1,850 habitations in Amravati, Nashik, and Satara districts.',
    geographicScope: 'Maharashtra State - Priority Pilot in 50 Village Panchayats across 3 Agro-Climatic Zones.',
    district: 'Amravati, Nashik, Satara',
    currentBaseline: 'Average contamination detection & alert turnaround: 72 hours. Testing operational cost: ₹450 per testing point per cycle. Village monitoring coverage: 20 sample collection points active.',
    expectedOutcome: 'Continuous edge-based anomaly detection & alert generation ≤ 24 hours. Operational cost reduction to ≤ ₹300 per testing point per month. Scalable automated telemetry covering 50+ village water distribution tanks.',
    constraints: 'Must operate in low-bandwidth (2G / intermittent GSM) zones; submersible probes must resist scaling in hard water (TDS up to 1500 ppm); zero hazardous chemical reagents discharged into potable water.',
    stage: 'SCALE_DECISION',
    status: 'SCALE_PENDING',
    createdAt: '2026-04-10',
    publishedAt: '2026-04-15',
    pilotBudget: 1500000,
    pilotDurationDays: 90,
    pilotLocation: '50 Gram Panchayats (Amravati, Nashik, Satara)',
    maxParticipants: 3,
    eligibilityCriteria: {
      dpiitRequired: true,
      maxCompanyAgeYears: 7,
      requiredDomain: 'Water Quality / IoT Telemetry / Sensor Analytics',
      securityRequirements: 'Data stored exclusively in MeitY empaneled Indian cloud servers; TLS 1.3 encryption on device-to-gateway telemetry.',
      technicalRequirements: 'Submersible probe with minimum IP68 rating; automated threshold alerting via SMS/webhook; battery backup ≥ 48 hours without grid power.',
      financialRequirements: 'Positive net worth or minimum ₹25L in verified grant/equity funding; no blacklisting by State or Central Government.'
    },
    evaluationWeights: {
      technicalFeasibility: 25,
      expectedImpact: 25,
      scalability: 15,
      security: 15,
      costEffectiveness: 10,
      implementationReadiness: 10
    },
    applicationsCount: 3,
    selectedStartupId: 'ST-001',
    activePilotId: 'PLT-001'
  },
  {
    id: 'CH-002',
    challengeCode: 'CH-MH-2026-008',
    title: 'AI-assisted Crop Pest & Fungal Infestation Early Warning for Marathwada Cotton & Soybean',
    department: 'Department of Agriculture',
    theme: 'Agriculture & Rural Tech',
    problemStatement: 'Pink bollworm and Spodoptera pest outbreaks cause up to 40% yield loss in cotton and soybean crops. Farmers lack real-time local micro-climate forecast integration and microscopic spore detection, leading to reactive and excessive chemical pesticide spraying.',
    currentProcess: 'Periodic physical field inspection by Krishi Sahayak every 3 weeks covering less than 5% of farmer plots.',
    affectedPopulation: '1.8 Million small and marginal farmers in Chhatrapati Sambhajinagar, Jalna, and Beed.',
    geographicScope: 'Marathwada Division (Dryland farming cluster)',
    district: 'Chhatrapati Sambhajinagar, Jalna',
    currentBaseline: 'Infestation detection latency: 14 days after physical crop damage. Chemical pesticide spend: ₹4,800/acre.',
    expectedOutcome: 'Pre-outbreak spore & pheromone trap detection 72 hours before visible crop defoliation. Reduce pesticide input by 30%.',
    constraints: 'Smart trap hardware must withstand 48°C ambient temperature and require zero solar panel cleaning for 6 months.',
    stage: 'EVALUATION',
    status: 'IN_EVALUATION',
    createdAt: '2026-05-02',
    publishedAt: '2026-05-10',
    pilotBudget: 1200000,
    pilotDurationDays: 120,
    pilotLocation: '25 Village Clusters in Jalna & Beed',
    maxParticipants: 4,
    eligibilityCriteria: {
      dpiitRequired: true,
      maxCompanyAgeYears: 5,
      requiredDomain: 'Agritech / Computer Vision / Edge IoT',
      securityRequirements: 'Farmer PII and land survey numbers anonymized and encrypted.',
      technicalRequirements: 'Solar-powered optical trap with local image compression and 4G/NB-IoT uplink.',
      financialRequirements: 'DPIIT certified with minimum ₹10L annual turnover or equivalent incubation backing.'
    },
    evaluationWeights: {
      technicalFeasibility: 30,
      expectedImpact: 20,
      scalability: 20,
      security: 10,
      costEffectiveness: 10,
      implementationReadiness: 10
    },
    applicationsCount: 5
  },
  {
    id: 'CH-003',
    challengeCode: 'CH-MH-2026-021',
    title: 'Automated Triaging & Tele-consultation Quality Auditing for Primary Health Centers (PHCs)',
    department: 'Public Health Department',
    theme: 'Healthcare & Diagnostics',
    problemStatement: 'Remote PHCs in tribal blocks of Nandurbar and Gadchiroli experience severe specialist doctor shortages. Medical officers conduct high-volume consultations without automated digital prescription auditing or clinical protocol compliance checks.',
    currentProcess: 'Paper prescription slips physically audited randomly during quarterly district health inspections.',
    affectedPopulation: '650,000 tribal and rural residents across 42 Sub-Centers.',
    geographicScope: 'Nandurbar & Gadchiroli District PHCs',
    district: 'Nandurbar, Gadchiroli',
    currentBaseline: 'Clinical protocol compliance audit sample rate: < 2%. Specialist referral queue delay: 18 days.',
    expectedOutcome: 'Real-time offline-first clinical protocol validation on 100% electronic outpatient records. Triage time reduced to < 3 days.',
    constraints: 'Must comply with ABDM (Ayushman Bharat Digital Mission) M1/M2/M3 standards and DISHA privacy draft.',
    stage: 'STARTUP_DISCOVERY',
    status: 'OPEN',
    createdAt: '2026-06-12',
    publishedAt: '2026-06-18',
    pilotBudget: 2000000,
    pilotDurationDays: 90,
    pilotLocation: '12 PHCs in Nandurbar District',
    maxParticipants: 3,
    eligibilityCriteria: {
      dpiitRequired: true,
      maxCompanyAgeYears: 7,
      requiredDomain: 'HealthTech / ABDM Integrations / Clinical NLP',
      securityRequirements: 'ABDM sandbox certified with ISO 27799 health informatics privacy compliance.',
      technicalRequirements: 'Offline synchronization with localized caching for zero-bandwidth clinics.',
      financialRequirements: 'Audited balance sheets for previous financial year.'
    },
    evaluationWeights: {
      technicalFeasibility: 20,
      expectedImpact: 25,
      scalability: 20,
      security: 20,
      costEffectiveness: 10,
      implementationReadiness: 5
    },
    applicationsCount: 4
  },
  {
    id: 'CH-004',
    challengeCode: 'CH-MH-2026-003',
    title: 'Smart Waste Segregation & Dump Yard Bio-methanation Telemetry',
    department: 'Urban Development Department',
    theme: 'Environment & Energy',
    problemStatement: 'Tier-2 and Tier-3 municipal councils struggle to verify organic vs non-biodegradable segregation compliance at source before municipal trucks dump waste into landfills.',
    currentProcess: 'Visual spot checks by municipal sanitary inspectors at gate scale.',
    affectedPopulation: '1.2 Million urban residents across 4 Municipal Councils.',
    geographicScope: 'Kolhapur & Sangli Municipal Divisions',
    district: 'Kolhapur, Sangli',
    currentBaseline: 'Contaminated organic payload rejected at composting plants: 38%.',
    expectedOutcome: 'AI-assisted hopper optical scan reducing contaminated loads to < 10%.',
    constraints: 'Vibration-resistant camera modules mounted on compactor trucks.',
    stage: 'PILOT_DESIGN',
    status: 'DRAFT',
    createdAt: '2026-07-01',
    publishedAt: '2026-07-10',
    pilotBudget: 1000000,
    pilotDurationDays: 60,
    pilotLocation: 'Kolhapur Municipal Ward 4 & 5',
    maxParticipants: 2,
    eligibilityCriteria: {
      dpiitRequired: true,
      maxCompanyAgeYears: 5,
      requiredDomain: 'CleanTech / Computer Vision / Municipal Operations',
      securityRequirements: 'No personal identity capture of sanitation workers.',
      technicalRequirements: 'Industrial IP67 camera with wide dynamic range optical sensor.',
      financialRequirements: 'DPIIT certified startup.'
    },
    evaluationWeights: {
      technicalFeasibility: 25,
      expectedImpact: 25,
      scalability: 20,
      security: 10,
      costEffectiveness: 10,
      implementationReadiness: 10
    },
    applicationsCount: 2
  }
];

export const INITIAL_APPLICATIONS: StartupApplication[] = [
  {
    id: 'APP-001',
    challengeId: 'CH-001',
    startupId: 'ST-001',
    startupName: 'AquaSense Technologies',
    solutionTitle: 'AquaSense Edge-AI Potable Water Anomaly Network (EPWAN)',
    executiveSummary: 'Submersible multi-parameter IoT probes deploying local edge neural inference on ARM Cortex-M4 to detect biological turbidity anomalies and chemical deviations within 15 minutes of occurrence, dispatching fail-safe automated alerts to Gram Panchayat operators.',
    appliedDate: '2026-04-20',
    technicalProposalDoc: 'AquaSense_Technical_Proposal_v2.4_CH014.pdf',
    proposedCost: 1420000,
    proposedDurationDays: 90,
    screeningStatus: 'PASS',
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
    screeningNotes: 'Fully verified against DPIIT DIPP89214. STQC lab certificate valid till 2027. Past pilot in PCMC showed 31% detection speedup. Meets all technical and cybersecurity criteria.',
    screeningOfficer: 'Shri Rajesh Patil, IAS',
    screeningDate: '2026-04-25',
    evaluations: [
      {
        expertId: 'USR-EXP-01',
        expertName: 'Dr. Ananya Sharma',
        expertDesignation: 'Professor & Head of Environmental Systems, IIT Bombay',
        organization: 'IIT Bombay',
        submittedAt: '2026-05-04 14:30',
        hasDeclaredNoConflict: true,
        scores: {
          problemFit: 94,
          technicalFeasibility: 92,
          scalability: 88,
          security: 90,
          costEffectiveness: 85,
          implementationReadiness: 95
        },
        weightedTotal: 91.05,
        qualitativeFeedback: {
          strengths: 'Outstanding edge-computing architecture that overcomes rural GSM packet dropouts. Calibration methodology for optical bio-turbidity proxy is backed by solid empirical data.',
          risks: 'Mineral scaling on optical lenses in high-TDS aquifers (e.g. Satara basalt zones) will require automated ultrasonic cleaning or bi-weekly maintenance protocols.',
          pilotRecommendations: 'Deploy 50% of test probes in high-hardness groundwater borewells to rigorously test probe resilience.'
        }
      },
      {
        expertId: 'USR-EXP-02',
        expertName: 'Dr. Mohan Joshi',
        expertDesignation: 'Chief Superintending Engineer (Retd.), Maharashtra Water Supply & Sewerage Board',
        organization: 'State Technical Advisory Council',
        submittedAt: '2026-05-05 11:15',
        hasDeclaredNoConflict: true,
        scores: {
          problemFit: 90,
          technicalFeasibility: 89,
          scalability: 86,
          security: 88,
          costEffectiveness: 88,
          implementationReadiness: 92
        },
        weightedTotal: 88.9,
        qualitativeFeedback: {
          strengths: 'User interface tailored for Marathi-speaking Gram Sevaks with SMS-based acknowledgement loop is very practical.',
          risks: 'Supply chain lead time for imported electrochemical optical diodes if scaled to 36 districts.',
          pilotRecommendations: 'Verify field replacement time for battery and probe modules by local gram panchayat youth.'
        }
      }
    ],
    averageEvaluationScore: 89.98,
    selectionStatus: 'PILOT_SELECTED'
  },
  {
    id: 'APP-002',
    challengeId: 'CH-001',
    startupId: 'ST-002',
    startupName: 'CivicGrid Labs',
    solutionTitle: 'CivicGrid Satellite & Reservoir Predictive Water Model',
    executiveSummary: 'Satellite remote sensing combined with watershed GIS topography mapping to predict reservoir catchment runoff contamination.',
    appliedDate: '2026-04-22',
    technicalProposalDoc: 'CivicGrid_Water_AI_Proposal.pdf',
    proposedCost: 1350000,
    proposedDurationDays: 90,
    screeningStatus: 'PASS',
    screeningChecklist: {
      dpiitRecognition: true,
      requiredDocuments: true,
      domainEligibility: true,
      technicalRequirements: false, // Does not do in-pipe microbial sensing
      securityRequirements: true,
      conflictDeclaration: true,
      financialSoundness: true,
      dataHandlingCompliance: true
    },
    screeningNotes: 'Passed administrative screening, but noted variance: satellite sensing cannot monitor bacterial contamination inside underground sump tanks or distribution pipelines.',
    screeningOfficer: 'Shri Rajesh Patil, IAS',
    screeningDate: '2026-04-25',
    evaluations: [
      {
        expertId: 'USR-EXP-01',
        expertName: 'Dr. Ananya Sharma',
        expertDesignation: 'Professor, IIT Bombay',
        organization: 'IIT Bombay',
        submittedAt: '2026-05-04 16:00',
        hasDeclaredNoConflict: true,
        scores: {
          problemFit: 72,
          technicalFeasibility: 80,
          scalability: 85,
          security: 82,
          costEffectiveness: 75,
          implementationReadiness: 70
        },
        weightedTotal: 77.4,
        qualitativeFeedback: {
          strengths: 'Strong macroscopic watershed modeling.',
          risks: 'Fails to detect localized point-source bacterial contamination inside village overhead storage tanks (ESRs).',
          pilotRecommendations: 'Better suited for Water Resources Department dam catchment planning rather than rural potable pipeline monitoring.'
        }
      }
    ],
    averageEvaluationScore: 77.4,
    selectionStatus: 'SHORTLISTED'
  },
  {
    id: 'APP-003',
    challengeId: 'CH-001',
    startupId: 'ST-003',
    startupName: 'HydroSafe Analytics',
    solutionTitle: 'HydroSafe Handheld Smart Spectrophotometer Reader',
    executiveSummary: 'Digital handheld reader for rapid field test kits with mobile GPS tagging and automated laboratory synchronisation.',
    appliedDate: '2026-04-21',
    technicalProposalDoc: 'HydroSafe_Handheld_Proposal.pdf',
    proposedCost: 1100000,
    proposedDurationDays: 90,
    screeningStatus: 'REVIEW_REQUIRED',
    screeningChecklist: {
      dpiitRecognition: true,
      requiredDocuments: true,
      domainEligibility: true,
      technicalRequirements: false, // requires human operator, not automated 24/7
      securityRequirements: false, // relies on consumer Firebase instance without MeitY cloud compliance audit
      conflictDeclaration: true,
      financialSoundness: true,
      dataHandlingCompliance: false
    },
    screeningNotes: 'Requires manual sample collection; relies on non-MeitY certified cloud storage. Needs security remediation before pilot eligibility.',
    screeningOfficer: 'Shri Rajesh Patil, IAS',
    screeningDate: '2026-04-25',
    evaluations: [],
    selectionStatus: 'REJECTED'
  }
];

export const INITIAL_PILOTS: Pilot[] = [
  {
    id: 'PLT-001',
    challengeId: 'CH-001',
    challengeTitle: 'Early detection of contamination in rural drinking-water systems',
    startupId: 'ST-001',
    startupName: 'AquaSense Technologies',
    department: 'Water Supply & Sanitation Department',
    agreementId: 'GOM-WSSD-PILOT-2026-089',
    objective: 'Deploy 50 submersible optical IoT telemetry nodes across rural overhead water tanks and distribution sumps in Amravati, Nashik, and Satara districts to reduce contamination detection time from 72 hours baseline to ≤ 24 hours while cutting operational testing costs.',
    location: '50 Gram Panchayats across Amravati (20), Nashik (15), and Satara (15)',
    district: 'Amravati, Nashik, Satara',
    durationDays: 90,
    startDate: '2026-05-15',
    endDate: '2026-08-15',
    daysRemaining: 0,
    budgetAllocated: 1420000,
    budgetConsumed: 1136000,
    status: 'AWAITING_VALIDATION',
    riskLevel: 'LOW',
    milestones: [
      {
        id: 'MS-001',
        milestoneNumber: 1,
        title: 'M1 — Setup, Site Inspection & Hardware Pre-calibration',
        deliverable: '50 calibrated IP68 probe units with solar harvest modules bench-tested against standard microbiological lab controls; baseline site surveys completed in 50 Gram Panchayats.',
        requiredEvidence: 'Lab calibration certificates from NABL accredited lab; baseline site survey sign-offs signed by respective Gram Sevaks.',
        dueDate: '2026-05-30',
        paymentPercentage: 20,
        budgetAmount: 284000,
        approvalAuthority: 'Executive Engineer (Rural Water Supply), Nashik Division',
        status: 'PAYMENT_RELEASED',
        submittedDate: '2026-05-28',
        verifiedBy: 'Dr. K. S. Deshmukh (Independent Validator)',
        verificationNotes: 'All 50 units inspected at CWPRS testing bench; NABL accuracy within ±1.5% of reference spectrophotometer.'
      },
      {
        id: 'MS-002',
        milestoneNumber: 2,
        title: 'M2 — Field Deployment & Live Telemetry Telecast',
        deliverable: 'Installation of 50 IoT nodes on rural Elevated Storage Reservoirs (ESRs) and distribution manifolds; active real-time data streaming into State Water Dashboard with 99% uptime.',
        requiredEvidence: 'GPS-tagged geo-stamped photos of 50 installations; 14-day continuous telemetry data log in CSV format; automated SMS dispatch audit logs.',
        dueDate: '2026-06-30',
        paymentPercentage: 30,
        budgetAmount: 426000,
        approvalAuthority: 'Superintending Engineer, Water Supply & Sanitation Department',
        status: 'PAYMENT_RELEASED',
        submittedDate: '2026-06-27',
        verifiedBy: 'Dr. K. S. Deshmukh (Independent Validator)',
        verificationNotes: 'Telemetry verified live across 50 nodes. 1 node in Melghat experienced 3-hour GSM outage, successfully back-propagated via offline flash buffer.'
      },
      {
        id: 'MS-003',
        milestoneNumber: 3,
        title: 'M3 — Mid-Pilot Performance & Simulated Breach Validation',
        deliverable: 'Controlled non-toxic tracer challenge test in 3 designated test tanks to measure live anomaly detection response time and Gram Panchayat alert latency.',
        requiredEvidence: 'Controlled spike testing log report; timestamped valve operator SMS logs; correlation report against physical laboratory grab sample tests.',
        dueDate: '2026-07-25',
        paymentPercentage: 30,
        budgetAmount: 426000,
        approvalAuthority: 'Joint Secretary (Procurement Innovation), GoM',
        status: 'PAYMENT_RELEASED',
        submittedDate: '2026-07-23',
        verifiedBy: 'Dr. K. S. Deshmukh (Independent Validator)',
        verificationNotes: 'Tracer anomaly detected within 28 minutes of spike introduction; village valve operator received Marathi SMS in 4 minutes.'
      },
      {
        id: 'MS-004',
        milestoneNumber: 4,
        title: 'M4 — Final Outcome Assessment, Independent Audit & Handover',
        deliverable: 'Comprehensive 90-day pilot performance report, CWPRS independent validation audit sign-off, full operational handbook in Marathi and English, and API data integration with State JJM portal.',
        requiredEvidence: 'Independent validation audit report; 90-day aggregated metric log; Gram Panchayat satisfaction surveys (minimum 85% satisfaction).',
        dueDate: '2026-08-15',
        paymentPercentage: 20,
        budgetAmount: 284000,
        approvalAuthority: 'Director, MSInS & Joint Secretary, WSSD',
        status: 'APPROVED',
        submittedDate: '2026-08-14',
        verifiedBy: 'Dr. K. S. Deshmukh (Independent Validator)',
        verificationNotes: 'Validation report finalized on 2026-08-18. Performance targets exceeded (31 hours detection vs 72h baseline; cost ₹340 vs ₹450 baseline).'
      }
    ],
    metrics: [
      {
        id: 'MET-001',
        name: 'Average Contamination Detection & Alert Turnaround',
        unit: 'Hours',
        baselineValue: 72,
        currentValue: 31,
        targetValue: 24,
        status: 'ON_TRACK',
        category: 'Speed',
        verificationStatus: 'INDEPENDENTLY_VERIFIED'
      },
      {
        id: 'MET-002',
        name: 'Operational Testing Cost per Village Point per Month',
        unit: '₹ (INR)',
        baselineValue: 450,
        currentValue: 340,
        targetValue: 300,
        status: 'ON_TRACK',
        category: 'Cost',
        verificationStatus: 'INDEPENDENTLY_VERIFIED'
      },
      {
        id: 'MET-003',
        name: 'Active Village Habitations Monitored Continuously',
        unit: 'Villages',
        baselineValue: 20,
        currentValue: 46,
        targetValue: 50,
        status: 'ON_TRACK',
        category: 'Coverage',
        verificationStatus: 'INDEPENDENTLY_VERIFIED'
      },
      {
        id: 'MET-004',
        name: 'Hardware Telemetry Uptime in Rural 2G Conditions',
        unit: '% Uptime',
        baselineValue: 65,
        currentValue: 99.2,
        targetValue: 98,
        status: 'EXCEEDS_TARGET',
        category: 'Quality',
        verificationStatus: 'INDEPENDENTLY_VERIFIED'
      },
      {
        id: 'MET-005',
        name: 'Gram Panchayat Operator Alert Acknowledgment Rate',
        unit: '% Acknowledged',
        baselineValue: 28,
        currentValue: 92,
        targetValue: 85,
        status: 'EXCEEDS_TARGET',
        category: 'Compliance',
        verificationStatus: 'INDEPENDENTLY_VERIFIED'
      }
    ],
    evidenceList: [
      {
        id: 'EVD-001',
        pilotId: 'PLT-001',
        title: 'NABL Certified Water Quality Correlation & Sensor Accuracy Test',
        category: 'Performance',
        source: 'Sub-Divisional Public Health Laboratory, Nashik & NABL Calibration Lab',
        date: '2026-06-15',
        metricName: 'Anomaly Detection Accuracy vs Lab Spectrophotometer',
        baselineValue: 'Lab manual test = 100% baseline accuracy benchmark',
        reportedValue: '98.6% Pearson correlation with standard laboratory turbidity/spectroscopy',
        verifiedValue: '98.4% correlation confirmed by CWPRS secondary blind samples',
        fileType: 'PDF',
        fileName: 'NABL_Lab_Correlation_Report_AquaSense_June2026.pdf',
        fileSize: '4.8 MB',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        verificationStatus: 'VERIFIED',
        reviewerName: 'Dr. K. S. Deshmukh (CWPRS)',
        reviewedDate: '2026-06-20',
        reviewNotes: 'Verified against 120 parallel physical grab samples taken across 15 Nashik villages. Sensor drift remained within acceptable ±0.05 NTU.',
        confidenceScore: 97,
        extractedMetrics: {
          'Sample Count': 120,
          'Correlation Coefficient (r)': 0.984,
          'False Positive Rate': '1.2%',
          'Response Latency': '18.4 mins'
        }
      },
      {
        id: 'EVD-002',
        pilotId: 'PLT-001',
        title: '75-Day Comprehensive Edge Telemetry & Sensor Log Stream',
        category: 'Reliability',
        source: 'State Jal Jeevan Mission Data Gateway & AquaSense Edge Gateways',
        date: '2026-07-30',
        metricName: 'Continuous Telemetry Packet Delivery Rate',
        baselineValue: '65% manual register capture consistency',
        reportedValue: '99.2% packet delivery with offline SD-card buffer sync',
        verifiedValue: '99.1% verified through server-side ingestion logs',
        fileType: 'CSV',
        fileName: 'AquaSense_50Nodes_Telemetry_TimeSeries_May_July2026.csv',
        fileSize: '42.1 MB',
        hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
        verificationStatus: 'VERIFIED',
        reviewerName: 'Dr. K. S. Deshmukh (CWPRS)',
        reviewedDate: '2026-08-05',
        reviewNotes: 'Analyzed 1.8 Million telemetry records. Micro-interruptions handled gracefully via local storage.',
        confidenceScore: 99,
        extractedMetrics: {
          'Total Records Ingested': 1845200,
          'Packet Loss Ratio': '0.82%',
          'Mean Time Between Outages': '720 hours',
          'Battery Cycle Life': '100% nominal'
        }
      },
      {
        id: 'EVD-003',
        pilotId: 'PLT-001',
        title: 'Operational Cost Audit & Gram Panchayat Billing Analysis',
        category: 'Cost',
        source: 'Accounts Officer, Rural Water Supply Division, Amravati Zilla Parishad',
        date: '2026-08-01',
        metricName: 'Direct Testing Expenditure per Testing Point',
        baselineValue: '₹450 / testing point / cycle (Courier + Lab Reagents)',
        reportedValue: '₹340 / testing point / month amortized',
        verifiedValue: '₹342.50 / point confirmed by ZP Finance Officer',
        fileType: 'REPORT',
        fileName: 'Amravati_ZP_Water_Testing_Cost_Audit_2026.pdf',
        fileSize: '2.1 MB',
        hash: '3f786850e387550fdab836ed7e6dc881de23001b71e8184f47ec0189a74a4413',
        verificationStatus: 'VERIFIED',
        reviewerName: 'Dr. K. S. Deshmukh (CWPRS)',
        reviewedDate: '2026-08-10',
        reviewNotes: 'Significant drop in transit testing cost; slight increase in local cellular SIM data recharge accounted for.',
        confidenceScore: 94,
        extractedMetrics: {
          'Prior 3-Month Baseline Spend': '₹67,500 (50 points)',
          'Pilot Operational Spend': '₹51,375 (50 points)',
          'Net Monthly Savings': '₹16,125 (23.9% reduction)',
          'Projected Statewide Savings': '₹4.8 Cr / year'
        }
      },
      {
        id: 'EVD-004',
        pilotId: 'PLT-001',
        title: 'CERT-In Empaneled Cybersecurity & Penetration Testing Audit',
        category: 'Security',
        source: 'CyberGuard Security Labs (CERT-In Empaneled Auditor)',
        date: '2026-08-08',
        metricName: 'Vulnerability Assessment & Penetration Testing (VAPT)',
        baselineValue: 'N/A (New IoT deployment)',
        reportedValue: 'Zero Critical or High severity vulnerabilities; TLS 1.3 enforced',
        verifiedValue: 'VAPT Clearance Certificate No. CGSL/2026/VAPT-892',
        fileType: 'PDF',
        fileName: 'AquaSense_VAPT_Clearance_Certificate_CERTIn.pdf',
        fileSize: '3.4 MB',
        hash: 'd41d8cd98f00b204e9800998ecf8427e0892837265bc729188092a8381827419',
        verificationStatus: 'VERIFIED',
        reviewerName: 'Dr. K. S. Deshmukh (CWPRS)',
        reviewedDate: '2026-08-12',
        reviewNotes: 'All API endpoints authenticated via signed JWT with rotating RSA-4096 keys; hardware firmware encrypted with secure boot.',
        confidenceScore: 98,
        extractedMetrics: {
          'Critical Vulnerabilities': 0,
          'High Vulnerabilities': 0,
          'Medium (Remediated)': 2,
          'Firmware Encryption': 'AES-256-GCM'
        }
      },
      {
        id: 'EVD-005',
        pilotId: 'PLT-001',
        title: 'Gram Panchayat Jal Surakshak Usability & IVR Alert Feedback Survey',
        category: 'User feedback',
        source: 'District Innovation Coordinator, MSInS Satara',
        date: '2026-08-10',
        metricName: 'User Adoption & Satisfaction Index',
        baselineValue: '28% response rate to laboratory paper dispatch notices',
        reportedValue: '92% SMS alert acknowledgement by local valve operators',
        verifiedValue: '91.8% validated via telecom delivery receipts',
        fileType: 'PDF',
        fileName: 'Satara_JalSurakshak_Field_Survey_AquaSense.pdf',
        fileSize: '1.9 MB',
        hash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
        verificationStatus: 'VERIFIED',
        reviewerName: 'Dr. K. S. Deshmukh (CWPRS)',
        reviewedDate: '2026-08-14',
        reviewNotes: 'Marathi audio prompt feature in IVR significantly reduced false ignores.',
        confidenceScore: 95,
        extractedMetrics: {
          'Operators Surveyed': 48,
          'Satisfaction Score': '4.7 / 5.0',
          'Marathi IVR Preference': '94%',
          'Average Response Time to Alert': '12 minutes'
        }
      }
    ],
    risks: [
      {
        id: 'RSK-001',
        category: 'Technical',
        description: 'Hard water scale formation on optical quartz windows in Satara basalt groundwater zones reducing optical sensitivity over time.',
        probability: 'Medium',
        impact: 'Medium',
        score: 4,
        mitigation: 'Implemented automated piezo-ultrasonic transducer wiper cycle every 6 hours + mandatory bi-monthly vinegar rinse protocol for field operators.',
        owner: 'Vikram Malhotra (Startup CTO)',
        status: 'Mitigated'
      },
      {
        id: 'RSK-002',
        category: 'Cybersecurity',
        description: 'Potential unauthorized spoofing of water sensor telemetry packets to inject fake contamination alerts.',
        probability: 'Low',
        impact: 'High',
        score: 3,
        mitigation: 'Hardware root-of-trust (ATECC608A cryptographic co-processor) embedded in every probe with ECDSA message signing.',
        owner: 'AquaSense Security Lead',
        status: 'Mitigated'
      },
      {
        id: 'RSK-003',
        category: 'Vendor dependency',
        description: 'Proprietary telemetry schema could lock department into single-vendor hardware replacement.',
        probability: 'Medium',
        impact: 'High',
        score: 6,
        mitigation: 'Startup has open-sourced the JSON/MQTT schema and agreed to provide standard OGC SensorThings API compliant gateway adapter.',
        owner: 'Joint Secretary (Procurement Innovation)',
        status: 'Mitigated'
      },
      {
        id: 'RSK-004',
        category: 'Scalability',
        description: 'Local semiconductor component supply chain constraints for 10,000 units during statewide scaling phase.',
        probability: 'Medium',
        impact: 'Medium',
        score: 4,
        mitigation: 'Startup has signed memorandum with CDAC & Kaynes Technology Pune for domestic SMT printed circuit board assembly.',
        owner: 'MSInS Program Director',
        status: 'Monitoring'
      }
    ],
    ipTerms: 'Background IP retained by AquaSense Technologies Pvt Ltd; Government of Maharashtra granted irrevocable, royalty-free, perpetual license to all pilot telemetry, analytics models, and custom state dashboard integrations.',
    dataTerms: 'All water quality sensor data, geo-coordinates, and alert histories are strictly sovereign government data hosted on State Data Centre (SDC) or MeitY empaneled cloud; zero commercial monetization permitted.',
    securityRequirements: 'STQC ISO/IEC 15408 Common Criteria testing, TLS 1.3 in-flight encryption, AES-256 at-rest database encryption, and biannual CERT-In VAPT recertification.'
  }
];

export const INITIAL_VALIDATION_REPORT: ValidationReport = {
  id: 'VAL-RPT-2026-042',
  pilotId: 'PLT-001',
  validatorName: 'Dr. K. S. Deshmukh',
  validatorOrganization: 'CWPRS Pune & Quality Council of India (QCI)',
  submittedDate: '2026-08-18',
  methodology: 'Triangulated audit methodology combining: (1) Laboratory bench cross-calibration at CWPRS hydro-instrumentation testing facility, (2) 120 parallel physical grab samples analyzed at NABL accredited labs against real-time sensor streams, (3) Ingested time-series telemetry analysis of 1.84M sensor data points, (4) In-person surprise field inspections across 12 Gram Panchayats in Nashik and Satara, (5) Financial ledger reconciliation of recurring operational costs.',
  evidenceReviewedCount: 5,
  verifiedOutcomes: [
    {
      metric: 'Contamination Detection & Alert Turnaround',
      baseline: '72 hours (Laboratory batch testing)',
      claimed: '18 - 31 hours (Continuous IoT Edge)',
      verified: '31 hours average in wild; 18.4 mins in controlled tracer tests',
      variance: '-56.9% turnaround time reduction',
      isVerified: true
    },
    {
      metric: 'Operational Cost per Testing Point / Month',
      baseline: '₹450 / testing point / cycle',
      claimed: '₹340 / testing point / month',
      verified: '₹342.50 / point / month',
      variance: '-23.9% cost reduction',
      isVerified: true
    },
    {
      metric: 'Telemetry Ingestion Reliability in Rural 2G Conditions',
      baseline: '65% manual record capture',
      claimed: '99.2% packet delivery rate',
      verified: '99.1% validated through server audit logs',
      variance: '+52.4% consistency improvement',
      isVerified: true
    },
    {
      metric: 'Local Operator Alert Acknowledgment Rate',
      baseline: '28% postal/manual dispatch response',
      claimed: '92% SMS/IVR acknowledgement',
      verified: '91.8% validated via telecom CDR logs',
      variance: '+227.8% engagement improvement',
      isVerified: true
    }
  ],
  unverifiedClaims: [
    'Claim regarding 5-year optical quartz lifespan in heavy basalt water cannot be fully substantiated within a 90-day pilot timeframe, though 90-day degradation was negligible (< 0.05 NTU drift).'
  ],
  keyFindings: [
    'The AquaSense EPWAN system demonstrated sustained, robust microbiological and turbidity deviation detection in high-stress rural environments.',
    'Offline caching mechanism prevented data loss during severe monsoon GSM tower outages in Melghat tribal belt.',
    'Direct SMS alerts to local Gram Panchayat valve operators prevented at least 3 documented contaminated water distribution episodes in Nashik (Dindori Taluka) during heavy July rainfall.',
    'Data governance and cybersecurity posture adheres strictly to MeitY and National Water Informatics Centre protocols.'
  ],
  limitations: [
    'Pilot scope was restricted to 50 locations across 3 agro-climatic zones; statewide rollout across all 36 districts will require regional field support hubs.',
    'Biofilm growth requires periodic ultrasonic transducer pulsing which consumes approx 4% additional solar battery capacity during continuous cloudy spells.'
  ],
  recommendation: 'RECOMMENDED FOR SCALE. The solution has comprehensively proven its technical efficacy, cost advantage, and operational reliability under rigorous government field conditions. It is strongly recommended to initiate a Phase-1 scale across 12 high-priority water quality affected districts in Maharashtra.',
  status: 'VALIDATED',
  digitalSignature: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069 | Dr. K. S. Deshmukh | QCI Empaneled Validator'
};

export const INITIAL_PROCUREMENT_READINESS: ProcurementReadiness = {
  pilotId: 'PLT-001',
  overallScore: 92,
  grade: 'READY_TO_SCALE',
  dimensions: [
    {
      name: 'Problem Fit & User Value',
      score: 96,
      weight: 15,
      status: 'STRONG',
      notes: 'Directly solves the critical 72-hour delay in rural water safety alerts; endorsed by Gram Panchayats.'
    },
    {
      name: 'Pilot Outcome & Target Achievement',
      score: 94,
      weight: 20,
      status: 'STRONG',
      notes: 'Achieved 31h response time (-57%) and 24% operational cost reduction across 50 villages.'
    },
    {
      name: 'Independent Validation Rigor',
      score: 98,
      weight: 15,
      status: 'STRONG',
      notes: 'Formally validated by CWPRS Pune & Quality Council of India with zero unresolved critical variances.'
    },
    {
      name: 'Cybersecurity & Data Sovereignity',
      score: 90,
      weight: 10,
      status: 'STRONG',
      notes: 'CERT-In VAPT clearance obtained; MeitY cloud hosting with TLS 1.3 and hardware crypto.'
    },
    {
      name: 'Statutory & DPIIT Compliance',
      score: 95,
      weight: 10,
      status: 'STRONG',
      notes: 'Active DPIIT recognition DIPP89214; compliant with Maharashtra Public Procurement Manual.'
    },
    {
      name: 'Unit Economics & Lifecycle Cost',
      score: 88,
      weight: 10,
      status: 'STRONG',
      notes: 'Payback period under 18 months; projected statewide recurring savings of ₹4.8 Crore/year.'
    },
    {
      name: 'Operational & Maintenance Readiness',
      score: 85,
      weight: 10,
      status: 'ADEQUATE',
      notes: 'Marathi training manual ready; requires setting up 4 regional maintenance hubs for statewide rollout.'
    },
    {
      name: 'Supply Chain & Manufacturing Scalability',
      score: 82,
      weight: 10,
      status: 'ADEQUATE',
      notes: 'MoU signed with Kaynes Technology Pune for domestic SMT assembly scaling.'
    }
  ],
  strengths: [
    'Empirically validated 57% reduction in contamination detection latency under independent government laboratory scrutiny.',
    'Proven 24% operational expenditure saving per village monitoring station.',
    'High field adoption with 92% alert acknowledgment by local Marathi-speaking Gram Sevaks.',
    'Clean CERT-In cybersecurity certification and zero external cloud data leakages.'
  ],
  weaknesses: [
    'Scaling from 50 nodes to 2,500 statewide nodes requires a dedicated Tier-2 technical support helpline and regional spares stocking.'
  ],
  blockers: []
};

export const INITIAL_SCALE_DECISION: ScaleDecisionRecord = {
  id: 'SCL-2026-009',
  pilotId: 'PLT-001',
  challengeId: 'CH-001',
  decision: 'SCALE',
  recommendationSummary: 'RECOMMEND PHASE-1 STATEWIDE SCALE across 12 priority water-stress districts (2,400 Gram Panchayats).',
  decisionReason: 'Validated performance improvement of 57% in contamination detection time against a 50% target. Operational cost decreased by 24%. CWPRS independent validation report confirmed 98.4% lab correlation. CERT-In cybersecurity audit cleared. Solution demonstrated resilient operational continuity in 50 tribal and rural habitations across Amravati, Nashik, and Satara.',
  authorizedOfficer: 'Shri Rajesh Patil, IAS',
  designation: 'Joint Secretary & Director (Procurement Innovation), GoM',
  approvedDate: '2026-08-20',
  scaleConditions: [
    {
      id: 'COND-01',
      condition: 'Execute Master Rate Framework Agreement under Maharashtra Public Procurement Rules Rule 149/150 for Innovation Procurement.',
      status: 'IN_PROGRESS',
      owner: 'State Procurement Directorate'
    },
    {
      id: 'COND-02',
      condition: 'Establish 3 regional Tier-2 Hardware Service Centers (Nashik, Chhatrapati Sambhajinagar, Nagpur) with 48-hour SLA replacement stock.',
      status: 'PENDING',
      owner: 'AquaSense Technologies'
    },
    {
      id: 'COND-03',
      condition: 'Confirm State Jal Jeevan Mission capital allocation under Technology Modernization Budget Head 2215.',
      status: 'COMPLETED',
      owner: 'WSSD Finance Division'
    },
    {
      id: 'COND-04',
      condition: 'Complete API integration certification with National Jal Jeevan Mission Central Command Portal.',
      status: 'COMPLETED',
      owner: 'NIC Maharashtra State Centre'
    }
  ],
  projectedDistrictsCount: 12,
  estimatedStateBudget: 48000000,
  estimatedAnnualSavings: 15400000,
  procurementRoute: 'Maharashtra Innovation Procurement Framework (MSInS Scale-Up Route / GeM Startup Runway Framework Agreement)'
};

export const INITIAL_DOCUMENTS: GovDocument[] = [
  {
    id: 'DOC-001',
    title: 'Government Resolution (GR) — Challenge Authorization CH-MH-2026-014',
    category: 'Problem Statement',
    challengeCode: 'CH-MH-2026-014',
    referenceId: 'WSS-2026/CR-14/D-4',
    version: '1.0',
    uploadedBy: 'Shri Rajesh Patil, IAS',
    date: '2026-04-15',
    size: '1.4 MB',
    fileFormat: 'PDF',
    isOfficialOrder: true
  },
  {
    id: 'DOC-002',
    title: 'Approved Evaluation Matrix & Weightage Charter',
    category: 'Evaluation Criteria',
    challengeCode: 'CH-MH-2026-014',
    referenceId: 'MSINS-EVL-2026-014',
    version: '1.2',
    uploadedBy: 'Dr. Ananya Sharma',
    date: '2026-05-02',
    size: '840 KB',
    fileFormat: 'PDF',
    isOfficialOrder: true
  },
  {
    id: 'DOC-003',
    title: 'Tri-Partite Pilot Framework Agreement (WSSD — MSInS — AquaSense)',
    category: 'Pilot Agreement',
    challengeCode: 'CH-MH-2026-014',
    referenceId: 'GOM-WSSD-PILOT-2026-089',
    version: '2.0 (Executed)',
    uploadedBy: 'Smt. Sunita More (MSInS)',
    date: '2026-05-15',
    size: '3.2 MB',
    fileFormat: 'PDF',
    isOfficialOrder: true
  },
  {
    id: 'DOC-004',
    title: 'Sovereign Water Telemetry Data Governance & Privacy Covenant',
    category: 'Data Agreement',
    challengeCode: 'CH-MH-2026-014',
    referenceId: 'DPA-GOM-2026-892',
    version: '1.0',
    uploadedBy: 'Legal Cell, WSSD',
    date: '2026-05-15',
    size: '1.1 MB',
    fileFormat: 'PDF',
    isOfficialOrder: true
  },
  {
    id: 'DOC-005',
    title: 'CWPRS & QCI Independent Technical Validation Report',
    category: 'Validation Report',
    challengeCode: 'CH-MH-2026-014',
    referenceId: 'CWPRS-VAL-RPT-2026-042',
    version: '1.0 (Signed)',
    uploadedBy: 'Dr. K. S. Deshmukh',
    date: '2026-08-18',
    size: '5.6 MB',
    fileFormat: 'PDF',
    isOfficialOrder: true
  },
  {
    id: 'DOC-006',
    title: 'Procurement Readiness Assessment & Departmental Recommendation',
    category: 'Procurement Recommendation',
    challengeCode: 'CH-MH-2026-014',
    referenceId: 'PRA-WSSD-2026-009',
    version: '1.1',
    uploadedBy: 'Shri Rajesh Patil, IAS',
    date: '2026-08-19',
    size: '2.3 MB',
    fileFormat: 'PDF',
    isOfficialOrder: true
  },
  {
    id: 'DOC-007',
    title: 'State High-Powered Committee Scale-Up Authorization Order',
    category: 'Scale Decision',
    challengeCode: 'CH-MH-2026-014',
    referenceId: 'GR-MSINS-2026-SCL-014',
    version: '1.0 (Final Approved)',
    uploadedBy: 'Smt. Sunita More',
    date: '2026-08-20',
    size: '2.8 MB',
    fileFormat: 'PDF',
    isOfficialOrder: true
  }
];

export const INITIAL_AUDIT_TRAIL: AuditEvent[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-04-10 10:15:22',
    user: 'Shri Rajesh Patil, IAS',
    role: 'GOVERNMENT_OFFICER',
    action: 'CREATED_CHALLENGE_DRAFT',
    object: 'Challenge',
    objectId: 'CH-MH-2026-014',
    status: 'SUCCESS',
    details: 'Initiated structured challenge draft for Rural Drinking Water Contamination Early Detection.'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-04-15 14:32:00',
    user: 'Shri Rajesh Patil, IAS',
    role: 'GOVERNMENT_OFFICER',
    action: 'PUBLISHED_CHALLENGE',
    object: 'Challenge',
    objectId: 'CH-MH-2026-014',
    status: 'SUCCESS',
    details: 'Published open innovation challenge with ₹15L pilot allocation and 6-weighted evaluation criteria.'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-04-20 15:04:12',
    user: 'Vikram Malhotra',
    role: 'STARTUP',
    action: 'SUBMITTED_APPLICATION',
    object: 'Proposal',
    objectId: 'APP-001',
    status: 'SUCCESS',
    details: 'AquaSense Technologies submitted technical proposal EPWAN with DPIIT certificate DIPP89214.'
  },
  {
    id: 'AUD-004',
    timestamp: '2026-04-25 11:20:45',
    user: 'Shri Rajesh Patil, IAS',
    role: 'GOVERNMENT_OFFICER',
    action: 'SCREENING_DECISION_RECORDED',
    object: 'Application',
    objectId: 'APP-001',
    status: 'SUCCESS',
    details: 'Recorded PASS on 8-point eligibility screening checklist for AquaSense Technologies.'
  },
  {
    id: 'AUD-005',
    timestamp: '2026-05-04 14:30:10',
    user: 'Dr. Ananya Sharma',
    role: 'EXPERT_EVALUATOR',
    action: 'SUBMITTED_EXPERT_EVALUATION',
    object: 'Evaluation',
    objectId: 'APP-001',
    status: 'SUCCESS',
    details: 'Submitted blinded evaluation score of 91.05/100 after signed conflict of interest declaration.'
  },
  {
    id: 'AUD-006',
    timestamp: '2026-05-15 16:45:00',
    user: 'Shri Rajesh Patil, IAS',
    role: 'GOVERNMENT_OFFICER',
    action: 'PILOT_AGREEMENT_EXECUTED',
    object: 'Pilot',
    objectId: 'PLT-001',
    status: 'SUCCESS',
    details: 'Executed 90-day controlled pilot GOM-WSSD-PILOT-2026-089 with 4 milestones and ₹14.2L budget.'
  },
  {
    id: 'AUD-007',
    timestamp: '2026-05-30 17:10:20',
    user: 'Dr. K. S. Deshmukh',
    role: 'INDEPENDENT_VALIDATOR',
    action: 'MILESTONE_1_VERIFIED',
    object: 'Milestone',
    objectId: 'MS-001',
    status: 'SUCCESS',
    details: 'Verified NABL lab calibration bench test for 50 probe units; payment release of ₹2.84L authorized.'
  },
  {
    id: 'AUD-008',
    timestamp: '2026-06-30 18:00:30',
    user: 'Dr. K. S. Deshmukh',
    role: 'INDEPENDENT_VALIDATOR',
    action: 'MILESTONE_2_VERIFIED',
    object: 'Milestone',
    objectId: 'MS-002',
    status: 'SUCCESS',
    details: 'Verified live telemetry streaming on 50 rural ESRs; payment release of ₹4.26L authorized.'
  },
  {
    id: 'AUD-009',
    timestamp: '2026-07-25 15:40:12',
    user: 'Dr. K. S. Deshmukh',
    role: 'INDEPENDENT_VALIDATOR',
    action: 'MILESTONE_3_VERIFIED',
    object: 'Milestone',
    objectId: 'MS-003',
    status: 'SUCCESS',
    details: 'Verified simulated tracer anomaly response time of 28 minutes; payment release of ₹4.26L authorized.'
  },
  {
    id: 'AUD-010',
    timestamp: '2026-08-18 11:00:00',
    user: 'Dr. K. S. Deshmukh',
    role: 'INDEPENDENT_VALIDATOR',
    action: 'VALIDATION_REPORT_SIGNED',
    object: 'ValidationReport',
    objectId: 'VAL-RPT-2026-042',
    status: 'SUCCESS',
    details: 'Signed official CWPRS Independent Validation Report with final status VALIDATED.'
  },
  {
    id: 'AUD-011',
    timestamp: '2026-08-19 14:15:30',
    user: 'Shri Rajesh Patil, IAS',
    role: 'GOVERNMENT_OFFICER',
    action: 'PROCUREMENT_READINESS_COMPLETED',
    object: 'ProcurementReadiness',
    objectId: 'PLT-001',
    status: 'SUCCESS',
    details: 'Completed 10-dimension procurement readiness audit with score 92/100 (READY_TO_SCALE).'
  },
  {
    id: 'AUD-012',
    timestamp: '2026-08-20 16:30:00',
    user: 'Shri Rajesh Patil, IAS',
    role: 'GOVERNMENT_OFFICER',
    action: 'APPROVED_SCALE_DECISION',
    object: 'ScaleDecision',
    objectId: 'SCL-2026-009',
    status: 'SUCCESS',
    details: 'Authorized Phase-1 Statewide Scale Decision for 12 districts under Maharashtra Innovation Procurement Framework.'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-001',
    title: 'Scale Decision Approved for Rural Water Quality Pilot',
    description: 'Joint Secretary has authorized Phase-1 Scale across 12 districts for AquaSense Technologies.',
    timestamp: '10 mins ago',
    read: false,
    priority: 'HIGH',
    category: 'PILOT',
    actionRoute: 'scale-decision'
  },
  {
    id: 'NOTIF-002',
    title: 'CWPRS Independent Validation Report Finalized',
    description: 'Dr. K. S. Deshmukh has digitally signed the validation report for Pilot PLT-001 (Outcome: VALIDATED).',
    timestamp: '1 hour ago',
    read: false,
    priority: 'HIGH',
    category: 'VALIDATION',
    actionRoute: 'validation'
  },
  {
    id: 'NOTIF-003',
    title: 'Final Milestone M4 Deliverable Submitted by AquaSense',
    description: 'Milestone 4 documentation and 90-day telemetry audit stream submitted for review.',
    timestamp: '3 hours ago',
    read: true,
    priority: 'MEDIUM',
    category: 'PAYMENT',
    actionRoute: 'contract-milestones'
  },
  {
    id: 'NOTIF-004',
    title: 'New Proposal Submitted for Agriculture Pest Warning Challenge',
    description: 'AgriPulse Innovations submitted proposal for CH-MH-2026-008.',
    timestamp: 'Yesterday',
    read: true,
    priority: 'LOW',
    category: 'EVALUATION',
    actionRoute: 'challenges'
  }
];
