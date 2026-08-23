<template>
    <div class="flex flex-row gap-x-2 mt-1">
        <template v-for="felt in formularStore.formularSkabelonFelterForAdministrator">
            <formular-skabelon-felt :felt="felt"></formular-skabelon-felt>
        </template>
    </div>
</template> 

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import formularSkabelonFelt from '@/components/common/formularSkabelonFelt.vue';
const formularStore = useFormularStore();
</script>