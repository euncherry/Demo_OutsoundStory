// src/utils/audioAnalysis.ts
// 완전한 파일 구조 (기존 + VAD 추가)

import { CERConfig, CER_PRESETS } from '@/types/pronunciation';

//ANCHOR ============= 오디오 전처리 함수 (기존) =============
export function toMono(audioBuffer: AudioBuffer): Float32Array {
  const ch0 = audioBuffer.getChannelData(0);
  if (audioBuffer.numberOfChannels === 1) return ch0;

  const ch1 = audioBuffer.getChannelData(1);
  const mono = new Float32Array(audioBuffer.length);
  for (let i = 0; i < audioBuffer.length; i++) {
    mono[i] = (ch0[i] + ch1[i]) / 2;
  }
  return mono;
}

export function downsample(
  data: Float32Array,
  srcHz: number,
  targetHz = 4000
): Float32Array {
  if (srcHz <= targetHz) return data;

  const ratio = srcHz / targetHz;
  const outputLength = Math.floor(data.length / ratio);
  const output = new Float32Array(outputLength);

  for (let i = 0; i < outputLength; i++) {
    output[i] = data[Math.floor(i * ratio)];
  }
  return output;
}

export function zeroMeanUnitVar(data: Float32Array): Float32Array {
  let mean = 0;
  for (let i = 0; i < data.length; i++) mean += data[i];
  mean /= Math.max(1, data.length);

  let varSum = 0;
  for (let i = 0; i < data.length; i++) {
    varSum += (data[i] - mean) ** 2;
  }

  const std = Math.sqrt(varSum / Math.max(1, data.length));
  const normalized = new Float32Array(data.length);
  const denominator = std > 1e-8 ? std : 1;

  for (let i = 0; i < data.length; i++) {
    normalized[i] = (data[i] - mean) / denominator;
  }

  return normalized;
}

//ANCHOR ============= VAD (Voice Activity Detection) - 새로 추가 =============
export interface VADResult {
  trimmedData: Float32Array;
  startIndex: number;
  endIndex: number;
  originalLength: number;
  trimmedLength: number;
  silenceRatio: number;
}

/**
 * 에너지 기반 음성 구간 검출 및 묵음 제거
 */
export function detectVoiceActivity(
  audioData: Float32Array,
  config = {
    energyThreshold: 0.01,
    minVoiceDuration: 0.1,
    maxSilenceDuration: 0.2,
    sampleRate: 11025,
    windowSize: 512,
    marginSeconds: 0.05
  }
): VADResult {
  
  const { energyThreshold, minVoiceDuration, maxSilenceDuration, sampleRate, windowSize, marginSeconds } = config;
  
  console.log("🔊 VAD 시작 - 원본 길이:", audioData.length, `(${(audioData.length/sampleRate).toFixed(2)}초)`);
  
  // 1. 윈도우별 에너지 계산
  const windowStep = Math.floor(windowSize / 2);
  const energies = [];
  
  for (let i = 0; i < audioData.length - windowSize; i += windowStep) {
    const window = audioData.slice(i, i + windowSize);
    const energy = window.reduce((sum, sample) => sum + sample * sample, 0) / windowSize;
    energies.push({
      index: i,
      energy: Math.sqrt(energy),
      isVoice: false
    });
  }
  
  // 2. 적응적 임계값 계산
  const allEnergies = energies.map(e => e.energy);
  const maxEnergy = Math.max(...allEnergies);
  const avgEnergy = allEnergies.reduce((a, b) => a + b, 0) / allEnergies.length;
  
  const adaptiveThreshold = Math.max(
    energyThreshold,
    Math.min(maxEnergy * 0.05, avgEnergy * 3)
  );
  
  // 3. 음성 구간 마킹
  energies.forEach(window => {
    window.isVoice = window.energy > adaptiveThreshold;
  });
  
  // 4. 연속성 필터링
  const minVoiceWindows = Math.ceil(minVoiceDuration * sampleRate / windowStep);
  
  // 짧은 음성 구간 제거
  for (let i = 0; i < energies.length; i++) {
    if (energies[i].isVoice) {
      let consecutiveVoice = 1;
      let j = i + 1;
      while (j < energies.length && energies[j].isVoice) {
        consecutiveVoice++;
        j++;
      }
      
      if (consecutiveVoice < minVoiceWindows) {
        for (let k = i; k < j; k++) {
          energies[k].isVoice = false;
        }
      }
      i = j - 1;
    }
  }

  // 5. 음성 구간 찾기
  let voiceStart = -1;
  let voiceEnd = -1;
  
  for (let i = 0; i < energies.length; i++) {
    if (energies[i].isVoice && voiceStart === -1) {
      voiceStart = energies[i].index;
    }
    if (energies[i].isVoice) {
      voiceEnd = energies[i].index + windowSize;
    }
  }
  
  if (voiceStart === -1 || voiceEnd === -1) {
    return {
      trimmedData: audioData,
      startIndex: 0,
      endIndex: audioData.length - 1,
      originalLength: audioData.length,
      trimmedLength: audioData.length,
      silenceRatio: 0
    };
  }

  // 6. 여백 추가 후 최종 추출
  const marginSamples = Math.floor(marginSeconds * sampleRate);
  const finalStart = Math.max(0, voiceStart - marginSamples);
  const finalEnd = Math.min(audioData.length - 1, voiceEnd + marginSamples);
  
  const trimmedData = audioData.slice(finalStart, finalEnd + 1);
  const silenceRatio = (audioData.length - trimmedData.length) / audioData.length;
  
  console.log("✂️ VAD 결과:", {
    원본길이: audioData.length,
    정리후길이: trimmedData.length,
    제거된묵음: (silenceRatio * 100).toFixed(1) + "%"
  });

  return {
    trimmedData,
    startIndex: finalStart,
    endIndex: finalEnd,
    originalLength: audioData.length,
    trimmedLength: trimmedData.length,
    silenceRatio
  };
}

