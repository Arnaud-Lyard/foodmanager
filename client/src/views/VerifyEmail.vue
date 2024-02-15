<template>
  <div class="flex h-full flex-1 mt-[-64px] flex-col justify-center px-6 lg:px-8">
    <div class="rounded-md bg-green-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-md font-medium text-green-800">Compte activé</h3>
          <div class="mt-2 text-md text-green-700">
            <p>Votre compte a bien été activé, vous pouvez vous connecter avec vos identifiants depuis la page de
              connexion.</p>
          </div>
          <div class="mt-4">
            <div class="-mx-2 -my-1.5 flex">
              <router-link :to="{ name: 'login' }"> <button type="button"
                  class="rounded-md bg-green-50 px-2 py-1.5 text-md font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">Connexion</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { authService } from '../services/auth.service';

const route = useRoute()

watch(
  () => route.params.verifycode,
  async newVerifycode => {
    await authService.verifyEmail(newVerifycode as string)
  }
)
</script>