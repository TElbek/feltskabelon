<template>
    <div>
        <route-title>
            <template v-slot:title>
                <span class="text-snhm text-xl">{{ scenarioName?.name }}</span>
            </template>
        </route-title>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="border border-gray-400 p-2 rounded">
                <div class="text-snhm text-lg font-semibold mb-1">Selected Fields</div>
                <tw-flex>
                    <template v-for="field in scenarioAndField" :key="field.id">
                        <a @click="removeField(field.ringingFieldId)" class="cursor-pointer">
                            <span class="border border-gray-400 px-1 rounded">{{ field.placeholder }}</span>
                        </a>
                    </template>
                </tw-flex>
            </div>
            <div class="border border-gray-400 p-2 rounded">
                <div class="text-snhm text-lg font-semibold mb-1">Available Fields</div>
                <tw-flex>
                    <template v-for="field in fieldsNotInScenario" :key="field.id">
                        <a @click="addField(field.id)" class="cursor-pointer">
                            <span class="border border-gray-400 px-1 rounded">{{ field.placeholder }}</span>
                        </a>
                    </template>
                </tw-flex>
            </div>
        </div>
        <tw-flex class="mt-3">
            <tw-button :caption="'OK'" @clicked="Ok"></tw-button>
        </tw-flex>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { join } from 'array-join'
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const dataStore = useDataStore();
const route = useRoute();
const router = useRouter();

const scenarioId = computed(() => Number(route.params.scenarioId));
const scenarioName = computed(() => dataStore.ringingScenarioList.find((item) => item.id == scenarioId.value));
const fieldsForScenario = computed(() => dataStore.scenarioFieldList.filter((item) => item.scenarioId == scenarioId.value));
const fieldsNotInScenario = computed(() =>
    dataStore.ringingFieldList.filter((item1) => !fieldsForScenario.value.some((item2) => item2.ringingFieldId == item1.id))
        .sort((a, b) => a.placeholder.localeCompare(b.placeholder, 'da-DK')))

const scenarioAndField = computed(() => {
    return join(fieldsForScenario.value,
        dataStore.ringingFieldList,
        (left) => left.ringingFieldId,
        (right) => right.id,
        (left, right) => ({ ...left, ...right })
    ).sort((a, b) => a.placeholder.localeCompare(b.placeholder, 'da-DK'))
});

function addField(ringingFieldId: number): void {
    dataStore.addNewScenarioField(scenarioId.value, ringingFieldId)
}

function removeField(ringingFieldId: number): void {
    dataStore.removeScenarioField(ringingFieldId);
}


function Ok(): void {
    router.back();
}
</script>