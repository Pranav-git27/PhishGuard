
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

interface RiskGaugeProps {
  score: number;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score }) => {
  const data = [
    { name: 'Risk', value: score },
    { name: 'Safe', value: 100 - score },
  ];

  const getColor = (val: number) => {
    if (val < 30) return '#10b981'; // Green
    if (val < 70) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="w-full h-48 relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={getColor(score)} />
            <Cell fill="#1e293b" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-[65%] text-center">
        <span className="text-3xl font-bold block" style={{ color: getColor(score) }}>
          {score}%
        </span>
        <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">
          Risk Score
        </span>
      </div>
    </div>
  );
};

export default RiskGauge;
