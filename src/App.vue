<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="max-w-full-xl mx-auto p-4 lg:p-0 lg:pt-3 lg:w-9/10">
    <div class="text-white uppercase bg-gray-500 px-2 py-1 text-xs">Statens Naturhistoriske Museum</div>
    <div class="mt-3">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
