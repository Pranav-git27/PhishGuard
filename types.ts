
export type DetectionStatus = 'Safe' | 'Suspicious' | 'Malicious' | 'Pending';

export interface PhishingAnalysis {
  riskScore: number;
  status: DetectionStatus;
  redFlags: string[];
  semanticAnalysis: string;
  recommendations: string[];
  classicModelScore?: number; // Simulated Scikit-learn score
}

export interface EmailCheckHistory {
  id: string;
  timestamp: number;
  subject: string;
  analysis: PhishingAnalysis;
}
