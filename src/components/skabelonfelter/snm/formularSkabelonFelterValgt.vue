<template>
    <tw-flex>
        <div v-for="model in sortedSkabelonFormularFeltModelList">
            <span class="border text-gray-500 border-gray-300 px-2 rounded">{{
                model.maerkningsFormularFelt.placeholder
            }}</span>
        </div>
    </tw-flex>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';

import { useFormularStore } from '@/stores/formularStore';
import { useRoute } from 'vue-router';
import type { skabelonFormularFeltModelType } from '@/models/skabelonFormularFeltModel';

const formularStore = useFormularStore();
const route = useRoute();

const state = reactive({
    skabelonFormularFeltModelList: [] as skabelonFormularFeltModelType[]
});

onMounted(() => {
    state.skabelonFormularFeltModelList = formularStore.getFormularFelterBySkabelonNavnId(Number(route.params.skabelonNavnId))
});


const sortedSkabelonFormularFeltModelList = computed(() => {
    return state.skabelonFormularFeltModelList.sort((a, b) => a.maerkningsFormularFelt.placeholder.localeCompare(b.maerkningsFormularFelt.placeholder));
});
</script>