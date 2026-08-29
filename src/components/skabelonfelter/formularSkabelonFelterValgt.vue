<template>
    <tw-flex>
        <div v-for="model in sortedSkabelonFormularFeltModelList">
            <a :class="!formularStore.erAdministrator && model.formularSkabelonFelt.erMinimumsFelt ? 'disableClick' : ''"
                class="cursor-pointer" @click="fjernSkabelonFelt(model.formularSkabelonFelt.id)">
                <div class="border text-gray-500 border-gray-300 px-2 rounded flex flex-row gap-x-2">
                    <div class="w-2.5 h-2.5 rounded-full relative top-2"
                        :class="[model.formularSkabelonFelt.erMinimumsFelt ? 'bg-red-500' : 'bg-green-500']"></div>
                    <span
                        :title="model.formularSkabelonFelt.id + ' ' + model.formularSkabelonFelt.maerkningsFormularFeltId">{{
                            model.maerkningsFormularFelt.placeholder
                        }}</span>
                </div>
            </a>
        </div>
    </tw-flex>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useFormularStore } from '@/stores/formularStore';
import { useRoute } from 'vue-router';
import type { skabelonFeltModelType } from '@/models/skabelonFeltModelType';

const formularStore = useFormularStore();
const { genopfriskIndex } = storeToRefs(formularStore);
const route = useRoute();

const state = reactive({
    skabelonFormularFeltModelList: [] as skabelonFeltModelType[]
});

onMounted(() => {
    getFormularSkabelonFelter();
});

function getFormularSkabelonFelter(): void {
    state.skabelonFormularFeltModelList = formularStore.getFormularFelterBySkabelonNavnId(Number(route.params.skabelonNavnId));
}

const sortedSkabelonFormularFeltModelList = computed(() => {
    return state.skabelonFormularFeltModelList.sort((a, b) => a.maerkningsFormularFelt.placeholder.localeCompare(b.maerkningsFormularFelt.placeholder));
});

function fjernSkabelonFelt(formularSkabelonFeltId: number): void {
    formularStore.fjernSkabelonFelt(formularSkabelonFeltId);
}

watch(genopfriskIndex, () => {
    getFormularSkabelonFelter();
})

</script>