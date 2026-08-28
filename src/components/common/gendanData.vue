<template>
</template>

<script setup lang="ts">
import { useDataLoader } from '@/composables/data-loader.ts'
import { useRouter } from 'vue-router';

import { onMounted } from 'vue';
const dataLoader = useDataLoader();
const router = useRouter();

onMounted(async () => {
    await dataLoader.loadJSONData();
    router.back();
})
</script>