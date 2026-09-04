<template>
    <div class="flex flex-col gap-6 mt-2">
        <div class="text-2xl text-snhm">Ringmærkningsdata</div>

        <div>
            <div class="text-lg text-snhm">Standard indstillinger</div>
            <div class="border-b border-snhm"></div>
            <standardvalues class="mt-2"></standardvalues>
            <tw-show-lg>
                <span class="text-gray-500 italic text-sm">Udfyld de felter som du ønsker gentaget under hver enkelt
                    mærkning. <strong>Bemærk:</strong> kun data
                    fra efter den 1. januar 2015 kan indtastes via formularen. </span>
            </tw-show-lg>
        </div>

        <div>
            <div class="flex flex-row justify-between gap-2 mb-1 lg:mb-0">
                <div class="text-lg text-snhm relative top-1 lg:top-0.5">Mærkningsdata</div>
                <bandingTemplate @formTemplateNameId="handleTemplateSelected"></bandingTemplate>
            </div>
            <div class="border-b border-snhm mt-2 lg:mt-0"></div>
            <bandingForm v-if="state.selectedFormTemplateNameId" :formTemplateNameId="state.selectedFormTemplateNameId">
            </bandingForm>
        </div>

        <tw-show-lg>
            <div class="text-lg text-snhm">Tegnforklaring</div>
            <div class="border-b border-snhm mt-2 lg:mt-0"></div>
            <div class="mt-2">
                <button_legend></button_legend>
            </div>
        </tw-show-lg>
    </div>
</template>

<script setup lang="ts">
import bandingForm from '@/components/banding/bandingForm.vue';
import standardvalues from '@/components/banding/standardvalues.vue';
import button_legend from '@/components/banding/button_legend.vue';
import bandingTemplate from '@/components/banding/bandingTemplate.vue';
import { reactive } from 'vue';

const state = reactive({
    selectedFormTemplateNameId: undefined as number | undefined
});

function handleTemplateSelected(formTemplateNameId: number) {
    state.selectedFormTemplateNameId = formTemplateNameId;
}
</script>