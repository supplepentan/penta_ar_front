<script setup>
import * as THREE from "three";
import { onMounted, ref } from 'vue';


const width = ref(window.innerWidth); //ブラウザの横の長さ
const height = ref(window.innerHeight); //ブラウザの縦の長さ

onMounted(() => {

    // canvasのサイズを指定
    width.value = window.innerWidth; //ブラウザの横の長さ
    height.value = window.innerHeight; //ブラウザの縦の長さ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width.value / height.value);
    camera.position.set(0, 30, 1000); // x,y,z座標でカメラの場所を指定
    const canvasElement = document.querySelector('#canvas') //HTMLのcanvasのid
    const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });
    renderer.setSize(width.value, height.value);
    const light = new THREE.AmbientLight(0xFFFFFF, 1.0); //色、光の強さ
    light.position.set(50, 50, 50); // x,y,z座標でライトの場所を指定
    scene.add(light);
    const geometry = new THREE.SphereGeometry(200, 300, 300); //ジオメトリ
    const material = new THREE.MeshNormalMaterial(); //マテリアル
    const mesh = new THREE.Mesh(geometry, material); //メッシュ
    scene.add(mesh);
    function start() {
        renderer.render(scene, camera);
    }
    start();
});

</script>
<template>
    <canvas width="600" height="300" class="absolute ring-2" id="canvas"></canvas>
</template>