# PharmaIntel Enterprise Dossier Cockpit
# PharmaIntel 🧬  
**Agentic AI Platform for Drug Repurposing & Pharma Intelligence**

PharmaIntel is a full-stack, agentic AI–powered research platform designed to accelerate **drug repurposing, innovation research, and strategic decision-making** in the pharmaceutical domain.  
It orchestrates multiple AI agents to analyze **clinical trials, patents, market data, trade intelligence, and internal documents**, delivering **decision-ready insights** through a modern web dashboard.

---

## 🚀 Key Features

- 🔍 **Natural Language Research Queries**
- 🤖 **Agentic AI Orchestration (LangGraph-based)**
- 🧪 **Clinical Trials Intelligence (Mocked ClinicalTrials.gov)**
- 📜 **Patent Landscape & Freedom-to-Operate Analysis**
- 📊 **Market & EXIM Trade Insights**
- 📁 **Internal Document Summarization**
- 📈 **Visual Dashboards & PDF Report Generation**
- 🧠 **Explainable, Auditable AI Outputs**

---

## 🧠 System Architecture Overview

**High-level Flow:**

<img src="https://github.com/user-attachments/assets/ae40cfdd-6a88-4a2c-81c9-3ae8f17dd68f" alt="PharmaIntel Architecture" width="900" />

### Architecture Overview

PharmaIntel follows a **layered, agent-driven architecture** designed for scalability, explainability, and modular expansion.  
The system orchestrates multiple domain-specific AI agents through a centralized master agent to deliver **decision-ready pharmaceutical intelligence**.

---

### 🔹 User Interface Layer
- Web-based React dashboard for natural language research queries
- Real-time visualization of insights, charts, and reports
- Agent execution status, logs, and traceability
- Modular UI for future feature expansion

---

### 🔹 Orchestration Layer (Master Agent)
- Interprets and parses user intent
- Decomposes complex queries into domain-specific tasks
- Manages workflow state using **LangGraph**
- Coordinates parallel execution of worker agents
- Aggregates intermediate results for synthesis

---

### 🔹 Intelligence Layer (Worker Agents)
Each agent operates independently and in parallel to maximize efficiency:

- **Clinical Trials Agent** – Analyzes trial phases, outcomes, and trends  
- **Patent Landscape Agent** – Evaluates patent status, lifecycle, and FTO risks  
- **Market Intelligence Agent** – Assesses market size, growth, and competition  
- **EXIM Trade Agent** – Extracts import–export and trade flow insights  
- **Web Intelligence Agent** – Mines scientific publications and guidelines  
- **Internal Knowledge Agent** – Summarizes internal documents and reports  

---

### 🔹 Insight Synthesis & Reporting Layer
- Cross-domain insight correlation and validation
- Confidence-weighted result aggregation
- Automated generation of:
  - Interactive dashboards
  - Visual analytics (charts, heatmaps)
  - Decision-ready **PDF research reports**

---

### 🔹 Infrastructure & Deployment
- Containerized services using **Docker**
- Modular, cloud-ready deployment
- Designed for scalability across AWS, Azure, or GCP
- Secure and auditable execution flow

---

> **Design Philosophy:**  
> *Parallel intelligence, deterministic orchestration, and explainable outputs — built for real-world pharma decision-making.*

---

## 🏗️ Tech Stack

### Frontend
- **React.js**
- **TypeScript**
- Modern UI components & data visualizations
- Agent execution status & logs

### Backend
- **Python**
- **FastAPI**
- **LangGraph** for stateful agent orchestration
- Modular AI agent architecture

### AI & Data
- **LLM-based reasoning**
- Mocked APIs simulating:
  - ClinicalTrials.gov
  - Patent databases (USPTO-like)
  - Market intelligence platforms
  - EXIM trade data
- Internal document processing

### Infrastructure
- **Docker-based modular setup**
- Cloud-ready architecture

---

## 📂 Project Structure
```
pharmintel/
│
├── frontend/ # React + TypeScript frontend
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── visualizations/
│
├── backend/ # FastAPI backend
│ ├── agents/ # Individual AI agents
│ ├── orchestration/ # LangGraph workflows
│ ├── api/ # REST endpoints
│ ├── services/
│ └── utils/
│
├── docker/ # Docker configuration
├── README.md
└── requirements.txt
```
## 📊 Visualizations & Outputs

The platform delivers insight-rich, decision-ready outputs through interactive and automated visualizations, including:

- **Bar Charts, Donut Charts, and Heatmaps** for:
  - Patent lifecycle distribution
  - Market opportunity analysis
  - Clinical trial phase breakdown
- **Agent-wise execution timelines** for transparency and traceability
- **Auto-generated PDF research reports** summarizing cross-domain insights

---

## 🔐 Assumptions & Constraints

### Assumptions
- Mock data sources are acceptable for MVP and hackathon implementations
- User queries are molecule-centric or indication-centric
- Human validation is available for high-impact or critical decisions

### Constraints
- Paid real-world data sources are not directly integrated
- LLM context length and reasoning limitations
- Outputs must remain explainable, auditable, and transparent

---

## 🎯 Use Cases

- Drug repurposing opportunity analysis
- Patent landscape and Freedom-to-Operate (FTO) assessment
- Market entry strategy and trade intelligence
- End-to-end pharmaceutical research acceleration
- Strategic decision support for R&D and innovation teams

---

## 🧪 Current Status

- ✅ MVP ready
- 🔄 Mocked data integrations in place
- 🚧 Real-world data connectors planned

---

## 🌱 Future Enhancements

- Live API integrations (ClinicalTrials.gov, patent databases)
- Role-based access control (RBAC)
- Advanced financial and commercial modeling
- Multi-language query and report support
- Cloud-native deployment (AWS / Azure / GCP)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

