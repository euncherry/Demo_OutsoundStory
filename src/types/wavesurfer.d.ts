// src/types/wavesurfer.d.ts

declare module 'wavesurfer.js/dist/plugins/spectrogram.esm.js' {
  import { GenericPlugin } from 'wavesurfer.js/dist/base-plugin';

  export interface SpectrogramPluginOptions {
    container?: HTMLElement | string;
    labels?: boolean;
    labelsBackground?: string;
    labelsColor?: string;
    labelsHzColor?: string;
    height?: number;
    splitChannels?: boolean;
    scale?: 'linear' | 'logarithmic' | 'mel' | 'bark' | 'erb';
    frequencyMin?: number;
    frequencyMax?: number;
    fftSamples?: number;
    windowFunc?: string;
    alpha?: number;
    noverlap?: number;
    gainDB?: number;
    rangeDB?: number;
    colorMap?: string | number[][];
    useWebWorker?: boolean;
    maxCanvasWidth?: number;
  }

  export default class SpectrogramPlugin extends GenericPlugin {
    static create(options?: SpectrogramPluginOptions): SpectrogramPlugin;
    destroy(): void;
  }
}

declare module 'pitchfinder' {
  export interface DetectorOptions {
    sampleRate?: number;
    bufferSize?: number;
    cutoff?: number;
  }

  export interface Detector {
    (buffer: Float32Array): number | null;
  }

  export function ACF2PLUS(options?: DetectorOptions): Detector;
  export function AMDF(options?: DetectorOptions): Detector;
  export function YIN(options?: DetectorOptions): Detector;
  export function DynamicWavelet(options?: DetectorOptions): Detector;

  export function frequencies(
    detector: Detector,
    buffer: Float32Array,
    options?: { tempo?: number; quantization?: number },
  ): number[];
}
