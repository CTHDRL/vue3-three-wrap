declare module Vue3ThreeWrap {
    interface Parameters<T extends THREE.Camera = THREE.PerspectiveCamera> {
        camera: T
        renderer: THREE.WebGLRenderer
        scene: THREE.Scene
    }
    type Start<T extends THREE.Camera = THREE.PerspectiveCamera> = (
        opts: Parameters<T>
    ) => void
    type Update<T extends THREE.Camera = THREE.PerspectiveCamera> = (
        opts: Parameters<T>
    ) => void
}
