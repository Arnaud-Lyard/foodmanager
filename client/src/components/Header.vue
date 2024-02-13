<template>
  <div class="flex min-h-full flex-col">
    <header>
      <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between">
            <div class="flex">
              <div class="-ml-2 mr-2 flex items-center md:hidden">
                <!-- Mobile menu button -->
                <DisclosureButton
                  class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Ouvrir le menu principal</span>
                  <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                  <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                </DisclosureButton>
              </div>
              <div class="flex flex-shrink-0 items-center">
                <img class="h-14 w-auto" src="/images/relaxing-hippoquests.png" alt="relaxing hippoquests logo" />
              </div>
              <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <router-link v-for="navigation in publicNavigations" :key="navigation.name" :to="navigation.href" :class="[navigation.href === $route.path ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                  :aria-current="navigation.href === $route.path ? 'page' : undefined">{{
                    navigation.name }}</router-link>
                <router-link v-if="isConnected" v-for="navigation in privateNavigations" :key="navigation.name"
                  :to="navigation.href" :class="[navigation.href === $route.path ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                  :aria-current="navigation.href === $route.path ? 'page' : undefined">{{
                    navigation.name }}</router-link>

              </div>
            </div>
            <div class="flex items-center">
              <div v-if="isConnected" class="flex-shrink-0">
                <button type="button"
                  class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Déconnexion
                </button>
              </div>
              <div v-else>
                <router-link :to="{ name: 'login' }">
                  <UserIcon class="h-9 w-9 text-indigo-500 px-1 py-1 fill-current" aria-hidden="true" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <DisclosurePanel class="md:hidden" v-slot="{ close }">
          <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <router-link v-for="navigation in publicNavigations" :key="navigation.name" :to="navigation.href"
              @click=closeDisclosurePanel(close)
              :class="[navigation.href === $route.path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
              :aria-current="navigation.href === $route.path ? 'page' : undefined">{{ navigation.name }}</router-link>
            <router-link v-for="navigation in privateNavigations" :key="navigation.name" :to="navigation.href"
              @click=closeDisclosurePanel(close)
              :class="[navigation.href === $route.path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
              :aria-current="navigation.href === $route.path ? 'page' : undefined">{{ navigation.name }}</router-link>

          </div>
        </DisclosurePanel>
      </Disclosure>
    </header>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Ref, ref } from 'vue';

// Get log status
const isConnected = ref(true);

const publicNavigations = [
  { name: 'Accueil', href: '/', current: false },
  { name: 'Equipe', href: '/equipe', current: false },
]

const privateNavigations = [
  { name: 'Tableau de bord', href: '/tableau-de-bord', current: false },
]

function closeDisclosurePanel(close: (ref?: Ref | HTMLElement) => void) {
  close()
}
</script>