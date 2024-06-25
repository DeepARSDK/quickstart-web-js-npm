import { ARTouchInfo } from "./touchType";
export declare class CanvasTouchHelper {
    private canvas;
    private canvasListeners;
    private touchOccurring;
    private touchListeners;
    constructor(canvas: HTMLCanvasElement, listener: (info: ARTouchInfo) => void | null);
    cleanUpCanvasListeners(): void;
    addTouchListener(listener: (info: ARTouchInfo) => void): void;
    private touchOccurred;
    private registerCanvasListener;
    private touchInfo;
}
