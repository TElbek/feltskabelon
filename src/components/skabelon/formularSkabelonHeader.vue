<template>
    <div class="flex flew-row gap-x-2 text-xl text-snhm">
        <span>{{ state.formularSkabelonNavn?.templateName }}</span>
        <span>({{ state.maerkningsScenarieType?.name }})</span>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import type { formTemplateNameType } from '@/types/formTemplateNameType';
import type { formTemplateType } from '@/types/formTemplateType';
import { useDataStore } from '@/stores/dataStore';
import type { bandingScenarioType } from '@/types/bandingScenarioType';

interface formularSkabelonHeaderProps {
    formularSkabelonNavnId: number
}

const props = defineProps<formularSkabelonHeaderProps>();
const dataStore = useDataStore();

const state = reactive({
    formularSkabelon: {} as formTemplateType | undefined,
    formularSkabelonNavn: {} as formTemplateNameType | undefined,
    maerkningsScenarieType: {} as bandingScenarioType | undefined
});

onMounted(() => {
    state.formularSkabelonNavn = dataStore.formTemplateNameList.find((item) => item.id == props.formularSkabelonNavnId);
    if(state.formularSkabelonNavn) {
        state.formularSkabelon = dataStore.formTemplateList.find((item) => item.id == state.formularSkabelonNavn?.formTemplateId);
        if(state.formularSkabelon) {
            state.maerkningsScenarieType = dataStore.bandingScenarioList.find((item) => item.id == state.formularSkabelon?.bandingScenarioId)
        }
    }
})
</script>