<template>
    <div v-for="navn in formularSkabelonNavne">
        <span>{{ navn.skabelonNavn }}</span>
    </div>
</template>

<script setup lang="ts">
interface propsInterface {
    formularSkabelonId: number
}

import { useFormularStore } from '@/stores/formularStore';
import { computed } from 'vue';
const formularStore = useFormularStore();
const props = defineProps<propsInterface>();

const formularSkabelonNavne = computed(() => formularStore.formularSkabelonNavnListe
                                            .filter((item) => item.id == props.formularSkabelonId && item.licenshaverId == undefined))
</script>