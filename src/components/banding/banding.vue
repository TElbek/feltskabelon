<template>
    <div class="flex flex-col gap-5">
        <div class="text-2xl text-snhm">Ringmærkningsdata</div>
        <div class="border-b border-snhm"></div>
        <bandingTemplate @formTemplateNameId="handleTemplateSelected"></bandingTemplate>
        <div>
            <div class="text-lg text-snhm">Standard indstillinger</div>
            <div class="border-b border-snhm"></div>
            <span class="text-gray-500 italic text-md">Udfyld de felter som du ønsker gentaget under hver enkelt
                mærkning. <strong>Bemærk:</strong> kun data
                fra efter den 1. januar 2015 kan indtastes via formularen. </span>
            <div class="mt-2">
                <standardvalues></standardvalues>
            </div>
        </div>
        <div>
            <div class="text-lg text-snhm">Indtast mærkningsdata</div>
            <div class="border-b border-snhm"></div>
            <div class="flex gap-x-2" v-if="state.selectedFormTemplateNameId">
                <bandingForm :formTemplateNameId="state.selectedFormTemplateNameId"></bandingForm>
            </div>            
        </div>
        <div>
            <div class="text-lg text-snhm">Tegnforklaring</div>
            <div class="border-b border-snhm"></div>
            <div class="mt-2">
                <button_legend></button_legend>
            </div>
        </div>
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