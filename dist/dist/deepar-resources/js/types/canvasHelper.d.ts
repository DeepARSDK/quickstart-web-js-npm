/**
 * Function that needs to be called before every render.
 */
declare const preRenderUpdate: () => void;
/**
 * Function that needs to be called after every render.
 */
declare const postRenderUpdate: () => void;
/**
 * Creates a canvas and appends it to the target element.
 * @param previewElement
 */
declare function createCanvas(previewElement: HTMLElement): HTMLCanvasElement;
/**
 * Removes the created canvas and invalidates the current context.
 */
declare function invalidate(): void;
declare function changePreviewElement(newPreviewElement: HTMLElement): void;
declare function isPreviewElementUsed(): boolean;
export { preRenderUpdate, postRenderUpdate, createCanvas, invalidate, changePreviewElement, isPreviewElementUsed };
