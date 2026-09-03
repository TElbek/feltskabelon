<template>
    <div v-if="state.hasData" class="lg:w-5/10">
        <div class="text-xl text-snhm">{{ state.skabelonRedigerModel.formTemplateNameType.templateName }}</div>
        <div class="p-3 border border-snhm rounded mt-2">
            <form>
                <div class="flex flex-col gap-1">
                    <tw-label :for="'formularSkabelonId'">Navn</tw-label>
                    <tw-input :name="'formularSkabelonId'" :type="'text'"
                        v-model="state.skabelonRedigerModel.formTemplateNameType.templateName" v-focus></tw-input>
                    <tw-label :for="'maerkningsScenarieId'">Scenarie</tw-label>
                    <tw-input-select v-if="formularStore.isAdministrator"
                        v-model="state.skabelonRedigerModel.formTemplateType.bandingScenarioId"
                        :name="'maerkningsScenarieId'">
                        <option v-for="scenarie in formularStore.bandingScenarioList" :value="scenarie.id">
                            {{ scenarie.name }}
                        </option>
                    </tw-input-select>
                    <div v-else>
                        <div class="border-gray-400 border px-2 rounded">
                            <span class="text-gray-400">{{ scenarieNavn }}</span>
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

const formularStore = useDataStore();
const route = useRoute();
const router = useRouter();
const {isAtSkabelonKopierRoute} = useRouteLogic();

const state = reactive({
    hasData: false as boolean,
    skabelonRedigerModel: {} as templateModelType
});

onMounted(() => {
    if(isAtSkabelonKopierRoute.value) {
        getSkabelonNavnModelKopi();
    }
    else {
        getSkabelonNavnModel();
    }
});

const scenarieNavn = computed(() => {
    return formularStore.bandingScenarioList
        .some((item) => item.id == state.skabelonRedigerModel.formTemplateType.bandingScenarioId) ?
        formularStore.bandingScenarioList
            .find((item) => item.id == state.skabelonRedigerModel.formTemplateType.bandingScenarioId)?.name : ''
});

function getSkabelonNavnModel(): void {
    let value = formularStore.getTemplateNameModelById(Number(route.params.skabelonNavnId));
    if (value) {
        state.skabelonRedigerModel = value;
        state.hasData = true;
    }
}

function getSkabelonNavnModelKopi(): void {
    let value = formularStore.copyTemplateName(Number(route.params.skabelonNavnId));
    if (value) {
        state.skabelonRedigerModel = value;
        state.hasData = true;
    }
}

function save() {
    if(isAtSkabelonKopierRoute.value) {
        formularStore.createTemplateName(state.skabelonRedigerModel);
    }
    else {
        formularStore.updateFormTemplate(state.skabelonRedigerModel);
    }
    router.back();
}

function cancel() {
    router.back();
}
</script>