/**
 * Describes the touch/click type.
 */
export declare enum ARTouchType {
    /**
     * Touch started.
     */
    Start = 0,
    /**
     * Touch is pressed and is being moved.
     */
    Move = 1,
    /**
     * Touch ended.
     */
    End = 2
}
/**
 * Information about the touch. Used by {@link DeepAR.touchOccurred}.
 */
export interface ARTouchInfo {
    /**
     * X coordinate.
     */
    x: number;
    /**
     * Y coordinate
     */
    y: number;
    /**
     * Touch type.
     */
    touchType: ARTouchType;
}
