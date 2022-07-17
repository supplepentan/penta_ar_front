<script setup>
import parseAPNG from 'apng-js';
import { onMounted, ref } from 'vue';
const containerCanvasWidth = ref();
const containerCanvasHeight = ref();
const width = ref(window.innerWidth); //ブラウザの横の長さ
const height = ref(window.innerHeight);
const apng = ref();
var player = null;
const canvasPhotoframe = ref();
const ctxPhotoframe = ref();
const photoFrame_x = ref();
const photoFrame_y = ref();
onMounted(() => {
  containerCanvasWidth.value = document.getElementById("containerCanvas").clientWidth;
  containerCanvasHeight.value = document.getElementById("containerCanvas").clientHeight;
  console.log(containerCanvas);
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
  const canvas = document.querySelector('#canvasMain');
  const ctx = canvas.getContext('2d');
  function _canvasUpdate() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(_canvasUpdate);
  };
  _canvasUpdate();
  const { clientWidth, clientHeight } = containerCanvas.value;
  console.log("ここ", clientWidth, clientHeight);
})
const getImage = () => {
  const canvas = document.querySelector("#canvasMain");
  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  //link.download = 'export_image.png';
  //link.click();
  const image = new Image();
  image.src = link;
  image.onload = () => {
    const canvasConcat = document.querySelector("#canvasConcat");
    const ctxConcat = canvasConcat.getContext("2d");
    ctxConcat.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
  canvasPhotoframe.value = document.querySelector("#canvasPhotoframe");
  const linkWrap = document.createElement('a');
  linkWrap.href = canvasPhotoframe.value.toDataURL();
  //linkWrap.download = 'export_image_wrap.png';
  //linkWrap.click();
  const imageWrap = new Image();
  imageWrap.src = linkWrap;
  imageWrap.onload = () => {
    const canvasConcat = document.querySelector("#canvasConcat");
    const ctxConcat = canvasConcat.getContext("2d");
    ctxConcat.drawImage(imageWrap, 0, 0, canvas.width, canvas.height);
  }

}
const fileSelected = (event) => {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = () => {
    canvasPhotoframe.value = document.querySelector('#canvasPhotoframe');
    ctxPhotoframe.value = canvasPhotoframe.value.getContext('2d');
    apng.value = parseAPNG(reader.result);
    apng.value.getPlayer(ctxPhotoframe.value, true);
    for (let item in apng.value.frames) {
      frameNum.value[frameNum.value.length] = URL.createObjectURL(apng.value.frames[item].imageData)
    }
  }
  reader.readAsArrayBuffer(file);
};
const download = () => {
  const canvasConcat = document.querySelector("#canvasConcat");
  const linkConcat = document.createElement('a');
  linkConcat.href = canvasConcat.toDataURL();
  linkConcat.download = 'export_image_wrap.png';
  linkConcat.click();

}
const position = (event) => {
  photoFrame_x.value = event.screenX;
  photoFrame_y.value = event.screenY
}
const frameStop = () => {
  console.log("ここ", player);
}
</script>
<template>
  {{ clientWidth }}
  <div>
    <input type="file" v-on:change="fileSelected">
    <div id="containerCanvas" class="relative flex items-stretch">
      <div class="relative justify-center flex-1">
        <canvas v-bind:width="width / 3" v-bind:height="width / 3" class="absolute rounded ring-2"
          id="canvasMain"></canvas>
        <canvas v-bind:width="width / 3" v-bind:height="width / 3" class="absolute rounded ring-2" id="canvasPhotoframe"
          v-on:mousemove="position"></canvas>
      </div>
      <div class="flex-1 ">
        <canvas v-bind:width="width / 3" v-bind:height="width / 3" class="rounded ring-2" id="canvasConcat"></canvas>
      </div>
    </div>
  </div>
  <div>{{ containerCanvas }}</div>
  <div class="flex items-stretch">
    <button type="button" class="flex-1 block p-2 rounded bg-neutral-200 ring-2" @click="getImage">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera"
        viewBox="0 0 16 16">
        <path
          d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
        <path
          d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
      </svg>
      <p>Capture</p>
    </button>
    <button type="button" class="flex-1 block p-2 rounded bg-neutral-200 ring-2" @click="download">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z" />
        <path
          d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
      </svg>
      <p>Download</p>
    </button>
    <button type="button" class="flex-1 block p-2 rounded bg-neutral-200 ring-2" @click="frameStop">
      <p>STOP</p>
    </button>
  </div>
  <div>
    <p>X: {{ photoFrame_x }} Y: {{ photoFrame_y }}</p>
  </div>
  <div class="invisible">
    <video id="video"></video>
  </div>
</template>
<style scoped>
</style>