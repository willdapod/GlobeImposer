import React, { useMemo } from 'react';
import type { WindFarm } from '../data/windFarms'; // type-only import

interface PowerStatsProps {
    windFarms: WindFarm[];
    show: boolean;
}

const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const PowerStats: React.FC<PowerStatsProps> = ({ windFarms, show }) => {
    const stats = useMemo(() => {
        const countryTotals: { [key: string]: number } = {};

        windFarms.forEach(wf => {
            if (!countryTotals[wf.countryCode]) {
                countryTotals[wf.countryCode] = 0;
            }
            countryTotals[wf.countryCode] += wf.powerOutputMW;
        });

        return Object.entries(countryTotals)
            .map(([code, total]) => ({
                code,
                flag: getFlagEmoji(code),
                total
            }))
            .sort((a, b) => b.total - a.total);
    }, [windFarms]);

    if (!show) return null;

    return (
        <div className="absolute bottom-4 left-4 z-50 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-gray-700 text-white w-64 max-h-96 overflow-y-auto shadow-2xl">
            <h2 className="text-lg font-bold mb-3 border-b border-gray-600 pb-2 flex items-center justify-between">
                <span>Power Output</span>
            </h2>

            <div className="space-y-2">
                {stats.map((stat) => (
                    <div key={stat.code} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                            <span className="text-base">{stat.flag}</span>
                            <span className="text-gray-300 font-medium">{stat.code}</span>
                        </span>
                        <span className="font-mono font-bold text-green-400">
                            {stat.total.toLocaleString()} MW
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-500 text-center">
                Total Global Output: {stats.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()} MW
            </div>
        </div>
    );
};

export default PowerStats;
