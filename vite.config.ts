import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import dts from 'vite-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), jsx(), dts()],
    build: {
        lib: {
            entry: path.resolve(__dirname, './src/threejs/index.tsx'),
            name: 'vue3-three-wrap',
        },
        rollupOptions: {
            external: ['vue', 'three'],
            output: {
                globals: {
                    vue: 'Vue',
                    three: 'THREE',
                },
            },
        },
    },
})
