<template>
    <tw-flex>
        <div v-for="model in sortedFormTemplateFieldModelList"
            :class="[routeLogic.isAtTemplateFieldsEditRoute.value ? 'cursor-pointer' : 'cursor-default']">
            <a :class="!dataStore.isAdministrator && model.formTemplateFieldType.isMinimumsField ? 'disableClick' : ''"
                @click="removeTemplateField(model.formTemplateFieldType.id)">
                <div class="border text-gray-500 border-gray-300 px-2 rounded flex flex-row gap-x-2"
                :class="[model.bandingFieldType.isBasicField ? 'border-2 border-gray-400' : 'border border-gray-300']">
                    <div v-if="!dataStore.isAdministrator"
                         class="w-3.5 h-3.5 rounded-full relative top-1.5 shadow shadow-gray-400"
                        :class="[model.formTemplateFieldType.isMinimumsField ? 'bg-red-500' : 'bg-green-500']"></div>
                    <span                        
                        :title="model.formTemplateFieldType.id + ' ' + model.formTemplateFieldType.bandingFieldId">{{
                            model.bandingFieldType.placeholder
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

const dataStore = useDataStore();
const { refreshIndex } = storeToRefs(dataStore);


const state = reactive({
    templateFieldModelList: [] as templateFieldModelType[]
});

onMounted(() => {
    getFormTemplateFields();
});

function getFormTemplateFields(): void {
    state.templateFieldModelList = dataStore.getTemplateFieldsByTemplateNameId(Number(route.params.templateNameId));
}

const sortedFormTemplateFieldModelList = computed(() => {
    return state.templateFieldModelList.sort((a, b) => a.bandingFieldType.placeholder.localeCompare(b.bandingFieldType.placeholder));
});

function removeTemplateField(formTemplateFieldId: number): void {
    if(routeLogic.isAtTemplateFieldsEditRoute.value) {
        dataStore.removeFormTemplateField(formTemplateFieldId);
    }
}

watch(refreshIndex, () => {
    getFormTemplateFields();
})

</script>