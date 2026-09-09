<template>
    <tw-grid-cols-generic :itemsPerRow="5" :count="groupedByTemplateNameId.size">
        <div v-for="[key, value] in groupedByTemplateNameId" class="rounded border border-snhm p-2">
            <span class="text-lg text-snhm font-semibold">{{ key }}</span>
            <div class="border-b border-snhm mb-2"></div>
            <tw-flex>
                <template v-for="field in sortFieldNames(value)">
                    <span class="border border-gray-400 text-gray-600 px-1 text-sm rounded">{{ field.placeholder }}</span>
                </template>
            </tw-flex>
        </div>
    </tw-grid-cols-generic>
</template>

<script setup lang="ts">
import { join } from "array-join";
import { computed } from "vue";
import { useDataStore } from "@/stores/dataStore";
const dataStore = useDataStore();

type joinedDataType = {
    id: number;
    fieldName: string;
    placeholder: string;
    isBasicField: boolean;
    formTemplateNameId: number;
    isMinimumField: boolean;
    ringingFieldId: number;
    formTemplateId: number;
    licenseeId: number | undefined;
    templateName: string;
    isActive: boolean;
    ringingScenarioId: number;
}

const formAndName = computed(() => {
    return join(dataStore.formTemplateList,
        dataStore.formTemplateNameList,
        (left) => left.id,
        (right) => right.formTemplateId,
        (left, right) => ({ ...left, ...right })
    )
});

const NameAndFields = computed(() => {
    return join(formAndName.value,
        dataStore.formTemplateFieldList,
        (left) => left.id,
        (right) => right.formTemplateNameId,
        (left, right) => ({ ...left, ...right })
    )
});

const ringingFieldNames = computed(() => {
    return join(NameAndFields.value,
        dataStore.ringingFieldList,
        (left) => left.ringingFieldId,
        (right) => right.id,
        (left, right) => ({ ...left, ...right })
    )
});

const groupedByTemplateNameId = computed(() => {
    return Map.groupBy(ringingFieldNames.value.sort((a, b) => a.templateName.localeCompare(b.templateName)), (one: joinedDataType) => one.templateName);
});

function sortFieldNames(value: joinedDataType[]): joinedDataType[] {
    return value.sort((a, b) => a.placeholder.localeCompare(b.placeholder));
}
</script>