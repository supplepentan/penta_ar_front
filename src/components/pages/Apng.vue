<script setup>
//https://github.com/davidmz/apng-js
import parseAPNG from 'apng-js';
import { onMounted, ref } from 'vue';
import PostBack from "../parts/PostBack.vue";
const canvas = ref();
const ctx = ref();
const frameNum = ref([]);
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
  }
  reader.readAsArrayBuffer(file);
};
const getImage = () => {
  const link = document.createElement('a');
  link.href = canvas.value.toDataURL();
  link.download = 'export_image.png';
  link.click();
};
const tabSelect = ref("apng_maker");
const onApngMaker = () => {
  tabSelect.value = "apng_maker";
  console.log(tabSelect);
};
const onApngAnalyzer = () => {
  tabSelect.value = "apng_analyzer";
};
</script>
<template>
  {{ tabSelect }}
  <section>
    <div class="flex items-center justify-center">
      <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
        <button type="button" @click="onApngMaker"
          class="rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">APNG
          Marker</button>
        <button type="button" @click="onApngAnalyzer"
          class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">APNG
          Analyzer</button>
        <button type="button"
          class=" rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Sub</button>
      </div>
    </div>
    <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
      <div v-if="tabSelect === 'apng_maker'" class="flex w-full mx-auto text-left">
        <div class="relative inline-flex items-center mx-auto align-middle">
          <div class="text-center">
            <h1
              class="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
              APNG Maker
            </h1>
            <PostBack buckendUrl="http://127.0.0.1:8000/apng/apng_make" />
          </div>
        </div>
      </div>
      <div v-if="tabSelect === 'apng_analyzer'" class="flex w-full mx-auto text-left">
        <div class="relative inline-flex items-center mx-auto align-middle">
          <div class="top-0 text-center">
            <h1
              class="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
              APNG Analyzer
            </h1>
            <div class="mt-3 rounded-lg sm:mt-0">
              <input type="file" v-on:change="fileSelected"
                class="px-5 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-neutral-400 lg:px-10 rounded-xl hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
            </div>
            <br class="hidden lg:block" />
            <canvas id="canvas" class="rounded-lg" width="640" height="420"
              style="border:1px solid #000000; max-width: 100%; height: auto; max-height: 100%">
            </canvas>
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
          <table class="table-auto">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-2 border">Width</th>
                <th class="px-4 py-2 border">Height</th>
                <th class="px-4 py-2 border">Plays</th>
                <th class="px-4 py-2 border">PlayTime</th>
                <th class="px-4 py-2 border">Frames</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-2 border">{{ apng.width }}</td>
                <td class="px-4 py-2 border">{{ apng.height }}</td>
                <td class="px-4 py-2 border">{{ apng.numPlays }}</td>
                <td class="px-4 py-2 border">{{ apng.playTime }}</td>
                <td class="px-4 py-2 border">{{ apng.frames.length }}</td>
              </tr>
            </tbody>
          </table>
          <p class="text-4xl">Frames Information</p>
          <tr v-for="(elm, index) in apng.frames">
            <div class="border ">
              <p class="text-lg bg-gray-300">Frame No.{{ index + 1 }}</p>
              <div class="text-base bg-gray-200">
                <p>left offset of frame (pixels): {{ elm.left }}</p>
                <p>top offset of frame (pixels): {{ elm.top }}</p>
                <p>with of frame (pixels): {{ width }}</p>
                <p>height of frame (pixels): {{ elm.height }}</p>
                <p>time to show frame in milliseconds: {{ elm.delay }}</p>
                <p>type of dispose operation (see APNG spec.): {{ elm.disposeOp }}</p>
                <p>type of blend operation (see APNG spec.): {{ elm.blendOp }}</p>
                <p>image data in PNG (not animated) format: {{ elm.imageData }}</p>
              </div>
              <div>
                <img v-bind:src="frameNum[index]">
              </div>
            </div>
          </tr>
        </div>
      </div>
    </div>
    <div hidden>
      <video id="video"></video>
    </div>
  </section>
</template>
