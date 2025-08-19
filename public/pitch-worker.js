// public/pitch-worker.js
self.onmessage = function (e) {
  const { peaks, sampleRate = 48000 } = e.data;

  console.log("🔧 Worker 시작:", { peaksLength: peaks.length, sampleRate });

  try {
    const frequencies = [];
    const frameSize = 1024;
    let totalFreq = 0;
    let validFrames = 0;

    console.log("🔍 피치 검출 시작...");

    // 간단한 autocorrelation 기반 pitch detection
    for (let i = 0; i < peaks.length - frameSize; i += frameSize) {
      const frame = peaks.slice(i, i + frameSize);
      const pitch = detectPitchInFrame(frame, sampleRate);
      frequencies.push(pitch);

      if (pitch > 0) {
        totalFreq += pitch;
        validFrames++;
      }
    }

    const baseFrequency = validFrames > 0 ? totalFreq / validFrames : 200;

    console.log("✅ Worker 분석 완료:", {
      totalFrames: frequencies.length,
      validFrames,
      baseFrequency,
      validFreqsArray: frequencies.filter((f) => f > 0).length,
    });

    self.postMessage({
      frequencies,
      baseFrequency,
      success: true,
    });
  } catch (error) {
    console.error("❌ Worker 에러:", error);
    self.postMessage({
      error: error.message,
      success: false,
    });
  }
};

function detectPitchInFrame(frame, sampleRate) {
  const minPeriod = Math.floor(sampleRate / 800); // 800Hz max
  const maxPeriod = Math.floor(sampleRate / 80); // 80Hz min

  let bestPeriod = 0;
  let bestCorrelation = -1;

  // RMS 계산으로 무음 구간 필터링
  let rms = 0;
  for (let i = 0; i < frame.length; i++) {
    rms += frame[i] * frame[i];
  }
  rms = Math.sqrt(rms / frame.length);

  // 너무 조용하면 0 반환
  if (rms < 0.01) {
    return 0;
  }

  // Autocorrelation
  for (
    let period = minPeriod;
    period < Math.min(maxPeriod, frame.length / 2);
    period++
  ) {
    let correlation = 0;
    for (let i = 0; i < frame.length - period; i++) {
      correlation += frame[i] * frame[i + period];
    }

    // Normalize correlation
    correlation = correlation / (frame.length - period);

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestPeriod = period;
    }
  }

  // 상관관계가 충분히 강해야 유효한 피치로 인정
  if (bestCorrelation < 0.3) {
    return 0;
  }

  return bestPeriod > 0 ? sampleRate / bestPeriod : 0;
}
