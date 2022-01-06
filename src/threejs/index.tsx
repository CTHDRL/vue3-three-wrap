import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import * as THREE from 'three'
import { updateCamera } from './updateCamera'
import './threeWrap.scss'

export interface ThreeWrapOptions {
    camera: THREE.OrthographicCamera | THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
}
export type ThreeWrapStart = (opts: ThreeWrapOptions) => void
export type ThreeWrapUpdate = (opts: ThreeWrapOptions) => void

export const ThreeWrap = defineComponent({
    name: 'ThreeWrap',
    props: {
        camera: Object as PropType<
            THREE.PerspectiveCamera | THREE.OrthographicCamera
        >,
        cameraType: {
            type: String as PropType<'orthographic' | 'perspective'>,
            default: 'perspective',
        },
        fov: { type: Number, default: 75 },
        rendererOptions: {
            type: Object as PropType<THREE.WebGLRendererParameters>,
            default: () => ({}),
        },
        start: Function as PropType<(opts: ThreeWrapOptions) => void>,
        update: Function as PropType<(opts: ThreeWrapOptions) => void>,
    },
    setup(props) {
        const canvas = ref(<canvas />)
        const container = ref(<div class="three-wrap">{canvas.value}</div>)
        const scene = new THREE.Scene()
        let listener: ResizeObserver
        let frame: number

        // Mount
        // ====================
        onMounted(() => {
            // build required items
            // ====================
            const cmpHeight = ref(1)
            const cmpWidth = ref(1)

            // Camera
            // ====================
            const camera =
                props.camera ??
                (() => {
                    // create if none provided
                    // ortho
                    if (props.cameraType === 'orthographic') {
                        const width =
                            props.fov / (cmpHeight.value / cmpWidth.value)
                        const height = props.fov
                        const halfWidth = width / 2
                        const halfHeight = height / 2
                        return new THREE.OrthographicCamera(
                            -halfWidth,
                            halfWidth,
                            halfHeight,
                            -halfHeight,
                            0.1,
                            1000
                        )
                    }
                    // perspective
                    else {
                        return new THREE.PerspectiveCamera(props.fov, 0.5625)
                    }
                })()

            // Renderer
            // ====================
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas.value.el as HTMLCanvasElement,
                antialias: true,
                alpha: true,
                ...props.rendererOptions,
            })
            renderer.setPixelRatio(window.devicePixelRatio)

            // camera refresh function
            const refreshCamera = () => {
                updateCamera(
                    camera,
                    props.fov,
                    cmpWidth.value,
                    cmpHeight.value,
                    renderer
                )
            }
            refreshCamera()

            // Start
            // ====================
            if (props.start) {
                props.start({ camera, renderer, scene })
            }

            // ThreeJS render function
            // ====================
            const renderThree = () => {
                frame = requestAnimationFrame(() => renderThree())
                if (props.update) {
                    props.update({
                        camera,
                        renderer,
                        scene,
                    })
                }
                renderer.render(scene, camera)
            }

            // kick render
            renderThree()

            // Resize
            // ====================
            listener = new ResizeObserver(([entry]) => {
                if (!entry) return

                cmpWidth.value = entry?.contentRect.width
                cmpHeight.value = entry?.contentRect.height
                refreshCamera()
                renderer.render(scene, camera)
            })
            listener.observe(container.value.el as HTMLElement)
        })

        onBeforeUnmount(() => {
            listener?.disconnect()
            cancelAnimationFrame(frame)
        })

        // Render function
        // ====================
        return () => container.value
    },
})
