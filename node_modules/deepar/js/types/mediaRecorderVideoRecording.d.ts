/// <reference types="dom-mediacapture-transform" />
export declare function startMediaRecorderVideoRecording(canvas: HTMLCanvasElement, options: {
    audioTrack?: MediaStreamAudioTrack;
    audioBitRate?: number;
    audioSampleRate: number;
    videoBitRate: number;
    videoFrameRate: number;
    mimeType: string;
}): void;
export declare function finishMediaRecorderVideoRecording(): Promise<Blob>;
