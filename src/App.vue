<template>
  <div class="max-w-full-xl mx-auto p-4 lg:p-0 lg:pt-3 lg:w-9/10">
    <div class="flex gap-x-5 text-white bg-gray-500 px-2 py-1 text-md rounded">
      <router-link :to="{path: '/'}">
        <span class="font-semibold hidden uppercase lg:block">Statens Naturhistoriske Museum</span>
        <span class="fonbt-semibold block lg:hidden">SNM</span>
      </router-link>
      <div class="flex flex-row gap-x-5">
        <router-link :to="{path: '/administrator'}">Administrator</router-link>
        <router-link :to="{path: '/licenshaver'}">Licenshaver</router-link>
      </div>
    </div>
    <div class="flex flex-col mt-3 gap-y-3">
      <formular-skabelon-liste></formular-skabelon-liste>
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import formularSkabelonListe from '@/components/common/formularSkabelonListe.vue'
</script>
