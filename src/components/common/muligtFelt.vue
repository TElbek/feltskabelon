<template>
    <div class="border border-gray-200 px-1 rounded flex gap-x-2">
        <div class="w-3 h-3 rounded-full relative top-2 bg-gray-300"></div>
        <span>{{ props.muligtFelt.feltNavn }}</span>
    </div>
</template>

<script setup lang="ts">
import {type FeltType} from '@/types/feltType.ts'
interface muligtFeltProps {
    muligtFelt:  FeltType
}

const props = defineProps<muligtFeltProps>();
</script>