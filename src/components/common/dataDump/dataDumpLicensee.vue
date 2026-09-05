<template>
    <div v-if="hasData" class="p-3 border border-gray-300 rounded">
        <div class="text-lg font-semibold text-snhm">Licensee</div>
        <dataGrid :properties="properties" :item-list="dataStore.licenseeList"></dataGrid>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { type licenseeType } from '@/types/licenseeType.ts';
import { computed, onMounted, reactive } from 'vue';
import dataGrid from './dataGrid.vue';

const dataStore = useDataStore();

const state = reactive({
    object: {} as licenseeType
});

const properties = computed(() => Object.keys(state.object) as (keyof licenseeType)[]);
const hasData = computed(() => dataStore.formTemplateList && dataStore.licenseeList.length > 0);

onMounted(() => {
    if(hasData) {
        state.object = dataStore.licenseeList[0];
    }
});
</script>