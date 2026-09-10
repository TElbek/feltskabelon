<template>
    <tw-grid-cols-generic :itemPerRow="3" :count="groupedByScenarioName.size">
        <div v-for="[key, value] in groupedByScenarioName" class="rounded border border-snhm p-2">
            <div class="flex justify-between text-lg text-snhm">
                <div>
                    <span class="me-3">Fields:</span>
                    <span class="font-semibold">Scenario: {{ key }}</span>
                </div>
                <div class="font-semibold">{{ value.length }}</div>
            </div>
            <div class="border-b border-snhm mb-2"></div>
            <tw-flex>
                <template v-for="field in sortFieldNames(value)">
                    <span class="border border-gray-400 text-gray-600 px-1 text-sm rounded">{{ field.placeholder
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
    return Map.groupBy(scenarioFieldAndRingingField.value.sort((a, b) => a.name.localeCompare(b.name)), (one: scenarioFieldAndRingingFieldType) => one.name);
});

function sortFieldNames(value: scenarioFieldAndRingingFieldType[]): scenarioFieldAndRingingFieldType[] {
    return value.sort((a, b) => a.placeholder.localeCompare(b.placeholder));
}

</script>