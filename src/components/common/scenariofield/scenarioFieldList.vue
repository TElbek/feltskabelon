<template>
    <route-title></route-title>
    <tw-grid-cols-generic :itemsPerRow="2" :count="groupedByScenarioName.size">
        <div v-for="[key, value] in groupedByScenarioName" :key="key" class="rounded border border-snhm p-2">
            <div class="flex justify-between">
                <div class="flex gap-x-1 text-lg text-snhm text-nowrap">
                    <span class="me-1">Fields for</span>
                    <span class="font-semibold">{{ key }}</span>
                    <span class="me-1">Scenario</span>
                </div>
                <router-link :to="`/scenario/${value[0].scenarioId}/fields/edit`">Edit</router-link>
            </div>
            <div class="border-b border-snhm mb-2"></div>
            <tw-flex>
                <template v-for="field in sortFieldNames(value)" :key="field.id">
                    <span class="border border-gray-400 text-gray-600 px-1 rounded">{{ field.placeholder
                    }}</span>
                </template>
            </tw-flex>
        </div>
    </tw-grid-cols-generic>
</template>

<script setup lang="ts">
import { join } from "array-join";
import { useDataStore } from "@/stores/dataStore";
import { computed } from "vue";

const dataStore = useDataStore();

const scenarioAndField = computed(() => {
    return join(dataStore.ringingScenarioList,
        dataStore.scenarioFieldList,
        (left) => left.id,
        (right) => right.scenarioId,
        (left, right) => ({ ...left, ...right })
    )
});

const scenarioFieldAndRingingField = computed(() => {
    return join(scenarioAndField.value,
        dataStore.ringingFieldList,
        (left) => left.ringingFieldId,
        (right) => right.id,
        (left, right) => ({ ...left, ...right })
    )
});

type scenarioFieldAndRingingFieldType = {
    id: number;
    fieldName: string;
    placeholder: string;
    scenarioId: number;
    ringingFieldId: number;
    name: string;
}

const groupedByScenarioName = computed(() => {
    return Map.groupBy(scenarioFieldAndRingingField.value.sort((a, b) => a.name.localeCompare(b.name, 'da-DK')), (one: scenarioFieldAndRingingFieldType) => one.name);
});

function sortFieldNames(value: scenarioFieldAndRingingFieldType[]): scenarioFieldAndRingingFieldType[] {
    return value.sort((a, b) => a.placeholder.localeCompare(b.placeholder, 'da-DK'));
}
</script>