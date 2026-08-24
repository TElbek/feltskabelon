<template>
    <div class="rounded border border-gray-400 px-2 pb-2">
        <div class="font-semibold text-2xl text-snhm">Skabeloner</div>
        <div class="flex flex-row gap-x-4">
            <template v-for="skabelon in formularStore.formularSkabeloner">
                <a @click="formularStore.setFormularSkabelonId(skabelon.id)" class="cursor-pointer text-gray-500">
                    <span :class="getValgtSkabelonClass(skabelon.id)">{{ scenarieEnum[skabelon.scenarie] }}</span>
                </a>
            </template>
        </div>
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