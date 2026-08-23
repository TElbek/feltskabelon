<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4">
        <div>
            <div class="text-gray-700 border-b border-gray-300">Minimumsfelter</div>
            <div class="flex flex-row gap-x-2 mt-1.5">
                <template v-for="felt in formularStore.formularSkabelonFelterForAdministrator">
                    <formular-skabelon-felt :felt="felt"></formular-skabelon-felt>
                </template>
            </div>
        </div>
        <div>
            <div class="text-gray-700 border-b border-gray-300">Alle felter</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import formularSkabelonFelt from '@/components/common/formularSkabelonFelt.vue';
const formularStore = useFormularStore();
</script>

<!--  -->