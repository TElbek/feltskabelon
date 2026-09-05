<template>
    <div class="flex flex-col gap-4 mt-2">
        <div class="text-2xl text-snhm">{{ dataStore.licenseeName }} Banding Formular</div>

        <div>
            <div class="text-lg text-snhm">Standard Values</div>
            <div class="border-b border-snhm"></div>
            <standardvalues class="mt-2"></standardvalues>
            <tw-show-lg>
                <span class="text-gray-500 italic text-sm">Fill in the fields you want repeated under each individual label. <strong>Note:</strong> only data from after January 1st, 2015 can be entered via the form. </span>
            </tw-show-lg>
        </div>

        <div>
            <div class="flex flex-row justify-between gap-2 mb-1 lg:mb-0">
                <div class="text-lg text-snhm relative top-1 lg:top-0.5">Banding Data</div>
                <bandingTemplate @formTemplateNameId="handleTemplateSelected"></bandingTemplate>
            </div>
            <div class="border-b border-snhm mt-2 lg:mt-0"></div>
            <bandingForm v-if="state.selectedFormTemplateNameId" :formTemplateNameId="state.selectedFormTemplateNameId">
            </bandingForm>
        </div>

        <tw-show-lg>
            <div class="text-lg text-snhm">Legend</div>
            <div class="border-b border-snhm mt-2 lg:mt-0"></div>
            <div class="mt-2">
                <button_legend></button_legend>
            </div>
        </tw-show-lg>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import bandingForm from '@/components/banding/bandingForm.vue';
import standardvalues from '@/components/banding/standardvalues.vue';
import button_legend from '@/components/banding/button_legend.vue';
import bandingTemplate from '@/components/banding/bandingTemplate.vue';
import { reactive } from 'vue';

const dataStore = useDataStore();
const state = reactive({
    selectedFormTemplateNameId: undefined as number | undefined
});

function handleTemplateSelected(formTemplateNameId: number) {
    state.selectedFormTemplateNameId = formTemplateNameId;
}
</script>