# PharmaIntel Enterprise Dossier Cockpit

A **Multi-Agent System (MAS)** designed to automate the **Hypothesize-Test-Pivot** cycle in pharmaceutical R&D.

## Architecture

This solution implements a cyclic **LangGraph** workflow:
1.  **Planner**: Formulates a scientific hypothesis (e.g. "Repurpose Drug X for Y").
2.  **Test (Agents)**: Parallel execution of specialized agents:
    *   `ClinicalAgent`: Analyzes trial data and safety signals (ClinicalTrials.gov).
    *   `PatentAgent`: Checks for freedom-to-operate and white space (USPTO).
    *   `IQVIAAgent`: Analyzes market size and CAGR trends.
3.  **Verifier**: Evaluating if the findings support the hypothesis or if there are blockers (e.g., toxicity).
4.  **Failure Analysis & Pivot**: If verified as "Failure", the AI analyzes *why* and suggests a Pivot (e.g., "Switch to Inhaled formulation"), restarting the loop.

## Directory Structure
- `backend/`: FastAPI + LangGraph + Google Gemini
- `frontend/`: Next.js 14 + TailwindCSS (Dark Mode Console)

## Getting Started

### Prerequisites
- **Google API Key**: Put in `backend/.env`.

### Quick Start
```bash
./start.sh
```

### Manual Start
**Backend**:
```bash
cd backend
uvicorn app.main:app --reload
```

**Frontend**:
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

