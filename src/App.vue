<template>
    <ThreeWrap :start="start" :update="update" />
</template>

<script setup lang="ts">
import { ThreeWrap, ThreeWrapStart, ThreeWrapUpdate } from './threejs'
import * as THREE from 'three'

// build a box
const box = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 'blue' })
)
box.position.z = -5

// add the box
const start: ThreeWrapStart = (opts) => {
    opts.scene.add(box)
}

// rotate the box
const update: ThreeWrapUpdate = () => {
    box.rotation.y -= 0.0166
}
</script>