<template>
  <p v-if="!post">Erreur lors du chargement de l'article</p>
  <div v-else class="bg-white px-6 py-6 lg:px-8 border rounded-xl">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <p class="text-base font-semibold text-orange-600">{{ post.category }}</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ post.title }}</h1>
      <p class="mt-6 " v-html="post.content"></p>
      <figure class="mt-16">
        <img class="aspect-video rounded-xl bg-gray-50 object-cover" :src="post.image" :alt="post.title" />
        <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
          <img v-if="post.user.avatar" class="h-5 w-5 rounded-full" :src="post.user.avatar" :alt="post.user.pseudo" />
          <UserIcon v-else class="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
          {{ post.user.pseudo }}
          <PencilIcon class="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
          {{ post.updatedAt }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/20/solid'
import { PencilIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { IPost } from '../types/post';
import { postService } from '../services/post.service';
import { useRoute } from 'vue-router';
import { formatDate } from '../utils/formatDate';
const route = useRoute()
const post = ref<IPost>()
onMounted(async () => {
  const response = await postService.getPost(route.params.id as string)
  post.value = { ...response.post, updatedAt: formatDate(response.post.updatedAt) }
})
</script>
