<template>
  <div class="max-w-full-xl mx-auto p-4 lg:p-0 lg:pt-3 lg:w-9/10">   
      <navigation></navigation> 
      <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import navigation from '@/components/common/navigation.vue'
</script>
