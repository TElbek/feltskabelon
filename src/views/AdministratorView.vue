<template>
    <div class="rounded border border-gray-400 px-2 pb-2">
        <div class="font-semibold text-2xl text-snhm">{{ route.name }}</div>
        <div class="mt-2">
            <formular-skabelon-editor></formular-skabelon-editor>
        </div>
    </div>

    <div class="rounded border border-gray-400 px-2 pb-2">
        <div class="font-semibold text-2xl text-snhm">Ringmærkningsdata</div>
        <maerkning></maerkning>
    </div>
</template>

<script setup lang="ts">
import formularSkabelonEditor from '@/components/administrator/formularSkabelonEditor.vue';
import maerkning from '@/components/maerkning/maerkning.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>