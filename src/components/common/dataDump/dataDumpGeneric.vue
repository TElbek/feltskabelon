<template>
    <div v-if="hasData" class="p-3 border border-gray-300 rounded">
        <div class="text-snhm text-lg">
            <a @click="flipIsOpen">
                <tw-flex>
                    <span v-if="isOpen">&#x1F809</span>
                    <span v-else>&#x1F80B</span>
                    <span class="font-semibold">{{ props.name }}</span>
                </tw-flex>
            </a>
        </div>
        <dataGrid v-if="isOpen" :properties="properties" :item-list="props.list"></dataGrid>
    </div>
</template>

<script setup lang="ts" generic="T">
import { computed, ref, shallowReactive, watch } from 'vue';
import dataGrid from './dataGrid.vue';

interface DataDumpGenericProps<T> {
    list: T[];
    name: string;
}

const props = defineProps<DataDumpGenericProps<T>>();

const state = shallowReactive<{ object: T | null }>({
    object: null,
});

const isOpen = ref(false);
const properties = computed(() => Object.keys(state.object ?? {}) as (keyof T)[]);
const hasData = computed(() => props.list.length > 0);

function flipIsOpen(): void {
    isOpen.value = !isOpen.value;
}

watch(
    () => props.list,
    list => {
        state.object = list[0] ?? null;
    },
    { immediate: true }
);
</script>