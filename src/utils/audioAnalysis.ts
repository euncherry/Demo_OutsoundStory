// src/utils/audioAnalysis.ts

// 오디오 전처리 → toMono, downsample, zeroMeanUnitVar
// 파형 분석 → maxNormalizedCrossCorr, calculateRMSPattern
// 피치 분석 → analyzePitchPattern
// 텍스트 정확도 → calculateCER


import { CERConfig, CER_PRESETS } from '@/types/pronunciation';


//ANCHOR ============= 오디오 전처리 함수 =============
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

//ANCHOR ============= NCC (Normalized Cross-Correlation) =============
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

//ANCHOR ============= RMS 패턴 분석 =============
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

//ANCHOR ============= Peak Amplitude 분석 =============
export function calculatePeakAmplitudeScore(
  refPeaks: number[][] | null,
  userPeaks: number[][] | null,
  windowSize = 10
): {
  peakScore: number;
  alignmentScore: number;
  magnitudeScore: number;
} {
  if (!refPeaks || !userPeaks || refPeaks.length === 0 || userPeaks.length === 0) {
    return { peakScore: 0, alignmentScore: 0, magnitudeScore: 0 };
  }

  // 채널 0의 peak 데이터 추출 (모노 또는 첫 번째 채널)
  const refAmplitudes = refPeaks[0] || [];
  const userAmplitudes = userPeaks[0] || [];

  // 길이 정규화 - 더 짧은 쪽에 맞춤
  const minLength = Math.min(refAmplitudes.length, userAmplitudes.length);
  const normalizedRef = refAmplitudes.slice(0, minLength);
  const normalizedUser = userAmplitudes.slice(0, minLength);

  // 1. Peak Magnitude 비교 (진폭 크기 유사도)
  let magnitudeScore = 0;
  for (let i = 0; i < minLength; i++) {
    const refPeak = Math.abs(normalizedRef[i]);
    const userPeak = Math.abs(normalizedUser[i]);
    
    // 두 peak 중 작은 값 / 큰 값으로 유사도 계산
    const similarity = Math.min(refPeak, userPeak) / Math.max(refPeak, userPeak, 0.001);
    magnitudeScore += similarity;
  }
  magnitudeScore = magnitudeScore / minLength;

  // 2. Peak Pattern Alignment (peak 발생 위치/패턴 유사도)
  const refPeakIndices = findPeakIndices(normalizedRef, 0.3); // 30% 이상인 peak 찾기
  const userPeakIndices = findPeakIndices(normalizedUser, 0.3);
  
  let alignmentScore = 0;
  if (refPeakIndices.length > 0 && userPeakIndices.length > 0) {
    // 각 reference peak에 대해 가장 가까운 user peak 찾기
    for (const refIdx of refPeakIndices) {
      const closestUserIdx = findClosestPeak(refIdx, userPeakIndices, windowSize);
      if (closestUserIdx !== -1) {
        // 거리가 가까울수록 높은 점수
        const distance = Math.abs(refIdx - closestUserIdx);
        const score = Math.max(0, 1 - distance / windowSize);
        alignmentScore += score;
      }
    }
    alignmentScore = alignmentScore / refPeakIndices.length;
  }

  // 3. Peak Energy Distribution (에너지 분포 유사도)
  const refEnergy = calculatePeakEnergy(normalizedRef);
  const userEnergy = calculatePeakEnergy(normalizedUser);
  const energyScore = Math.min(refEnergy, userEnergy) / Math.max(refEnergy, userEnergy, 0.001);

  // 최종 Peak Score (가중 평균)
  const peakScore = (
    magnitudeScore * 0.4 +    // 진폭 크기 40%
    alignmentScore * 0.4 +    // 위치 정렬 40%
    energyScore * 0.2        // 에너지 분포 20%
  );

  console.log("🎯 Peak Analysis:", {
    magnitudeScore: (magnitudeScore * 100).toFixed(1),
    alignmentScore: (alignmentScore * 100).toFixed(1),
    energyScore: (energyScore * 100).toFixed(1),
    finalPeakScore: (peakScore * 100).toFixed(1)
  });

  return { peakScore, alignmentScore, magnitudeScore };
}

// Helper: Peak 인덱스 찾기
function findPeakIndices(amplitudes: number[], threshold = 0.3): number[] {
  const maxAmp = Math.max(...amplitudes.map(Math.abs));
  const indices: number[] = [];
  
  for (let i = 1; i < amplitudes.length - 1; i++) {
    const current = Math.abs(amplitudes[i]);
    const prev = Math.abs(amplitudes[i - 1]);
    const next = Math.abs(amplitudes[i + 1]);
    
    // Local maximum이면서 threshold 이상인 점
    if (current > prev && current > next && current > maxAmp * threshold) {
      indices.push(i);
    }
  }
  
  return indices;
}

