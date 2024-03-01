<template>
  <div class="flex min-h-full sm:mt-[200px] flex-1 flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inscription</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Adresse email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" required=true v-model="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="pseudo" class="block text-sm font-medium leading-6 text-gray-900">Pseudo</label>
          <div class="mt-2">
            <input id="pseudo" name="pseudo" type="text" required=true v-model="pseudo"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
          </div>
        </div>


        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" required=true v-model="password" @keyup.
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="passwordConfirm" class="block text-sm font-medium leading-6 text-gray-900">Confirmer mot de
              passe</label>
          </div>
          <div class="mt-2">
            <input id="passwordConfirm" name="passwordConfirm" type="password" v-model="passwordConfirm" required=true
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" :class="isFormValid ? activeClass : disabledClass" @click.prevent="handleSubmit()">
            Inscription
          </button>
        </div>

        <p v-if="!passwordMatch" class="text-sm font-medium leading-6 text-red-500">Les mots de passes ne sont pas
          identiques.</p>
        <p v-if="passwordLength" class="text-sm font-medium leading-6 text-red-500"> Le mot de passe doit être au moins
          de 8 caractères.</p>
        <p v-if="registerError.status" class="text-sm font-medium leading-6 text-red-500">{{ registerError.message }}</p>
        <p v-if="registerSuccess" class="text-sm font-medium leading-6 text-green-500">Un email vous a été envoyé,
          veuillez consulter votre messagerie
          pour confirmer votre inscription.</p>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Déjà inscrit ?
        {{ ' ' }}
        <router-link :to="{ name: 'login' }"
          class="font-semibold leading-6 text-orange-600 hover:text-orange-500">Connexion</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { authService } from '../services/auth.service.ts';

const email = ref('');
const pseudo = ref('');
const password = ref('');
const passwordConfirm = ref('');

const registerError = ref<{ status: boolean, message?: string }>({ status: false, message: '' });
const registerSuccess = ref(false);

const activeClass = ref('flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600')
const disabledClass = ref('flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 cursor-not-allowed')

const isFormValid = computed(() => {
  return email.value && pseudo.value && password.value && passwordConfirm.value && passwordMatch.value && !passwordLength.value;
});
const passwordMatch = computed(() => {
  return password.value === passwordConfirm.value;
});
const passwordLength = computed(() => {
  return password.value.length > 0 && password.value.length < 8;
});

async function handleSubmit() {
  if (isFormValid.value && passwordMatch.value && !passwordLength.value) {
    try {
      await authService.register({ email: email.value, pseudo: pseudo.value, password: password.value, passwordConfirm: passwordConfirm.value });
      registerSuccess.value = true;
      email.value = '';
      pseudo.value = '';
      password.value = '';
      passwordConfirm.value = '';
    } catch (error: any) {
      if (error.response.data.status === "fail" && error.response.data.errors) {
        registerError.value = { status: true, message: error.response.data.errors[0].message };
      } else if (error.response.data.status === "fail") {
        registerError.value = { status: true, message: error.response.data.message };
      } else {
        registerError.value = { status: true, message: 'Une erreur est survenue, veuillez réessayer plus tard.' };
      }
    }
  }
}
</script>
