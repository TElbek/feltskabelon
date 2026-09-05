<template>
    <div>
        <div class="text-xl text-snhm mb-2">{{ route.meta.title }}</div>
        <div class="flex flex-row flex-wrap gap-6">
            <dataDumpScenario></dataDumpScenario>
            <dataDumpFormTemplate></dataDumpFormTemplate>
            <dataDumpFormTemplateName></dataDumpFormTemplateName>
            <dataDumpFormTemplateField></dataDumpFormTemplateField>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import dataDumpFormTemplate from './dataDumpFormTemplate.vue';
import dataDumpFormTemplateName from './dataDumpFormTemplateName.vue';
import dataDumpFormTemplateField from './dataDumpFormTemplateField.vue';
import dataDumpScenario from './dataDumpScenario.vue';
const route = useRoute();
</script>