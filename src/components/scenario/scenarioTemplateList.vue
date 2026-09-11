<template>
    <tw-flex>
        <div v-for="model in state.templateModelList" :key="model.formTemplate.id">
            <router-link :to="`${getPathByLicenseeId(model.formTemplateName.licenseeId)}${model.formTemplateName.id}`">
                <div class="border border-gray-400 flex gap-x-2 px-2 rounded">
                    <div>{{ model.formTemplateName.templateName }}</div>
                    <div v-if="model.formTemplateName.licenseeId != undefined" class="italic text-gray-500">
                        ({{ getLicenseeNameById(model.formTemplateName.licenseeId) }})
                    </div>
                </div>
            </router-link>
        </div>
    </tw-flex>
</template>

<script setup lang="ts">
import type { templateModelType } from '@/models/templateModelType';
import { useDataStore } from '@/stores/dataStore';
import { onMounted, reactive } from 'vue';

interface scenarioTemplateProps {
    scenarioId: number
}

const props = defineProps<scenarioTemplateProps>();
const datastore = useDataStore();

const state = reactive({
    templateModelList: [] as templateModelType[],
});

onMounted(() => {
    state.templateModelList = datastore.getTemplateModelListForScenario(props.scenarioId);
});

function getLicenseeNameById(licenseeId: number): string {
    return datastore.licenseeList.find((item) => item.id == licenseeId)?.name ?? '';
}

function getPathByLicenseeId(licenseeId: number | undefined): string {
    return licenseeId == undefined ?
        '/template/fields/edit/' : '/template/fields/view/';
}
</script>