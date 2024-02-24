<template>
  <form>
    <div class="space-y-12 sm:space-y-16">
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">Informations utilisateur</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Modifier vos informations utilisateurs.
        </p>

        <div class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10
          sm:border-t sm:pb-0">
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="pseudo" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Pseudo</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input type="text" name="pseudo" id="pseudo" v-model="user.pseudo"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Adresse email de
              connexion</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input type="text" name="email" id="email" v-model="user.email" disabled autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-slate-100 cursor-not-allowed" />
            </div>
          </div>


          <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label for="file" class="block text-sm font-medium leading-6 text-gray-900">Avatar</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div class="flex items-center gap-x-3">
                <UserCircleIcon class="h-12 w-12 text-gray-300" aria-hidden="true" />
                <input type="file" id="file" name="file" accept="image/jpeg, image/png"
                  @change="handleAvatarChange($event)"
                  class="rounded-md bg-white px-2.5 py-1.5 text-sm text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">Réseaux sociaux</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Ajouter vos réseaux sociaux.
        </p>

        <div
          class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="twitter" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Twitter</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input type="text" name="twitter" id="twitter" v-model="user.twitter"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-md sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="esl" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Electronic Sports
              League</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input type="text" name="esl" id="esl" v-model="user.esl"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-md sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">Profil joueur</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Modifier vos informations de profil joueur.
        </p>

        <div
          class="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
          <fieldset>
            <legend class="sr-only">Stormgate</legend>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
              <div class="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">Stormgate</div>
              <div class="mt-4 sm:col-span-2 sm:mt-0">
                <div class="max-w-lg space-y-6">
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input id="stormgateProfile" name="stormgateProfile" type="checkbox"
                        @click="displayStormgateProfile()"
                        class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600" />
                    </div>
                    <div class="text-sm leading-6 ">
                      <label for="stormgateProfile" class="font-medium text-gray-900">Lier mon compte Stormgate à mon
                        profil</label>
                    </div>

                  </div>
                  <label v-if="stormgateProfileActive" for="stormgate"
                    class="block text-sm font-medium text-gray-600">Lien
                    vers mon profil</label>
                  <div v-if="stormgateProfileActive" class="sm:col-span-2 sm:mt-0">
                    <input type="text" name="stormgate" id="stormgate" v-model="user.stormgate"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-s sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <p v-if="registerError" class="text-sm font-medium leading-6 text-red-500">{{ registerError }}</p>
    <p v-if="pseudoLength" class="text-sm font-medium leading-6 text-red-500">Le pseudo est obligatoire</p>
    <p v-if="registerSuccess" class="text-sm font-medium leading-6 text-green-500">Vos informations ont été mises à
      jour.</p>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <router-link :to="{ name: 'home' }"> <button type="button"
          class="text-sm font-semibold leading-6 text-gray-900">Retour vers le site</button>
      </router-link>
      <button type="submit" :class="isFormValid ? activeClass : disabledClass"
        @click.prevent="handleSubmit()">Enregistrer</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted, ref } from 'vue';
import { userService } from '../../services/user.service';
import { IUser } from '../../types/user';

const user = ref<IUser>({
  id: '',
  pseudo: '',
  email: '',
  grade: 'user',
  avatar: '',
  esl: '',
  twitter: '',
  stormgate: '',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
})
const avatarImage = ref<File>()
const registerError = ref<string>('')
const registerSuccess = ref(false)

onMounted(async () => {
  const userPayload = await userService.getUser();
  user.value = userPayload.data.user;
})

const isFormValid = computed(() => {
  return user.value.email && user.value.pseudo
})

const pseudoLength = computed(() => {
  return user.value.pseudo.length < 1
})

async function handleSubmit() {
  registerError.value = ''
  if (isFormValid.value) {
    const formData = new FormData();
    if (avatarImage.value) {
      formData.append('file', avatarImage.value)
    }
    formData.append('pseudo', user.value.pseudo ?? '')
    formData.append('email', user.value.email ?? '')
    formData.append('twitter', user.value.twitter ?? '')
    formData.append('esl', user.value.esl ?? '')
    formData.append('stormgate', user.value.stormgate ?? '')
    try {
      await userService.updateUser(formData);
      registerSuccess.value = true;
    } catch (error: any) {
      registerError.value = error.response.data.message
    }
  }
}

function handleAvatarChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    avatarImage.value = file;
  }
}

const stormgateProfileActive = ref(false)
function displayStormgateProfile() {
  stormgateProfileActive.value = !stormgateProfileActive.value
}

const activeClass = ref('inline-flex justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600')
const disabledClass = ref('inline-flex justify-center rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 cursor-not-allowed')
</script>
