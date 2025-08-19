import { useState, useRef, useCallback } from 'react';
import type WaveSurfer from 'wavesurfer.js';

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async (wavesurfer?: WaveSurfer | null) => {
    try {
      // 마이크 권한 요청
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // MediaRecorder 생성
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      // 데이터 수집
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // 녹음 종료 시
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);

        // 스트림 정리
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      // WaveSurfer에 마이크 연결 (선택사항)
      if (wavesurfer) {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);

        // 실시간 시각화를 위한 처리
        // (WaveSurfer의 microphone 플러그인 대신 수동 구현)
      }

      // 녹음 시작
      mediaRecorder.start(100);
      setIsRecording(true);
    } catch (error) {
      console.error('녹음 시작 실패:', error);
      alert('마이크 권한을 허용해주세요.');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
  };
}