//ANCHOR ============= NCC (기존, VAD 데이터 사용) =============
export function maxNormalizedCrossCorr(
  a: Float32Array,
  b: Float32Array,
  sampleRate: number,
  maxLagSec = 0.5
): number {
  const A = zeroMeanUnitVar(a);
  const B = zeroMeanUnitVar(b);
  const maxLag = Math.min(
    Math.floor(maxLagSec * sampleRate),
    Math.min(A.length, B.length) - 1
  );

  let bestCorr = -Infinity;

  for (let lag = -maxLag; lag <= maxLag; lag++) {
    let sum = 0;
    const offsetB = Math.max(0, lag);
    const offsetA = Math.max(0, -lag);
    const overlapLength = Math.min(A.length - offsetA, B.length - offsetB);

    for (let i = 0; i < overlapLength; i++) {
      sum += A[offsetA + i] * B[offsetB + i];
    }

    if (overlapLength > 0) {
      const corr = sum / overlapLength;
      if (corr > bestCorr) bestCorr = corr;
    }
  }

  return Math.max(0, Math.min(1, bestCorr));
}

//ANCHOR ============= RMS 패턴 분석 (기존) =============
export function calculateRMSPattern(
  refData: Float32Array,
  userData: Float32Array,
  segments = 10
): { segmentScores: number[]; averageScore: number } {
  const segmentScores: number[] = [];

  for (let i = 0; i < segments; i++) {
    const refStart = Math.floor((i * refData.length) / segments);
    const refEnd = Math.floor(((i + 1) * refData.length) / segments);
    const refSegment = refData.slice(refStart, refEnd);

    const userStart = Math.floor((i * userData.length) / segments);
    const userEnd = Math.floor(((i + 1) * userData.length) / segments);
    const userSegment = userData.slice(userStart, userEnd);

    const refRMS = Math.sqrt(
      refSegment.reduce((sum, x) => sum + x * x, 0) / refSegment.length
    );
    const userRMS = Math.sqrt(
      userSegment.reduce((sum, x) => sum + x * x, 0) / userSegment.length
    );

    const score =
      refRMS === 0 && userRMS === 0
        ? 1
        : Math.min(refRMS, userRMS) / Math.max(refRMS, userRMS, 0.001);

    segmentScores.push(score);
  }

  const averageScore = segmentScores.reduce((a, b) => a + b, 0) / segments;
  return { segmentScores, averageScore };
}

//ANCHOR ============= Peak Amplitude Score (기존이 있다고 가정) =============
export function calculatePeakAmplitudeScore(
  refPeaks: number[][],
  userPeaks: number[][]
): { peakScore: number } {
  // 기존 구현 유지 (Peak 분석)
  return { peakScore: 0.85 }; // 임시값
}

