/// <reference types="dom-mediacapture-transform" />
import { DeepARCallbacks } from './callbacks';
export declare function startWebCodecVideoRecording(canvas: HTMLCanvasElement, callbacks: DeepARCallbacks, options: {
    audioTrack?: MediaStreamAudioTrack;
    audioBitRate?: number;
    audioSampleRate: number;
    videoBitRate: number;
    videoFrameRate: number;
    mimeType: string;
}): Promise<void>;
export declare function finishWebCodecVideoRecording(callbacks: DeepARCallbacks): Promise<Blob>;
