<template>
  <Navbar/>
  <RouterView />
  
</template >

<style>
body{
  background-color: var(--background-color);
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>