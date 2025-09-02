// src/features/pronunciation/hooks/useWaveSurferSetup.ts
import { useCallback, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";

/**
 * WaveSurfer 인스턴스들을 중앙에서 관리하는 Hook
 * PronunciationResults 진입 시 모든 그래프를 한 번에 초기화
 */
export function useWaveSurferSetup() {
  const { currentContext, recordedAudioBlob } = usePronunciationStore();
  const { 
    waveSurferInstances, 
    setWaveSurferInstance, 
    setWaveSurferInitializing,
    setWaveSurferInitialized,
    destroyAllWaveSurfers,
    pitchAnalysis 
  } = useScoreStore();

  /**
   * 모든 WaveSurfer 인스턴스를 초기화하는 함수
   */
  const initializeAllWaveSurfers = useCallback(async () => {
    if (!currentContext || !recordedAudioBlob) {
      console.warn("Missing required data for WaveSurfer initialization");
      return;
    }

    if (waveSurferInstances.isInitializing || waveSurferInstances.isInitialized) {
      console.log("WaveSurfer already initializing or initialized");
      return;
    }

    console.log("🎵 WaveSurfer 중앙 초기화 시작...");
    setWaveSurferInitializing(true);

    try {
      // 기존 인스턴스 정리
      destroyAllWaveSurfers();

      // 사용자 오디오 Blob URL 생성
      const userAudioUrl = URL.createObjectURL(recordedAudioBlob);
      const standardAudioUrl = currentContext.audioReference || "/src/assets/audio/references/Default.wav";

      // 숨겨진 컨테이너들 생성 (임시로 DOM에 추가)
      const createHiddenContainer = (id: string) => {
        const container = document.createElement("div");
        container.id = id;
        container.style.display = "none";
        document.body.appendChild(container);
        return container;
      };

      const containers = {
        refWaveform: createHiddenContainer("ref-waveform-container"),
        userWaveform: createHiddenContainer("user-waveform-container"),
        refPitch: createHiddenContainer("ref-pitch-container"),
        userPitch: createHiddenContainer("user-pitch-container"),
        refSpectrogram: createHiddenContainer("ref-spectrogram-container"),
        userSpectrogram: createHiddenContainer("user-spectrogram-container"),
      };

      // 🎵 1. Waveform용 WaveSurfer 생성
      console.log("Creating Waveform WaveSurfers...");
      const refWaveformWS = WaveSurfer.create({
        container: containers.refWaveform,
        height: 80,
        waveColor: "#4CAF50",
        progressColor: "#2E7D32",
        cursorColor: "#4CAF50",
        interact: true,
        barWidth: 2,
        barRadius: 1,
        normalize: true,
        url: standardAudioUrl,
      });

      const userWaveformWS = WaveSurfer.create({
        container: containers.userWaveform,
        height: 80,
        waveColor: "#FF9800",
        progressColor: "#F57C00",
        cursorColor: "#FF9800",
        interact: true,
        barWidth: 2,
        barRadius: 1,
        normalize: true,
        url: userAudioUrl,
      });

      // 🎯 2. Pitch용 WaveSurfer 생성 (canvas overlay 포함)
      console.log("Creating Pitch WaveSurfers...");
      const refPitchWS = WaveSurfer.create({
        container: containers.refPitch,
        height: 200,
        waveColor: "rgba(255, 200, 220, 1)",
        progressColor: "rgba(200, 255, 220, 1)",
        cursorColor: "#ddd5e9",
        cursorWidth: 2,
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        normalize: true,
        minPxPerSec: 50,
        fillParent: true,
        autoCenter: true,
        interact: true,
        dragToSeek: true,
        url: standardAudioUrl,
        sampleRate: 11025,
      });

      const userPitchWS = WaveSurfer.create({
        container: containers.userPitch,
        height: 200,
        waveColor: "#7db496",
        progressColor: "#383351",
        cursorColor: "#ddd5e9",
        cursorWidth: 2,
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        normalize: true,
        minPxPerSec: 50,
        fillParent: true,
        autoCenter: true,
        interact: true,
        dragToSeek: true,
        url: userAudioUrl,
        sampleRate: 11025,
      });

      // 📊 3. Spectrogram용 WaveSurfer 생성
      console.log("Creating Spectrogram WaveSurfers...");
      const refSpectrogramWS = WaveSurfer.create({
        container: containers.refSpectrogram,
        height: 120,
        waveColor: "rgba(100, 0, 100, 0.6)",
        progressColor: "rgb(100, 0, 100)",
        barWidth: 2,
        barRadius: 1,
        url: standardAudioUrl,
      });

             // 스펙트로그램 플러그인 추가
       refSpectrogramWS.registerPlugin(
         Spectrogram.create({
           height: 150,
           labels: true,
           scale: "mel",
         }) as any
       );

      const userSpectrogramWS = WaveSurfer.create({
        container: containers.userSpectrogram,
        height: 120,
        waveColor: "rgba(200, 100, 0, 0.6)",
        progressColor: "rgb(200, 100, 0)",
        barWidth: 2,
        barRadius: 1,
        url: userAudioUrl,
      });

             userSpectrogramWS.registerPlugin(
         Spectrogram.create({
           height: 150,
           labels: true,
           scale: "mel",
         }) as any
       );

      // 모든 WaveSurfer가 준비될 때까지 대기
      await Promise.all([
        new Promise((resolve) => refWaveformWS.once("ready", resolve)),
        new Promise((resolve) => userWaveformWS.once("ready", resolve)),
        new Promise((resolve) => refPitchWS.once("ready", resolve)),
        new Promise((resolve) => userPitchWS.once("ready", resolve)),
        new Promise((resolve) => refSpectrogramWS.once("ready", resolve)),
        new Promise((resolve) => userSpectrogramWS.once("ready", resolve)),
      ]);

      // 스토어에 인스턴스들 저장
      setWaveSurferInstance("refWaveform", refWaveformWS);
      setWaveSurferInstance("userWaveform", userWaveformWS);
      setWaveSurferInstance("refPitch", refPitchWS);
      setWaveSurferInstance("userPitch", userPitchWS);
      setWaveSurferInstance("refSpectrogram", refSpectrogramWS);
      setWaveSurferInstance("userSpectrogram", userSpectrogramWS);

      // Blob URL 정리
      URL.revokeObjectURL(userAudioUrl);

      setWaveSurferInitialized(true);
      console.log("✅ 모든 WaveSurfer 인스턴스 초기화 완료!");

    } catch (error) {
      console.error("❌ WaveSurfer 초기화 실패:", error);
      destroyAllWaveSurfers();
    } finally {
      setWaveSurferInitializing(false);
    }
  }, [
    currentContext,
    recordedAudioBlob,
    waveSurferInstances.isInitializing,
    waveSurferInstances.isInitialized,
    setWaveSurferInstance,
    setWaveSurferInitializing,
    setWaveSurferInitialized,
    destroyAllWaveSurfers,
  ]);

  /**
   * 피치 오버레이 캔버스를 그리는 함수
   * pitchAnalysis 데이터가 있을 때 자동으로 실행
   */
  const drawPitchOverlays = useCallback(() => {
    if (!pitchAnalysis || !waveSurferInstances.isInitialized) return;

    const { refFrequencies, userFrequencies, refBaseFrequency, userBaseFrequency } = pitchAnalysis;

    // Canvas 요소들 찾기 (탭에서 생성된 것들)
    const refCanvas = document.querySelector("#ref-pitch-canvas") as HTMLCanvasElement;
    const userCanvas = document.querySelector("#user-pitch-canvas") as HTMLCanvasElement;

    if (!refCanvas || !userCanvas) {
      console.warn("Pitch canvas elements not found");
      return;
    }

    const drawPitchContour = (
      canvas: HTMLCanvasElement,
      frequencies: (number | null)[],
      baseFrequency: number
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = frequencies.length;
      canvas.height = 200;
      canvas.style.width = "100%";
      canvas.style.height = "200px";

      const pitchUpColor = "#385587";
      const pitchDownColor = "#C26351";
      const height = canvas.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pointSize = 3;
      let prevY = 0;

      frequencies.forEach((frequency, index) => {
        if (!frequency) return;

        const y = Math.round(height - (frequency / (baseFrequency * 2)) * height);
        ctx.fillStyle = y > prevY ? pitchDownColor : pitchUpColor;
        ctx.fillRect(index, y, pointSize, pointSize);
        prevY = y;
      });
    };

    // 피치 오버레이 그리기
    drawPitchContour(refCanvas, refFrequencies, refBaseFrequency);
    drawPitchContour(userCanvas, userFrequencies, userBaseFrequency);

    console.log("🎨 Pitch overlays drawn successfully");
  }, [pitchAnalysis, waveSurferInstances.isInitialized]);

  /**
   * 컴포넌트 언마운트 시 정리
   */
  const cleanup = useCallback(() => {
    destroyAllWaveSurfers();
  }, [destroyAllWaveSurfers]);

  // pitchAnalysis 변경 시 자동으로 오버레이 그리기
  useEffect(() => {
    if (pitchAnalysis && waveSurferInstances.isInitialized) {
      // 약간의 딜레이 후 그리기 (DOM 렌더링 완료 대기)
      setTimeout(drawPitchOverlays, 100);
    }
  }, [pitchAnalysis, waveSurferInstances.isInitialized, drawPitchOverlays]);

  return {
    // 초기화 관련
    initializeAllWaveSurfers,
    cleanup,
    
    // 상태
    isInitializing: waveSurferInstances.isInitializing,
    isInitialized: waveSurferInstances.isInitialized,
    
    // 인스턴스 접근
    instances: waveSurferInstances,
    
    // 유틸리티
    drawPitchOverlays,
  };
}