<template>
    <!-- <div class="flex flew-row gap-x-2 text-xl text-snhm">
        <span>Template: {{ state.formTemplateName?.templateName }}</span>
        <span>Scenario: {{ state.bandingScenario?.name }}</span>
        <span>Licensee: {{  dataStore.licenseeName }}</span>
    </div> -->
    <div class="text-base">
        <div class="flex flex-col lg:flex-row lg:gap-3">
            <tw-flex>
                <span class="font-semibold">Template:</span>
                <span class="text-snhm">{{ state.formTemplateName?.templateName }}</span>
            </tw-flex>
            <tw-flex>
                <span class="font-semibold">Scenario:</span>
                <span class="text-snhm">{{ state.bandingScenario?.name }}</span>
            </tw-flex>
            <tw-flex>
                <span class="font-semibold">Licensee:</span>
                <span class="text-snhm">{{  dataStore.licenseeName }}</span>
            </tw-flex>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import type { formTemplateNameType } from '@/types/formTemplateNameType';
import type { formTemplateType } from '@/types/formTemplateType';
import { useDataStore } from '@/stores/dataStore';
import type { bandingScenarioType } from '@/types/bandingScenarioType';

interface formTemplateHeaderProps {
    formTemplateNameId: number
}

const props = defineProps<formTemplateHeaderProps>();
const dataStore = useDataStore();

const state = reactive({
    formTemplate: {} as formTemplateType | undefined,
    formTemplateName: {} as formTemplateNameType | undefined,
    bandingScenario: {} as bandingScenarioType | undefined
});

onMounted(() => {
    state.formTemplateName = dataStore.formTemplateNameList.find((item) => item.id == props.formTemplateNameId);
    if (state.formTemplateName) {
        state.formTemplate = dataStore.formTemplateList.find((item) => item.id == state.formTemplateName?.formTemplateId);
        if (state.formTemplate) {
            state.bandingScenario = dataStore.bandingScenarioList.find((item) => item.id == state.formTemplate?.bandingScenarioId)
        }
    }
})
</script>