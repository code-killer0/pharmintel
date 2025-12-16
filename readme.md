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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
