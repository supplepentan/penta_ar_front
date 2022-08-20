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
      <div class="w-64 mx-auto bg-gray-200 border-4 rounded-lg py- border-sky-200">
        <div class="flex flex-row justify-center">
          <p class="p-2 mx-2 text-center border-2 rounded flex1"><span class="font-bold">Red</span><br /> {{
              colorInfo[0]
          }}
          </p>
          <p class="p-2 mx-2 text-center border-2 rounded flex1"><span class="font-bold">Green</span><br /> {{
              colorInfo[1]
          }}</p>
          <p class="p-2 mx-2 text-center border-2 rounded flex1"><span class="font-bold">Blue</span><br />{{
              colorInfo[2]
          }}</p>
        </div>
        <div class="flex justify-center pb-2 ">
          <p class="text-center"><span class="font-bold">Alpha</span><br />{{ colorInfo[3] }}</p>
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
