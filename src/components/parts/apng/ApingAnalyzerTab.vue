<script setup>
//https://github.com/davidmz/apng-js
import parseAPNG from 'apng-js';
import { onMounted, ref } from 'vue';
const canvas = ref();
const ctx = ref();
const frameNum = ref([]);
const canvasView = ref(false)
onMounted(() => {
});
const apng = ref();

const fileSelected = (event) => {
  canvas.value = document.querySelector('#canvas');
  console.log(canvas)
  ctx.value = canvas.value.getContext('2d');
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = () => {
    apng.value = parseAPNG(reader.result);
    apng.value.getPlayer(ctx.value, true);
    for (let item in apng.value.frames) {
      frameNum.value[frameNum.value.length] = URL.createObjectURL(apng.value.frames[item].imageData)
    }
    canvasView.value = true;
  }
  reader.readAsArrayBuffer(file);
};
const getImage = () => {
  const link = document.createElement('a');
  link.href = canvas.value.toDataURL();
  link.download = 'export_image.png';
  link.click();
};
const tabSelect = ref("");
const onApngMaker = () => {
  tabSelect.value = "apng_maker";
};
const onApngAnalyzer = () => {
  tabSelect.value = "apng_analyzer";
};
</script>
<template>
  <div class="m-2 border-4 bg-sky-200 ">
    <div class="bg-red-200">
      <h1 class="max-w-5xl py-2 text-4xl font-bold text-center text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
        APNG Analyzer
      </h1>
      <div class="flex justify-center mt-3 rounded-lg sm:mt-0">
        <input type="file" v-on:change="fileSelected"
          class="px-5 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-neutral-400 lg:px-10 rounded-xl hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
      </div>
    </div>
    <div v-show="canvasView">
      <div class="flex justify-center mt-3 rounded-lg sm:mt-0">
        <canvas id="canvas" class="rounded-lg" width="640" height="420"
          style="border:1px solid #000000; max-width: 100%; height: auto; max-height: 100%">
        </canvas>
      </div>
      <div>
        <p class="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">Select aping file</p>
        <div class="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
          <div class="mt-3 rounded-lg sm:mt-0 sm:ml-3">
            <button @click="getImage"
              class="items-center block px-5 lg:px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Capture</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="apng">
      <div>
        <p class="py-4 text-4xl text-center">Frame Infomation of APNG</p>
      </div>
      <div class="border-4 border-white" v-for="(elm, index) in apng.frames">
        <div class="flex justify-center flex-initial border-2 border-black rounded-lg">
          <div class="mx-4 mx-auto my-auto bg-gray-300 border-4">
            <p class="px-2 text-lg rounded ring-4">Frame No.{{ index + 1 }}</p>
          </div>
          <div class="border-4 border-gray-400">
            <img class="ring-2" v-bind:src="frameNum[index]">
          </div>
          <div class="p-2 text-base bg-gray-200 ">
            <p class="my-3 text-xl font-black text-center">Infomation</p>
            <p>left offset of frame (pixels): {{ elm.left }}</p>
            <p>top offset of frame (pixels): {{ elm.top }}</p>
            <p>width of frame (pixels): {{ elm.width }}</p>
            <p>height of frame (pixels): {{ elm.height }}</p>
            <p>time to show frame in milliseconds: {{ elm.delay }}</p>
            <p>type of dispose operation (see APNG spec.): {{ elm.disposeOp }}</p>
            <p>type of blend operation (see APNG spec.): {{ elm.blendOp }}</p>
            <p>image data in PNG (not animated) format: {{ elm.imageData }}</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>