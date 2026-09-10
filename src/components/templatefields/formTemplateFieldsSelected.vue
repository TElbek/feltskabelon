<template>
    <tw-flex>
        <div v-for="model in sortedFormTemplateFieldModelList"
            :class="[routeLogic.isAtTemplateFieldsEditRoute.value ? 'cursor-pointer' : 'cursor-default']">
            <a :class="!dataStore.isAdministrator && model.formTemplateFieldType.isMinimumField ? 'disableClick' : ''"
                @click="removeTemplateField(model.formTemplateFieldType.id)">
                <div class="border text-gray-500 border-gray-400 px-2 rounded flex flex-row gap-x-2">
                    <div v-if="!dataStore.isAdministrator"
                         class="w-3.5 h-3.5 rounded-full relative top-1.5 shadow shadow-gray-400"
                        :class="[model.formTemplateFieldType.isMinimumField ? 'bg-red-500' : 'bg-green-500']"></div>
                    <span                        
                        :title="model.formTemplateFieldType.id + ' ' + model.formTemplateFieldType.ringingFieldId">{{
                            model.ringingFieldType.placeholder
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
    return state.templateFieldModelList.sort((a, b) => a.ringingFieldType.placeholder.localeCompare(b.ringingFieldType.placeholder,'da-DK'));
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