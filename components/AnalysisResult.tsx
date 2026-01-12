
import React from 'react';
import { PhishingAnalysis } from '../types';
import RiskGauge from './RiskGauge';
import { ShieldAlert, ShieldCheck, AlertTriangle, ChevronRight, Info } from 'lucide-react';

interface AnalysisResultProps {
  analysis: PhishingAnalysis;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  const { riskScore, status, redFlags, semanticAnalysis, recommendations, classicModelScore } = analysis;

  const StatusIcon = () => {
    switch (status) {
      case 'Safe': return <ShieldCheck className="w-8 h-8 text-emerald-500" />;
      case 'Suspicious': return <AlertTriangle className="w-8 h-8 text-amber-500" />;
      case 'Malicious': return <ShieldAlert className="w-8 h-8 text-red-500" />;
      default: return null;
    }
  };

  const statusColors = {
    Safe: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Suspicious: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Malicious: 'bg-red-500/10 text-red-400 border-red-500/20',
    Pending: ''
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`p-6 rounded-2xl border ${statusColors[status]} flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <StatusIcon />
          <div>
            <h3 className="text-xl font-bold">Detection Result: {status}</h3>
            <p className="text-sm opacity-80">Final verification based on semantic & heuristic analysis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
          <h4 className="text-slate-400 text-sm font-semibold uppercase mb-4 tracking-wider">Detection Vectors</h4>
          <RiskGauge score={riskScore} />
          
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-400 text-xs">Simulated TF-IDF Model</span>
              <span className="text-xs font-mono">{classicModelScore}%</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${classicModelScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
          <h4 className="text-slate-400 text-sm font-semibold uppercase mb-4 tracking-wider">Critical Red Flags</h4>
          <ul className="space-y-3">
            {redFlags.map((flag, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <div className="mt-1 flex-shrink-0"><AlertTriangle className="w-4 h-4 text-amber-500" /></div>
                <span>{flag}</span>
              </li>
            ))}
            {redFlags.length === 0 && <li className="text-slate-500 italic">No significant red flags detected.</li>}
          </ul>
        </div>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
        <h4 className="text-slate-400 text-sm font-semibold uppercase mb-4 tracking-wider">Semantic Expert Analysis</h4>
        <p className="text-slate-300 leading-relaxed">
          {semanticAnalysis}
        </p>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-2xl border border-indigo-500/20">
        <h4 className="text-indigo-400 text-sm font-semibold uppercase mb-4 tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4" /> Recommended Actions
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <ChevronRight className="w-4 h-4 text-indigo-500" />
              <span className="text-sm text-slate-200">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
