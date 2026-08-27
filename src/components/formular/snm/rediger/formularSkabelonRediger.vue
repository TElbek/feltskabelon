<template>
    <div>Hejsa</div>
    <div>{{ route.params.skabelonId }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>