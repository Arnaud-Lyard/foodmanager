<template>
  <main>
    <component :is="$route.meta.layout || 'div'">

      <template #main-area>
        <router-view />
      </template>

      <template #right-column>
        <Leaderboard />
      </template>

      <template #full-area>
        <router-view />
      </template>

      <template #connected-area>
        <router-view />
      </template>

    </component>
  </main>
</template>

<script setup lang="ts">
import Leaderboard from './components/Leaderboard.vue'

import { useRouter } from "vue-router";
import { globalRouter } from "./router/globalRouter";

const router = useRouter();
globalRouter.router = router;

</script>