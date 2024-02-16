<template>
  <div class="flex h-full flex-1 mt-[-64px] flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Connexion</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Adresse email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" v-model="email" autocomplete="email" required=true
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
            <div class="text-sm">
              <router-link :to="{ name: 'forgotpassword' }"
                class="font-semibold text-indigo-600 hover:text-indigo-500">Mot
                de passe oublié ?</router-link>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" v-model="password" autocomplete="current-password"
              required=true
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" :class="isFormValid ? activeClass : disabledClass" @click.prevent="handleSubmit()">
            Connexion
          </button>
        </div>

        <p v-if="loginError.status" class="text-sm font-medium leading-6 text-red-500">{{ loginError.message }}</p>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Pas encore inscrit ?
        {{ ' ' }}
        <router-link :to="{ name: 'register' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">S'inscrire</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const loginError = ref<{ status: boolean, message?: string }>({ status: false, message: '' });


const isFormValid = computed(() => {
  return email.value && password.value;
});

const activeClass = ref('flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600')
const disabledClass = ref('flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 cursor-not-allowed')

async function handleSubmit() {

  if (email.value && password.value) {
    try {
      await authService.login({ email: email.value, password: password.value });
      router.push({ name: 'home' });
      email.value = '';
      password.value = '';
      authStore.login();
    } catch (error: any) {
      if (error.response.data.status === "fail" && error.response.data.errors) {
        loginError.value = { status: true, message: error.response.data.errors[0].message };
      } else if (error.response.data.status === "fail") {
        loginError.value = { status: true, message: error.response.data.message };
      } else {
        loginError.value = { status: true, message: 'Une erreur est survenue, veuillez réessayer plus tard.' };
      }
    }
  }
}
</script>