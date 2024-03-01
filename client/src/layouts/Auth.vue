<template>
  <Header />
  <div class="mx-auto w-full max-w-7xl">
    <!-- full area -->
    <slot name="full-area"></slot>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue'
</script>
