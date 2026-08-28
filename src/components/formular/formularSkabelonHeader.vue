<template>
    <div class="flex flew-row gap-x-2 text-xl text-snhm">
        <span>{{ state.formularSkabelonNavn?.skabelonNavn }}</span>
        <span>({{ state.maerkningsScenarieType?.navn }})</span>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import type { formularSkabelonNavnType } from '@/types/formularSkabelonNavnType';
import type { formularSkabelonType } from '@/types/formularSkabelonType';
import { useFormularStore } from '@/stores/formularStore';
import type { maerkningsScenarieType } from '@/types/maerkningsScenarieType';

interface formularSkabelonHeaderProps {
    formularSkabelonNavnId: number
}

const props = defineProps<formularSkabelonHeaderProps>();
const formularStore = useFormularStore();

const state = reactive({
    formularSkabelon: {} as formularSkabelonType | undefined,
    formularSkabelonNavn: {} as formularSkabelonNavnType | undefined,
    maerkningsScenarieType: {} as maerkningsScenarieType | undefined
});

onMounted(() => {
    state.formularSkabelonNavn = formularStore.formularSkabelonNavnListe.find((item) => item.id == props.formularSkabelonNavnId);
    if(state.formularSkabelonNavn) {
        state.formularSkabelon = formularStore.formularSkabelonListe.find((item) => item.id == state.formularSkabelonNavn?.formularSkabelonId);
        if(state.formularSkabelon) {
            state.maerkningsScenarieType = formularStore.maerkningsScenarieListe.find((item) => item.id == state.formularSkabelon?.maerkningsScenarieId)
        }
    }
})
</script>