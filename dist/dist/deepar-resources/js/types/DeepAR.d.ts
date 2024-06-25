/// <reference types="dom-mediacapture-transform" />
import { ARTouchInfo } from "./touchType";
import { DeepARCallbacks } from "./callbacks";
import { DeepARParams } from "./initParams";
import { LogType } from "./logType";
import { ScriptingAPI } from "./scriptingApi";
import type * as xzimg from "./dynamicModules/xzimg/index";
import type * as mediaPipe from "./dynamicModules/mediaPipe/index";
declare global {
    interface Window {
        __deeparDynamicJsModule_xzimg__: typeof xzimg;
        __deeparDynamicJsModule_mediaPipe__: typeof mediaPipe;
    }
}
/**
 * Initialize the DeepAR SDK.<br><br>
 * @param params Initialization parameters.
 * @example
 * import * as deepar from 'deepar';
 *
 * let deepAR = deepar.initialize({
 *   licenseKey: 'your_license_key_here',
 *   canvas: document.getElementById('deepar-canvas')
 * });
 */
export declare function initialize(params: DeepARParams): Promise<DeepAR>;
/**
 * Main class for interacting with DeepAR SDK. To get a DeepAR object call {@link initialize}.
 */
export declare class DeepAR {
    /**
     * Emscripten module object. Contains all the exposed C/C++ API. Used for interacting with the native SDK.
     * @private
     */
    private module;
    private canvasTouchHelper;
    /**
     * Callbacks property is used to add/remove/change callbacks called by the DeepAR SDK. See list of all callbacks at {@link DeepARCallbacks}. <br><br>
     * Example: To add/change certain callback:
     * ```javascript
     * let deepAR = deepar.initialize({...});
     * deepAR.callbacks.onFaceVisibilityChanged = () => {
     *     // do something
     * };
     * ```
     *
     * To remove certain callback:
     * ```javascript
     * deepAR.callbacks.onFaceTracked = undefined;
     * ```
     */
    callbacks: DeepARCallbacks;
    /**
     * Scripting API property used to access all the scripting interop methods.
     *
     * @example
     * let scriptingVariable = deepAR.ScriptingAPI.getStringVar('variableName');
     */
    ScriptingAPI: ScriptingAPI;
    /**
     * @internal
     * @param module
     */
    constructor(module: any);
    /**
     * Switch the AR effect for preview.
     *
     * @param effect A path (URL) to the AR effect file or an ArrayBuffer object of an already fetched AR effect file.
     * @param effectOptions Effect options.
     * @param effectOptions.slot Default value is "DEFAULT_SLOT" if slot is not given. Slot is a container for a given AR effect. When replacing the already loaded AR effect, call switchEffect with that same slot. To remove AR effect entirely, call {@link clearEffect} with the same slot.
     * @param effectOptions.face If AR effect is face filter, select to which face to attach it to. The value should be between 0 and 3. Default value is 0.
     *
     * @throws {@link errors.SwitchEffectCanceled} If the switch effect is canceled by something.
     *
     * @example
     * // Switch filter 1.
     * await deepAR.switchEffect('url/path/to/filter1');
     * // Later switch fo filter 2.
     * await deepAR.switchEffect('url/path/to/filter2');
     *
     * // Remove the current filter.
     * deepAR.clearEffect();
     *
     * // Put two filters at the same time.
     * await deepAR.switchEffect('url/path/to/backgroundReplacement', {slot: 'background'});
     * await deepAR.switchEffect('url/path/to/glasses', {slot: 'faceMask'});
     * // Replace the glasses filter.
     * await deepAR.switchEffect('url/path/to/glasses2', {slot: 'faceMask'});
     * // Remove those filters.
     * deepAR.clearEffect('background');
     * deepAR.clearEffect('faceMask');
     *
     * // Load filters for two people.
     * await deepAR.switchEffect('url/path/to/faceMask1', {face: 0, slot: 'mask1'});
     * await deepAR.switchEffect('url/path/to/faceMask2', {face: 1, slot: 'mask2'});
     * // Clear effect for the second person.
     * deepAR.clearEffect('mask2');
     */
    switchEffect(effect: string | ArrayBuffer, effectOptions?: {
        slot?: string;
        face?: number;
    }): Promise<void>;
    /**
     * Clears the given slot of any loaded effects.
     * @param slot The effect slot name. Default is "DEFAULT_SLOT".
     */
    clearEffect(slot?: string): void;
    /**
     * Captures a screenshot of the current screen.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs">Data URL</a> promise containing the image in <code>data:image/png</code> format.
     */
    takeScreenshot(): Promise<string>;
    /**
     * Start video recording of the DeepAR preview.
     *
     * To stop video recording call {@link finishVideoRecording}.
     * By default, the audio is not recorded. To record audio set the recordAudio parameter. Note that if the user did not give the microphone permission, the recording will not start until the permission is granted. If permission is denied, the function will throw.
     * The recorded video will be mp4 on all browsers except Firefox where it will be webm.
     * Audio recording is currently not available on Android.
     *
     * @param options Parameters that specify the format of recorded videos
     * @param options.recordAudio If set, microphone sound will be recorded as well. If this parameter is set, options.audioTrack is ignored.
     * @param options.audioTrack If passed, this audio track is going to be recorded.
     * @param options.audioBitRate Sets audio bit rate. By default 128000.
     * @param options.audioSampleRate Set audio sample rate. On firefox it is 48k. On other browsers defaults to audioTrack.getCapabilities().sampleRate.max or to the value passed here.
     * @param options.videoBitRate Sets video bit rate. By default 4000000.
     * @param options.videoFrameRate Sets video frame rate. By default 30.
     */
    startVideoRecording(options?: {
        recordAudio?: boolean;
        audioTrack?: MediaStreamAudioTrack;
        audioBitRate?: number;
        audioSampleRate?: number;
        videoBitRate?: number;
        videoFrameRate?: number;
    }): Promise<void>;
    /**
     * Stops the video recording and returns a video blob.
     * @returns A promise resolving to Blob of a video.
     */
    finishVideoRecording(): Promise<Blob>;
    /**
     * Enable background blur.
     *
     * Background blur is usually used in video calling use cases.
     *
     * @param enable - Boolean indicating whether to enable or disable the background blur effect.
     * @param strength - Blur strength. Integer number in range 1-10.
     */
    backgroundBlur(enable: boolean, strength: number): Promise<void>;
    /**
     * Enable background replacement (also known as background removal or green screen effect).
     *
     * @param enable - Boolean indicating whether to enable or disable the background replacement effect.
     * @param image - The URL of the image to be used as the background.
     * @param mode - Request mode used while fetching the image.
     */
    backgroundReplacement(enable: boolean, image: string, mode?: RequestMode): Promise<void>;
    /**
     * Starts the camera preview. By default, the camera will be user facing. The returned promise will resolve after the camera starts
     * or it will reject if camera permission was denied.
     * @param cameraOptions Camera options.
     * @param cameraOptions.mirror Mirror the camera horizontally. True by default.
     * @param cameraOptions.mediaStreamConstraints Options passed to MediaDevices.getUserMedia(). The default is the user facing camera.
     * @param cameraOptions.cameraPermissionAsked Callback called when camera permission is asked.
     * @param cameraOptions.cameraPermissionGranted Callback called when camera permission is granted.
     */
    startCamera(cameraOptions?: {
        mirror?: boolean;
        mediaStreamConstraints?: MediaStreamConstraints;
        cameraPermissionAsked?: () => void;
        cameraPermissionGranted?: () => void;
    }): Promise<void>;
    /**
     * Stops the camera preview.
     */
    stopCamera(): void;
    /**
     * Stops the camera preview or custom video preview set by {@link setVideoElement}.
     */
    stopVideo(): void;
    /**
     * Used to pass the HTMLVideoElement to the DeepAR SDK. The SDK will use this video as camera source. This method should be used instead of {@link DeepAR.startCamera} when you want to handle getUserMedia outside the SDK or you need to apply the masks to any video stream.
     * To disable automatic camera preview by DeepAR:
     * ```js
     * const deepAR = deepar.initialize({
     *     // ...
     *     additionalOptions: {
     *         cameraConfig: {
     *             disableDefaultCamera: true
     *         }
     *     }
     * });
     * ```
     * @param videoElement Video element.
     * @param mirror Mirror the video horizontally.
     */
    setVideoElement(videoElement: HTMLVideoElement, mirror: boolean): void;
    /**
     * Change preview element.
     *
     * If DeepAR is initialized with previewElement then this method can be used to change the preview element.
     *
     * @param newPreviewElement The previewElement to change to.
     */
    changePreviewElement(newPreviewElement: HTMLElement): void;
    /**
     * Shutdown the DeepAR SDK and release all resources associated with it. It is invalid to call any function from this {@link DeepAR} object after shutdown.
     * After shutdown call, it is possible to call {@link initialize} again.
     */
    shutdown(): void;
    /**
     * Mutes or un-mutes all the sounds that are currently playing.
     *
     * @param muteSound true if you want to mute all the sounds.
     */
    muteSound(muteSound: boolean): void;
    /**
     * Feed RGBA image to DeepAR as input instead of camera or video. Used for processing single image. Can be used instead of {@link startCamera} or {@link setVideoElement}.
     * Can be called in a loop.
     * @param frame Image.
     * @param width Width of the image.
     * @param height Height of the image.
     * @param mirror Mirror frame horizontally.
     */
    processFrame(frame: Uint8Array, width: number, height: number, mirror: boolean): void;
    /**
     * If you want to apply DeepAR processing on a single image instead of a camera stream use this method. Can be used instead of {@link startCamera} or {@link DeepAR.setVideoElement}. See example usage <a href="https://github.com/DeepARSDK/photoedit-web-js">here</a>.
     * @param image
     */
    processImage(image: HTMLImageElement): void;
    /**
     * Pauses the DeepAR processing and rendering on canvas.
     * @param isPause If true, DeepAR will pause. Otherwise, it will resume processing and rendering.
     */
    setPaused(isPause: boolean): void;
    /**
     * Changes a node or component bool parameter of the currently loaded effect. For more details about changeParameter API read our docs <a href="https://docs.deepar.ai/deepar-sdk/tutorials/change-parameter">here</a>.
     * @param gameObject The name of the node from DeepAR Studio. If multiple nodes share the same name, only the first one will be affected.
     * @param component The name of the component. If the name of the component is null or an empty string, the node itself will be affected.
     * @param parameter The name of the parameter.
     * @param value New parameter value.
     */
    changeParameterFloat(gameObject: string, component: string, parameter: string, value: number): void;
    /**
     * Changes a node or component float parameter of the currently loaded effect. For more details about changeParameter API read our docs <a href="https://docs.deepar.ai/deepar-sdk/tutorials/change-parameter">here</a>.
     * @param gameObject The name of the node from DeepAR Studio. If multiple nodes share the same name, only the first one will be affected.
     * @param component The name of the component. If the name of the component is null or an empty string, the node itself will be affected.
     * @param parameter The name of the parameter.
     * @param value New parameter value.
     */
    changeParameterBool(gameObject: string, component: string, parameter: string, value: boolean): void;
    /**
     * Changes a node or component vector parameter of the currently loaded effect. For more details about changeParameter API read our docs <a href="https://docs.deepar.ai/deepar-sdk/tutorials/change-parameter">here</a>.
     * @param gameObject The name of the node from DeepAR Studio. If multiple nodes share the same name, only the first one will be affected.
     * @param component The name of the component. If the name of the component is null or an empty string, the node itself will be affected.
     * @param parameter The name of the parameter.
     * @param x X component of the new parameter vector.
     * @param y Y component of the new parameter vector.
     * @param z Z component of the new parameter vector.
     * @param w W component of the new parameter vector.
     */
    changeParameterVector(gameObject: string, component: string, parameter: string, x: number, y: number, z: number, w: number): void;
    /**
     * Changes a node or component texture parameter of the currently loaded effect. For more details about changeParameter API read our docs <a href="https://docs.deepar.ai/deepar-sdk/tutorials/change-parameter">here</a>.
     * @param gameObject The name of the node from DeepAR Studio. If multiple nodes share the same name, only the first one will be affected.
     * @param component The name of the component. If the name of the component is null or an empty string, the node itself will be affected.
     * @param parameter The name of the parameter.
     * @param textureUrl Url of the image that is going to be used as texture.
     * @param mode - Request mode used while fetching the texture.
     */
    changeParameterTexture(gameObject: string, component: string, parameter: string, textureUrl: string, mode?: RequestMode): Promise<void>;
    /**
     * This method allows the user to fire a custom animation trigger for model animations from code. To fire a custom trigger,
     * the trigger string must match the custom trigger set in the Studio when creating the effect. Read more <a href="https://docs.deepar.ai/deepar-studio/studio-explained/animations-and-sounds/3d-animations">here</a>.
     * @param trigger The name of the trigger.
     */
    fireTrigger(trigger: string): void;
    /**
     * Change face detection sensitivity
     * @param sensitivity 0 .. 5 (0 is fast, 4,5 is slow but allows to find smaller faces)
     */
    setFaceDetectionSensitivity(sensitivity: number): void;
    /**
     * Enable/disable forced rendering on the canvas. It is useful to enable offscreen rendering in scenarios when the browser
     * does not call requestAnimationFrame() function. DeepAR internally uses requestAnimationFrame() for the rendering loop.
     * For example, when the browser tab is not focused, the browser will not call requestAnimationFrame() and DeepAR will not
     * render. If offscreen rendering is enabled, DeepAR will use its internal timer for the rendering loop. Note that offscreen
     * rendering enabled will not have as good results in terms of FPS compared to offscreen rendering disabled. <br><br>
     *
     * If you need to use offscreen rendering. The best practice is to enable it only when needed - like when the browser tab is not focused.
     * Otherwise, it is best to always disable offscreen rendering.
     * @param enable True - DeepAR will use its internal timer for the rendering loop. Rendering will work even when tab is not focused. False - DeepAR will use requestAnimationFrame() for the rendering loop.
     */
    setOffscreenRenderingEnabled(enable: boolean): void;
    /**
     * Retrieves the HTML canvas element used for AR preview.
     *
     * The returned canvas is used for DeepAR rendering of camera preview and AR filters.
     * Most commonly canvas is needed when you want to do some postprocessing on it or feed it
     * into some video calling library.
     *
     * @return {HTMLCanvasElement} The HTML canvas element.
     */
    getCanvas(): HTMLCanvasElement;
    /**
     * Set the FPS of DeepAR rendering.
     * @param fps New FPS.
     */
    setFps(fps: number): void;
    /**
     * Initialize foot tracking.<br><br>
     *
     * Foot tracking is usually lazy loaded on demand when filter loaded  with {@link switchEffect} requires it.
     * But this method will start loading the foot tracking immediately.
     * To start initializing foot tracking as soon as possible pass "footInit" hint in the {@link initialize} function (see {@link DeepARParams}). <br><br>
     *
     * If the foot tracking is already initialized it will do nothing.
     * To check if foot tracking is initialized call {@link isFootTrackingInitialized} or wait {@link DeepARCallbacks.onFootTrackingInitialized} callback.
     */
    initializeFootTracking(): void;
    /**
     * Check weather the foot tracking is initialized.
     */
    isFootTrackingInitialized(): boolean;
    /**
     * Initialize segmentation.<br><br>
     *
     * Segmentation is usually lazy loaded on demand when filter loaded  with {@link switchEffect} requires it.
     * But this method will start loading the segmentation immediately.
     * To start initializing segmentation as soon as possible pass "segmentationInit" hint in the {@link initialize} function (see {@link DeepARParams}). <br><br>
     *
     * If the segmentation is already initialized it will do nothing.
     * To check if segmentation is initialized call {@link isSegmentationInitialized} or wait {@link DeepARCallbacks.onSegmentationInitialized} callback.
     */
    initializeSegmentation(): void;
    /**
     * Check weather the segmentation is initialized.
     */
    isSegmentationInitialized(): boolean;
    /**
     * Check weather the wrist tracking is initialized.
     */
    isWristTrackingInitialized(): boolean;
    /**
     * Display profiling metrics on preview.
     * @param enabled
     */
    showStats(enabled: boolean): void;
    /**
     * Enable or disable global physics simulation.
     * @param enabled
     */
    simulatePhysics(enabled: boolean): void;
    /**
     * Moves the selected game object from its current position in a tree and sets it as a direct child of a target game object.
     * This is equivalent to moving around a node in the node hierarchy in the DeepAR Studio.
     * @param selectedGameObject Node to move.
     * @param targetGameObject New node parent.
     */
    moveGameObject(selectedGameObject: string, targetGameObject: string): void;
    /**
     * Informs DeepAR that the specified touch event occurred.
     *
     * @deprecated
     * Since version 5.4.0 DeepAR will automatically register touch events from canvas.
     * There is no need to call this function anymore.
     *
     * @param touchInfo Touch event information.
     */
    touchOccurred(touchInfo: ARTouchInfo): void;
    /** INTERNAL API **/
    /**
     * @internal
     * @param enable
     */
    enableAutoframing(enable: boolean): void;
    /**
     * @internal
     * Returns all the messages pushed to the console log buffer and empties
     * the buffer.
     * @returns All the messages from console log buffer.
     */
    getConsoleLogs(): any;
    /**
     * @internal
     * Pushes message to the console log buffer.
     * @param message Message to be pushed to the console log buffer.
     * @param logType Logging type.
     * @returns true if the message was successfully pushed, false otherwise
     */
    pushConsoleLog(message: string, logType: LogType): boolean;
    /**
     * @internal
     * Display physics colliders preview on screen.
     * @param enabled
     */
    showColliders(enabled: boolean): void;
    /**
     * Sets the preview zoom.
     *
     * @param zoomLevel Floating point number determining how much to zoom in. Value <= 1 will disable zoom. Example, value 2.0 puts 2x zoom.
     */
    setZoom(zoomLevel: number): void;
    setFov(useDefaultFov: boolean, fov?: number): void;
    /**
     * Gets the closest point on a mesh to a given point.
     *
     * @param meshParentNodeName The name of the parent node of the mesh.
     * @param point The point in the same space as a mesh.
     * @returns closest point on the mesh to the given point.
     */
    getClosestPointOnMesh(meshParentNodeName: string, point: Float32Array): Float32Array;
    /**
     *  Gets the transformation between two nodes.
     *
     * @param srcNodeName source node.
     * @param dstNodeName destination node.
     * @returns Matrix that describes the transformation from srcNode to dstNode.
     */
    getTransformationBetween(srcNodeName: string, dstNodeName: string): Float32Array;
    /**
     * Set read pixels async or sync. Default is async.
     *
     * @param readAsyncPixels True - async, false - sync.
     */
    setReadPixelsAsync(readAsyncPixels: boolean): void;
}
