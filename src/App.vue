<template>
  <div class="max-w-full-xl mx-auto p-4 xl:p-0 xl:pt-3 xl:w-7/10">   
      <navigation></navigation> 
      <RouterView class="mt-3"/>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import navigation from '@/components/common/navigation/navigation.vue';
</script>
