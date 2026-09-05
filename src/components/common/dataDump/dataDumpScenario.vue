<template>
    <div>
        <div class="text-lg font-semibold text-snhm">BandingScenario</div>
        <dataGrid :properties="properties" :item-list="dataStore.bandingScenarioList"></dataGrid>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { type bandingScenarioType } from '@/types/bandingScenarioType.ts';
import { computed, onMounted, reactive } from 'vue';
import dataGrid from './dataGrid.vue';

const dataStore = useDataStore();

const state = reactive({
    object: {} as bandingScenarioType
});

const properties = computed(() => Object.keys(state.object) as (keyof bandingScenarioType)[]);

onMounted(() => {
    state.object = dataStore.bandingScenarioList[0];
});
</script>