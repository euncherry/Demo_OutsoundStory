// src/features/pronunciation/hooks/useAudioRecorder.ts
import { useRef, useCallback, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";

export function useAudioRecorder() {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  // 녹음용 wavesurfer 초기화
  const initializeRecorder = useCallback((container: HTMLElement) => {
    // 기존 인스턴스 정리
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    // 새 WaveSurfer 인스턴스 생성
    const wavesurfer = WaveSurfer.create({
      container,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      height: 80,
    });

    // RecordPlugin 등록
    const recordPlugin = wavesurfer.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform: false,
        continuousWaveform: true,
        continuousWaveformDuration: 30,
      })
    );

    // 녹음 완료 이벤트
    recordPlugin.on("record-end", (blob: Blob) => {
      setRecordedBlob(blob);
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
    });

    // 녹음 진행 이벤트
    recordPlugin.on("record-progress", (time: number) => {
      setRecordingTime(time);
    });

    wavesurferRef.current = wavesurfer;
    recordPluginRef.current = recordPlugin;

    return { wavesurfer, recordPlugin };
  }, []);

  // 녹음 시작
  const startRecording = useCallback(async (deviceId?: string) => {
    if (!recordPluginRef.current) {
      console.error("Record plugin not initialized");
      return false;
    }

    try {
      // 마이크 권한 먼저 확인
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // 임시 스트림 종료

      console.log("Starting recording with device:", deviceId || "default");
      await recordPluginRef.current.startRecording({ deviceId });
      setIsRecording(true);
      setIsPaused(false);
      setRecordedBlob(null);
      console.log("Recording started successfully");
      return true;
    } catch (error) {
      console.error("Failed to start recording:", error);
      if (error.name === "NotAllowedError") {
        alert(
          "마이크 권한이 필요합니다. 브라우저 설정에서 마이크 권한을 허용해주세요."
        );
      } else if (error.name === "NotFoundError") {
        alert(
          "마이크를 찾을 수 없습니다. 마이크가 연결되어 있는지 확인해주세요."
        );
      }
      return false;
    }
  }, []);

  // 녹음 중지
  const stopRecording = useCallback(() => {
    if (!recordPluginRef.current) return;
    recordPluginRef.current.stopRecording();
  }, []);

  // 녹음 일시정지/재개
  const pauseRecording = useCallback(() => {
    if (!recordPluginRef.current) return;

    if (isPaused) {
      recordPluginRef.current.resumeRecording();
      setIsPaused(false);
    } else {
      recordPluginRef.current.pauseRecording();
      setIsPaused(true);
    }
  }, [isPaused]);

  // 사용 가능한 오디오 기기 목록 가져오기
  const getAvailableDevices = useCallback(async () => {
    try {
      return await RecordPlugin.getAvailableAudioDevices();
    } catch (error) {
      console.error("Failed to get audio devices:", error);
      return [];
    }
  }, []);

  // 정리
  const cleanup = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
      recordPluginRef.current = null;
    }
  }, []);

  return {
    initializeRecorder,
    startRecording,
    stopRecording,
    pauseRecording,
    getAvailableDevices,
    cleanup,
    isRecording,
    isPaused,
    recordingTime,
    recordedBlob,
  };
}
