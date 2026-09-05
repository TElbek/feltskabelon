<template>
    <div>
        <div class="text-lg font-semibold text-snhm">FormTemplateName</div>
        <dataGrid :properties="properties" :item-list="dataStore.formTemplateNameList"></dataGrid>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { type formTemplateNameType } from '@/types/formTemplateNameType';
import { computed, onMounted, reactive } from 'vue';
import dataGrid from './dataGrid.vue';

const dataStore = useDataStore();

const state = reactive({
    object: {} as formTemplateNameType
});

const properties = computed(() => Object.keys(state.object) as (keyof formTemplateNameType)[]);

onMounted(() => {
    state.object = dataStore.formTemplateNameList[0];
});
</script>