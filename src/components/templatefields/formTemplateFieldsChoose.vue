<template>
    <tw-flex>
        <template v-for="ringingField in sortRingingFieldList">
            <a @click="addFormTemplateField(ringingField.id)"
                :class="[routeLogic.isAtTemplateFieldsEditRoute.value ? 'cursor-pointer' : 'cursor-default']">
                <span class="text-gray-500  px-1 rounded border border-gray-400">
                    {{ ringingField.placeholder }}</span>
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
import type { ringingFieldType } from '@/types/ringingFieldType';

const routeLogic = useRouteLogic();
const route = useRoute();

const dataStore = useDataStore();
const { refreshIndex } = storeToRefs(dataStore);

const state = reactive({
    ringingFieldList: [] as ringingFieldType[]
});

const sortRingingFieldList = computed(() => {
    return state.ringingFieldList.sort((a, b) => a.placeholder.localeCompare(b.placeholder));
})

onMounted(() => {
    getRingingFieldList();
});

function getRingingFieldList() {
    state.ringingFieldList = dataStore.getChooseRingingFieldsByTemplateNameId(Number(route.params.templateNameId));
}

function addFormTemplateField(ringingFieldId: number) {
    if (routeLogic.isAtTemplateFieldsEditRoute.value) {
        dataStore.addFormTemplateField(Number(route.params.templateNameId), ringingFieldId);
    }
}

watch(refreshIndex, () => {
    getRingingFieldList();
})
</script>