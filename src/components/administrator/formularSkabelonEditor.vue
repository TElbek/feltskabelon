<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4">
        <div>
            <div class="text-gray-700 font-semibold border-b border-gray-300">Skabelonfelter</div>
            <div class="flex flex-row flex-wrap gap-3 mt-1.5">
                <template v-for="skabelonFelt in formularStore.formularSkabelonFelterForAdministrator">
                    <formular-skabelon-felt :skabelonFelt="skabelonFelt"></formular-skabelon-felt>
                </template>
            </div>
        </div>
        <div>
            <div class="text-gray-700  font-semibold border-b border-gray-300">Mulige felter</div>
            <div class="flex flex-row flex-wrap gap-3 mt-2">
                <template v-for="felt in formularStore.felterIkkeISkabelon">
                    <muligt-felt :muligtFelt="felt"></muligt-felt>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import formularSkabelonFelt from '@/components/common/formularSkabelonFelt.vue';
import MuligtFelt from '../common/muligtFelt.vue';

const formularStore = useFormularStore();
</script>