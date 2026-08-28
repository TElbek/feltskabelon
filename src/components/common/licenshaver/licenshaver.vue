<template>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const formularStore = useFormularStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
    formularStore.setLicenshaver(Number(route.params.licenshaverId));
    router.back();
});
</script>