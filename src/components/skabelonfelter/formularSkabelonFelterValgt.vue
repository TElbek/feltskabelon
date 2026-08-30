<template>
    <tw-flex>
        <div v-for="model in sortedSkabelonFormularFeltModelList"
            :class="[routeLogic.isSkabelonFelterRedigerRoute.value ? 'cursor-pointer' : 'cursor-default']">
            <a :class="!formularStore.erAdministrator && model.formularSkabelonFelt.erMinimumsFelt ? 'disableClick' : ''"
                @click="fjernSkabelonFelt(model.formularSkabelonFelt.id)">
                <div class="border text-gray-500 border-gray-300 px-2 rounded flex flex-row gap-x-2"
                :class="[model.maerkningsFormularFelt.basisfelt ? 'border-2 border-gray-400' : 'border border-gray-300']">
                    <div v-if="!formularStore.erAdministrator"
                         class="w-3.5 h-3.5 rounded-full relative top-1.5 shadow shadow-gray-400"
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
import type { skabelonFeltModelType } from '@/models/skabelonFeltModelType';
import { useRoute } from 'vue-router';
import { useRouteLogic } from '@/composables/route-logic';

const routeLogic = useRouteLogic();
const route = useRoute();

const formularStore = useFormularStore();
const { genopfriskIndex } = storeToRefs(formularStore);


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
    if(routeLogic.isSkabelonFelterRedigerRoute.value) {
        formularStore.fjernSkabelonFelt(formularSkabelonFeltId);
    }
}

watch(genopfriskIndex, () => {
    getFormularSkabelonFelter();
})

</script>