export const updateCamera = (
    camera: THREE.OrthographicCamera | THREE.PerspectiveCamera,
    fov: number,
    canvasWidth: number,
    canvasHeight: number,
    renderer: THREE.WebGLRenderer
) => {
    // ignore if no camera
    if (!camera) return
    if ((camera as THREE.OrthographicCamera).isOrthographicCamera) {
        const width = fov / (canvasHeight / canvasWidth)
        const height = fov
        const halfWidth = width / 2
        const halfHeight = height / 2
        const ortho = camera as THREE.OrthographicCamera
        ortho.left = -halfWidth
        ortho.right = halfWidth
        ortho.top = halfHeight
        ortho.bottom = -halfHeight
    } else {
        // update aspect ratio, projection matrix, and renderer size
        ;(camera as THREE.PerspectiveCamera).aspect = canvasWidth / canvasHeight
    }

    camera.updateProjectionMatrix()
    renderer.setSize(canvasWidth, canvasHeight)
}
