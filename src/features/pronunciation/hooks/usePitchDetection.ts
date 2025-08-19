// src/features/pronunciation/hooks/usePitchDetection.ts
import { useState, useEffect, useCallback } from "react";

interface PitchData {
  frequencies: number[];
  baseFrequency: number;
}

export function usePitchDetection() {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("🔧 usePitchDetection: Worker 초기화 시작");
    try {
      const pitchWorker = new Worker("/pitch-worker.js");
      console.log("✅ Worker 생성 성공");
      setWorker(pitchWorker);

      return () => {
        console.log("🗑️ Worker 정리");
        pitchWorker.terminate();
      };
    } catch (error) {
      console.error("❌ Worker 생성 실패:", error);
    }
  }, []);

  const detectPitch = useCallback(
    (audioBuffer: AudioBuffer, sampleRate?: number): Promise<PitchData> => {
      return new Promise((resolve, reject) => {
        console.log("🎯 detectPitch 시작");
        console.log("  - worker 존재:", !!worker);
        console.log("  - audioBuffer:", audioBuffer);

        if (!worker) {
          console.error("❌ Worker not initialized");
          reject(new Error("Worker not initialized"));
          return;
        }

        console.log("⏳ 로딩 상태 설정");
        setIsLoading(true);

        const peaks = audioBuffer.getChannelData(0);
        const actualSampleRate = sampleRate || audioBuffer.sampleRate;

        console.log("📊 오디오 데이터:", {
          peaksLength: peaks.length,
          sampleRate: actualSampleRate,
          duration: audioBuffer.duration,
        });

        const handleMessage = (e: MessageEvent) => {
          console.log("📨 Worker 메시지 수신:", e.data);
          const { frequencies, baseFrequency, success, error } = e.data;

          worker.removeEventListener("message", handleMessage);
          console.log("✅ 로딩 상태 해제");
          setIsLoading(false);

          if (success) {
            console.log("🎉 피치 검출 성공:", {
              frequencies: frequencies?.length,
              baseFrequency,
            });
            resolve({ frequencies, baseFrequency });
          } else {
            console.error("❌ 피치 검출 실패:", error);
            reject(new Error(error || "Pitch detection failed"));
          }
        };

        const handleError = (error: ErrorEvent) => {
          console.error("❌ Worker 에러:", error);
          worker.removeEventListener("message", handleMessage);
          worker.removeEventListener("error", handleError);
          setIsLoading(false);
          reject(new Error("Worker error: " + error.message));
        };

        worker.addEventListener("message", handleMessage);
        worker.addEventListener("error", handleError);

        console.log("📤 Worker에 데이터 전송");
        worker.postMessage({
          peaks: Array.from(peaks),
          sampleRate: actualSampleRate,
        });
      });
    },
    [worker]
  );

  return { detectPitch, isLoading };
}
