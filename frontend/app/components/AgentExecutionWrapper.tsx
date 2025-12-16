"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";

interface AgentStatus {
    name: string;
    description: string;
    status: "pending" | "running" | "completed";
    progress: number;
    duration?: string;
}

interface Props {
    agents: AgentStatus[];
}

export default function AgentExecutionWrapper({ agents }: Props) {
    return (
        <div className="bg-[#0F1115] border border-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="text-blue-500">⚡</span> Agent Execution
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent) => (
                    <motion.div
                        key={agent.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#15181E] border border-gray-800 rounded-lg p-4 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-gray-200 font-bold text-sm">{agent.name}</h4>
                                <p className="text-gray-500 text-xs">{agent.description}</p>
                            </div>
                            <StatusBadge status={agent.status} />
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>{agent.progress}%</span>
                                <span>{agent.duration || "-- s"}</span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${agent.progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === "completed") {
        return <span className="text-green-500 flex items-center gap-1 text-xs bg-green-900/20 px-2 py-0.5 rounded border border-green-900/50"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
    }
    if (status === "running") {
        return <span className="text-blue-500 flex items-center gap-1 text-xs bg-blue-900/20 px-2 py-0.5 rounded border border-blue-900/50"><Loader2 className="w-3 h-3 animate-spin" /> Processing</span>;
    }
    return <span className="text-gray-600 flex items-center gap-1 text-xs bg-gray-800/50 px-2 py-0.5 rounded border border-gray-800"><CircleDashed className="w-3 h-3" /> Pending</span>;
}
