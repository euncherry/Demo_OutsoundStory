// src/features/pronunciation/hooks/useAudioRecorder.ts
import { useRef, useCallback, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";

export function useAudioRecorder() {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isCleaningUpRef = useRef(false); // 🔥 정리 상태 추적용 ref
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  // 🔥 MediaStream 완전 해제 함수
  const stopAllMediaTracks = useCallback(() => {
    console.log("🎤 MediaStream tracks 해제 중...");

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        console.log(`🔴 Track 중지: ${track.kind} - ${track.label}`);
        track.stop();
      });
      mediaStreamRef.current = null;
      console.log("✅ 모든 MediaStream tracks 해제 완료");
    }

    // RecordPlugin에서 사용 중인 스트림도 확인하여 정리
    if (recordPluginRef.current) {
      try {
        const plugin = recordPluginRef.current;
        if (plugin.stream) {
          plugin.stream.getTracks().forEach((track: MediaStreamTrack) => {
            console.log(`🔴 Plugin Track 중지: ${track.kind}`);
            track.stop();
          });
        }
      } catch (error) {
        console.warn("RecordPlugin 스트림 정리 중 오류:", error);
      }
    }
  }, []);

  // 모든 상태 초기화 함수
  const resetAllStates = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setRecordedBlob(null);
  }, []);

  // 🔥 개선된 녹음용 wavesurfer 초기화 - 동기식으로 처리
  const initializeRecorder = useCallback(
    (container: HTMLElement) => {
      console.log("📊 WaveSurfer 초기화 시작...");

      // 기존 인스턴스 정리
      if (wavesurferRef.current) {
        try {
          wavesurferRef.current.destroy();
        } catch (error) {
          console.warn("기존 WaveSurfer 정리 중 오류:", error);
        }
      }

      try {
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

        // 🔥 이벤트 리스너 등록
        recordPlugin.on("record-end", (blob: Blob) => {
          console.log("🎵 녹음 완료 - Blob 생성됨");
          setRecordedBlob(blob);
          setIsRecording(false);
          setIsPaused(false);
          setRecordingTime(0);

          // 🔥 녹음 완료 시 약간의 지연 후 MediaStream 해제
          setTimeout(() => {
            stopAllMediaTracks();
          }, 100);
        });

        recordPlugin.on("record-progress", (time: number) => {
          setRecordingTime(time);
        });

        // 참조 저장
        wavesurferRef.current = wavesurfer;
        recordPluginRef.current = recordPlugin;

        console.log("✅ WaveSurfer 초기화 완료");
        return { wavesurfer, recordPlugin };
      } catch (error) {
        console.error("❌ WaveSurfer 초기화 실패:", error);
        throw error;
      }
    },
    [stopAllMediaTracks, resetAllStates]
  );

  // 🔥 개선된 녹음 시작 - 더 안전한 체크 추가
  const startRecording = useCallback(
    async (deviceId?: string) => {
      console.log("🎤 녹음 시작 요청...");

      if (!recordPluginRef.current) {
        console.error("❌ Record plugin not initialized");
        return false;
      }

      try {
        // 🔥 이전 스트림이 있다면 먼저 정리
        stopAllMediaTracks();

        console.log("📡 MediaStream 생성 중...");

        // 🔥 MediaStream을 직접 관리
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        // 🔥 스트림 참조 저장
        mediaStreamRef.current = stream;
        console.log(
          "🎤 MediaStream 생성됨:",
          stream.getTracks().length,
          "tracks"
        );

        // 🔥 RecordPlugin이 여전히 유효한지 재확인
        if (!recordPluginRef.current) {
          console.error("❌ RecordPlugin이 초기화되지 않음");
          stopAllMediaTracks();
          return false;
        }

        // RecordPlugin에 스트림 전달하여 녹음 시작
        console.log("🔴 녹음 시작...");
        await recordPluginRef.current.startRecording({ deviceId });

        setIsRecording(true);
        setIsPaused(false);
        setRecordedBlob(null);
        console.log("✅ 녹음 시작 성공");
        return true;
      } catch (error) {
        console.error("❌ 녹음 시작 실패:", error);

        // 🔥 오류 시 즉시 정리
        stopAllMediaTracks();
        resetAllStates();

        if (error.name === "NotAllowedError") {
          alert(
            "마이크 권한이 필요합니다. 브라우저 설정에서 마이크 권한을 허용해주세요."
          );
        } else if (error.name === "NotFoundError") {
          alert(
            "마이크를 찾을 수 없습니다. 마이크가 연결되어 있는지 확인해주세요."
          );
        } else if (error.name === "OverconstrainedError") {
          alert(
            "선택된 마이크를 사용할 수 없습니다. 다른 마이크를 선택해주세요."
          );
        }
        return false;
      }
    },
    [stopAllMediaTracks, resetAllStates]
  );

  // 🔥 개선된 녹음 중지
  const stopRecording = useCallback(() => {
    if (!recordPluginRef.current) {
      console.warn("⚠️ RecordPlugin이 없어서 중지할 수 없음");
      return;
    }

    console.log("⏹️ 녹음 중지 중...");

    try {
      recordPluginRef.current.stopRecording();
    } catch (error) {
      console.warn("녹음 중지 중 오류:", error);
      // 오류가 발생해도 스트림은 정리
      stopAllMediaTracks();
    }
  }, [stopAllMediaTracks]);

  // 녹음 일시정지/재개
  const pauseRecording = useCallback(() => {
    if (!recordPluginRef.current) {
      console.warn("⚠️ RecordPlugin이 없어서 일시정지할 수 없음");
      return;
    }

    try {
      if (isPaused) {
        recordPluginRef.current.resumeRecording();
        setIsPaused(false);
        console.log("▶️ 녹음 재개");
      } else {
        recordPluginRef.current.pauseRecording();
        setIsPaused(true);
        console.log("⏸️ 녹음 일시정지");
      }
    } catch (error) {
      console.error("일시정지/재개 중 오류:", error);
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

  // 🔥 완전한 정리 함수
  const cleanup = useCallback(() => {
    console.log("🧹 모든 오디오 리소스 정리 중...");

    // 1. 녹음 중지 (진행 중인 경우)
    if (recordPluginRef.current && isRecording) {
      try {
        recordPluginRef.current.stopRecording();
      } catch (error) {
        console.warn("녹음 중지 중 오류:", error);
      }
    }

    // 2. 🔥 MediaStream 완전 해제
    stopAllMediaTracks();

    // 3. WaveSurfer 인스턴스 정리
    if (wavesurferRef.current) {
      try {
        wavesurferRef.current.destroy();
      } catch (error) {
        console.warn("WaveSurfer 정리 중 오류:", error);
      }
      wavesurferRef.current = null;
    }

    // 4. 플러그인 레퍼런스 정리
    recordPluginRef.current = null;

    // 5. 상태 초기화
    resetAllStates();

    console.log("✅ 모든 오디오 리소스 정리 완료 - 마이크 표시등 꺼짐");
  }, [isRecording, stopAllMediaTracks, resetAllStates]);

  return {
    initializeRecorder,
    startRecording,
    stopRecording,
    pauseRecording,
    getAvailableDevices,
    cleanup,
    resetAllStates,
    stopAllMediaTracks,
    isRecording,
    isPaused,
    recordingTime,
    recordedBlob,
  };
}
