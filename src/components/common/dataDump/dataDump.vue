<template>
    <div>
        <div class="text-xl text-snhm mb-2">{{ route.meta.title }}</div>
        <div class="flex flex-row flex-wrap gap-6">
            <dataDumpFormTemplate></dataDumpFormTemplate>
            <dataDumpFormTemplateName></dataDumpFormTemplateName>
            <dataDumpFormTemplateField></dataDumpFormTemplateField>
            <dataDumpLicensee></dataDumpLicensee>
            <dataDumpScenario></dataDumpScenario>
            <dataDumpBandingField></dataDumpBandingField>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import dataDumpBandingField from './dataDumpbandingField.vue';
import dataDumpFormTemplate from './dataDumpFormTemplate.vue';
import dataDumpFormTemplateName from './dataDumpFormTemplateName.vue';
import dataDumpFormTemplateField from './dataDumpFormTemplateField.vue';
import dataDumpScenario from './dataDumpScenario.vue';
import dataDumpLicensee from './dataDumpLicensee.vue';
const route = useRoute();
</script>