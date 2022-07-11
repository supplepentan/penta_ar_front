<template>
  <div ref="container" class="fixed top-0 left-0 w-full h-full"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  GridHelper,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";

// 描画するDOMの指定
const container = ref();
// Three.js
const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer();
const light = new PointLight();
// 初期化
const init = () => {
  if (container.value instanceof HTMLElement) {
    // DOMのサイズを取得
    console.log(container);
    const { clientWidth, clientHeight } = container.value;
    // 背景のグリッドの追加
    scene.add(new GridHelper());
    // ライトの設定
    light.color.setHex(0xffffff);
    light.position.set(10, 10, 0);
    scene.add(light);
    // 球体の追加
    const sphere = createSphere();
    scene.add(sphere);
    // カメラの設定
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    camera.position.set(10, 10, 0);
    camera.lookAt(0, 0, 0);
    // rendererの設定
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(clientWidth / clientHeight);
    container.value.appendChild(renderer.domElement);
    // 描画
    animate();
  }
};
// 描画
const animate = () => {
  // カメラの位置パラメータ
  let phi = 0;
  const frame = () => {
    // 描画
    renderer.render(scene, camera);
    // カメラの視点変更
    phi += 0.002 * Math.PI;
    camera.position.set(10 * Math.cos(phi), 10, 10 * Math.sin(phi));
    camera.lookAt(0, 0, 0);
    // 画面を更新
    requestAnimationFrame(frame);
  };
  frame();
};

// マウント時に初期化して描画
onMounted(() => {
  init();
});

// Sphereの作成
const createSphere = () => {
  const geometry = new SphereGeometry(3, 100, 100);
  const material = new MeshLambertMaterial();
  return new Mesh(geometry, material);
};
</script>