<template>
    <div class="text-xl text-snhm mb-2">Vælg felter</div>
    <tw-flex>
        <template v-for="maerkningsFormularFelt in sortMaerkningsFormularFeltList">
            <a @click="tilfoejSkabelonFelt(maerkningsFormularFelt.id)" 
                :class="[routeLogic.isSkabelonFelterRedigerRoute.value ? 'cursor-pointer' : 'cursor-default']">
                <span class="text-gray-500  px-1 rounded"
                     :class="[maerkningsFormularFelt.isBasicField ? 'border-2 border-gray-400' : 'border border-gray-300']">
                      {{ maerkningsFormularFelt.placeholder }}</span>
            </a>
        </template>
    </tw-flex>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/dataStore';
import { useRoute } from 'vue-router';
import { useRouteLogic } from '@/composables/route-logic';
import type { bandingFormType } from '@/types/bandingFormType';

const routeLogic = useRouteLogic();
const route = useRoute();

const formularStore = useDataStore();
const { refreshIndex: genopfriskIndex } = storeToRefs(formularStore);

const state = reactive({
    MaerkningsFormularFeltList: [] as bandingFormType[]
});

const sortMaerkningsFormularFeltList = computed(() => {
    return state.MaerkningsFormularFeltList.sort((a,b) => a.placeholder.localeCompare(b.placeholder));
})

onMounted(() => {
    getVaelgMaerkningsFelter(); 
});

function getVaelgMaerkningsFelter() {
    state.MaerkningsFormularFeltList = formularStore.getChooseBandingFieldsByTemplateNameId(Number(route.params.skabelonNavnId))
}

function tilfoejSkabelonFelt(maerkningsFeltId: number) {
    if(routeLogic.isSkabelonFelterRedigerRoute.value) {
        formularStore.addFormTemplateField(Number(route.params.skabelonNavnId), maerkningsFeltId);
    }
}

watch(genopfriskIndex, () => {
    getVaelgMaerkningsFelter();
})
</script>