"use client";

import { useState } from "react";
import ResearchConsole from "./components/ResearchConsole";
import AgentExecutionWrapper from "./components/AgentExecutionWrapper";
import { MarketSizeChart, CAGRChart } from "./components/AnalyticsCharts";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [result, setResult] = useState<any>(null);

  const [agents, setAgents] = useState([
    { name: "Market Insights (IQVIA)", description: "Market data", status: "pending", progress: 0 },
    { name: "Patent Landscape", description: "Patent grids", status: "pending", progress: 0 },
    { name: "Clinical Trials", description: "CT registries", status: "pending", progress: 0 },
    { name: "EXIM Trade", description: "Customs + HS", status: "pending", progress: 0 },
    { name: "Web Intelligence", description: "Web crawl", status: "pending", progress: 0 },
    { name: "Internal Knowledge", description: "Enterprise kB", status: "pending", progress: 0 },
  ]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setProgress(10);

    // Reset agents
    setAgents(agents.map(a => ({ ...a, status: "pending", progress: 0 })));

    // Simulate progress for visual capability
    const interval = setInterval(() => {
      setAgents(prev => {
        return prev.map(agent => {
          // Randomly start agents
          if (agent.status === "pending" && Math.random() > 0.8) {
            return { ...agent, status: "running", progress: 5 };
          }
          // Update running agents
          if (agent.status === "running") {
            const newProgress = Math.min(agent.progress + Math.random() * 20, 100);
            return {
              ...agent,
              progress: newProgress,
              status: newProgress >= 100 ? "completed" : "running",
              duration: newProgress >= 100 ? (Math.random() * 5).toFixed(1) + "s" : undefined
            };
          }
          return agent;
        });
      });

      setProgress(p => Math.min(p + 5, 100));
    }, 500);

    try {
      const res = await fetch("http://localhost:8000/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      clearInterval(interval);
      setLoading(false);
      setProgress(100);
      // Ensure all agents show complete
      setAgents(agents.map(a => ({ ...a, status: "completed", progress: 100, duration: "2.4s" })));
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <span className="font-bold text-white text-xl">PI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">PharmaIntel</h1>
              <p className="text-xs text-gray-500">Enterprise dossier cockpit</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Research</button>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Internal</button>
          </div>
        </header>

        <ResearchConsole onSearch={handleSearch} loading={loading} progress={progress} />

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-800 pb-1">
          {["Dashboard", "Insights", "Clinical", "Patents", "Final Report"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors relative ${activeTab === tab
                  ? "text-blue-400 bg-[#0F1115] border-t border-x border-gray-800"
                  : "text-gray-500 hover:text-gray-300"
                }`}
            >
              {activeTab === tab && <span className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-lg"></span>}
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content based on Tabs */}
        <div className="space-y-6">
          {/* Dashboard View */}
          <div className={activeTab === "Dashboard" ? "block" : "hidden"}>
            <AgentExecutionWrapper agents={agents as any} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <MarketSizeChart />
              <CAGRChart />
            </div>
          </div>

          {/* Final Report View */}
          <div className={activeTab === "Final Report" ? "block animate-in fade-in" : "hidden"}>
            <div className="bg-[#0F1115] border border-gray-800 rounded-xl p-8">
              {result ? (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{result.response}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-20">
                  Run research to generate the final report.
                </div>
              )}
            </div>
          </div>

          {/* Other tabs placeholders */}
          {["Insights", "Clinical", "Patents"].includes(activeTab) && (
            <div className="bg-[#0F1115] border border-gray-800 rounded-xl p-12 text-center text-gray-500">
              <p>Detailed {activeTab} view coming soon.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
