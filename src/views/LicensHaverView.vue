<template>
    <div class="rounded border border-gray-300 px-2 pb-2">
        <div class="font-semibold text-2xl text-snhm">{{ route.name }}</div>
        <div class="mt-2">
            <licens-haver></licens-haver>
        </div>
    </div>
</template>

<script setup lang="ts">
import licensHaver from '@/components/licenshaver/licenshaverEditor.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>