/**
 * Information about the wrist being tracked. WristData object is constructed and passed in the {@link DeepARCallbacks.onWristTracked} callback.
 */
export interface WristData {
    /**
     * True if the wrist is detected, false otherwise.
     */
    detected: boolean;
    /**
     * True if the detected wrist is of the left hande. False if the detected wrist is of the right hand.
     */
    isLeft: boolean;
}
