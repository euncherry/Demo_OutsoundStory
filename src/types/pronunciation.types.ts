export interface PhonemeAnalysis {
  phoneme: string;
  expected: number;
  actual: number;
  accuracy: number;
}

export interface AnalysisResult {
  accuracy: number;
  pitchMatch: number;
  rhythm: number;
  pronunciation: PhonemeAnalysis[];
  waveformData: number[];
  feedback: string;
  suggestions: string[];
  timestamp: Date;
}

export interface PracticeRecord {
  id: string;
  npcId: string;
  choiceId: string;
  result: AnalysisResult;
  attempts: number;
  completedAt: Date;
}

export interface AudioData {
  blob: Blob;
  url: string;
  duration: number;
}
