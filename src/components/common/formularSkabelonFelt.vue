<template>
    <div class="flex gap-x-1 border px-1 rounded border-gray-300">
        <div class="w-3 h-3 rounded-full relative top-2" :class="getIndicatorClass()"></div>
        <a @click="fjernFelt(skabelonFelt.id)">
            <div class="cursor-pointer">{{ skabelonFelt.feltNavn }}</div>
        </a>
    </div>
</template>

<script setup lang="ts">
import type { formularSkabelonFeltType } from '@/types/formularSkabelonType';
const emit = defineEmits(['fjern-felt']);

interface formularSkabelonFeltProps {
    skabelonFelt: formularSkabelonFeltType
}

const props = defineProps<formularSkabelonFeltProps>();

function getIndicatorClass() : string {
    if(props.skabelonFelt.erMinimumsFelt) return 'bg-green-500';
    if(!props.skabelonFelt.erMinimumsFelt && props.skabelonFelt.licenshaverId) return 'bg-yellow-500'
    return 'bg-gray-500';
}

function fjernFelt(id:number) :void {
    emit('fjern-felt', id);
}
</script>