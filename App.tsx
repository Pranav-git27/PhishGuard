
import React, { useState, useEffect } from 'react';
import { Mail, Shield, History, Trash2, ShieldAlert, Zap, Loader2, Send, Info, AlertCircle } from 'lucide-react';
import { analyzeEmail } from './services/geminiService';
import { PhishingAnalysis, EmailCheckHistory } from './types';
import AnalysisResult from './components/AnalysisResult';

const App: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<PhishingAnalysis | null>(null);
  const [history, setHistory] = useState<EmailCheckHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from local storage
  useEffect(() => {
    const saved = localStorage.getItem('phishguard_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to local storage
  useEffect(() => {
    localStorage.setItem('phishguard_history', JSON.stringify(history));
  }, [history]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    setIsAnalyzing(true);
    setCurrentResult(null);

    try {
      const result = await analyzeEmail(subject, body);
      setCurrentResult(result);
      
      const newEntry: EmailCheckHistory = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        subject: subject || (body.slice(0, 30) + '...'),
        analysis: result
      };
      
      setHistory(prev => [newEntry, ...prev].slice(0, 20));
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Error during analysis. Please check your API key and network.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('phishguard_history');
  };

  const selectHistoryItem = (item: EmailCheckHistory) => {
    setCurrentResult(item.analysis);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">PhishGuard <span className="text-indigo-400">AI</span></span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors relative"
              aria-label="Toggle history"
            >
              <History className="w-5 h-5 text-slate-400" />
              {history.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className={`${showHistory ? 'hidden' : 'block'} lg:col-span-7 space-y-6`}>
          <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Mail className="text-indigo-400" /> New Email Analysis
              </h2>
              <p className="text-slate-400 text-sm">Paste the suspicious message below to run a deep forensic scan.</p>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject Line</label>
                  <div className="group relative">
                    <Info className="w-3.5 h-3.5 text-slate-600 cursor-help hover:text-indigo-400" />
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 border border-slate-700 rounded-lg text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                      Attackers often use urgent subject lines to trigger an emotional response before you see the content.
                    </div>
                  </div>
                </div>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Immediate action required on your account"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Content / Body</label>
                <textarea 
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Paste the full body of the email here..."
                  className="w-full h-64 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-600"
                />
              </div>

              <button 
                type="submit"
                disabled={isAnalyzing || !body.trim()}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Metadata...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Run AI Forensics
                  </>
                )}
              </button>
            </form>
          </div>

          {!currentResult && !isAnalyzing && (
            <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex gap-6 items-start">
              <div className="bg-indigo-500/20 p-3 rounded-2xl flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Detection Logic</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our system cross-references <strong>Subject Markers</strong> with <strong>Body Indicators</strong>. This dual-verification helps identify sophisticated "Spear Phishing" attacks that might bypass standard filters.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Results or History */}
        <div className={`${showHistory ? 'block' : 'hidden lg:block'} lg:col-span-5`}>
          {showHistory ? (
            <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 overflow-hidden shadow-xl animate-in slide-in-from-right-4 duration-300">
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <History className="text-indigo-400 w-5 h-5" /> History
                </h3>
                <button 
                  onClick={clearHistory}
                  className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-all"
                  title="Clear all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto p-2">
                {history.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No analysis history yet.</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => selectHistoryItem(item)}
                      className="w-full text-left p-4 rounded-2xl hover:bg-slate-700/50 transition-all border border-transparent hover:border-slate-600/50 group mb-2"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          item.analysis.status === 'Safe' ? 'bg-emerald-500/20 text-emerald-400' :
                          item.analysis.status === 'Suspicious' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {item.analysis.status}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-200 truncate group-hover:text-indigo-400 transition-colors">
                        {item.subject}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">Score: {item.analysis.riskScore}%</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="sticky top-24">
              {currentResult ? (
                <AnalysisResult analysis={currentResult} />
              ) : isAnalyzing ? (
                <div className="bg-slate-800/40 p-12 rounded-3xl border border-slate-700/50 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Deep Scanning...</h3>
                    <p className="text-slate-400 text-sm">Consulting our threat intelligence database and running semantic heuristics.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800/40 p-12 rounded-3xl border border-dashed border-slate-700 flex flex-col items-center justify-center text-center opacity-60">
                  <Send className="w-12 h-12 text-slate-600 mb-4" />
                  <p className="text-slate-500 font-medium">Ready for input.</p>
                  <p className="text-slate-600 text-sm mt-1">Analysis report will appear here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <footer className="mt-20 border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} PhishGuard AI • Powered by Gemini & Heuristic Logic</p>
      </footer>
    </div>
  );
};

export default App;
