<script setup>
import { onMounted, onUpdated } from "vue";
import AppHere from "../parts/AppHere.vue";
onMounted(() => {
  console.log("MOUNTED")
});
onUpdated(() => {
  console.log("UPDATED")
});

</script>
<template>
  <div>
    <AppHere />
  </div>
  <section>
    <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
      <div class="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
        <div class="p-6">
          <a href="/ar">
            <img class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
              src="../../assets/img/home_image_01.jpg" alt="blog">

            <h1
              class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter hover:text-white text-neutral-600 lg:text-3xl">
              AR Files <span class="text-base">by AI technology</span></h1>
          </a>
          <p class="mx-auto text-base leading-relaxed text-gray-500">Creating an AR-object using AI.</p>

          <div class="mt-4">
            <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
              title="read more"> Read More » </a>
          </div>
        </div>
        <div class="p-6">
          <a href="/apng">
            <img class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
              src="../../assets/img/home_image_02.png" alt="blog">

            <h1
              class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter hover:text-white text-neutral-600 lg:text-3xl">
              APNG <span class="text-base">by Automation</span></h1>
          </a>
          <p class="mx-auto text-base leading-relaxed text-gray-500">
            Automatically create APNG that can be used for photo frames.</p>

          <div class="mt-4">
            <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
              title="read more"> Read More » </a>
          </div>
        </div>
        <div class="p-6">
          <a href="/camera_app">
            <img class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
              src="../../assets/img/home_image_03.jpg" alt="blog">

            <h1
              class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter hover:text-white text-neutral-600 lg:text-3xl">
              Camera App <span class="text-base">of AR world</span></h1>
          </a>
          <p class="mx-auto text-base leading-relaxed text-gray-500">
            Providing the world of AR utilizing 3D objects and APNG.</p>

          <div class="mt-4">
            <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
              title="read more"> Read More » </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
