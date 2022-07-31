<script setup>
import { ref } from "vue";
import ColorPickerApngMaker from "./ColorPickerApngMaker.vue";
import PostBackApngMake from "./PostBackApngMake.vue";
const colorInfo = ref([0, 0, 0, 0]);
const infoColorEmits = (data) => {
  colorInfo.value = data
}
</script>
<template>
  <div class="flex w-full mx-auto text-left">
    <div class="relative inline-flex items-center mx-auto align-middle">
      <div class="">
        <h1
          class="max-w-5xl py-2 text-2xl font-bold leading-none tracking-tighter text-center text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
          APNG Maker
        </h1>
        {{ colorInfo }}
        <div>
          <p class="infoImageColoer">Red: {{ colorInfo[0] }}</p>
          <p class="infoImageColoer">Green: {{ colorInfo[1] }}</p>
          <p class="infoImageColoer">Blue: {{ colorInfo[2] }}</p>
          <p>Alpha: {{ colorInfo[3] }}</p>
        </div>
        <ColorPickerApngMaker @emitInfoColor="infoColorEmits" />
        <PostBackApngMake buckendUrl="http://127.0.0.1:8000/apng/apng_make" colorInfo="colorInfo" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.infoImageColoer {
  @apply inline mx-2;
}
</style>
