/**
 * Information about the feet being tracked. FootData object is constructed and passed in the {@link DeepARCallbacks.onFeetTracked} callback.
 */
export interface FootData {
    /**
     * True if the foot is detected, false otherwise.
     */
    detected: boolean;
}
