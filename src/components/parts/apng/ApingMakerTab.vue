<script setup>
import { ref } from "vue";
import ColorPickerApngMaker from "./ColorPickerApngMaker.vue";
import PostBackApngMake from "./PostBackApngMake.vue";
const fileImage = ref("");
const colorInfo = ref([0, 0, 0, 0]);
const fileImageEmits = (data) => {
  fileImage.value = data
};
const infoColorEmits = (data) => {
  colorInfo.value = data
};
</script>
<template>
  <div class="mx-auto">
    <div class="m-4 mx-auto">
      <h1
        class="max-w-5xl py-2 text-2xl font-bold leading-none tracking-tighter text-center text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
        APNG Maker
      </h1>
      <div class="flex flex-row justify-center py-2">
        <ColorPickerApngMaker @emitFileImage="fileImageEmits" @emitInfoColor="infoColorEmits" />
      </div>
      <div class="py-4 bg-gray-200">
        <div class="flex flex-row justify-center border-4 border-zinc-800">
          <p class="p-2 mx-2 border-2 rounded flex1">Red: {{ colorInfo[0] }}</p>
          <p class="p-2 mx-2 border-2 rounded flex1">Green: {{ colorInfo[1] }}</p>
          <p class="p-2 mx-2 border-2 rounded flex1">Blue: {{ colorInfo[2] }}</p>
        </div>
        <div class="flex justify-center py-2 border-4 border-zinc-800">
          <p class="text-center">Alpha: {{ colorInfo[3] }}</p>
        </div>
      </div>
      <div class="flex flex-row justify-center py-2">
        <PostBackApngMake buckendUrl="http://127.0.0.1:8000/apng/apng_make" :fileImage="fileImage"
          :colorInfo="colorInfo" />
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