// Helper: 가장 가까운 peak 찾기
function findClosestPeak(target: number, peaks: number[], windowSize: number): number {
  let closestIdx = -1;
  let minDistance = windowSize;
  
  for (const peak of peaks) {
    const distance = Math.abs(target - peak);
    if (distance < minDistance) {
      minDistance = distance;
      closestIdx = peak;
    }
  }
  
  return closestIdx;
}

// Helper: Peak 에너지 계산
function calculatePeakEnergy(amplitudes: number[]): number {
  return Math.sqrt(
    amplitudes.reduce((sum, amp) => sum + amp * amp, 0) / amplitudes.length
  );
}


//ANCHOR ============= Pitch Pattern Matching =============
export function analyzePitchPattern(
  refFrequencies: (number | null)[],
  userFrequencies: (number | null)[]
): { patternScore: number; matchedSegments: number; totalSegments: number } {
  // 상승(1), 하강(-1), 평탄(0) 패턴 생성
  const createPattern = (frequencies: (number | null)[]): number[] => {
    const pattern: number[] = [];
    const validFreqs = frequencies.filter(
      (f) => f !== null && f > 0
    ) as number[];

    for (let i = 1; i < validFreqs.length; i++) {
      const diff = validFreqs[i] - validFreqs[i - 1];
      if (diff > 5) pattern.push(1);
      // 상승
      else if (diff < -5) pattern.push(-1);
      // 하강
      else pattern.push(0); // 평탄
    }
    return pattern;
  };

  const refPattern = createPattern(refFrequencies);
  const userPattern = createPattern(userFrequencies);

  // 패턴 매칭
  const minLength = Math.min(refPattern.length, userPattern.length);
  let matchedSegments = 0;

  for (let i = 0; i < minLength; i++) {
    if (refPattern[i] === userPattern[i]) {
      matchedSegments++;
    }
  }

  const patternScore = minLength > 0 ? matchedSegments / minLength : 0;

  console.log("🔍🎵📈 pitch pattern refPattern : ", refPattern);
  console.log("🔍🎵📈 pitch pattern userPattern : ", userPattern);
  console.log("🔍🎵📈 pitch pattern patternScore : ", patternScore);
  console.log("🔍🎵📈 pitch pattern matchedSegments : ", matchedSegments);
  return {
    patternScore,
    matchedSegments,
    totalSegments: minLength,
  };
}

//ANCHOR ============= CER (Character Error Rate) =============
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
}{
  console.log("🔍🎵📈 참조 텍스트 (reference) : ", reference);
  console.log("🔍🎵📈 STT 한거 (hypothesis) : ", hypothesis);
  
  const refChars = reference.replace(/\s/g, "").split("");
  const hypChars = hypothesis.replace(/\s/g, "").split("");

  const m = refChars.length;
  const n = hypChars.length;

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
        dp[i - 1][j] + 1,     // 삭제
        dp[i][j - 1] + 1,     // 삽입
        dp[i - 1][j - 1] + cost // 치환
      );
    }
  }

  const errors = dp[m][n];
  const cer = m > 0 ? errors / m : 0;
  const accuracy = Math.max(0, 1 - cer);
  
  // ✨ 새로운 SemanticScore 계산
  const { tau, alpha, gamma } = config;
  
  // Step 1: Dead zone 적용 (미세 오차 무시)
  const cerPrime = Math.max(0, cer - tau);
  
  // Step 2: Clamping with penalty strength
  const base = Math.max(0, 1 - alpha * cerPrime);
  
  // Step 3: Curve shaping
  const semanticScore = 100 * Math.pow(base, gamma);
  
  console.log("🎵🎵🎵 원본 CER : ", cer.toFixed(3));
  console.log("🎵🎵🎵 Dead zone 적용 CER' : ", cerPrime.toFixed(3));
  console.log("🎵🎵🎵 Base (클램프) : ", base.toFixed(3));
  console.log("🎵🎵🎵 Semantic Score : ", semanticScore.toFixed(1));
  console.log("🎵🎵🎵 기존 Accuracy : ", (accuracy * 100).toFixed(1) + "%");
  
  return { 
    cer, 
    accuracy, 
    errors,
    semanticScore: Math.round(semanticScore),
    adjustedCER: cerPrime
  };
}
