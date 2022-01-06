export const updateCamera = function <T extends THREE.Camera>(
    camera: T,
    fov: number,
    canvasWidth: number,
    canvasHeight: number,
    renderer: THREE.WebGLRenderer
) {
    // ignore if no camera
    if (!camera) return

    // camera handling
    if ((camera as unknown as THREE.OrthographicCamera).isOrthographicCamera) {
        // ortho cameras
        const width = fov / (canvasHeight / canvasWidth)
        const height = fov
        const halfWidth = width / 2
        const halfHeight = height / 2
        const ortho = camera as unknown as THREE.OrthographicCamera
        ortho.left = -halfWidth
        ortho.right = halfWidth
        ortho.top = halfHeight
        ortho.bottom = -halfHeight
        ortho.updateProjectionMatrix()
    } else if (
        (camera as unknown as THREE.PerspectiveCamera).isPerspectiveCamera
    ) {
        // perspective cameras
        const proj = camera as unknown as THREE.PerspectiveCamera
        // update aspect ratio, projection matrix
        proj.aspect = canvasWidth / canvasHeight
        proj.updateProjectionMatrix()
    }

    // update renderer size
    renderer.setSize(canvasWidth, canvasHeight)
}
