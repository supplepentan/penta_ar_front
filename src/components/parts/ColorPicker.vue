<script setup>
import { onMounted, ref } from "vue";
const canvas = ref();
const ctx = ref();
function draw(canvas, imgagePath) {
  const image = new Image();
  image.addEventListener("load", function () {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.value.drawImage(image, 0, 0);
  })
  image.src = imgagePath;
}
onMounted(() => {
  canvas.value = document.getElementById("pickcanvas");
  ctx.value = canvas.value.getContext("2d");
});

const rgbaData = ref([0, 0, 0, 0]);
function pick(event) {
  var imgData = ctx.value.getImageData(event.offsetX, event.offsetY, 1, 1);
  rgbaData.value = imgData.data;
};
const file = ref();
const previewImage = ref();
const fileSelected = (event) => {
  file.value = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.value = reader.result;
    canvas.value = document.getElementById("pickcanvas");
    ctx.value = canvas.value.getContext("2d");
    function draw(canvas, imgagePath) {
      const image = new Image();
      image.addEventListener("load", function () {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.value.drawImage(image, 0, 0);
      })
      image.src = imgagePath;
    }
    draw(canvas.value, previewImage.value);
  };
  reader.readAsDataURL(event.target.files[0]);
};
</script>
<template>
  <div>
    <h1 class="">Color Picker</h1>
    <p class="infoImageColoer">Red: {{ rgbaData[0] }}</p>
    <p class="infoImageColoer">Green: {{ rgbaData[1] }}</p>
    <p class="infoImageColoer">Blue: {{ rgbaData[2] }}</p>
    <p>Alpha: {{ rgbaData[3] }}</p>
    <canvas v-on:click="pick" class="border" width="200" height="200" id="pickcanvas"></canvas>
  </div>
  <div>
    <label
      class="px-4 py-2 bg-transparent border-blue-500 rounded cursor-pointer bg-sky-200 ring-2 hover:bg-blue-300 hover:text-white hover:border-transparent">
      Select File !
      <input class="hidden" type="file" v-on:change="fileSelected" />
    </label>
  </div>
</template>
<style scoped>
.infoImageColoer {
  @apply inline mx-2;
}
</style>
