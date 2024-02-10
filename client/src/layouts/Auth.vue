<template>
  <Header />
  <div class="mx-auto w-full max-w-7xl h-screen">
    <!-- full area -->
    <slot name="full-area"></slot>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
</script>
