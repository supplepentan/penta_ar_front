<script setup>
import FooterMain from "./components/parts/footer/FooterMain.vue";
import HeaderMain from "./components/parts/header/HeaderMain.vue";
</script>
<template>
  <HeaderMain />
  <router-view></router-view>
  <FooterMain />
</template>
