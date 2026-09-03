<template>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const formularStore = useDataStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
    formularStore.setLicenshaverId(Number(route.params.licenshaverId));
    router.back();
});
</script>