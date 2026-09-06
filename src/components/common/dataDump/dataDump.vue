<template>
    <div>
        <div class="text-xl text-snhm mb-2">{{ route.meta.title }}</div>
        <div class="flex flex-row flex-wrap gap-6">
            <dataDumpGeneric :list="dataStore.licenseeList" :name="'Licensee'">Licensee</dataDumpGeneric>
            <dataDumpGeneric :list="dataStore.formTemplateList" :name="'FormTemplate'">FormTemplate</dataDumpGeneric>
            <dataDumpGeneric :list="dataStore.formTemplateNameList" :name="'FormTemplateName'">FormTemplateName</dataDumpGeneric>
            <dataDumpGeneric :list="dataStore.formTemplateFieldList" :name="'FormTemplateField'">FormTemplateField</dataDumpGeneric>
            <dataDumpGeneric :list="dataStore.bandingScenarioList" :name="'BandingScenario'">BandingScenario</dataDumpGeneric>
            <dataDumpGeneric :list="dataStore.bandingFieldList" :name="'BandingField'">BandingField</dataDumpGeneric>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import dataDumpGeneric from './dataDumpGeneric.vue';
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();

const route = useRoute();
</script>