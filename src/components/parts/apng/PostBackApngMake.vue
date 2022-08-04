<script setup>
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
  buckendUrl: String,
  fileImage: Object,
  colorInfo: Object
});

const file = ref();
const fileUpload = () => {
  const formData = new FormData();
  formData.append("file", props.fileImage);
  formData.append("fileInfoColor", props.colorInfo);
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
  <button v-on:click="fileUpload"
    class="px-4 py-2 font-semibold text-blue-700 bg-transparent bg-blue-100 border-blue-500 rounded ring-2 hover:bg-blue-300 hover:text-white hover:border-transparent">
    Make It !
  </button>
</template>