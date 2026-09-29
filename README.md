# 🏛️ GovPilot — Innovation-to-Scale Procurement OS
### *Smart India Hackathon (SIH) Prototype*

> **GovPilot** is a startup-friendly public procurement operating system engineered for state and central government bodies. It streamlines the lifecycle from problem statement formulation to stage-gated controlled pilots, third-party empirical validation, and statutory scale procurement under established government resolutions.

---

## 🌟 Key Highlights for SIH Evaluation

- 🎯 **Stage-Gated Sandbox (0 → 1 → Scale)**: Replaces open-ended tenders with a structured 5-stage procurement funnel (Formulate → Screen → Sandbox Pilot → Validate → Scale Award).
- ⚖️ **Statutory Compliance & Audit Trail**: Real-time compliance checks aligned with state innovation policies and procurement frameworks.
- 👥 **Multi-Stakeholder Architecture**:
  - **Government Admin Portal**: Define challenges, configure budgets, track overall portfolio metrics.
  - **Startup Portal**: Milestone submission, SLA tracking, and evidence upload.
  - **Evaluator & Validator Workspace**: Double-blind scoring, empirical validation, and verification audits.
- 📊 **Risk Engine & Scale Simulator**: Quantitative risk analysis and economic impact projection before scaling state-wide.
- ⚡ **Zero-Latency Reactive UI**: Built on modern React 19 + Tailwind CSS design system with an official government aesthetic.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Motion |
| **State Management** | React Context API with comprehensive domain models |
| **Hosting & CI/CD** | Netlify (Automated Git-triggered builds with SPA redirects) |
| **Backend & Extensibility**| Express API bridge with Google Gemini AI integration support |

---

## 📁 Repository Structure

```text
govpilot/
├── public/                 # Static public assets & Netlify SPA routing rules
│   └── _redirects          # Ensures client-side routing on Netlify
├── src/
│   ├── components/         # Reusable UI widgets, navigation, layout & modals
│   ├── context/            # Global application state (challenges, startups, pilots)
│   ├── data/               # Realistic SIH prototype mock datasets
│   ├── views/              # Main screens: Dashboard, Challenges, Command Center, Portals
│   ├── types.ts            # TypeScript contracts & data interfaces
│   └── index.css           # Custom design tokens, glassmorphism & Gov typography
├── netlify.toml            # Pre-configured Netlify build pipeline
├── package.json            # Scripts & dependencies
└── tsconfig.json           # Strict TypeScript configuration
```

---

## 🚀 Running Locally

### 1. Prerequisites
- **Node.js** (v20 or v22 LTS recommended)
- **npm** (comes bundled with Node.js)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/govpilot.git
cd govpilot

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the displayed Vite local port) in your browser.

### 4. Build for Production
```bash
npm run build
```
Builds the static production bundle into the `dist/` directory.

---

## 🌐 Netlify Deployment

This repository is pre-configured with `netlify.toml` and `public/_redirects`:
- **Build Command**: `npx vite build`
- **Publish Directory**: `dist`
- **SPA Fallback**: Automatic rewrite of `/*` to `/index.html` (HTTP 200)