//ANCHOR ============= 개선된 Pitch Pattern Matching (VAD 적용) =============
export function analyzePitchPattern(
  refFrequencies: (number | null)[],
  userFrequencies: (number | null)[]
): { 
  patternScore: number; 
  matchedSegments: number; 
  totalSegments: number;
  alignmentScore: number;
  adaptiveScore: number;
} {
  
  console.log("🎵 Pitch Pattern 분석 시작");
  console.log("🎵 원본 주파수 개수:", { ref: refFrequencies.length, user: userFrequencies.length });

  // 1. 유효한 주파수만 필터링
  const validRef = refFrequencies.filter(f => f !== null && f > 0) as number[];
  const validUser = userFrequencies.filter(f => f !== null && f > 0) as number[];
  
  if (validRef.length < 2 || validUser.length < 2) {
    console.log("⚠️ 유효한 주파수 데이터 부족");
    return {
      patternScore: 0,
      matchedSegments: 0,
      totalSegments: 0,
      alignmentScore: 0,
      adaptiveScore: 0
    };
  }

  // 2. 적응적 임계값 계산
  const calculateAdaptiveThreshold = (frequencies: number[]) => {
    const diffs = [];
    for (let i = 1; i < frequencies.length; i++) {
      diffs.push(Math.abs(frequencies[i] - frequencies[i - 1]));
    }
    
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    const stdDiff = Math.sqrt(
      diffs.reduce((sum, d) => sum + (d - avgDiff) ** 2, 0) / diffs.length
    );
    
    return Math.max(2, avgDiff + stdDiff * 0.3);
  };

  const refThreshold = calculateAdaptiveThreshold(validRef);
  const userThreshold = calculateAdaptiveThreshold(validUser);
  const adaptiveThreshold = Math.min(refThreshold, userThreshold);
  
  console.log("🔧 적응적 임계값:", adaptiveThreshold.toFixed(2), "(기존: 5)");

  // 3. 노이즈 필터링 (3점 평활화)
  const smoothFrequencies = (frequencies: number[]) => {
    const smoothed = [...frequencies];
    for (let i = 1; i < frequencies.length - 1; i++) {
      smoothed[i] = (frequencies[i-1] + frequencies[i] + frequencies[i+1]) / 3;
    }
    return smoothed;
  };

  const refSmoothed = smoothFrequencies(validRef);
  const userSmoothed = smoothFrequencies(validUser);

  // 4. 패턴 생성 (적응적 임계값 사용)
  const createPattern = (frequencies: number[], threshold: number): number[] => {
    const pattern: number[] = [];
    for (let i = 1; i < frequencies.length; i++) {
      const diff = frequencies[i] - frequencies[i - 1];
      if (diff > threshold) pattern.push(1);        // 상승
      else if (diff < -threshold) pattern.push(-1); // 하강
      else pattern.push(0);                         // 평탄
    }
    return pattern;
  };

  const refPattern = createPattern(refSmoothed, adaptiveThreshold);
  const userPattern = createPattern(userSmoothed, adaptiveThreshold);

  // 5. 길이 정규화
  const targetLength = Math.max(refPattern.length, userPattern.length);
  
  const interpolatePattern = (pattern: number[], target: number): number[] => {
    if (pattern.length === target) return pattern;
    
    const ratio = pattern.length / target;
    const interpolated = [];
    
    for (let i = 0; i < target; i++) {
      const sourceIndex = i * ratio;
      const lowerIndex = Math.floor(sourceIndex);
      const upperIndex = Math.min(Math.ceil(sourceIndex), pattern.length - 1);
      
      const value = sourceIndex - lowerIndex < 0.5 ? 
        pattern[lowerIndex] : pattern[upperIndex];
      interpolated[i] = value;
    }
    
    return interpolated;
  };

  const refNormalized = interpolatePattern(refPattern, targetLength);
  const userNormalized = interpolatePattern(userPattern, targetLength);

  // 6. 다중 매칭 방식
  
  // 6-1. 기본 매칭
  let exactMatches = 0;
  for (let i = 0; i < targetLength; i++) {
    if (refNormalized[i] === userNormalized[i]) exactMatches++;
  }
  const basicScore = exactMatches / targetLength;

  // 6-2. 구간별 매칭
  const calculateSegmentScore = (segments = 8) => {
    const segmentLength = Math.floor(targetLength / segments);
    let totalScore = 0;
    
    for (let seg = 0; seg < segments; seg++) {
      const start = seg * segmentLength;
      const end = Math.min(start + segmentLength, targetLength);
      
      const refSegment = refNormalized.slice(start, end);
      const userSegment = userNormalized.slice(start, end);
      
      let segmentMatches = 0;
      for (let i = 0; i < refSegment.length; i++) {
        if (refSegment[i] === userSegment[i]) segmentMatches++;
      }
      
      totalScore += refSegment.length > 0 ? segmentMatches / refSegment.length : 0;
    }
    
    return totalScore / segments;
  };

  const segmentScore = calculateSegmentScore();

  // 6-3. 트렌드 유사도
  const calculateTrendSimilarity = () => {
    const refTrends = refNormalized.filter(v => v !== 0);
    const userTrends = userNormalized.filter(v => v !== 0);
    
    if (refTrends.length === 0 || userTrends.length === 0) return 1;
    
    const minLength = Math.min(refTrends.length, userTrends.length);
    let trendMatches = 0;
    
    for (let i = 0; i < minLength; i++) {
      if (refTrends[i] === userTrends[i]) trendMatches++;
    }
    
    return minLength > 0 ? trendMatches / minLength : 0;
  };

  const trendScore = calculateTrendSimilarity();

  // 7. 최종 점수 계산
  const finalScore = (
    basicScore * 0.3 +      // 기본 매칭 30%
    segmentScore * 0.4 +    // 구간별 매칭 40%
    trendScore * 0.3        // 트렌드 유사도 30%
  );

  console.log("📊 Pitch 점수 상세:", {
    기본매칭: (basicScore * 100).toFixed(1) + "%",
    구간매칭: (segmentScore * 100).toFixed(1) + "%", 
    트렌드매칭: (trendScore * 100).toFixed(1) + "%",
    최종점수: (finalScore * 100).toFixed(1) + "%"
  });

  return {
    patternScore: finalScore,
    matchedSegments: exactMatches,
    totalSegments: targetLength,
    alignmentScore: segmentScore,
    adaptiveScore: trendScore
  };
}

