<template>
    <tw-flex>
        <div v-for="model in sortedSkabelonFormularFeltModelList"
            :class="[routeLogic.isAtTemplateFieldsEditRoute.value ? 'cursor-pointer' : 'cursor-default']">
            <a :class="!formularStore.isAdministrator && model.formTemplateFieldType.isMinimumsField ? 'disableClick' : ''"
                @click="fjernSkabelonFelt(model.formTemplateFieldType.id)">
                <div class="border text-gray-500 border-gray-300 px-2 rounded flex flex-row gap-x-2"
                :class="[model.bandingFormType.isBasicField ? 'border-2 border-gray-400' : 'border border-gray-300']">
                    <div v-if="!formularStore.isAdministrator"
                         class="w-3.5 h-3.5 rounded-full relative top-1.5 shadow shadow-gray-400"
                        :class="[model.formTemplateFieldType.isMinimumsField ? 'bg-red-500' : 'bg-green-500']"></div>
                    <span                        
                        :title="model.formTemplateFieldType.id + ' ' + model.formTemplateFieldType.bandingFormId">{{
                            model.bandingFormType.placeholder
                        }}</span>
                </div>
            </a>
        </div>
    </tw-flex>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/dataStore';
import type { templateFieldModelType } from '@/models/templateFieldModelType';
import { useRoute } from 'vue-router';
import { useRouteLogic } from '@/composables/route-logic';

const routeLogic = useRouteLogic();
const route = useRoute();

const formularStore = useDataStore();
const { refreshIndex: genopfriskIndex } = storeToRefs(formularStore);


const state = reactive({
    skabelonFormularFeltModelList: [] as templateFieldModelType[]
});

onMounted(() => {
    getFormularSkabelonFelter();
});

function getFormularSkabelonFelter(): void {
    state.skabelonFormularFeltModelList = formularStore.getTemplateFieldsByTemplateNameId(Number(route.params.templateNameId));
}

const sortedSkabelonFormularFeltModelList = computed(() => {
    return state.skabelonFormularFeltModelList.sort((a, b) => a.bandingFormType.placeholder.localeCompare(b.bandingFormType.placeholder));
});

function fjernSkabelonFelt(formularSkabelonFeltId: number): void {
    if(routeLogic.isAtTemplateFieldsEditRoute.value) {
        formularStore.removeFormTemplateField(formularSkabelonFeltId);
    }
}

watch(genopfriskIndex, () => {
    getFormularSkabelonFelter();
})

</script>