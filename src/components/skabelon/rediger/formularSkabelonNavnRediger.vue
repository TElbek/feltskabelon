<template>
    <div v-if="state.hasData" class="lg:w-5/10">
        <div class="text-xl text-snhm">{{ state.skabelonRedigerModel.formularSkabelonNavn.skabelonNavn }}</div>
        <div class="p-3 border border-snhm rounded mt-2">
            <form>
                <div class="flex flex-col gap-1">
                    <tw-label :for="'formularSkabelonId'">Navn</tw-label>
                    <tw-input :name="'formularSkabelonId'" :type="'text'"
                        v-model="state.skabelonRedigerModel.formularSkabelonNavn.skabelonNavn" v-focus></tw-input>
                    <tw-label :for="'maerkningsScenarieId'">Scenarie</tw-label>
                    <tw-input-select v-if="formularStore.erAdministrator"
                        v-model="state.skabelonRedigerModel.formularSkabelon.maerkningsScenarieId"
                        :name="'maerkningsScenarieId'">
                        <option v-for="scenarie in formularStore.maerkningsScenarieListe" :value="scenarie.id">
                            {{ scenarie.navn }}
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
import { useFormularStore } from '@/stores/formularStore';
import { computed, onMounted, reactive } from 'vue';
import type { skabelonModelType } from '@/models/skabelonModelType';
import { useRouteLogic } from '@/composables/route-logic';

const formularStore = useFormularStore();
const route = useRoute();
const router = useRouter();
const {isAtSkabelonKopierRoute} = useRouteLogic();

const state = reactive({
    hasData: false as boolean,
    skabelonRedigerModel: {} as skabelonModelType
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
    return formularStore.maerkningsScenarieListe
        .some((item) => item.id == state.skabelonRedigerModel.formularSkabelon.maerkningsScenarieId) ?
        formularStore.maerkningsScenarieListe
            .find((item) => item.id == state.skabelonRedigerModel.formularSkabelon.maerkningsScenarieId)?.navn : ''
});

function getSkabelonNavnModel(): void {
    let value = formularStore.getSkabelonNavnModelById(Number(route.params.skabelonNavnId));
    if (value) {
        state.skabelonRedigerModel = value;
        state.hasData = true;
    }
}

function getSkabelonNavnModelKopi(): void {
    let value = formularStore.kopierSkabelonNavn(Number(route.params.skabelonNavnId));
    if (value) {
        state.skabelonRedigerModel = value;
        state.hasData = true;
    }
}

function save() {
    if(isAtSkabelonKopierRoute.value) {
        formularStore.opretSkabelonNavn(state.skabelonRedigerModel);
    }
    else {
        formularStore.opdaterSkabelon(state.skabelonRedigerModel);
    }
    router.back();
}

function cancel() {
    router.back();
}
</script>