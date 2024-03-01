<template>
  <Header />
  <div class="mx-auto w-full max-w-7xl grow xl:flex xl:px-2">

    <div class="px-4 py-6 sm:px-6 lg:pl-6 xl:flex-1 xl:pl-6">
      <!-- Main area -->
      <slot name="main-area"></slot>
    </div>

    <div class="shrink-0 border-t px-4 py-6 sm:px-6 xl:w-[34rem] lg:pr-6 xl:pr-6">
      <!-- right column area -->
      <slot name="right-column"></slot>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue'
</script>
