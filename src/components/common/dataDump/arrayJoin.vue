<template>
    <dataDumpGeneric :list="bandingFieldNames">Alle data</dataDumpGeneric>
</template>

<script setup lang="ts">
import dataDumpGeneric from './dataDumpGeneric.vue';
import { join } from "array-join";
import { computed } from "vue";
import { useDataStore } from "@/stores/dataStore";
const dataStore = useDataStore();

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

const bandingFieldNames = computed(() => {
    return join(NameAndFields.value,
        dataStore.bandingFieldList,
        (left) => left.bandingFieldId,
        (right) => right.id,
        (left, right) => ({ ...left, ...right })
    )
});
</script>