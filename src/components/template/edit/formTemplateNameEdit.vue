<template>
    <div v-if="state.hasData" class="lg:w-5/10">
        <div class="text-xl text-snhm">{{ state.templateModel.formTemplateNameType.templateName }}</div>
        <div class="p-3 border border-snhm rounded mt-2">
            <form>
                <div class="flex flex-col gap-1">
                    <tw-label :for="'formularSkabelonId'">Navn</tw-label>
                    <tw-input :name="'formularSkabelonId'" :type="'text'"
                        v-model="state.templateModel.formTemplateNameType.templateName" v-focus></tw-input>
                    <tw-label :for="'maerkningsScenarieId'">Scenarie</tw-label>
                    <tw-input-select v-if="dataStore.isAdministrator"
                        v-model="state.templateModel.formTemplateType.bandingScenarioId"
                        :name="'maerkningsScenarieId'">
                        <option v-for="scenarie in dataStore.bandingScenarioList" :value="scenarie.id">
                            {{ scenarie.name }}
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
                <tw-button :caption="'Gem'" @clicked="save"></tw-button>
                <tw-button :caption="'Fortryd'" @clicked="cancel"></tw-button>
            </tw-flex>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataStore';
import { computed, onMounted, reactive } from 'vue';
import type { templateModelType } from '@/models/templateModelType';
import { useRouteLogic } from '@/composables/route-logic';

const dataStore = useDataStore();
const route = useRoute();
const router = useRouter();
const {isAtTemplateNameCopyRoute} = useRouteLogic();

const state = reactive({
    hasData: false as boolean,
    templateModel: {} as templateModelType
});

onMounted(() => {
    if(isAtTemplateNameCopyRoute.value) {
        getCopyOfTemplateNameModel();
    }
    else {
        getTemplateNameModel();
    }
});

const scenarioName = computed(() => {
    return dataStore.bandingScenarioList
        .some((item) => item.id == state.templateModel.formTemplateType.bandingScenarioId) ?
        dataStore.bandingScenarioList
            .find((item) => item.id == state.templateModel.formTemplateType.bandingScenarioId)?.name : ''
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
    if(isAtTemplateNameCopyRoute.value) {
        dataStore.createTemplateName(state.templateModel);
    }
    else {
        dataStore.updateFormTemplate(state.templateModel);
    }
    router.back();
}

function cancel() {
    router.back();
}
</script>