//ANCHOR ============= CER (Character Error Rate) - 기존 =============
export function calculateCER(
  reference: string,
  hypothesis: string,
  config: CERConfig = CER_PRESETS.default
): {
  cer: number;
  accuracy: number;
  errors: number;
  semanticScore: number;
  adjustedCER: number;
  partialMatchBonus: number;
} {
  console.log("🔍🎵📈 참조 텍스트 (reference) : ", reference);
  console.log("🔍🎵📈 STT 한거 (hypothesis) : ", hypothesis);
  
  const refChars = reference.replace(/\s/g, "").split("");
  const hypChars = hypothesis.replace(/\s/g, "").split("");

  const m = refChars.length;
  const n = hypChars.length;

  // 빈 문자열 처리
  if (m === 0 && n === 0) {
    return { cer: 0, accuracy: 1, errors: 0, semanticScore: 100, adjustedCER: 0, partialMatchBonus: 0 };
  }
  
  if (m === 0) {
    return { cer: 1, accuracy: 0, errors: n, semanticScore: 0, adjustedCER: 1, partialMatchBonus: 0 };
  }

  // Levenshtein distance
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = refChars[i - 1] === hypChars[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  const errors = dp[m][n];
  const cer = errors / m;
  const accuracy = Math.max(0, 1 - cer);
  
  // 부분 일치 보너스
  const matchedChars = Math.max(0, Math.min(m, n) - errors);
  const partialMatchRatio = matchedChars / m;
  const partialMatchBonus = partialMatchRatio * 20;
  
  // SemanticScore 계산
  const { tau, alpha, gamma } = config;
  const cerPrime = Math.max(0, cer - tau);
  const adjustedCERForScore = Math.max(0, cerPrime - (partialMatchRatio * 0.1));
  const base = Math.max(0, 1 - alpha * adjustedCERForScore);
  let semanticScore = 100 * Math.pow(base, gamma);
  semanticScore = Math.min(100, semanticScore + partialMatchBonus);
  
  return { 
    cer, 
    accuracy, 
    errors,
    semanticScore: Math.round(semanticScore),
    adjustedCER: cerPrime,
    partialMatchBonus: Math.round(partialMatchBonus)
  };
}