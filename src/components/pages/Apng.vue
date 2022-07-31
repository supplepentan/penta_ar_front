<script setup>
import { ref } from "vue";
import ApingAnalyzerTab from "../parts/apng/ApingAnalyzerTab.vue";
import ApingMakerTab from "../parts/apng/ApingMakerTab.vue";
const tabSelect = ref("");
const onApngMaker = () => {
  tabSelect.value = "apng_maker";
};
const onApngAnalyzer = () => {
  tabSelect.value = "apng_analyzer";
};
</script>
<template>
  <section>
    <div class="flex items-center justify-center bg-sky-200">
      <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
        <button type="button" @click="onApngMaker"
          class="rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">APNG
          Maker</button>
        <button type="button" @click="onApngAnalyzer"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">APNG
          Analyzer</button>
        <button type="button"
          class="rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Sub</button>
      </div>
    </div>
    <div>
      <ApingMakerTab v-if="tabSelect === 'apng_maker'" />
      <ApingAnalyzerTab v-if="tabSelect === 'apng_analyzer'" />
    </div>
  </section>
</template>
