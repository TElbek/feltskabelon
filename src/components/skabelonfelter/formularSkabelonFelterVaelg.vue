<template>
    <div class="text-xl text-snhm mb-2">Vælg felter</div>
    <tw-flex>
        <template v-for="maerkningsFelt in sortMaerkningsFormularFeltList">
            <span class="border text-gray-500 border-gray-300 px-2 rounded">{{ maerkningsFelt.placeholder }}</span>
        </template>
    </tw-flex>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useFormularStore } from '@/stores/formularStore';
import { useRoute } from 'vue-router';
import type { MaerkningsFormularFeltType } from '@/types/MaerkningsFormularFelt';

const formularStore = useFormularStore();
const { genopfriskIndex } = storeToRefs(formularStore);
const route = useRoute();

const state = reactive({
    MaerkningsFormularFeltList: [] as MaerkningsFormularFeltType[]
});

const sortMaerkningsFormularFeltList = computed(() => {
    return state.MaerkningsFormularFeltList.sort((a,b) => a.placeholder.localeCompare(b.placeholder));
})

onMounted(() => {
    getVaelgMaerkningsFelter(); 
});

function getVaelgMaerkningsFelter() {
    state.MaerkningsFormularFeltList = formularStore.getVaelgMaerkningsFeltBySkabelonNavnId(Number(route.params.skabelonNavnId))
}

watch(genopfriskIndex, () => {
    getVaelgMaerkningsFelter();
})
</script>