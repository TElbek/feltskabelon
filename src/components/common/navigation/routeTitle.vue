<template>
    <div class="mb-1 text-snhm text-xl">{{ route.meta.title }}</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>