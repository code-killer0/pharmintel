"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function AgentRunner() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const runAgent = async () => {
        if (!query) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("http://localhost:8000/chat/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error("Error running agent:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Start Your Analysis</h2>

            <div className="flex gap-3 mb-8">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-700 placeholder-gray-400"
                    placeholder="E.g., Repurposing opportunities for Sildenafil..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && runAgent()}
                />
                <button
                    onClick={runAgent}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </span>
                    ) : "Generate Report"}
                </button>
            </div>

            {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-xl mb-4 text-gray-900 border-b pb-2">Consolidated Strategic Report</h3>
                        <div className="prose prose-blue max-w-none text-gray-700">
                            <ReactMarkdown>{result.response}</ReactMarkdown>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                            <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                🔬 Clinical Trials
                            </h4>
                            <div className="text-sm text-blue-900 overflow-y-auto max-h-60 whitespace-pre-wrap">
                                {result.debug_info?.clinical || "No data."}
                            </div>
                        </div>

                        <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl">
                            <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                                📜 Patent Landscape
                            </h4>
                            <div className="text-sm text-purple-900 overflow-y-auto max-h-60 whitespace-pre-wrap">
                                {result.debug_info?.patent || "No data."}
                            </div>
                        </div>

                        <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
                            <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                                📈 Market Insights (IQVIA)
                            </h4>
                            <div className="text-sm text-emerald-900 overflow-y-auto max-h-60 whitespace-pre-wrap">
                                {result.debug_info?.market || "No data."}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
