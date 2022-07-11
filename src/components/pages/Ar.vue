<script setup>
import PostBack from "../parts/PostBack.vue";
</script>
<template>
  <section>
    <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-0">
      <div class="flex w-full mx-auto text-left">
        <div class="relative inline-flex items-center mx-auto align-middle">
          <div class="text-center">
            <div class="flex flex-wrap p-12 mx-auto md:flex-nowrap">
              <div class="flex w-full">
                <div
                  class="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                  <img class="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36"
                    src="../../assets/img/dummy_img_01.jpg" alt="blog">
                  <div class="px-6 py-2">
                    <h4 class="mt-4 text-2xl font-semibold text-neutral-600">
                      <span class="">AR Marker Maker</span>
                    </h4>
                    <p class="mt-4 text-base font-normal text-gray-500 leading-relax">Image file you want choice can be
                      AR markers. </p>
                    <PostBack buckendUrl="http://192.168.0.29:8000/ar/marker_maker" />
                  </div>
                </div>
              </div>

              <div class="flex w-full">
                <div
                  class="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                  <img class="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36"
                    src="../../assets/img/dummy_img_02.jpg" alt="blog">
                  <div class="px-6 py-2">
                    <h4 class="mt-4 text-2xl font-semibold text-neutral-600">
                      <span class="">Face Extruct</span>
                    </h4>
                    <p class="mt-4 text-base font-normal text-gray-500 leading-relax">Extract the face region from the
                      image
                      (jpg, png). Using extructed face image, can make the AR-Marker. </p>
                    <PostBack buckendUrl="http://192.168.0.29:8000/ar/face_extruct" />
                  </div>
                </div>
              </div>

              <div class="flex w-full">
                <div
                  class="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                  <img class="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36"
                    src="../../assets/img/dummy_img_03.jpg" alt="blog">
                  <div class="px-6 py-2">
                    <h4 class="mt-4 text-2xl font-semibold text-neutral-600">
                      <span class="">3D Object Maker</span>
                    </h4>
                    <p class="mt-4 text-base font-normal text-gray-500 leading-relax">Coming soon.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

