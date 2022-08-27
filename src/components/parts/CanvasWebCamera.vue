<script setup>
import parseAPNG from "apng-js";
import { fabric } from "fabric";
import { onMounted } from "vue";

const canvasWidth = (window.innerWidth / 3); //Canvasの横の長さ
const canvasHeight = (window.innerHeight / 2); //Canvasの縦の長さ
var apng;
var video;
var player = null;
var canvasVideo;
var ctxVideo;
var canvasPhotoframe;
var ctxPhotoframe;
var canvasStamp;
var ctxStamp;
var canvasStampFab;
var canvasConcat;
var ctxConcat;
let cameraFacing = false;

onMounted(() => {
  //canvasのdomとctx
  //video
  canvasVideo = document.getElementById("canvasVideo");
  ctxVideo = canvasVideo.getContext('2d');
  //photoframe
  canvasPhotoframe = document.getElementById('canvasPhotoframe');
  ctxPhotoframe = canvasPhotoframe.getContext('2d');
  //stamp
  canvasStamp = document.querySelector("#canvasStamp");
  ctxStamp = canvasStamp.getContext('2d');
  canvasStampFab = new fabric.Canvas("canvasStamp");
  //concat
  canvasConcat = document.getElementById("canvasConcat");
  ctxConcat = canvasConcat.getContext("2d");

  //ウェブカメラ映像をvideoに描写（インビジブル）
  video = document.getElementById("video")
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
    audio: false,
  }).then(stream => {
    video.srcObject = stream;
    video.play()
  }).catch(e => {
    console.log(e)
  })
  // canvasにvideo要素の映像をcanvasに描画する
  function _canvasUpdate() {
    ctxVideo.drawImage(video, 0, 0, canvasWidth, canvasHeight);
    requestAnimationFrame(_canvasUpdate);
  };
  _canvasUpdate();
})
//cannvas画像を合成してcaptureに描画
const concatImage = () => {
  //fabricのアクティブを解除
  canvasStampFab.discardActiveObject();
  canvasStampFab.renderAll();
  //3つのcanvasをconcatcanvasに順次描画
  let canvasList = [canvasVideo, canvasPhotoframe, canvasStamp];
  for (let i = 0; i < canvasList.length; ++i) {
    ctxConcat.drawImage(canvasList[i], 0, 0, canvasWidth, canvasHeight);
  }
}
//pngファイル(photoframe)を読み込みcanvasに描画
const fileSelected = (event) => {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = () => {
    apng = parseAPNG(reader.result);;
    if (apng instanceof Error) {
      // handle error
    } else {
      apng.getPlayer(ctxPhotoframe, true);
    }
  }
  reader.readAsArrayBuffer(file);
};
//capture画像をダウンロード
const download = () => {
  const linkConcat = document.createElement('a');
  linkConcat.href = canvasConcat.toDataURL();
  linkConcat.download = 'export_image_wrap.png';
  linkConcat.click();

};
//stopボタン：現在設定なし
const frameStop = () => {
};
//スタンプ：canvasStamp 
const onStamp = () => {
  const imgStamp = new Image();
  imgStamp.onload = function () {
    //image
    fabric.Image.fromURL(imgStamp.src, function (oImg) {
      oImg.scale(1);
      canvasStampFab.add(oImg);
      oImg.hasBorders = true;//枠線をなくす
      oImg.hasControls = true;//枠線の□をなくす
    });
  }
  imgStamp.src = "/supplepentan-favicon.png"
};
// カメラ切り替え
const changeCamera = (event) => {
  event.preventDefault();
  let video = document.getElementById("video")
  let mode = cameraFacing ? "environment" : "user";
  // Android Chromeでは、セッションを一時停止しないとエラーが出ることがある
  stopStreamedVideo(video);
  navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } })
    .then(stream => video.srcObject = stream)
  // .catch(err => alert(`${err.name} ${err.message}`));
  cameraFacing = !cameraFacing;
};
const stopStreamedVideo = (video) => {
  let stream = video.srcObject;
  let tracks = stream.getTracks();
  tracks.forEach(function (track) {
    track.stop();
  });
  video.srcObject = null;
};
</script>
<template>
  <div>
    <div id="containerCanvas" class="grid grid-cols-2 gap-4 py-2">
      <div>
        <h1 class="text-center">Real Time</h1>
        <div class="relative flex justify-center py-2">
          <canvas v-bind:width="canvasWidth" v-bind:height="canvasHeight" class="absolute classCanvas"
            id="canvasVideo"></canvas>
          <canvas v-bind:width="canvasWidth" v-bind:height="canvasHeight" class="absolute classCanvas"
            id="canvasPhotoframe" v-on:mousemove="position"></canvas>
          <canvas v-bind:width="canvasWidth" v-bind:height="canvasHeight" class="absolute classCanvas"
            id="canvasStamp"></canvas>
        </div>
      </div>
      <div>
        <h1 class="text-center">Capture</h1>
        <div class="flex justify-center py-2">
          <canvas v-bind:width="canvasWidth" v-bind:height="canvasHeight" class="classCanvas"
            id="canvasConcat"></canvas>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 border-2">
    <div class="p-2 border-2 rounded border-sky-400">
      <p class="text-center">Photoframe</p>
      <input type="file" v-on:change="fileSelected">
    </div>
    <div class="p-2 border-2 rounded border-sky-400">
      <p class="text-center border">Stamp</p>
      <div>
        <img src="../../assets/img/supplepentan-favicon.png" alt="" v-on:click="onStamp">
      </div>
    </div>
  </div>
  <div class="flex items-stretch">
    <button type="button" class="flex-1 classButton" v-on:click="concatImage">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera"
        viewBox="0 0 16 16">
        <path
          d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
        <path
          d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
      </svg>
      <p>Capture</p>
    </button>
    <button type="button" class="flex-1 classButton" v-on:click="download">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z" />
        <path
          d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
      </svg>
      <p>Download</p>
    </button>
    <button type="button" class="flex-1 classButton" v-on:click="frameStop">
      <p>STOP</p>
    </button>
    <button type="button" class="flex-1 classButton" v-on:click="changeCamera">
      <p>changeCamera</p>
    </button>
  </div>
  <div class="invisible">
    <video id="video" autoplay playsinline="true"></video>
  </div>
</template>
<style scoped>
.classCanvas {
  @apply rounded ring-4
}

.classButton {
  @apply block p-2 rounded bg-neutral-200 ring-2;
}
</style>