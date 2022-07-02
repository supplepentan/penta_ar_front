<script setup>
import parseAPNG from 'apng-js';
import { onMounted, ref } from 'vue';
const apng = ref();
onMounted(() => {
  //webcamera
  const video = document.getElementById("video")
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  }).then(stream => {
    video.srcObject = stream;
    video.play()
  }).catch(e => {
    console.log(e)
  })
  // canvasにvideo要素の映像をcanvasに描画する
  const canvas = document.querySelector('#mycanvas');
  const ctx = canvas.getContext('2d');
  function _canvasUpdate() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(_canvasUpdate);
  };
  _canvasUpdate();
})
const getImage = () => {
  const canvas = document.querySelector("#mycanvas");
  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'export_image.png';
  link.click();

}
const fileSelected = (event) => {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = () => {
    const canvasWrap = document.querySelector('#mycanvaswrap');
    const ctxWrap = canvasWrap.getContext('2d');
    apng.value = parseAPNG(reader.result);
    apng.value.getPlayer(ctxWrap, true);
    for (let item in apng.value.frames) {
      frameNum.value[frameNum.value.length] = URL.createObjectURL(apng.value.frames[item].imageData)
    }
  }
  reader.readAsArrayBuffer(file);
};
</script>
<template>
  <div>
    <input type="file" v-on:change="fileSelected">
    <div class="relative flex items-center justify-center w-auto my-1 bg-blue-200 rounded h-80 ring-2">
      <canvas width="600" height="300" class="absolute rounded ring-2" id="mycanvas"></canvas>
      <canvas width="600" height="300" class="absolute rounded ring-2" id="mycanvaswrap"></canvas>
    </div>
  </div>
  <div>
  </div>
  <button type="button" class="block p-2 bg-blue-200 rounded ring-2" @click="getImage">
    <svg width="16" height="16" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16">
      <path
        d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
      <path
        d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
    </svg>
    <p>Capture</p>
  </button>
  <div hidden>
    <video id="video"></video>
  </div>
</template>
<style scoped>
</style>