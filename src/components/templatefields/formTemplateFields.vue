<template>
    <div>
        <div class="flex flex-col gap-y-2">
            <formTemplateHeader
                :formTemplateNameId="Number(route.params.templateNameId)"></formTemplateHeader>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div class="border border-gray-400 rounded p-3">
                    <div class="text-xl text-snhm mb-2">Selected Fields</div>
                    <formTemplateFieldsSelected></formTemplateFieldsSelected>
                </div>
                <div class="border border-gray-400 rounded p-3">
                    <div class="text-xl text-snhm mb-2">Available Fields</div>
                    <formTemplateFieldsChoose></formTemplateFieldsChoose>
                </div>
                <div class="border border-gray-400 rounded p-3 lg:col-span-2">
                    <div class="text-xl text-snhm mb-2">Banding Form</div>
                    <bandingForm></bandingForm>
                </div>
            </div>
        </div>
        <tw-button :caption="'OK'" @click="goBack()" class="mt-2 w-20"></tw-button>
    </div>
</template>

<script setup lang="ts">
import bandingForm from '@/components/banding/bandingForm.vue';
import formTemplateHeader from '@/components/template/formTemplateHeader.vue';
import formTemplateFieldsSelected from '@/components/templatefields/formTemplateFieldsSelected.vue';
import formTemplateFieldsChoose from '@/components/templatefields/formTemplateFieldsChoose.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

function goBack(): void {
    router.back();
}
</script>