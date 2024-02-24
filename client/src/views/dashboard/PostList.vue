<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Articles</h1>
        <p class="mt-2 text-sm text-gray-700">La liste des articles que j'ai rédigé.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <router-link to="/ecrire-article"> <button type="button"
            class="block rounded-md bg-orange-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Ajouter
            un article</button>
        </router-link>
      </div>
    </div>
    <div class="-mx-4 mt-8 sm:-mx-0">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Titre</th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
              Catégorie
            </th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Mise à
              jour
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Image</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span class="sr-only">Modifier</span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="post in     posts    " :key="post.id">
            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
              {{ post.title }}
              <dl class="font-normal lg:hidden">
                <dt class="sr-only">Catégorie</dt>
                <dd class="mt-1 truncate text-gray-700">{{ post.category }}</dd>
                <dt class="sr-only sm:hidden">Mis à jour</dt>
                <dd class="mt-1 truncate text-gray-500 sm:hidden">{{ post.updatedAt }}</dd>
              </dl>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{{ post.category }}</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ post.updatedAt }}</td>
            <td class="px-3 py-4 text-sm text-gray-500"><img :src="post.image" :alt="post.title"
                class="object-fill h-24 w-24"></td>
            <td class=" py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <router-link :to="{ name: 'updatepost', params: { id: post.id } }"
                class="text-orange-600 hover:text-orange-900">Modifier<span class="sr-only">, {{
                  post.title
                }}</span></router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { postService } from '../../services/post.service';
import { IPost } from '../../types/post';
import { formatDate } from '../../utils/formatDate';

const posts = ref<IPost[]>()

onMounted(async () => {
  const response = await postService.getMyPosts();
  posts.value = response.posts.map((post: IPost) => {
    return {
      id: post.id,
      title: post.title,
      category: post.category,
      updatedAt: formatDate(post.updatedAt),
      createdAt: formatDate(post.createdAt),
      content: post.content,
      image: post.image,
    };
  });
});
</script>
