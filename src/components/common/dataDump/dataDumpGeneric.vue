<template>
    <div v-if="hasData" class="p-3 border border-gray-300 rounded">
        <dataGrid :properties="propertiesNotId" :item-list="props.list"></dataGrid>
    </div>
</template>

<script setup lang="ts" generic="T">
import { computed, ref, shallowReactive, watch } from 'vue';
import dataGrid from './dataGrid.vue';

interface DataDumpGenericProps<T> {
    list: T[];
}

const props = defineProps<DataDumpGenericProps<T>>();

const state = shallowReactive<{ object: T | null }>({
    object: null,
});

const properties = computed(() => Object.keys(state.object ?? {}) as (keyof T)[]);
const propertiesNotId = computed(() => properties.value.filter((item) => item.toString().toLowerCase().indexOf('id') == -1))
const hasData = computed(() => props.list.length > 0);

watch(
    () => props.list,
    list => {
        state.object = list[0] ?? null;
    },
    { immediate: true }
);
</script>