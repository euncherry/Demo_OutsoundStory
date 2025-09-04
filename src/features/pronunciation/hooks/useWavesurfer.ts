// src/features/pronunciation/hooks/useWavesurfer.ts
import { useRef, useCallback, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";

export function useWavesurfer() {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const spectrogramRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 기본 wavesurfer 생성
  const createWavesurfer = useCallback(
    (container: HTMLElement, options: any = {}) => {
      const defaultOptions = {
        container,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        height: 80,
        ...options,
      };

      const wavesurfer = WaveSurfer.create(defaultOptions);

      // 이벤트 리스너
      wavesurfer.on("play", () => setIsPlaying(true));
      wavesurfer.on("pause", () => setIsPlaying(false));
      wavesurfer.on("finish", () => setIsPlaying(false));
      wavesurfer.on("timeupdate", (time) => setCurrentTime(time));
      wavesurfer.on("ready", () => setDuration(wavesurfer.getDuration()));

      wavesurferRef.current = wavesurfer;
      return wavesurfer;
    },
    []
  );

  // 스펙트로그램 플러그인 추가
  const addSpectrogram = useCallback((options: any = {}) => {
    if (!wavesurferRef.current) return null;

    const spectrogramOptions = {
      labels: true,
      height: 200,
      splitChannels: false,
      scale: "mel",
      frequencyMax: 8000,
      frequencyMin: 0,
      fftSamples: 1024,
      useWebWorker: true,
      labelsBackground: "rgba(0, 0, 0, 0.1)",
      ...options,
    };

    const spectrogram = wavesurferRef.current.registerPlugin(
      Spectrogram.create(spectrogramOptions) as any
    );

    spectrogramRef.current = spectrogram;
    return spectrogram;
  }, []);

  // 오디오 로드
  const loadAudio = useCallback(async (url: string | Blob) => {
    if (!wavesurferRef.current) return;

    try {
      if (url instanceof Blob) {
        const audioUrl = URL.createObjectURL(url);
        await wavesurferRef.current.load(audioUrl);
      } else {
        await wavesurferRef.current.load(url);
      }
    } catch (error) {
      console.warn("Failed to load audio:", error);
      // AbortError는 일반적으로 컴포넌트가 언마운트될 때 발생하므로 무시
      if (error.name !== "AbortError") {
        console.error("Audio loading error:", error);
      }
    }
  }, []);

  // 재생/일시정지
  const playPause = useCallback(() => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.playPause();
  }, []);

  // 특정 시간으로 이동
  const seekTo = useCallback((time: number) => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.setTime(time);
  }, []);

  // 정리
  const destroy = useCallback(() => {
    try {
      if (wavesurferRef.current) {
        // 재생 중이면 먼저 정지
        if (isPlaying) {
          wavesurferRef.current.pause();
        }
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
        spectrogramRef.current = null;
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
      }
    } catch (error) {
      console.warn("Error during wavesurfer cleanup:", error);
      // 강제로 참조 정리
      wavesurferRef.current = null;
      spectrogramRef.current = null;
    }
  }, [isPlaying]);

  return {
    wavesurfer: wavesurferRef.current,
    createWavesurfer,
    addSpectrogram,
    loadAudio,
    playPause,
    seekTo,
    destroy,
    isPlaying,
    currentTime,
    duration,
  };
}
