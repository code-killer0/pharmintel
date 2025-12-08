"use client";

import { useState } from "react";

export default function AgentRunner() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const runAgent = async () => {
        if (!query) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("http://localhost:8000/agents/run", {
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
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">PharmaIntel Agent Runner</h2>

            <div className="flex gap-2">
                <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Enter a drug or disease name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={runAgent}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Running..." : "Search"}
                </button>
            </div>

            {result && (
                <div className="mt-6 p-4 bg-gray-50 rounded text-left">
                    <h3 className="font-semibold text-lg mb-2">Results:</h3>
                    <p className="text-gray-700 mb-4">{result.synthesis}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-bold text-blue-600">PubMed Articles</h4>
                            <ul className="list-disc pl-4 text-sm mt-1">
                                {result.pubmed_results?.map((item: any, i: number) => (
                                    <li key={i} className="mb-1">{item.title}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-green-600">Clinical Trials</h4>
                            <ul className="list-disc pl-4 text-sm mt-1">
                                {result.clinical_trials_results?.map((item: any, i: number) => (
                                    <li key={i} className="mb-1">{item.title} ({item.status})</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
