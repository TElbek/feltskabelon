<template>
    <div v-if="hasData" class="p-3 border border-gray-300 rounded">
        <div class="text-lg font-semibold text-snhm">BandingField</div>
        <dataGrid :properties="properties" :item-list="dataStore.bandingFieldList"></dataGrid>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { type bandingFieldType } from '@/types/bandingFieldType';
import { computed, onMounted, reactive } from 'vue';
import dataGrid from './dataGrid.vue';

const dataStore = useDataStore();

const state = reactive({
    object: {} as bandingFieldType
});

const properties = computed(() => Object.keys(state.object) as (keyof bandingFieldType)[]);
const hasData = computed(() => dataStore.bandingFieldList && dataStore.bandingFieldList.length > 0);

onMounted(() => {
    if(hasData) {
        state.object = dataStore.bandingFieldList[0];
    }
});
</script>