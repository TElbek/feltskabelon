<template>
    <div class="text-2xl text-snhm mb-1">{{ route.meta.title }}</div>
    <tw-grid-cols-generic :count="state.scenarioList.length" :offset="0" :itemsPerRow="4">
        <div v-for="scenario in state.scenarioList" :key="scenario.id" class="bg-white rounded border border-snhm p-2">
            <div class="text-lg font-semibold text-snhm">{{ scenario.name }}</div>
            <scenario-template-list :scenarioId="scenario.id"></scenario-template-list>
        </div>        
    </tw-grid-cols-generic>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import {type bandingScenarioType} from '@/types/bandingScenarioType';
import scenarioTemplateList from './scenarioTemplateList.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const datastore = useDataStore();
const route = useRoute();

const state = reactive({
    scenarioList: [] as bandingScenarioType[],
});

onMounted(() => {
    state.scenarioList = datastore.bandingScenarioList;
});
</script>