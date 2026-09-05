<template>
    <div class="text-xl text-snhm mb-2">{{ route.meta.title }}</div>
    <div class="flex flex-row flex-wrap gap-4">
        <dataDumpScenario></dataDumpScenario>
        <dataDumpFormTemplate></dataDumpFormTemplate>
        <dataDumpFormTemplateName></dataDumpFormTemplateName>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import dataDumpFormTemplate from './dataDumpFormTemplate.vue';
import dataDumpFormTemplateName from './dataDumpFormTemplateName.vue';
import dataDumpScenario from './dataDumpScenario.vue';
const route = useRoute();
</script>