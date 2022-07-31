<script setup>
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
  buckendUrl: String,
  colorInfo: String
});

const file = ref();
const previewImage = ref();
const fileSelected = (event) => {
  file.value = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.value = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};
const fileUpload = () => {
  console.log(props.buckendUrl);
  const formData = new FormData();
  formData.append("file", file.value);
  axios
    .post(props.buckendUrl, formData, {
      responseType: "blob",
    })
    .then((response) => {
      let mineType = response.headers["content-type"];
      console.log(response.headers["content-type"]);
      const blob = new Blob([response.data], { type: mineType });
      let url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.download = "returnFile." + response.headers["content-type"].slice(-3);
      a.href = url;
      a.click();
    });
};
</script>
<template>
  <p>Props</p>{{ colorInfo }}
  <img v-bind:src="previewImage" class="img-fluid" alt="" />
  <label
    class="px-4 py-2 bg-transparent border-blue-500 rounded cursor-pointer bg-sky-200 ring-2 hover:bg-blue-300 hover:text-white hover:border-transparent">
    Select File !
    <input class="hidden" type="file" v-on:change="fileSelected" />
  </label>
  <button v-on:click="fileUpload"
    class="px-4 py-2 font-semibold text-blue-700 bg-transparent bg-blue-100 border-blue-500 rounded ring-2 hover:bg-blue-300 hover:text-white hover:border-transparent">
    Make It !
  </button>
</template>