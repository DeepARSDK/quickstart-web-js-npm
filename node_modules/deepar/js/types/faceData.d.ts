/**
 * Information about the face being tracked. FaceData object is constructed and passed in the {@link DeepARCallbacks.onFaceTracked} callback.
 */
export interface FaceData {
    /**
     * True if the face is detected, false otherwise.
     */
    detected: boolean;
    /**
     * Array of 3 floats containing (x, y, z) position (translation) of the face in 3D space.
     */
    translation: number[];
    /**
     * Array of 3 floats containing (x, y, z) rotation of the face in 3D space.
     */
    rotation: number[];
    /**
     * Array of 16 floats containing 4x4 matrix representing translation and rotation of the face in 3D space.
     */
    poseMatrix: number[];
    /**
     * Array of 63*3 floats containing (x, y, z) positions of the 3D face landmarks. Read more <a href="https://docs.deepar.ai/deepar-studio/getting-started/quickstart-resources">here</a>.
     */
    landmarks: number[];
    /**
     * Array of 63*2 floats containing (x, y) positions of the 2D face landmarks in screen space. Usually more precise than 3D points but no estimation for z translation. Read more here about feature points. Read more <a href="https://docs.deepar.ai/deepar-studio/getting-started/quickstart-resources">here</a>.
     */
    landmarks2d: number[];
    /**
     * Array of 4 floats. Rectangle (x, y, width, height) containing the face in screen coordinates.
     */
    faceRect: number[];
}
