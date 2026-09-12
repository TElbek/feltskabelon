<template>
    <div class="flex justify-between">
        <div class="flex gap-x-2">
            <div class=" text-snhm text-xl">{{ route.meta.title }}</div>
            <slot name="title"></slot>
        </div>
        <slot name="atright"></slot>
    </div>
    <div class="border-b border-snhm mt-1 mb-2"></div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>