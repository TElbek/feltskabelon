<template>
    <div class="flex flex-row gap-x-4">
        <div class="font-semibold">Skabeloner:</div>
        <template v-for="skabelon in formularStore.formularSkabeloner">
            <a @click="formularStore.setFormularSkabelonId(skabelon.id)" class="cursor-pointer">
                <span :class="getValgtSkabelonClass(skabelon.id)">{{scenarieEnum[skabelon.scenarie] }}</span>
            </a>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import { scenarieEnum } from '@/types/scenarieEnumType';
const formularStore = useFormularStore();

function getValgtSkabelonClass(skabelonId: number) {
    return skabelonId == formularStore.formularSkabelonId ? 'font-bold border-b border-gray-400' : '';
}
</script>