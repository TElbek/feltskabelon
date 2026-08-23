<template>
    <div class="flex gap-x-1 border px-1 rounded border-gray-300 w-30">
        <div class="w-3 h-3 rounded-full relative top-2" :class="getIndicatorClass()"></div>
        <div class="text-gray-500">{{ felt.feltNavn }}</div>
    </div>
</template>

<script setup lang="ts">
import type { formularSkabelonFeltType } from '@/types/formularSkabelonType';

interface formularSkabelonFeltProps {
    felt: formularSkabelonFeltType
}

const props = defineProps<formularSkabelonFeltProps>();

function getIndicatorClass() : string {
    if(props.felt.erMinimumsFelt) return 'bg-green-500';
    if(!props.felt.erMinimumsFelt && props.felt.licenshaverId) return 'bg-yellow-500'
    return 'bg-gray-500';
}
</script>