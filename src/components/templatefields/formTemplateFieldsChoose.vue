<template>
    <tw-flex>
        <template v-for="bandingField in sortBandingFieldList">
            <a @click="addFormTemplateField(bandingField.id)" 
                :class="[routeLogic.isAtTemplateFieldsEditRoute.value ? 'cursor-pointer' : 'cursor-default']">
                <span class="text-gray-500  px-1 rounded"
                     :class="[bandingField.isBasicField ? 'border-2 border-gray-400' : 'border border-gray-300']">
                      {{ bandingField.placeholder }}</span>
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
import type { bandingFieldType } from '@/types/bandingFieldType';

const routeLogic = useRouteLogic();
const route = useRoute();

const dataStore = useDataStore();
const { refreshIndex } = storeToRefs(dataStore);

const state = reactive({
    bandingFieldList: [] as bandingFieldType[]
});

const sortBandingFieldList = computed(() => {
    return state.bandingFieldList.sort((a,b) => a.placeholder.localeCompare(b.placeholder));
})

onMounted(() => {
    getbandingFieldList(); 
});

function getbandingFieldList() {
    state.bandingFieldList = dataStore.getChooseBandingFieldsByTemplateNameId(Number(route.params.templateNameId));
}

function addFormTemplateField(bandingFieldId: number) {
    if(routeLogic.isAtTemplateFieldsEditRoute.value) {
        dataStore.addFormTemplateField(Number(route.params.templateNameId), bandingFieldId);
    }
}

watch(refreshIndex, () => {
    getbandingFieldList();
})
</script>