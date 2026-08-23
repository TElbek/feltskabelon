<template>
    <div class="border border-gray-200 px-1 rounded flex gap-x-2">
        <div class="w-3 h-3 rounded-full relative top-2 bg-gray-300"></div>
        <a @click="feltValgt(props.muligtFelt)"><span class="cursor-pointer">{{ props.muligtFelt.feltNavn }}</span></a>
    </div>
</template>

<script setup lang="ts">
import {type FeltType} from '@/types/feltType.ts'
interface muligtFeltProps {
    muligtFelt:  FeltType
}

const emit = defineEmits(['felt-valgt']);
const props = defineProps<muligtFeltProps>();

function feltValgt(felt: FeltType) : void {
    emit('felt-valgt',felt);
}
</script>