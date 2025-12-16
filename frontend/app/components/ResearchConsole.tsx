"use client";

import { Search, Play, Loader2 } from "lucide-react";
import { useState } from "react";

interface ResearchConsoleProps {
    onSearch: (query: string) => void;
    loading: boolean;
    progress: number;
}

export default function ResearchConsole({ onSearch, loading, progress }: ResearchConsoleProps) {
    const [query, setQuery] = useState("metformin oncology repositioning");

    return (
        <div className="w-full bg-[#0F1115] border border-gray-800 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-gray-400 text-sm font-semibold tracking-wide flex items-center gap-2">
                    <span className="text-blue-500">○</span> Research Console
                </h2>
                <span className="text-gray-600 text-xs">Classical / Futuristic Theme</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                    <label className="text-gray-500 text-xs uppercase mb-2 block tracking-wider">
                        Molecule / Indication
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-[#1A1D23] text-gray-200 border border-gray-700 rounded-lg py-4 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-lg font-medium"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <div className="relative size-12">
                            <svg className="size-full" viewBox="0 0 36 36">
                                <path className="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                                <path className="text-blue-500 transition-all duration-500 ease-out" strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs font-medium uppercase">Global Progress</span>
                            <span className="text-blue-400 text-xs">{loading ? "Agents executing" : "Unlocked"}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => onSearch(query)}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                        Run Research
                    </button>
                </div>
            </div>
        </div>
    );
}
