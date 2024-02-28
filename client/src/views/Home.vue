<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 lg:px-6  border rounded-xl">
      <div class="mx-auto max-w-2xl lg:max-w-4xl">
        <div class="mt-5 mb-5 space-y-20 lg:mt-5 lg:space-y-20">
          <article v-for="post in    posts   " :key="post.id" class="relative isolate flex flex-col gap-8 lg:flex-row">
            <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
              <img :src="post.image" alt="" class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
              <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div>
              <div class="flex items-center gap-x-4 text-xs">
                <time :datetime="post.updatedAt" class="text-gray-500">{{ post.updatedAt }}</time>
                <div class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 ">{{
                  post.category }} </div>
              </div>
              <div class="group relative max-w-xl">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <router-link :to="`/article/${post.id}`">
                    <span class="absolute inset-0" />
                    {{ post.title }}
                  </router-link>
                </h3>
                <p class="mt-5 text-sm leading-6 text-gray-600"><span v-html="post.content"></span></p>
              </div>
              <div class="mt-6 flex border-t border-gray-900/5 pt-6">
                <div class="relative flex items-center gap-x-4">
                  <span v-if="!post.user.avatar" class="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                    <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <img v-else :src="post.user.avatar" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
                  <div class="text-sm leading-6">
                    <p class="font-semibold text-gray-900">
                      {{ post.user.pseudo }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IPostUser } from '../types/post';
import { postService } from '../services/post.service';
import { limitStringLength } from '../utils/limitStringLength';
import { formatDate } from '../utils/formatDate';

const posts = ref<IPostUser[]>()
onMounted(async () => {
  const response = await postService.getAllPosts();
  posts.value = response.posts.map((post: IPostUser) => {
    return {
      id: post.id,
      title: post.title,
      category: post.category,
      image: post.image,
      createdAt: formatDate(post.createdAt),
      content: limitStringLength(post.content, 200) + '...',
      updatedAt: formatDate(post.updatedAt),
      user: {
        pseudo: post.user.pseudo,
        avatar: post.user.avatar
      }
    };
  })
})

</script>