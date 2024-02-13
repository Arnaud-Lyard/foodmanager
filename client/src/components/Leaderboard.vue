<template>
  <div class="px-4 sm:px-6 lg:px-6 border rounded-xl">
    <div class="-mx-4 mt-2 sm:-mx-0 ">
      <table class="min-w-full divide-y divide-gray-300">
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="player in players" :key="player.id">
            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
              {{ player.nickname }}
              <dl class="font-normal lg:hidden">
                <dt class="sr-only">Faction</dt>
                <dd class="mt-1 truncate text-gray-700">{{ player.race }}</dd>
                <dt class="sr-only sm:hidden">Email</dt>
                <dd class="mt-1 truncate text-gray-500 sm:hidden">{{ player.league }}</dd>
              </dl>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{{ player.race }}</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ player.league }}</td>
            <td class="px-3 py-4 text-sm text-gray-500">{{ player.winrate }}%</td>
            <td class="px-3 py-4" v-if="player.progress === 'up'">
              <ChevronUpIcon class="h-4 w-4 block text-center mx-auto fill-current text-green-600" />
            </td>
            <td class="px-3 py-4" v-else-if="player.progress === 'down'">
              <ChevronDownIcon class="h-4 w-4 block text-center mx-auto fill-current text-red-600" />
            </td>
            <td class="px-3 py-4 text-sm text-center text-gray-600" v-else>
              -
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { Player } from '../types/player';
import { playerService } from '../services/player.service';

const players = ref<Player[]>([])

onMounted(async () => {
  try {
    const playersData = await playerService.getAllPlayers();
    players.value = playersData.players.sort((a, b) => b.mmr - a.mmr);
  } catch (error) {
    console.error(error)
  }
})
</script>