<template>
    <div v-if="hasData" class="p-3 border border-gray-300 rounded">
        <div class="text-lg font-semibold text-snhm">FormTemplate</div>
        <dataGrid :properties="properties" :item-list="dataStore.formTemplateList"></dataGrid>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { type formTemplateType } from '@/types/formTemplateType';
import { computed, onMounted, reactive } from 'vue';
import dataGrid from './dataGrid.vue';

const dataStore = useDataStore();

const state = reactive({
    object: {} as formTemplateType
});

const properties = computed(() => Object.keys(state.object) as (keyof formTemplateType)[]);
const hasData = computed(() => dataStore.formTemplateList && dataStore.formTemplateList.length > 0);

onMounted(() => {
    if(hasData) {
        state.object = dataStore.formTemplateList[0];
    }
});
</script>