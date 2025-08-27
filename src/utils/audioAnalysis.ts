// src/utils/audioAnalysis.ts
// 오디오 전처리 → toMono, downsample, zeroMeanUnitVar
// 파형 분석 → maxNormalizedCrossCorr, calculateRMSPattern
// 피치 분석 → analyzePitchPattern
// 텍스트 정확도 → calculateCER

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
  hypothesis: string
): { cer: number; accuracy: number; errors: number } {
  console.log("🔍🎵📈 reference : ", reference);
  console.log("🔍🎵📈 hypothesis : ", hypothesis);
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
        dp[i - 1][j] + 1, // 삭제
        dp[i][j - 1] + 1, // 삽입
        dp[i - 1][j - 1] + cost // 치환
      );
    }
  }

  const errors = dp[m][n];
  const cer = m > 0 ? errors / m : 0;
  const accuracy = Math.max(0, 1 - cer);
  console.log("🔍🎵📈 CER : ", cer);
  console.log("🔍🎵📈 Accuracy : ", accuracy);
  return { cer, accuracy, errors };
}
