// src/features/pronunciation/hooks/useAudioAnalysis.ts
// 오디오 분석 훅
// initializeAudio() → analyzeWaveform() → analyzePitch() → analyzeSpectrogram() → analyzeCER() → calculateFinalScore()

import { useCallback, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import Pitchfinder from "pitchfinder";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";
import { ANALYSIS_STEPS ,CER_PRESETS} from "@/types/pronunciation";

import {
  toMono,
  downsample,

  maxNormalizedCrossCorr,
  calculateRMSPattern,
  calculatePeakAmplitudeScore,
  analyzePitchPattern,
  calculateCER,
} from "@/utils/audioAnalysis";

export function useAudioAnalysis() {
  const {
    currentContext,
    recordedAudioBlob,
    sttTranscript,
  } = usePronunciationStore();

  const {
    updateAnalysisProgress,
    setWaveformAnalysis,
    setPitchAnalysis,
    setSpectrogramAnalysis,
    setAnalysisResult,
  } = useScoreStore();

  const refWavesurferRef = useRef<WaveSurfer | null>(null);
  const userWavesurferRef = useRef<WaveSurfer | null>(null);

  //ANCHOR 1. WaveSurfer 인스턴스 생성 및 오디오 로드
  const initializeAudio = useCallback(async () => {
    updateAnalysisProgress(ANALYSIS_STEPS.LOADING_AUDIO, 10);
    await new Promise((resolve) => setTimeout(resolve, 100)); // 1초 딜레이

    // 표준 음성 WaveSurfer
    const refContainer = document.createElement("div");
    refContainer.style.display = "none";
    document.body.appendChild(refContainer);

    const refWavesurfer = WaveSurfer.create({
      container: refContainer,
      waveColor: "transparent",
      progressColor: "transparent",
      url:
        currentContext?.audioReference ||
        "/src/assets/audio/references/Default.wav",
      sampleRate: 11025,
    });

    // 사용자 음성 WaveSurfer
    const userContainer = document.createElement("div");
    userContainer.style.display = "none";
    document.body.appendChild(userContainer);

    const userBlobUrl = URL.createObjectURL(recordedAudioBlob!);
    const userWavesurfer = WaveSurfer.create({
      container: userContainer,
      waveColor: "transparent",
      progressColor: "transparent",
      url: userBlobUrl,
      sampleRate: 11025,
    });

    // Ready 이벤트 대기
    await Promise.all([
      new Promise((resolve) => refWavesurfer.once("ready", resolve)),
      new Promise((resolve) => userWavesurfer.once("ready", resolve)),
    ]);

    refWavesurferRef.current = refWavesurfer;
    userWavesurferRef.current = userWavesurfer;

    // 클린업
    URL.revokeObjectURL(userBlobUrl);

    updateAnalysisProgress(ANALYSIS_STEPS.LOADING_COMPLETE, 20);

    return { refWavesurfer, userWavesurfer };
  }, [currentContext, recordedAudioBlob, updateAnalysisProgress]);

  //ANCHOR 2. Waveform 분석
  const analyzeWaveform = useCallback(async () => {
    updateAnalysisProgress(ANALYSIS_STEPS.ANALYZING_WAVEFORM, 30);
    await new Promise((resolve) => setTimeout(resolve, 100)); // 1초 딜레이

    const refWavesurfer = refWavesurferRef.current;
    const userWavesurfer = userWavesurferRef.current;

    if (!refWavesurfer || !userWavesurfer) {
      throw new Error("WaveSurfer not initialized");
    }

    const refBuffer = refWavesurfer.getDecodedData();
    const userBuffer = userWavesurfer.getDecodedData();

    if (!refBuffer || !userBuffer) {
      throw new Error("Failed to get audio buffers");
    }

    // PCM 데이터 추출
    const refPCM = toMono(refBuffer);
    const userPCM = toMono(userBuffer);

    //NOTE  NCC 계산
    const refDownsampled = downsample(refPCM, refBuffer.sampleRate, 4000);
    const userDownsampled = downsample(userPCM, userBuffer.sampleRate, 4000);
    const nccScore = maxNormalizedCrossCorr(
      refDownsampled,
      userDownsampled,
      4000,
      0.5
    );

    //NOTE RMS 패턴 분석
    const rmsResult = calculateRMSPattern(refPCM, userPCM, 10);

    //NOTE Peaks 데이터
    const refPeaks = refWavesurfer.exportPeaks();
    const userPeaks = userWavesurfer.exportPeaks();
    const peakResult = calculatePeakAmplitudeScore(refPeaks, userPeaks);

 //NOTE 최종 Waveform 점수 (NCC + RMS + Peak)
 const combinedScore = (
  nccScore * 0.35 +           // NCC 35%
  rmsResult.averageScore * 0.35 + // RMS 35%
  peakResult.peakScore * 0.3      // Peak 30%
) * 100;

    console.log("📊📊📊📊📊📊📊📊📊📊 Waveform 종합 분석:", {
      NCC: (nccScore * 100).toFixed(1),
      RMS: (rmsResult.averageScore * 100).toFixed(1),
      Peak: (peakResult.peakScore * 100).toFixed(1),
      // Combined: combinedScore.toFixed(1),
      Combined: (nccScore * 100).toFixed(1)
    });


    setWaveformAnalysis({
      refPCMData: refPCM,
      userPCMData: userPCM,
      refPeaks,
      userPeaks,
      nccScore,
      rmsScore: rmsResult.averageScore,
      segmentScores: rmsResult.segmentScores,
    });

    updateAnalysisProgress(ANALYSIS_STEPS.WAVEFORM_COMPLETE, 40);

    return {
      nccScore,
      rmsScore: rmsResult.averageScore,
      combinedScore: (nccScore * 0.5 + Math.max(rmsResult.averageScore, peakResult.peakScore) * 0.5) * 100,
    };
  }, [setWaveformAnalysis, updateAnalysisProgress]);

  //ANCHOR 3. Pitch 분석
  const analyzePitch = useCallback(async () => {
    updateAnalysisProgress(ANALYSIS_STEPS.ANALYZING_PITCH, 50);
    await new Promise((resolve) => setTimeout(resolve, 100)); // 1초 딜레이

    const refWavesurfer = refWavesurferRef.current;
    const userWavesurfer = userWavesurferRef.current;

    if (!refWavesurfer || !userWavesurfer) {
      throw new Error("WaveSurfer not initialized");
    }

    const refBuffer = refWavesurfer.getDecodedData();
    const userBuffer = userWavesurfer.getDecodedData();

    if (!refBuffer || !userBuffer) {
      throw new Error("Failed to get audio buffers");
    }

    // Pitchfinder로 주파수 추출
    const refPCM = refBuffer.getChannelData(0);
    const userPCM = userBuffer.getChannelData(0);
    const sampleRate = 11025;

    const detectPitch = Pitchfinder.AMDF({ sampleRate });
    const refFrequencies = Pitchfinder.frequencies(detectPitch, refPCM, {
      tempo: 120,
      quantization: 120,
    });
    const userFrequencies = Pitchfinder.frequencies(detectPitch, userPCM, {
      tempo: 120,
      quantization: 120,
    });

    // Base frequency 계산
    const calculateBaseFrequency = (frequencies: (number | null)[]) => {
      const freqMap: { [key: number]: number } = {};
      let maxCount = 0;
      let baseFreq = 0;

      frequencies.forEach((f) => {
        if (!f) return;
        const rounded = Math.round(f * 10) / 10;
        freqMap[rounded] = (freqMap[rounded] || 0) + 1;
        if (freqMap[rounded] > maxCount) {
          maxCount = freqMap[rounded];
          baseFreq = rounded;
        }
      });

      return baseFreq;
    };

    const refBase = calculateBaseFrequency(refFrequencies);
    const userBase = calculateBaseFrequency(userFrequencies);

    // 평균 피치
    const validRef = refFrequencies.filter(
      (f) => f !== null && f > 0
    ) as number[];
    const validUser = userFrequencies.filter(
      (f) => f !== null && f > 0
    ) as number[];

    const refAvg = validRef.reduce((a, b) => a + b, 0) / validRef.length;
    const userAvg = validUser.reduce((a, b) => a + b, 0) / validUser.length;

    // 패턴 매칭 점수
    const patternResult = analyzePitchPattern(refFrequencies, userFrequencies);

    setPitchAnalysis({
      refFrequencies,
      userFrequencies,
      refBaseFrequency: refBase,
      userBaseFrequency: userBase,
      refAveragePitch: refAvg,
      userAveragePitch: userAvg,
      patternMatchScore: patternResult.patternScore,
    });

    updateAnalysisProgress(ANALYSIS_STEPS.PITCH_COMPLETE, 60);

    return {
      patternScore: patternResult.patternScore * 100,
      averageDifference: Math.abs(refAvg - userAvg),
      similarity: Math.max(
        0,
        100 - (Math.abs(refAvg - userAvg) / refAvg) * 100
      ),
    };
  }, [setPitchAnalysis, updateAnalysisProgress]);

  // 4. Spectrogram 분석 (간소화)
  const analyzeSpectrogram = useCallback(async () => {
    updateAnalysisProgress(ANALYSIS_STEPS.ANALYZING_SPECTRUM, 70);

    const refWavesurfer = refWavesurferRef.current;
    const userWavesurfer = userWavesurferRef.current;

    if (!refWavesurfer || !userWavesurfer) {
      throw new Error("WaveSurfer not initialized");
    }

    const refBuffer = refWavesurfer.getDecodedData();
    const userBuffer = userWavesurfer.getDecodedData();

    // 주파수 대역별 에너지 계산 (간단한 버전)
    const calculateBandEnergy = (buffer: AudioBuffer) => {
      const data = buffer.getChannelData(0);
      const bandCount = 4;
      const bandEnergies = [];

      for (let i = 0; i < bandCount; i++) {
        const start = Math.floor((i * data.length) / bandCount);
        const end = Math.floor(((i + 1) * data.length) / bandCount);
        const segment = data.slice(start, end);
        const energy = Math.sqrt(
          segment.reduce((sum, x) => sum + x * x, 0) / segment.length
        );
        bandEnergies.push(energy);
      }

      return bandEnergies;
    };

    const refBands = calculateBandEnergy(refBuffer!);
    const userBands = calculateBandEnergy(userBuffer!);

    // 대역별 유사도
    const bandScores = refBands.map((refEnergy, i) => {
      const userEnergy = userBands[i];
      return (
        Math.min(refEnergy, userEnergy) / Math.max(refEnergy, userEnergy, 0.001)
      );
    });

    setSpectrogramAnalysis({
      refSpectrogramData: null, // 실제 스펙트로그램 데이터는 플러그인에서 관리
      userSpectrogramData: null,
      frequencyBandScores: bandScores,
      mfccScore: bandScores.reduce((a, b) => a + b, 0) / bandScores.length,
    });

    updateAnalysisProgress(ANALYSIS_STEPS.SPECTRUM_COMPLETE, 80);

    return {
      bandScores,
      averageScore:
        (bandScores.reduce((a, b) => a + b, 0) / bandScores.length) * 100,
    };
  }, [setSpectrogramAnalysis, updateAnalysisProgress]);


   //ANCHOR 5. CER 분석 (새로 분리된 함수)
   const analyzeCER = useCallback(async () => {
    updateAnalysisProgress(ANALYSIS_STEPS.CALCULATING_SCORE, 85);
    await new Promise((resolve) => setTimeout(resolve, 100));

    let cerScore = 0; // 기본값 (STT 결과가 없을 경우)
    let cerResult = null;

    if (sttTranscript && currentContext?.text) {
      const cerConfig = CER_PRESETS.default;
      cerResult = calculateCER(
        currentContext.text,
        sttTranscript,
        cerConfig
      );
      
      // semanticScore 사용
      cerScore = cerResult.semanticScore;
      
      console.log('📊 CER 분석 결과:', {
        원본: currentContext.text,
        STT: sttTranscript,
        점수: cerScore,
        상세: cerResult
      });
    } else {
      console.log('⚠️ STT 결과 없음, 기본값 사용');
    }

  

    updateAnalysisProgress(ANALYSIS_STEPS.CALCULATING_SCORE, 90);

    return {
      cerScore,
      accuracy: cerResult?.accuracy || 1.0,
      errors: cerResult?.errors || 0,
      hasSTTResult: !!(sttTranscript && currentContext?.text)
    };
  }, [sttTranscript, currentContext, updateAnalysisProgress]);


  // 5. 최종 점수 계산
  const calculateFinalScore = useCallback(
    async (
      waveformScore: number,
      pitchScore: number,
      spectrogramScore: number,
      cerScore: number
    ) => {
      updateAnalysisProgress(ANALYSIS_STEPS.CALCULATING_SCORE, 90);
      await new Promise((resolve) => setTimeout(resolve, 300)); // 0.3초 딜레이

      // 가중 평균
      const weights = {
        waveform: 0.2,    // 30% - 진폭 유사도
        pitch: 0.2,       // 20% - 피치 패턴
        spectrogram: 0.0, // 10% - 주파수 분석
        cer: 0.5,         // 40% - 텍스트 정확도
      };

      const totalScore = Math.round(
        waveformScore * weights.waveform +
          pitchScore * weights.pitch +
          spectrogramScore * weights.spectrogram +
          cerScore * weights.cer
      );

      const totalWaveformObj = {
        "waveformScore" :waveformScore,
        "weights.waveform":weights.waveform,
        "waveformScore * weights.waveform":waveformScore * weights.waveform,
      }

      const pitchScoreObj = {
        "pitchScore" :pitchScore,
        "weights.pitch":weights.pitch,
        "pitchScore * weights.pitch":pitchScore * weights.pitch,
        }

      const spectrogramScoreObj = {
        "spectrogramScore" :spectrogramScore,
        "weights.spectrogram":weights.spectrogram,
        "spectrogramScore * weights.spectrogram":spectrogramScore * weights.spectrogram,
        }
        
      const cerScoreObj = {
        "cerScore" :cerScore,
        "weights.cer":weights.cer,
        "cerScore * weights.cer":cerScore * weights.cer,
        }
        
        
      console.log("🔍🔍🔍 totalScore : ", totalScore);
      console.log("🔍🔍🔍 waveformScore * weights.waveform : " , totalWaveformObj);
      console.log("🔍🔍🔍 pitchScore * weights.pitch : ", pitchScoreObj);
      console.log("🔍🔍🔍 spectrogramScore * weights.spectrogram : ",spectrogramScoreObj );
      console.log("🔍🔍🔍 cerScore * weights.cer : ", cerScoreObj);

      // 피드백 생성
      const feedback = [];
      if (waveformScore < 70)
        feedback.push("발화 강도와 리듬을 더 연습해보세요");
      if (pitchScore < 70)
        feedback.push("음정 패턴을 더 정확하게 따라해보세요");
      if (spectrogramScore < 70) feedback.push("발음을 더 명확하게 해보세요");

      setAnalysisResult({
        totalScore,
        waveformScore: Math.round(waveformScore),
        pitchScore: Math.round(pitchScore),
        spectrogramScore: Math.round(spectrogramScore),
        cerScore,
        feedback,
      });

      updateAnalysisProgress(ANALYSIS_STEPS.ANALYSIS_COMPLETE, 100);

      return { totalScore };
    },
    [setAnalysisResult, updateAnalysisProgress]
  );

  // 6. 전체 분석 실행
  /**
   * @description  initializeAudio() → analyzeWaveform() → analyzePitch() → analyzeSpectrogram() → calculateFinalScore()
   * @returns {Promise<{ totalScore: number }>} 최종 점수
   */
  const runFullAnalysis = useCallback(async () => {
    try {
      // 초기화
      await initializeAudio();

      // 각 분석 실행
      const waveformResult = await analyzeWaveform();
      const pitchResult = await analyzePitch();
      const spectrogramResult = await analyzeSpectrogram();
      const cerResult = await analyzeCER();
      // 최종 점수 계산
      const finalResult = await calculateFinalScore(
        waveformResult.combinedScore,
        pitchResult.patternScore,
        spectrogramResult.averageScore,
        cerResult.cerScore
      );

      // 클린업
      if (refWavesurferRef.current) {
        refWavesurferRef.current.destroy();
        refWavesurferRef.current = null;
      }
      if (userWavesurferRef.current) {
        userWavesurferRef.current.destroy();
        userWavesurferRef.current = null;
      }

      // 디버깅 로그
      console.log("=============🎫 최종 점수 계산 시작====================");
      console.log("waveformResult", waveformResult);
      console.log("pitchResult", pitchResult);
      console.log("spectrogramResult", spectrogramResult);
      console.log("finalResult", finalResult);
      console.log("💩💩💩 waveformResult.combinedScore", waveformResult.combinedScore);
      console.log("💩💩💩 pitchResult.patternScore", pitchResult.patternScore);
      console.log("💩💩💩 spectrogramResult.averageScore", spectrogramResult.averageScore);
      console.log("💩💩💩 cerResult.cerScore", cerResult.cerScore);
      console.log("=====================================================");

      return finalResult;
    } catch (error) {
      console.error("Analysis failed:", error);
      throw error;
    }
  }, [
    initializeAudio,
    analyzeWaveform,
    analyzePitch,
    analyzeSpectrogram,
    analyzeCER,
    calculateFinalScore,
  ]);

  return {
    runFullAnalysis,
  };
}
