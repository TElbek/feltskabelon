<template>
    <div class="text-xl">
        <div class="flex flex-col lg:flex-row lg:gap-3">
            <tw-flex>
                <span>Template</span>
                <span class="text-snhm">{{ state.formTemplateName?.templateName }}</span>
            </tw-flex>
            <tw-flex>
                <span>Scenario</span>
                <span class="text-snhm">{{ state.ringingScenario?.name }}</span>
            </tw-flex>
            <tw-flex v-if="state.formTemplateName?.licenseeId">
                <span>Licensee</span>
                <span class="text-snhm">{{licenseeName?.name}}</span>
            </tw-flex>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import type { formTemplateNameType } from '@/types/formTemplateNameType';
import type { formTemplateType } from '@/types/formTemplateType';
import { useDataStore } from '@/stores/dataStore';
import type { ringingScenarioType } from '@/types/ringingScenarioType';

interface formTemplateHeaderProps {
    formTemplateNameId: number
}

const props = defineProps<formTemplateHeaderProps>();
const dataStore = useDataStore();

const state = reactive({
    formTemplate: {} as formTemplateType | undefined,
    formTemplateName: {} as formTemplateNameType | undefined,
    ringingScenario: {} as ringingScenarioType | undefined
});

onMounted(() => {
    state.formTemplateName = dataStore.formTemplateNameList.find((item) => item.id == props.formTemplateNameId);
    if (state.formTemplateName) {
        state.formTemplate = dataStore.formTemplateList.find((item) => item.id == state.formTemplateName?.formTemplateId);
        if (state.formTemplate) {
            state.ringingScenario = dataStore.ringingScenarioList.find((item) => item.id == state.formTemplate?.ringingScenarioId)
        }
    }
})

const licenseeName = computed(() => 
        dataStore.licenseeList.find((item) => item.id == state.formTemplateName?.licenseeId));
</script>