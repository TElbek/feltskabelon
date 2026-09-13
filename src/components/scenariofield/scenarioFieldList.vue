<template>
    <div>
        <route-title>
            <template v-slot:atright>
                 <tw-input v-model="searchValue" v-focus class="mb-1"></tw-input>
            </template>
        </route-title>
        <div class="mt-3">
            <tw-grid-cols-generic :itemsPerRow="4" :count="groupedByScenarioName.size">
                <div v-for="[key, value] in groupedByScenarioName" :key="key" class="rounded border border-snhm p-2">
                    <div class="flex justify-between">
                        <span class="text-lg text-snhm">{{ key }}</span>
                        <router-link :to="`/scenario/${value[0].scenarioId}/fields/edit`">
                            <span class="text-snhm">Edit</span>
                        </router-link>
                    </div>
                    <div class="mt-1">
                        <tw-flex>
                            <template v-for="field in sortFieldNames(value)" :key="field.id">
                                <span class="border border-gray-400 text-gray-600 px-1 rounded">{{ field.placeholder
                                }}</span>
                            </template>
                        </tw-flex>
                    </div>
                </div>
            </tw-grid-cols-generic>

        </div>
    </div>
</template>

<script setup lang="ts">
import { join } from "array-join";
import { useDataStore } from "@/stores/dataStore";
import { computed, ref } from "vue";

const searchValue = ref('');

const dataStore = useDataStore();

const ringingFieldsFiltered = computed(() => dataStore.ringingFieldList.filter((item) => item.placeholder.toLowerCase().indexOf(searchValue.value.toLowerCase()) > -1 || !searchValue.value))

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
        ringingFieldsFiltered.value,
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