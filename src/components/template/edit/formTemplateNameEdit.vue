<template>
    <div v-if="state.hasData" class="lg:w-5/10">
        <form-template-header :formTemplateNameId="state.templateModel.formTemplateName.id"></form-template-header>
        <div class="p-3 border border-snhm rounded mt-2">
            <form>
                <div class="flex flex-col gap-1">
                    <div class="grid grid-cols-[1fr_max-content] gap-x-3">
                        <div class="flex flex-col gap-1">
                            <tw-label :for="'formTemplateId'">Name</tw-label>
                            <tw-input :name="'formTemplateId'" :type="'text'"
                                v-model="state.templateModel.formTemplateName.templateName" v-focus></tw-input>
                        </div>
                        <div class="flex flex-col gap-1">
                            <tw-label :for="'isActive'">Active</tw-label>
                            <tw-input-checkbox v-model="state.templateModel.formTemplateName.isActive" :name="'isActive'" />
                        </div>
                    </div>
                    <tw-label :for="'bandingScenarioId'">Scenario</tw-label>
                    <tw-input-select v-if="dataStore.isAdministrator"
                        v-model="state.templateModel.formTemplate.bandingScenarioId" :name="'bandingScenarioId'">
                        <option v-for="scenario in dataStore.bandingScenarioList" :value="scenario.id">
                            {{ scenario.name }}
                        </option>
                    </tw-input-select>
                    <div v-else>
                        <div class="border-gray-400 border px-2 rounded">
                            <span class="text-gray-400">{{ scenarioName }}</span>
                        </div>
                    </div>
                </div>
            </form>
            <tw-flex class="mt-3">
                <tw-button :caption="'Save'" @clicked="save" :disabled="!isValid()"></tw-button>
                <tw-button :caption="'Cancel'" @clicked="cancel"></tw-button>
            </tw-flex>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataStore';
import { computed, onMounted, reactive } from 'vue';
import formTemplateHeader from '@/components/template/formTemplateHeader.vue'
import type { templateModelType } from '@/models/templateModelType';
import { useRouteLogic } from '@/composables/route-logic';

const dataStore = useDataStore();
const route = useRoute();
const router = useRouter();
const { isAtTemplateNameCopyRoute, isAtTemplateAddRoute } = useRouteLogic();

const state = reactive({
    hasData: false as boolean,
    templateModel: {} as templateModelType
});

onMounted(() => {
    if (isAtTemplateNameCopyRoute.value) {
        getCopyOfTemplateNameModel();
    }
    else if (isAtTemplateAddRoute.value) {
        state.templateModel = dataStore.addTemplateModelFactory();
        state.hasData = true;
    }
    else {
        getTemplateNameModel();
    }
});

const scenarioName = computed(() => {
    return dataStore.bandingScenarioList
        .some((item) => item.id == state.templateModel.formTemplate.bandingScenarioId) ?
        dataStore.bandingScenarioList
            .find((item) => item.id == state.templateModel.formTemplate.bandingScenarioId)?.name : ''
});

function getTemplateNameModel(): void {
    let value = dataStore.getTemplateNameModelById(Number(route.params.templateNameId));
    if (value) {
        state.templateModel = value;
        state.hasData = true;
    }
}

function getCopyOfTemplateNameModel(): void {
    let value = dataStore.copyTemplateName(Number(route.params.templateNameId));
    if (value) {
        state.templateModel = value;
        state.hasData = true;
    }
}

function save() {
    if (isAtTemplateNameCopyRoute.value) {
        dataStore.createTemplateName(state.templateModel);
    }
    else if (isAtTemplateAddRoute.value) {
        dataStore.addTemplateModel(state.templateModel);
    }
    else {
        dataStore.updateFormTemplate(state.templateModel);
    }
    router.back();
}

function isValid() {
    return state.templateModel.formTemplateName.templateName.length > 0 && 
           state.templateModel.formTemplate.bandingScenarioId > 0;
}

function cancel() {
    router.back();
}
</script>