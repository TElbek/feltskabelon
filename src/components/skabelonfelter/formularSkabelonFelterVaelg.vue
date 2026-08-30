<template>
    <div class="text-xl text-snhm mb-2">Vælg felter</div>
    <tw-flex>
        <template v-for="maerkningsFormularFelt in sortMaerkningsFormularFeltList">
            <a @click="tilfoejSkabelonFelt(maerkningsFormularFelt.id)" class="cursor-pointer">
                <span class="text-gray-500  px-1 rounded"
                     :class="[maerkningsFormularFelt.basisfelt ? 'border-2 border-gray-400' : 'border border-gray-300']">
                      {{ maerkningsFormularFelt.placeholder }}</span>
            </a>
        </template>
    </tw-flex>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useFormularStore } from '@/stores/formularStore';
import { useRoute } from 'vue-router';
import type { MaerkningsFormularFeltType } from '@/types/MaerkningsFormularFeltType';

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

function tilfoejSkabelonFelt(maerkningsFeltId: number) {
    formularStore.tilfoejSkabelonFelt(Number(route.params.skabelonNavnId), maerkningsFeltId);
}

watch(genopfriskIndex, () => {
    getVaelgMaerkningsFelter();
})
</script>