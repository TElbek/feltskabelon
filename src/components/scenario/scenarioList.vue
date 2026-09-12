<template>
    <div>
        <route-title></route-title>
        <div class="mt-3">
            <tw-grid-cols-generic :count="state.scenarioList.length" :offset="0" :itemsPerRow="4">
                <div v-for="scenario in state.scenarioList" :key="scenario.id"
                    class="bg-white rounded border border-snhm p-2">
                    <div class="text-lg text-snhm">{{ scenario.name }}</div>
                    <scenario-template-list :scenarioId="scenario.id"></scenario-template-list>
                </div>
            </tw-grid-cols-generic>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { type ringingScenarioType } from '@/types/ringingScenarioType.ts';
import scenarioTemplateList from './scenarioTemplateList.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const datastore = useDataStore();
const route = useRoute();

const state = reactive({
    scenarioList: [] as ringingScenarioType[],
});

onMounted(() => {
    state.scenarioList = datastore.ringingScenarioList;
});
</script>