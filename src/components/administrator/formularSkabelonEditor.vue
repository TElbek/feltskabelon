<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4">
        <div>
            <div class="text-gray-700 text-lg font-semibold border-b border-gray-400">Skabelonfelter</div>
            <div class="flex flex-row flex-wrap gap-2 mt-1.5">
                <template v-for="skabelonFelt in formularStore.formularSkabelonFelterForAdministrator">
                    <formular-skabelon-felt :skabelonFelt="skabelonFelt"></formular-skabelon-felt>
                </template>
            </div>
        </div>
        <div>
            <div class="text-gray-700 text-lg font-semibold border-b border-gray-400">Mulige felter</div>
            <div class="flex flex-row flex-wrap gap-2 mt-2">
                <template v-for="felt in formularStore.felterIkkeISkabelon">
                    <muligt-felt :muligtFelt="felt" @felt-valgt="tilfoejFelt"></muligt-felt>
                </template>
            </div>
        </div>
        <div class="lg:col-span-2">
            <div class="text-gray-700 text-lg font-semibold border-b border-gray-400">Ringmærkningsdata</div>
            <maerkning></maerkning>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import formularSkabelonFelt from '@/components/common/formularSkabelonFelt.vue';
import muligtFelt from '@/components/common/muligtFelt.vue';
import maerkning  from '@/components/maerkning/maerkning.vue';

import type { FeltType } from '@/types/feltType.ts';

const formularStore = useFormularStore();

function tilfoejFelt(felt: FeltType) : void {
    formularStore.tilfoejFeltTilSkabelon(felt);
}
</script>