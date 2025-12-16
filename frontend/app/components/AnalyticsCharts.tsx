"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function MarketSizeChart() {
    const data = [
        { year: '2020', value: 4.2 },
        { year: '2021', value: 4.6 },
        { year: '2022', value: 5.1 },
        { year: '2023', value: 5.8 },
        { year: '2024', value: 6.4 },
    ];

    return (
        <div className="bg-[#0F1115] border border-gray-800 rounded-xl p-6 h-80">
            <h3 className="text-gray-400 text-sm font-semibold mb-6 flex items-center gap-2">
                <span className="text-blue-500">📊</span> Market size per year
            </h3>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data}>
                    <XAxis dataKey="year" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1A1D23', border: '1px solid #374151', color: '#E5E7EB' }}
                        cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function CAGRChart() {
    const data = [
        { year: '2020', value: 9.0 },
        { year: '2021', value: 9.8 },
        { year: '2022', value: 10.5 },
        { year: '2023', value: 11.2 },
        { year: '2024', value: 11.8 },
    ];

    return (
        <div className="bg-[#0F1115] border border-gray-800 rounded-xl p-6 h-80">
            <h3 className="text-gray-400 text-sm font-semibold mb-6 flex items-center gap-2">
                <span className="text-blue-500">📈</span> CAGR trend
            </h3>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <XAxis dataKey="year" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 15]} stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1A1D23', border: '1px solid #374151', color: '#E5E7EB' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#60A5FA" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
