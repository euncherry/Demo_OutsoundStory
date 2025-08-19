// src/features/pronunciation/hooks/useAudioDecoder.ts
import { useCallback } from "react";

export function useAudioDecoder() {
  const decodeAudioData = useCallback(
    async (audioSource: string | Blob): Promise<AudioBuffer> => {
      console.log("🎧 useAudioDecoder 시작");
      console.log("  - audioSource 타입:", typeof audioSource);
      console.log(
        "  - audioSource:",
        audioSource instanceof Blob ? "Blob" : audioSource
      );

      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        console.log("✅ AudioContext 생성 완료");

        let arrayBuffer: ArrayBuffer;

        if (typeof audioSource === "string") {
          console.log("🌐 URL에서 오디오 fetch 시작:", audioSource);
          const response = await fetch(audioSource);
          console.log("📥 Fetch 응답:", response.status, response.statusText);
          arrayBuffer = await response.arrayBuffer();
          console.log(
            "✅ ArrayBuffer 변환 완료:",
            arrayBuffer.byteLength,
            "bytes"
          );
        } else {
          console.log("📄 Blob에서 ArrayBuffer 변환 시작");
          arrayBuffer = await audioSource.arrayBuffer();
          console.log(
            "✅ ArrayBuffer 변환 완료:",
            arrayBuffer.byteLength,
            "bytes"
          );
        }

        console.log("🔊 오디오 디코딩 시작...");
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log("✅ 오디오 디코딩 완료:", {
          duration: audioBuffer.duration,
          sampleRate: audioBuffer.sampleRate,
          channels: audioBuffer.numberOfChannels,
          length: audioBuffer.length,
        });

        await audioContext.close();
        console.log("🔒 AudioContext 닫기 완료");

        return audioBuffer;
      } catch (error) {
        console.error("❌ useAudioDecoder 에러:", error);
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        throw error;
      }
    },
    []
  );

  return { decodeAudioData };
}
