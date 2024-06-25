import { FaceData } from "./faceData";
import { FootData } from "./footData";
import { WristData } from "./wristData";
/**
 * Callbacks from DeepAR notifying events.
 * Register callbacks with {@link DeepAR.callbacks}.
 */
export interface DeepARCallbacks {
    /**
     * Called whenever the face enters or exits the camera field of view. <br>
     * NOTE: This callback is only called when the SDK does face tracking. For example, you laded some effect that uses face tracking (most of them do). But if no effect is loaded this callback will not get called because the SDK is not performing face tracking.
     * @param visible True if the face is visible on the camera, false otherwise.
     */
    onFaceVisibilityChanged?: (visible: boolean) => void;
    /**
     * Passes the information about the detected faces. If this callback is set, it will get called every frame.
     * NOTE: This callback is only called when the SDK does face tracking. For example, you laded some effect that uses face tracking (most of them do). But if no effect is loaded this callback will not get called because the SDK is not performing face tracking.
     * @param faceDataArray Information about all the tracked faces.
     */
    onFaceTracked?: (faceDataArray: FaceData[]) => void;
    /**
     * Passes the information about the detected feet. If this callback is set, it will get called every frame.
     * NOTE: This callback is only called when the SDK does foot tracking. For example, you laded some effect that uses foot tracking (shoe-try-on effects). But if no effect is loaded this callback will not get called because the SDK is not performing foot tracking.
     * @param leftFootData Information about the left foot.
     * @param rightFootData Information about the right foot.
     */
    onFeetTracked?: (leftFootData: FootData, rightFootData: FootData) => void;
    /**
     * Passes the information about the detected wrist. If this callback is set, it will get called every frame.
     * NOTE: This callback is only called when the SDK does wrist tracking. For example, you laded some effect that uses wrist tracking (watch-try-on effects). But if no effect is loaded this callback will not get called because the SDK is not performing wrist tracking.
     * @param wristData Information about the wrist.
     */
    onWristTracked?: (wristData: WristData) => void;
    /**
     * Called when foot tracking is fully initialized.
     * Be sure to check {@link DeepAR.isFootTrackingInitialized} before setting this callback.
     * Because this callback is called only once. So if you set this callback after the foot tracking is initialized, it will not be called again.
     */
    onFootTrackingInitialized?: () => void;
    /**
     * Called when segmentation is fully initialized.
     * Be sure to check {@link DeepAR.isSegmentationInitialized} before setting this callback.
     * Because this callback is called only once. So if you set this callback after the segmentation is initialized, it will not be called again.
     */
    onSegmentationInitialized?: () => void;
    /**
     * Called when wrist tracking is fully initialized.
     * Be sure to check {@link DeepAR.isWristTrackingInitialized} before setting this callback.
     * Because this callback is called only once. So if you set this callback after the wrist tracking is initialized, it will not be called again.
     */
    onWristTrackingInitialized?: () => void;
    /**
     * Called when the animation player transitions to a new state.
     * @param newState Name of the new state that is being transitioned to.
     */
    onAnimationTransitionedToState?: (newState: string) => void;
    /**
     * An internal callback called on every render().
     * @param canvas A canvas containing input camera image that DeepAR used for rendering/tracking.
     * @internal
     */
    __deeparRendered?: (canvas: HTMLCanvasElement) => void;
    __deeparRendered2?: (canvas: HTMLCanvasElement) => void;
}
