<template>
    <div v-if="state.hasData"  class="lg:w-5/10">
        <div class="text-xl text-snhm">{{ route.meta.title }}: {{ state.skabelonRedigerModel.formularSkabelon.id }}</div>
        <div class="p-3 border border-snhm rounded mt-2">
            <form>
                <div class="flex flex-col gap-1">
                    <tw-label :for="'formularSkabelonId'">Navn</tw-label>
                    <tw-input :name="'formularSkabelonId'" :type="'text'"
                        v-model="state.skabelonRedigerModel.formularSkabelonNavn.skabelonNavn" v-focus></tw-input>
                    <tw-label :for="'maerkningsScenarieId'">Scenarie</tw-label>
                    <tw-input-select v-model="state.skabelonRedigerModel.formularSkabelon.maerkningsScenarieId"
                        :name="'maerkningsScenarieId'">
                        <option v-for="scenarie in formularStore.maerkningsScenarieListe" :value="scenarie.id">
                            {{ scenarie.navn }}
                        </option>
                    </tw-input-select>
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
import { onMounted, reactive } from 'vue';
import type { skabelonRedigerModel } from '@/models/skabelonRedigerModel';

const formularStore = useFormularStore();
const route = useRoute();
const router = useRouter();

const state = reactive({
    hasData: false as boolean,
    skabelonRedigerModel: {} as skabelonRedigerModel
});

onMounted(() => {
    let value = formularStore.getSkabelonRedigerModelById(Number(route.params.skabelonId));
    if (value) {
        state.skabelonRedigerModel = value;
        state.hasData = true;
    }
});

function save() {
    formularStore.opdaterSkabelon(state.skabelonRedigerModel);
    router.back();
}

function cancel() {
    router.back();
}
</script>