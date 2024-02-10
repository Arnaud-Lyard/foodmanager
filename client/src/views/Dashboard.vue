<template>
  <div class="px-4 sm:px-0">
    <h3 class="text-base font-semibold leading-7 text-gray-900">Mes informations</h3>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Informations personnelles et profil utilisateur.</p>
  </div>
  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Pseudo</dt>
        <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <span class="flex-grow">{{ user.pseudo }}</span>
          <span class="ml-4 flex-shrink-0">
            <button type="button"
              class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Modifier</button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Adresse email</dt>
        <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <span class="flex-grow">{{ user.email }}</span>
          <span class="ml-4 flex-shrink-0">
            <button type="button"
              class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Modifier</button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Identifiants</dt>
        <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <span class="flex-grow">{{ user.battletag }}</span>
          <span class="ml-4 flex-shrink-0">
            <button type="button"
              class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Modifier</button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">ESL</dt>
        <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <span class="flex-grow">{{ user.esl }}</span>
          <span class="ml-4 flex-shrink-0">
            <button type="button"
              class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Modifier</button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Twitter</dt>
        <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <span class="flex-grow">{{ user.twitter }}</span>
          <span class="ml-4 flex-shrink-0">
            <button type="button"
              class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Modifier</button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Image</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
            <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
              <div class="flex w-0 flex-1 items-center">
                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                  <img class="h-8 w-8 rounded-full" :src="user.image" alt="User image" />
                </div>
              </div>
              <div class="ml-4 flex flex-shrink-0 space-x-4">
                <button type="button"
                  class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Modifier</button>
                <span class="text-gray-200" aria-hidden="true">|</span>
                <button type="button"
                  class="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800">Supprimer</button>
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const user = ref({
  pseudo: 'Player',
  email: 'player@mydomainname.com',
  password: '*********',
  battletag: 'Player#1234',
  esl: 'http://www.esl.com/player',
  twitter: 'http://www.twitter.com/player',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
})
</script>