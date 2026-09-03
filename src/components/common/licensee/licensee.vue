<template>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const dataStore = useDataStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
    dataStore.setLicenseeId(Number(route.params.licenseeId));
    router.back();
});
</script>