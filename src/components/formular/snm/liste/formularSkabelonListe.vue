<template>
    <div class="grid grid-cols-[max-content-1fr]">
        <template v-for="skabelon in formularStore.formularSkabelonListe">
        </template>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import { reactive } from 'vue';
const formularStore = useFormularStore();

// const state = reactive({
// });
</script>