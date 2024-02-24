<template>
  <form @submit.prevent>

    <div class="space-y-12 sm:space-y-16">
      <div>
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Modifier un article</h1>
            <p class="mt-2 text-sm text-gray-700">
              Modifier un article existant.
            </p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" @click.prevent="handleSubmit()"
              :class="isFormValid ? activeClass : disabledClass">Enregistrer</button>
          </div>
        </div>

        <div class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10
          sm:border-t sm:pb-0">
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Titre principal</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input type="text" name="title" id="title" v-model="post.title"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="category" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Catégorie</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <select id="category" name="category" v-model="post.category"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:max-w-xs sm:leading-6">
                <option selected="true">Stormgate</option>
                <option>Stratégie</option>
                <option>Replay</option>
              </select>
            </div>
          </div>


          <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label for="file" class="block text-sm font-medium leading-6 text-gray-900">Image</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div class="flex items-center gap-x-3">
                <input type="file" id="file" name="file" accept="image/jpeg, image/png"
                  @change="handleImageChange($event)"
                  class="rounded-md bg-white px-2.5 py-1.5 text-sm text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <editor v-model="post.content" />
    <div class="mt-5" v-html="post.content"></div>
    <p v-if="updatePostResponse" class="text-sm font-medium leading-6 "
      :class="updatePostResponse.status === 'fail' ? 'text-red-500' : 'text-green-500'">{{ updatePostResponse.message }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Editor from '../../components/Editor.vue';
import { postService } from '../../services/post.service';
import { useRoute } from 'vue-router';
import { Status } from '../../types/auth';

const route = useRoute()
const post = ref<{ id: string, title: string, category: string, image: File | null | string, content: string }>({
  id: '',
  title: '',
  category: '',
  image: null,
  content: ''
})
const updatePostResponse = ref<{ status: Status, message?: string }>();

const isFormValid = computed(() => {
  return post.value.title && post.value.category
})

function handleImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    post.value.image = file;
  }
}

async function handleSubmit() {
  if (!isFormValid.value) return;

  const formData = new FormData();
  if (post.value.image) {
    formData.append('file', post.value.image ?? '')
  }
  formData.append('title', post.value.title ?? '')
  formData.append('category', post.value.category ?? '')
  formData.append('content', post.value.content ?? '')
  try {
    await postService.update(formData, post.value.id)
    updatePostResponse.value = { status: 'success', message: 'L\'article a été modifié avec succès.' }
  } catch (error: any) {
    if (error.response.data.status === "fail" && error.response.data.errors) {
      updatePostResponse.value = { status: 'fail', message: error.response.data.errors[0].message };
    } else if (error.response.data.status === "fail") {
      updatePostResponse.value = { status: 'fail', message: error.response.data.message };
    } else {
      updatePostResponse.value = { status: 'fail', message: 'Une erreur est survenue, veuillez réessayer plus tard.' };
    }
  }
}

onMounted(async () => {
  const response = await postService.getPost(route.params.id as string)
  post.value = response.post

})

const activeClass = ref('inline-flex justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600')
const disabledClass = ref('inline-flex justify-center rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 cursor-not-allowed')
</script>

