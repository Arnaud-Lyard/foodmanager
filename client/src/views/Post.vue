<template>
  <div class="bg-white px-6 py-6 lg:px-8">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <p class="text-base font-semibold text-indigo-600">{{ post.category }}</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ post.title }}</h1>
      <p class="mt-6 ">{{ post.description }}</p>
      <figure class="mt-16">
        <img class="aspect-video rounded-xl bg-gray-50 object-cover" :src="post.image" :alt="post.title" />
        <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
          <UserIcon class="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
          {{ post.author.name }}
          <PencilIcon class="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
          {{ post.date }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/20/solid'
import { PencilIcon } from '@heroicons/vue/24/outline';

const post = {
  id: "1",
  title: 'Boost your conversion rate',
  description:
    'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
  image:
    'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
  date: '2020-03-17',
  category: "Strategy",
  author: {
    name: 'Michael Foster',
    grade: 'Manager',
    image:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
}
</script>
