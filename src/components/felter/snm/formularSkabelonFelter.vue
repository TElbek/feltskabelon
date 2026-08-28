<template>
    <div class="mb-2 mt-1">
        <formular-skabelon-header :formularSkabelonNavnId="Number(route.params.skabelonNavnId)"></formular-skabelon-header>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div class="border border-gray-300 rounded p-3">
            <div class="text-xl text-snhm mb-2">Valgte felter</div>
            <tw-flex>
                <div v-for="model in sortedSkabelonFormularFeltModelList">
                    <span class="border text-gray-500 border-gray-300 px-2 rounded">{{
                        model.maerkningsFormularFelt.placeholder
                        }}</span>
                </div>
            </tw-flex>
        </div>
        <div class="border border-gray-300 rounded p-3">
            <div class="text-xl text-snhm mb-2">Andre felter</div>
        </div>
        <div class="border border-gray-300 rounded p-3 lg:col-span-2">
            <div class="text-xl text-snhm mb-2">Mærkningsformular</div>
            <maerknings-formular></maerknings-formular>
        </div>
    </div>
</template>

<script setup lang="ts">
import maerkningsFormular from '@/components/maerkning/maerkningsFormular.vue';
import formularSkabelonHeader from '@/components/formular/formularSkabelonHeader.vue';
import type { skabelonFormularFeltModelType } from '@/models/skabelonFormularFeltModel';
import { computed, onMounted, reactive } from 'vue';
import { useFormularStore } from '@/stores/formularStore';
import { useRoute } from 'vue-router';

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