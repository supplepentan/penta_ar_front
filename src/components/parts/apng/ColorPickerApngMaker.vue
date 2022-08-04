<script setup>
import { onMounted, ref } from "vue";

const emits = defineEmits(["emitFileImage", "emitInfoColor"]);
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
});

function pick(event) {
  var imgData = ctx.value.getImageData(event.offsetX, event.offsetY, 1, 1);
  emits("emitInfoColor", imgData.data);
};
const file = ref();
const previewImage = ref();
const fileSelected = (event) => {
  file.value = event.target.files[0];
  emits("emitFileImage", file.value);
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
  <div class="">
    <div class="flex flex-row " v-if="file">
      <canvas v-on:click="pick" class="border " width="200" height="200" id="pickcanvas"></canvas>
    </div>
    <div class="flex flex-row justify-center">
      <label
        class="px-4 py-2 bg-transparent border-blue-500 rounded cursor-pointer bg-sky-200 ring-2 hover:bg-blue-300 hover:text-white hover:border-transparent">
        Select File !
        <input class="hidden" type="file" v-on:change="fileSelected" />
      </label>
    </div>
  </div>
</template>