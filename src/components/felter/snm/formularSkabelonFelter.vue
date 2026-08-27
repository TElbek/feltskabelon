<template>
    <tw-flex>
        <div v-for="model in state.skabelonFormularFeltModelList">
            <span class="border text-gray-600 border-gray-300 px-2 rounded">{{ model.maerkningsFormularFelt.placeholder }}</span>
        </div>
    </tw-flex>
</template>

<script setup lang="ts">
import maerkningsFormular from '@/components/maerkning/maerkningsFormular.vue';
import type { skabelonFormularFeltModelType } from '@/models/skabelonFormularFeltModel';
import { onMounted, reactive } from 'vue';
import { useFormularStore } from '@/stores/formularStore';
import { useRoute } from 'vue-router';

const formularStore = useFormularStore();
const route = useRoute();

const state = reactive({
    skabelonFormularFeltModelList: [] as skabelonFormularFeltModelType[]
});

onMounted(() => {
    state.skabelonFormularFeltModelList = formularStore.getFormularFelterBySkabelonNavnId(Number(route.params.skabelonNavnId))
})
</script>