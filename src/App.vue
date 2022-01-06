<template>
    <ThreeWrap :start="start" :update="update" />
</template>

<script setup lang="ts">
import { ThreeWrap } from './threejs'
import * as THREE from 'three'

// build a box
const box = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 'blue' })
)
box.position.z = -5

// add the box
const start: Vue3ThreeWrap.Start = (opts) => {
    opts.scene.add(box)
}

// rotate the box
const update: Vue3ThreeWrap.Update = () => {
    box.rotation.y -= 0.0166
}
</script>