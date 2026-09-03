<template>
    <tw-flex>
        <template v-for="maerkningsFormularFelt in sortBandingFormFieldList">
            <a @click="addFormTemplateField(maerkningsFormularFelt.id)" 
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

const dataStore = useDataStore();
const { refreshIndex } = storeToRefs(dataStore);

const state = reactive({
    bandingFormList: [] as bandingFormType[]
});

const sortBandingFormFieldList = computed(() => {
    return state.bandingFormList.sort((a,b) => a.placeholder.localeCompare(b.placeholder));
})

onMounted(() => {
    getbandingFormList(); 
});

function getbandingFormList() {
    state.bandingFormList = dataStore.getChooseBandingFieldsByTemplateNameId(Number(route.params.templateNameId));
}

function addFormTemplateField(maerkningsFeltId: number) {
    if(routeLogic.isSkabelonFelterRedigerRoute.value) {
        dataStore.addFormTemplateField(Number(route.params.templateNameId), maerkningsFeltId);
    }
}

watch(refreshIndex, () => {
    getbandingFormList();
})
</script>