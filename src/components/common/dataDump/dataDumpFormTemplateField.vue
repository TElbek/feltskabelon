<template>
    <div v-if="hasData" class="p-3 border border-gray-300 rounded">
        <div class="text-lg font-semibold text-snhm">FormTemplateField</div>
        <dataGrid :properties="properties" :item-list="dataStore.formTemplateFieldList"></dataGrid>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { type formTemplateFieldType } from '@/types/formTemplateFieldType';
import { computed, onMounted, reactive } from 'vue';
import dataGrid from './dataGrid.vue';

const dataStore = useDataStore();

const state = reactive({
    object: {} as formTemplateFieldType
});

const properties = computed(() => Object.keys(state.object) as (keyof formTemplateFieldType)[]);
const hasData = computed(() => dataStore.formTemplateFieldList && dataStore.formTemplateFieldList.length > 0);

onMounted(() => {
    if (hasData) {
        state.object = dataStore.formTemplateFieldList[0];
    }
});
</script>